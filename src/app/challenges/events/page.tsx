'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { events as initialEvents, type Event } from '@/features/challenges/constants/events'
import { Calendar, MapPin, Users, Target, ArrowRight } from 'lucide-react'

const STORAGE_KEY = 'public_events'

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents)

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

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">이벤트</h1>
        <p className="text-sm text-gray-600 mt-2">
          캐릭터와 함께하는 특별한 챌린지에 참여하고 인증 사진을 올려보세요!
        </p>
      </header>

      <section aria-label="이벤트 목록" className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <Link key={event.id} href={`/challenges/events/${event.id}`}>
            <Card className="h-full cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                {event.subtitle && (
                  <CardDescription className="text-base">{event.subtitle}</CardDescription>
                )}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {event.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.overview.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{event.overview.period}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[color:rgb(var(--color-primary-500))] font-medium">
                  자세히 보기
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  )
}

