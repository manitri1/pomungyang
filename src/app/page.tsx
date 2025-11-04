'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/home/Hero'
import { events as initialEvents, type Event } from '@/features/challenges/constants/events'

const STORAGE_KEY = 'public_events'

export default function Home() {
  const [events, setEvents] = useState<Event[]>(initialEvents.slice(0, 3))

  useEffect(() => {
    // localStorage에서 이벤트 로드
    const loadEvents = () => {
      if (typeof window === 'undefined') return

      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsedEvents = JSON.parse(saved)
          // 최대 3개만 표시
          setEvents(parsedEvents.slice(0, 3))
        } else {
          // 기본 이벤트 중 최대 3개
          setEvents(initialEvents.slice(0, 3))
        }
      } catch (error) {
        console.error('이벤트 로딩 실패:', error)
        setEvents(initialEvents.slice(0, 3))
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
      <Hero />
      <section aria-label="소식 및 이벤트" className="grid gap-4 md:grid-cols-3">
        {events.map((event) => (
          <Link key={event.id} href={`/challenges/events/${event.id}`}>
            <article className="group overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg">
              <div className="relative h-36 w-full overflow-hidden">
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1 p-4">
                <h3 className="line-clamp-1 font-semibold">{event.title}</h3>
                {event.subtitle && (
                  <p className="line-clamp-1 text-xs text-gray-500">{event.subtitle}</p>
                )}
                <p className="line-clamp-2 text-sm text-secondary-token">{event.description}</p>
                <span className="text-sm text-[color:rgb(var(--color-primary-500))] underline">
                  자세히 보기
                </span>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  )
}
