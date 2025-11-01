'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

interface ImageUploadProps {
  folder?: string
  onUploadComplete?: (url: string) => void
  currentImageUrl?: string
  onRemove?: () => void
}

export function ImageUpload({
  folder = 'characters',
  onUploadComplete,
  currentImageUrl,
  onRemove,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)
  const { toast } = useToast()

  const handleFileChange = async (file: File) => {
    // 미리보기 생성
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // 업로드 시작
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '업로드에 실패했습니다.')
      }

      setPreview(data.url)
      toast({
        title: '업로드 완료',
        description: '이미지가 성공적으로 업로드되었습니다.',
      })

      if (onUploadComplete) {
        onUploadComplete(data.url)
      }
    } catch (error) {
      console.error('업로드 에러:', error)
      toast({
        title: '업로드 실패',
        description: error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.',
        variant: 'destructive',
      })
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    if (!preview || !preview.startsWith('/')) return

    try {
      const response = await fetch(`/api/upload-image?path=${preview}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('삭제에 실패했습니다.')
      }

      setPreview(null)
      toast({
        title: '삭제 완료',
        description: '이미지가 삭제되었습니다.',
      })

      if (onRemove) {
        onRemove()
      }
    } catch (error) {
      console.error('삭제 에러:', error)
      toast({
        title: '삭제 실패',
        description: '이미지 삭제에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-[color:rgb(var(--color-primary-500))]" />
          <CardTitle>이미지 업로드</CardTitle>
        </div>
        <CardDescription>
          이미지 파일을 업로드하여 저장하세요. (최대 10MB, JPG, PNG, GIF)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {preview && (
          <div className="relative rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-md">
              <Image
                src={preview}
                alt="미리보기"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">{preview}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="h-8"
              >
                <X className="mr-2 h-4 w-4" />
                삭제
              </Button>
            </div>
          </div>
        )}

        <FileUpload
          onFileChange={handleFileChange}
          accept="image/*"
          className="flex flex-col items-center justify-center gap-4 py-8"
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              <p className="text-sm text-gray-600">업로드 중...</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-gray-400" />
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  클릭하여 이미지 선택
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  또는 파일을 드래그하여 놓으세요
                </p>
              </div>
            </>
          )}
        </FileUpload>

        <p className="text-xs text-gray-500">
          💡 업로드된 이미지는 `public/{folder}/` 폴더에 저장됩니다.
        </p>
      </CardContent>
    </Card>
  )
}

