'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { events } from '@/features/challenges/constants/events'
import { eventPostSupabaseStorage } from '@/features/challenges/lib/eventPostsSupabase'
import type { EventPost } from '@/features/challenges/constants/eventPosts'

export default function CreateEventPostPage({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  const { eventId } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const event = events.find((e) => e.id === eventId)

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [snsLink, setSnsLink] = useState('')
  const [uploading, setUploading] = useState(false)

  if (!event) {
    return (
      <div className="space-y-4">
        <Link href="/challenges/events">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            이벤트 목록으로
          </Button>
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">이벤트를 찾을 수 없습니다.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 이미지 파일 검증
    if (!file.type.startsWith('image/')) {
      toast({
        title: '파일 오류',
        description: '이미지 파일만 업로드 가능합니다.',
        variant: 'destructive',
      })
      return
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: '파일 크기 오류',
        description: '파일 크기는 10MB를 초과할 수 없습니다.',
        variant: 'destructive',
      })
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'events')

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '이미지 업로드 실패')
      }

      setImageUrl(data.url)
      toast({
        title: '업로드 완료',
        description: '이미지가 업로드되었습니다.',
      })
    } catch (error) {
      toast({
        title: '업로드 실패',
        description: error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!imageUrl) return

    try {
      // 이미지 삭제 API 호출
      const fileName = imageUrl.split('/').pop()
      if (fileName) {
        await fetch(`/api/upload-image?path=events/${fileName}`, {
          method: 'DELETE',
        })
      }
    } catch (error) {
      console.error('이미지 삭제 실패:', error)
    }

    setImageUrl('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !author.trim()) {
      toast({
        title: '입력 오류',
        description: '작성자명과 제목을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    if (!imageUrl) {
      toast({
        title: '이미지 필요',
        description: '인증 사진을 업로드해주세요.',
        variant: 'destructive',
      })
      return
    }

    const newPost: EventPost = {
      id: `event-post-${crypto.randomUUID()}`,
      eventId: eventId,
      author: author.trim(),
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl,
      snsLink: snsLink.trim() || undefined,
      createdAt: Date.now(),
      likes: 0,
    }

    const success = await eventPostSupabaseStorage.save(newPost)
    
    if (success) {
      toast({
        title: '등록 완료',
        description: '인증 사진이 등록되었습니다.',
      })

      router.push(`/challenges/events/${eventId}`)
    } else {
      toast({
        title: '등록 실패',
        description: '인증 사진 등록에 실패했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/challenges/events/${eventId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">인증 사진 등록</h1>
          <p className="text-gray-600 mt-1">{event.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
            <CardDescription>인증 사진과 함께 올릴 정보를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="author">작성자명 *</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="이름 또는 닉네임"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 운제산 정상에서 승천 기원!"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="인증 사진에 대한 설명이나 후기를 작성해주세요."
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="snsLink">SNS 링크 (선택)</Label>
              <Input
                id="snsLink"
                type="url"
                value={snsLink}
                onChange={(e) => setSnsLink(e.target.value)}
                placeholder="https://instagram.com/p/..."
              />
              <p className="text-xs text-gray-500">
                인스타그램 또는 네이버 블로그 게시물 링크를 입력해주세요.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>인증 사진 *</CardTitle>
            <CardDescription>인증 사진을 업로드해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {imageUrl ? (
              <div className="relative">
                <div className="relative h-64 w-full overflow-hidden rounded-lg border">
                  <Image
                    src={imageUrl}
                    alt="인증 사진"
                    fill
                    className="object-contain"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-[color:rgb(var(--color-primary-500))] hover:underline">
                    이미지를 선택하세요
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={uploading}
                  />
                </Label>
                {uploading && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>업로드 중...</span>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG, GIF (최대 10MB)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href={`/challenges/events/${eventId}`}>
            <Button type="button" variant="outline">
              취소
            </Button>
          </Link>
          <Button type="submit" disabled={uploading || !imageUrl || !title.trim() || !author.trim()}>
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                업로드 중...
              </>
            ) : (
              '등록하기'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

