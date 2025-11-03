'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { characters } from '@/features/characters/constants/characters'
import { ArrowLeft, Eye, Calendar, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { worldviewSupabaseStorage } from '@/features/characters/lib/worldviewSupabase'
import type { WorldviewPost } from '@/features/characters/constants/worldview'
import { formatDistanceToNow } from 'date-fns'
import { useToast } from '@/hooks/use-toast'

export default function WorldviewPostDetailPage({
  params,
}: {
  params: Promise<{ id: string; postId: string }>
}) {
  const resolvedParams = use(params)
  const { id, postId } = resolvedParams
  const router = useRouter()
  const { toast } = useToast()
  const character = characters.find((c) => c.id === id)
  const [post, setPost] = useState<WorldviewPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true)
        const loadedPost = await worldviewSupabaseStorage.getById(postId)
        if (loadedPost) {
          setPost(loadedPost)
          await worldviewSupabaseStorage.incrementViews(postId)
          // 조회수 증가 후 다시 로드
          const updatedPost = await worldviewSupabaseStorage.getById(postId)
          if (updatedPost) {
            setPost(updatedPost)
          }
        }
      } catch (error) {
        console.error('게시글 로딩 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [postId])

  const handleDelete = async () => {
    if (!post) return

    if (confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      const success = await worldviewSupabaseStorage.delete(postId)
      
      if (success) {
        // 커스텀 이벤트 발생
        window.dispatchEvent(new Event('worldviewPostsUpdated'))
        
        toast({
          title: '삭제 완료',
          description: '게시글이 삭제되었습니다.',
        })

        router.push(`/characters/${id}/worldview`)
      } else {
        toast({
          title: '삭제 실패',
          description: '게시글 삭제에 실패했습니다. 다시 시도해주세요.',
          variant: 'destructive',
        })
      }
    }
  }

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

  if (loading) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4">
        <p className="text-lg">로딩 중...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4">
        <p className="text-lg">게시글을 찾을 수 없습니다.</p>
        <Link href={`/characters/${id}/worldview`} className="text-primary-token underline">
          세계관 목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-12">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href={`/characters/${id}/worldview`}
          className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          삭제
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
              {post.views !== undefined && (
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  조회 {post.views}
                </span>
              )}
            </div>
          </div>

          {/* 미디어 표시 */}
          {post.media.length > 0 && (
            <div className="mb-6 space-y-4">
              {post.media.map((item) => (
                <div key={item.id} className="rounded-lg border overflow-hidden">
                  {item.type === 'image' && (
                    <div className="relative aspect-video w-full">
                      <Image
                        src={item.url}
                        alt={item.alt || '이미지'}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {item.type === 'video' && (
                    <div className="relative aspect-video w-full bg-black">
                      {item.url.startsWith('http') ? (
                        <div className="flex h-full items-center justify-center">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:underline"
                          >
                            영상 보기: {item.url}
                          </a>
                        </div>
                      ) : (
                        <video
                          src={item.url}
                          className="h-full w-full object-contain"
                          controls
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 내용 */}
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

