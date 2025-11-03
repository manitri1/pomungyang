'use client'

import { use } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { characters } from '@/features/characters/constants/characters'
import { ArrowLeft, X, Image as ImageIcon, Video, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { worldviewSupabaseStorage } from '@/features/characters/lib/worldviewSupabase'
import type { WorldviewPost, Media } from '@/features/characters/constants/worldview'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

export default function CreateWorldviewPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const character = characters.find((c) => c.id === id)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [media, setMedia] = useState<Media[]>([])
  const [uploading, setUploading] = useState(false)

  if (!character) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4">
        <p className="text-lg">캐릭터를 찾을 수 없습니다.</p>
        <Link href="/characters" className="text-primary-token underline">
          캐릭터 목록으로 돌아가기
        </Link>
      </div>
    )
  }

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'worldview')

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '이미지 업로드 실패')
      }

      const newMedia: Media = {
        id: Date.now().toString(),
        type: 'image',
        url: data.url,
        alt: file.name,
      }

      setMedia([...media, newMedia])
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

  const handleVideoUpload = async (file: File | string) => {
    if (typeof file === 'string') {
      // URL 입력인 경우
      const newMedia: Media = {
        id: Date.now().toString(),
        type: 'video',
        url: file,
      }
      setMedia([...media, newMedia])
      return
    }

    // 파일 업로드인 경우
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'worldview')

      const response = await fetch('/api/upload-video', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '영상 업로드 실패')
      }

      const newMedia: Media = {
        id: Date.now().toString(),
        type: 'video',
        url: data.url,
        thumbnail: data.thumbnail,
      }

      setMedia([...media, newMedia])
      toast({
        title: '업로드 완료',
        description: '영상이 업로드되었습니다.',
      })
    } catch (error) {
      toast({
        title: '업로드 실패',
        description: error instanceof Error ? error.message : '영상 업로드에 실패했습니다.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const removeMedia = (mediaId: string) => {
    setMedia(media.filter((m) => m.id !== mediaId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast({
        title: '입력 오류',
        description: '제목과 내용을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    const newPost: WorldviewPost = {
      id: crypto.randomUUID(), // UUID 생성
      characterId: id,
      title: title.trim(),
      content: content.trim(),
      media,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      views: 0,
      likes: 0,
    }

    const success = await worldviewSupabaseStorage.save(newPost)
    
    if (success) {
      // 커스텀 이벤트 발생 (같은 탭에서도 리스트 갱신)
      window.dispatchEvent(new Event('worldviewPostsUpdated'))

      toast({
        title: '게시 완료',
        description: '게시글이 작성되었습니다.',
      })

      router.push(`/characters/${id}/worldview`)
    } else {
      toast({
        title: '저장 실패',
        description: '게시글 저장에 실패했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-12">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href={`/characters/${id}/worldview`}
          className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
          {character.name}의 세계관 글 쓰기
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>게시글 작성</CardTitle>
            <CardDescription>
              {character.name}의 세계관과 관련된 내용을 작성해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="게시글 제목을 입력하세요"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="게시글 내용을 입력하세요"
                className="min-h-[300px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>미디어 추가</CardTitle>
            <CardDescription>
              이미지나 영상을 추가하여 게시글을 더 풍부하게 만들어보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 이미지 업로드 */}
            <div className="space-y-2">
              <Label>이미지 업로드</Label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageUpload(file)
                }}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-[color:rgb(var(--color-primary-500))] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
              />
            </div>

            {/* 영상 업로드 */}
            <div className="space-y-2">
              <Label>영상 추가</Label>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleVideoUpload(file)
                  }}
                  disabled={uploading}
                  className="block flex-1 text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-[color:rgb(var(--color-primary-500))] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
                />
                <span className="flex items-center text-sm text-gray-500">또는</span>
                <Input
                  type="url"
                  placeholder="YouTube, Vimeo 등 영상 URL"
                  onBlur={(e) => {
                    const url = e.target.value.trim()
                    if (url) {
                      handleVideoUpload(url)
                      e.target.value = ''
                    }
                  }}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">
                영상 파일 또는 YouTube, Vimeo 등의 URL을 입력할 수 있습니다.
              </p>
            </div>

            {/* 업로드된 미디어 미리보기 */}
            {media.length > 0 && (
              <div className="space-y-4">
                <Label>업로드된 미디어</Label>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {media.map((item) => (
                    <div key={item.id} className="group relative">
                      {item.type === 'image' && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                          <Image
                            src={item.url}
                            alt={item.alt || '이미지'}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeMedia(item.id)}
                            className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      {item.type === 'video' && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-gray-100">
                          {item.url.startsWith('http') ? (
                            <div className="flex h-full items-center justify-center">
                              <Video className="h-8 w-8 text-gray-400" />
                              <span className="ml-2 text-xs text-gray-500">영상 URL</span>
                            </div>
                          ) : (
                            <video
                              src={item.url}
                              className="h-full w-full object-cover"
                              controls
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => removeMedia(item.id)}
                            className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href={`/characters/${id}/worldview`}>
            <Button type="button" variant="outline">
              취소
            </Button>
          </Link>
          <Button type="submit" disabled={uploading}>
            {uploading ? '업로드 중...' : '게시하기'}
          </Button>
        </div>
      </form>
    </div>
  )
}

