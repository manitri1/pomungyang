'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { events as initialEvents, type Event } from '@/features/challenges/constants/events'

const STORAGE_KEY = 'public_events'

import { eventPostSupabaseStorage } from '@/features/challenges/lib/eventPostsSupabase'
import type { EventPost } from '@/features/challenges/constants/eventPosts'
import { Calendar, MapPin, Users, Target, ArrowLeft, Camera, Heart, MessageCircle } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale/ko'

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  const { eventId } = use(params)
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const event = events.find((e) => e.id === eventId)

  useEffect(() => {
    // localStorage에서 이벤트 로드
    const loadEvents = () => {
      if (typeof window === 'undefined') return
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsedEvents = JSON.parse(saved)
          setEvents(parsedEvents)
        }
      } catch (error) {
        console.error('이벤트 로딩 실패:', error)
      }
    }

    loadEvents()

    // 이벤트 업데이트 리스너
    const handleEventsUpdated = () => {
      loadEvents()
    }

    window.addEventListener('eventsUpdated', handleEventsUpdated)
    return () => {
      window.removeEventListener('eventsUpdated', handleEventsUpdated)
    }
  }, [])
  const [posts, setPosts] = useState<EventPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      if (eventId) {
        try {
          setLoading(true)
          const data = await eventPostSupabaseStorage.getAll(eventId)
          setPosts(data)
        } catch (error) {
          console.error('인증 포스트 로딩 실패:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    loadPosts()
  }, [eventId])

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

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-4">
        <Link href="/challenges/events">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          {event.subtitle && (
            <p className="text-lg text-gray-600 mt-1">{event.subtitle}</p>
          )}
        </div>
      </div>

      {/* 썸네일 이미지 */}
      <div className="relative h-64 w-full overflow-hidden rounded-lg">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      {/* 이벤트 소개 */}
      <Card>
        <CardHeader>
          <CardTitle>이벤트 소개</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">{event.description}</p>

          {/* 컨셉 스토리 */}
          <div>
            <h3 className="font-semibold mb-2">컨셉 스토리</h3>
            <p className="text-gray-600 leading-relaxed">{event.conceptStory}</p>
          </div>

          {/* 이벤트 개요 */}
          <div>
            <h3 className="font-semibold mb-3">이벤트 개요</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <span className="font-medium">장소: </span>
                  <span>{event.overview.location}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <span className="font-medium">기간: </span>
                  <span>{event.overview.period}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <span className="font-medium">참가 대상: </span>
                  <span>{event.overview.target}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Target className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <span className="font-medium">주요 미션: </span>
                  <span>{event.overview.mission}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 참여 방법 */}
          {event.participationMethod && event.participationMethod.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">참여 방법</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-600">
                {event.participationMethod.map((method, index) => (
                  <li key={index}>{method}</li>
                ))}
              </ol>
            </div>
          )}

          {/* 시상 내역 */}
          {event.prizes && event.prizes.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">시상 내역</h3>
              <div className="space-y-3">
                {event.prizes.map((prize, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-[color:rgb(var(--color-primary-500))] mb-1">
                      {prize.title}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {prize.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 유의사항 */}
          {event.notices && event.notices.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">유의사항</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {event.notices.map((notice, index) => (
                  <li key={index}>{notice}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 해시태그 */}
          {event.hashtags && event.hashtags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">필수 해시태그</h3>
              <div className="flex flex-wrap gap-2">
                {event.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 인증 사진 갤러리 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>인증 사진 갤러리</CardTitle>
              <CardDescription>
                참가자들의 인증 사진을 확인하고 공감을 표현해보세요!
              </CardDescription>
            </div>
            <Link href={`/challenges/events/${eventId}/create`}>
              <Button>
                <Camera className="mr-2 h-4 w-4" />
                인증 사진 올리기
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center text-gray-500">
              <Camera className="h-12 w-12 mx-auto mb-4 text-gray-300 animate-pulse" />
              <p>로딩 중...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <Camera className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>아직 등록된 인증 사진이 없습니다.</p>
              <p className="text-sm mt-2">첫 번째 인증 사진을 올려보세요!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/challenges/events/${eventId}/posts/${post.id}`}>
                  <Card className="h-full cursor-pointer transition-all hover:shadow-lg">
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base line-clamp-1">{post.title}</CardTitle>
                      <CardDescription className="text-xs">
                        {post.author} · {format(new Date(post.createdAt), 'yyyy년 M월 d일', { locale: ko })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{post.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes || 0}</span>
                        </div>
                        {post.snsLink && (
                          <a
                            href={post.snsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-600 hover:underline"
                          >
                            SNS 보기
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

