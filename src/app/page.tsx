'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/home/Hero'
import { events as initialEvents, type Event } from '@/features/challenges/constants/events'
import { StaggerContainer, StaggerItem } from '@/components/ui/stagger-container'

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
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        aria-label="소식 및 이벤트"
        className="grid gap-4 md:grid-cols-3"
      >
        <StaggerContainer>
          {events.map((event, index) => (
            <StaggerItem key={event.id}>
              <Link href={`/challenges/events/${event.id}`}>
                <motion.article
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={event.thumbnail}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform"
                        loading="lazy"
                      />
                    </motion.div>
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
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </motion.section>
    </div>
  )
}
