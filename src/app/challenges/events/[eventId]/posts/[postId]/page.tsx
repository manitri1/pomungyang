'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Heart, ExternalLink, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale/ko'
import { events } from '@/features/challenges/constants/events'
import { eventPostStorage, type EventPost } from '@/features/challenges/constants/eventPosts'
import { useToast } from '@/hooks/use-toast'

export default function EventPostDetailPage({
  params,
}: {
  params: Promise<{ eventId: string; postId: string }>
}) {
  const { eventId, postId } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const event = events.find((e) => e.id === eventId)
  const [post, setPost] = useState<EventPost | null>(null)

  useEffect(() => {
    if (postId) {
      const foundPost = eventPostStorage.getById(postId)
      setPost(foundPost)
    }
  }, [postId])

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

  if (!post) {
    return (
      <div className="space-y-4">
        <Link href={`/challenges/events/${eventId}`}>
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            이벤트로 돌아가기
          </Button>
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">인증 포스트를 찾을 수 없습니다.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleLike = () => {
    eventPostStorage.toggleLike(post.id)
    const updatedPost = eventPostStorage.getById(post.id)
    if (updatedPost) {
      setPost(updatedPost)
    }
    toast({
      title: '좋아요',
      description: '공감을 표시했습니다!',
    })
  }

  const handleDelete = () => {
    if (confirm('정말 이 인증 포스트를 삭제하시겠습니까?')) {
      eventPostStorage.delete(post.id)
      toast({
        title: '삭제 완료',
        description: '인증 포스트가 삭제되었습니다.',
      })
      router.push(`/challenges/events/${eventId}`)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/challenges/events/${eventId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-gray-600 mt-1">
            {post.author} · {format(new Date(post.createdAt), 'yyyy년 M월 d일 HH:mm', { locale: ko })}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* 이미지 */}
          <div className="relative h-96 w-full overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-contain bg-gray-50"
            />
          </div>

          {/* 내용 */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  <span>{post.likes || 0}</span>
                </Button>
                {post.snsLink && (
                  <a
                    href={post.snsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>SNS에서 보기</span>
                  </a>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                삭제
              </Button>
            </div>

            {post.content && (
              <div className="pt-4 border-t">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 이벤트 정보 링크 */}
      <Card>
        <CardHeader>
          <CardTitle>이벤트 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <Link href={`/challenges/events/${eventId}`}>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-gray-600">{event.overview.location}</div>
              </div>
              <Button variant="ghost" size="sm">
                이벤트 보기
              </Button>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

