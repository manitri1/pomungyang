'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { worldviewStorage, type WorldviewPost } from '@/features/characters/constants/worldview'
import { ImageIcon, Video, FileText, Eye, Heart, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface WorldviewPostListProps {
  characterId: string
}

export function WorldviewPostList({ characterId }: WorldviewPostListProps) {
  const [posts, setPosts] = useState<WorldviewPost[]>([])

  useEffect(() => {
    const loadPosts = () => {
      const allPosts = worldviewStorage.getAll(characterId)
      // 최신순 정렬
      const sorted = allPosts.sort((a, b) => b.createdAt - a.createdAt)
      setPosts(sorted)
    }

    loadPosts()
    
    // 로컬 스토리지 변경 감지
    const handleStorageChange = () => {
      loadPosts()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // 커스텀 이벤트로 동일 탭 내 변경 감지
    const handleCustomStorage = () => {
      loadPosts()
    }
    window.addEventListener('worldviewPostsUpdated', handleCustomStorage)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('worldviewPostsUpdated', handleCustomStorage)
    }
  }, [characterId])

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="mb-4 h-12 w-12 text-gray-400" />
          <p className="text-lg font-medium text-gray-600">아직 게시글이 없습니다.</p>
          <p className="mt-2 text-sm text-gray-500">첫 번째 게시글을 작성해보세요!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const thumbnail = post.media.find((m) => m.type === 'image')?.url
        const hasVideo = post.media.some((m) => m.type === 'video')

        return (
          <Link key={post.id} href={`/characters/${characterId}/worldview/${post.id}`}>
            <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
              {thumbnail && (
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  {hasVideo && (
                    <div className="absolute right-2 top-2 rounded bg-black/50 px-2 py-1">
                      <Video className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                    {post.views !== undefined && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {post.media.filter((m) => m.type === 'image').length > 0 && (
                      <ImageIcon className="h-3 w-3" />
                    )}
                    {post.media.filter((m) => m.type === 'video').length > 0 && (
                      <Video className="h-3 w-3" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

