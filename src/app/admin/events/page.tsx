'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Plus, Trash2, Edit2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EventManageForm } from '@/features/challenges/components/EventManageForm'
import { events as initialEvents, type Event } from '@/features/challenges/constants/events'

const STORAGE_KEY = 'admin_events'
const PUBLIC_STORAGE_KEY = 'public_events'

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = () => {
    if (typeof window === 'undefined') return
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setEvents(JSON.parse(saved))
      } else {
        // 초기 이벤트 로드
        setEvents(initialEvents)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEvents))
        localStorage.setItem(PUBLIC_STORAGE_KEY, JSON.stringify(initialEvents))
      }
    } catch {
      setEvents(initialEvents)
    }
  }

  const saveEvents = (newEvents: Event[]) => {
    try {
      setEvents(newEvents)
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents))
        // 공개 이벤트 페이지에도 동기화
        localStorage.setItem(PUBLIC_STORAGE_KEY, JSON.stringify(newEvents))
        // 커스텀 이벤트 발생으로 이벤트 페이지 업데이트
        window.dispatchEvent(new Event('eventsUpdated'))
      }
      console.log('✅ 이벤트 저장 완료:', newEvents.length, '개')
    } catch (error) {
      console.error('❌ 이벤트 저장 실패:', error)
    }
  }

  const handleAdd = () => {
    setEditingEvent(null)
    setShowForm(true)
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('정말 이 이벤트를 삭제하시겠습니까?')) {
      const newEvents = events.filter((e) => e.id !== id)
      saveEvents(newEvents)
    }
  }

  const handleSave = (event: Event) => {
    let newEvents: Event[]
    
    if (editingEvent) {
      // 수정
      newEvents = events.map((e) => (e.id === event.id ? event : e))
    } else {
      // 추가
      newEvents = [...events, event]
    }
    
    saveEvents(newEvents)
    setShowForm(false)
    setEditingEvent(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingEvent(null)
  }

  if (showForm) {
    return (
      <div className="mx-auto max-w-4xl p-6 lg:p-12">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            {editingEvent ? '이벤트 수정' : '이벤트 추가'}
          </h1>
        </div>

        <EventManageForm
          event={editingEvent}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">이벤트 관리</h1>
            <p className="mt-1 text-gray-600">이벤트를 추가, 수정, 삭제할 수 있습니다.</p>
          </div>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          이벤트 추가
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
              {event.thumbnail ? (
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  fill
                  className="object-cover"
                  unoptimized={event.thumbnail.startsWith('http')}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <Calendar className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-base">{event.title}</CardTitle>
              {event.subtitle && (
                <CardDescription className="line-clamp-2">{event.subtitle}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">위치: {event.overview.location}</p>
                  <p className="text-xs text-gray-500">기간: {event.overview.period}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(event)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="mb-4 h-12 w-12 text-gray-400" />
            <p className="text-lg font-medium text-gray-600">등록된 이벤트가 없습니다.</p>
            <p className="mt-2 text-sm text-gray-500">이벤트를 추가해보세요.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

