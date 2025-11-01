import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = formData.get('folder') as string | null || 'worldview'
    
    if (!file) {
      return NextResponse.json(
        { error: '파일이 필요합니다.' },
        { status: 400 }
      )
    }

    // 파일 유효성 검사
    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: '영상 파일만 업로드 가능합니다.' },
        { status: 400 }
      )
    }

    // 파일 크기 제한 (100MB)
    const maxSize = 100 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '파일 크기는 100MB를 초과할 수 없습니다.' },
        { status: 400 }
      )
    }

    // 파일 읽기
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 파일명 생성
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}-${originalName}`
    
    // 저장 경로
    const uploadDir = join(process.cwd(), 'public', folder, 'videos')
    const filePath = join(uploadDir, fileName)

    // 디렉토리 생성 (없는 경우)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // 파일 저장
    await writeFile(filePath, buffer)

    // URL 반환
    const publicUrl = `/${folder}/videos/${fileName}`

    console.log(`✅ 영상 업로드 완료: ${publicUrl}`)

    return NextResponse.json({
      url: publicUrl,
      fileName: fileName,
      fileSize: file.size,
      mimeType: file.type,
    })
  } catch (error) {
    console.error('영상 업로드 에러:', error)
    return NextResponse.json(
      {
        error: '영상 업로드에 실패했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 에러',
      },
      { status: 500 }
    )
  }
}

