import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = formData.get('folder') as string | null || 'characters'
    
    if (!file) {
      return NextResponse.json(
        { error: '파일이 필요합니다.' },
        { status: 400 }
      )
    }

    // 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '이미지 파일만 업로드 가능합니다.' },
        { status: 400 }
      )
    }

    // 파일 크기 제한 (10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '파일 크기는 10MB를 초과할 수 없습니다.' },
        { status: 400 }
      )
    }

    // 파일 읽기
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 파일명 생성 (타임스탬프 + 원본 파일명)
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}-${originalName}`
    
    // 저장 경로
    const uploadDir = join(process.cwd(), 'public', folder)
    const filePath = join(uploadDir, fileName)

    // 디렉토리 생성 (없는 경우)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // 파일 저장
    await writeFile(filePath, buffer)

    // URL 반환
    const publicUrl = `/${folder}/${fileName}`

    console.log(`✅ 이미지 업로드 완료: ${publicUrl}`)

    return NextResponse.json({
      url: publicUrl,
      fileName: fileName,
      fileSize: file.size,
      mimeType: file.type,
    })
  } catch (error) {
    console.error('이미지 업로드 에러:', error)
    return NextResponse.json(
      {
        error: '이미지 업로드에 실패했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 에러',
      },
      { status: 500 }
    )
  }
}

// 이미지 삭제 API
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get('path')

    if (!filePath) {
      return NextResponse.json(
        { error: '파일 경로가 필요합니다.' },
        { status: 400 }
      )
    }

    const { unlink } = await import('fs/promises')
    const { join } = await import('path')
    
    // public 폴더 내의 파일만 삭제 허용
    if (filePath.startsWith('../') || filePath.includes('..')) {
      return NextResponse.json(
        { error: '잘못된 파일 경로입니다.' },
        { status: 400 }
      )
    }

    const fullPath = join(process.cwd(), 'public', filePath)
    await unlink(fullPath)

    console.log(`✅ 이미지 삭제 완료: ${filePath}`)

    return NextResponse.json({ success: true, deletedPath: filePath })
  } catch (error) {
    console.error('이미지 삭제 에러:', error)
    return NextResponse.json(
      {
        error: '이미지 삭제에 실패했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 에러',
      },
      { status: 500 }
    )
  }
}

