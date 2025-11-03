'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Event } from '../constants/events'
import { ImageUpload } from '@/features/characters/components/ImageUpload'
import { useToast } from '@/hooks/use-toast'
import { Plus, X } from 'lucide-react'

interface EventManageFormProps {
  event: Event | null
  onSave: (event: Event) => void
  onCancel: () => void
}

export function EventManageForm({ event, onSave, onCancel }: EventManageFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    subtitle: '',
    thumbnail: '',
    characterId: 'cheongmyeong' as 'cheongmyeong' | 'baeknyang',
    description: '',
    location: '',
    period: '',
    target: '',
    mission: '',
    conceptStory: '',
    participationMethod: [] as string[],
    prizes: [] as Array<{ title: string; items: string[] }>,
    notices: [] as string[],
    hashtags: [] as string[],
  })
  
  const [newParticipationMethod, setNewParticipationMethod] = useState('')
  const [newNotice, setNewNotice] = useState('')
  const [newHashtag, setNewHashtag] = useState('')
  const [newPrizeTitle, setNewPrizeTitle] = useState('')
  const [newPrizeItem, setNewPrizeItem] = useState('')
  const [selectedPrizeIndex, setSelectedPrizeIndex] = useState<number | null>(null)

  useEffect(() => {
    if (event) {
      setFormData({
        id: event.id,
        title: event.title,
        subtitle: event.subtitle || '',
        thumbnail: event.thumbnail,
        characterId: event.characterId,
        description: event.description,
        location: event.overview.location,
        period: event.overview.period,
        target: event.overview.target,
        mission: event.overview.mission,
        conceptStory: event.conceptStory,
        participationMethod: event.participationMethod || [],
        prizes: event.prizes || [],
        notices: event.notices || [],
        hashtags: event.hashtags || [],
      })
    } else {
      // 새 이벤트의 경우 ID 자동 생성
      setFormData({
        id: `event-${Date.now()}`,
        title: '',
        subtitle: '',
        thumbnail: '',
        characterId: 'cheongmyeong',
        description: '',
        location: '',
        period: '',
        target: '',
        mission: '',
        conceptStory: '',
        participationMethod: [],
        prizes: [],
        notices: [],
        hashtags: [],
      })
    }
  }, [event])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: '입력 오류',
        description: '제목과 설명을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    const newEvent: Event = {
      id: formData.id,
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim() || undefined,
      thumbnail: formData.thumbnail || '/characters/chungmung_intro.png',
      characterId: formData.characterId,
      description: formData.description.trim(),
      overview: {
        location: formData.location.trim(),
        period: formData.period.trim(),
        target: formData.target.trim(),
        mission: formData.mission.trim(),
      },
      conceptStory: formData.conceptStory.trim(),
      participationMethod: formData.participationMethod.filter((m) => m.trim()),
      prizes: formData.prizes.length > 0 ? formData.prizes : undefined,
      notices: formData.notices.length > 0 ? formData.notices.filter((n) => n.trim()) : undefined,
      hashtags: formData.hashtags.length > 0 ? formData.hashtags.filter((h) => h.trim()) : undefined,
    }

    onSave(newEvent)
    toast({
      title: event ? '수정 완료' : '추가 완료',
      description: '이벤트가 저장되었습니다.',
    })
  }

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, thumbnail: url }))
    toast({
      title: '이미지 업로드 완료',
      description: '이미지가 폼에 추가되었습니다.',
    })
  }

  const addParticipationMethod = () => {
    if (newParticipationMethod.trim()) {
      setFormData((prev) => ({
        ...prev,
        participationMethod: [...prev.participationMethod, newParticipationMethod.trim()],
      }))
      setNewParticipationMethod('')
    }
  }

  const removeParticipationMethod = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      participationMethod: prev.participationMethod.filter((_, i) => i !== index),
    }))
  }

  const addNotice = () => {
    if (newNotice.trim()) {
      setFormData((prev) => ({
        ...prev,
        notices: [...prev.notices, newNotice.trim()],
      }))
      setNewNotice('')
    }
  }

  const removeNotice = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      notices: prev.notices.filter((_, i) => i !== index),
    }))
  }

  const addHashtag = () => {
    if (newHashtag.trim()) {
      setFormData((prev) => ({
        ...prev,
        hashtags: [...prev.hashtags, newHashtag.trim()],
      }))
      setNewHashtag('')
    }
  }

  const removeHashtag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      hashtags: prev.hashtags.filter((_, i) => i !== index),
    }))
  }

  const addPrize = () => {
    if (newPrizeTitle.trim()) {
      setFormData((prev) => ({
        ...prev,
        prizes: [...prev.prizes, { title: newPrizeTitle.trim(), items: [] }],
      }))
      setNewPrizeTitle('')
      setSelectedPrizeIndex(formData.prizes.length)
    }
  }

  const removePrize = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      prizes: prev.prizes.filter((_, i) => i !== index),
    }))
  }

  const addPrizeItem = (prizeIndex: number) => {
    if (newPrizeItem.trim() && prizeIndex !== null) {
      setFormData((prev) => {
        const newPrizes = [...prev.prizes]
        newPrizes[prizeIndex] = {
          ...newPrizes[prizeIndex],
          items: [...newPrizes[prizeIndex].items, newPrizeItem.trim()],
        }
        return { ...prev, prizes: newPrizes }
      })
      setNewPrizeItem('')
    }
  }

  const removePrizeItem = (prizeIndex: number, itemIndex: number) => {
    setFormData((prev) => {
      const newPrizes = [...prev.prizes]
      newPrizes[prizeIndex] = {
        ...newPrizes[prizeIndex],
        items: newPrizes[prizeIndex].items.filter((_, i) => i !== itemIndex),
      }
      return { ...prev, prizes: newPrizes }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
          <CardDescription>이벤트의 기본 정보를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">이벤트 제목 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="예: 청멍이와 함께하는 승천 기원"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">부제목</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
              placeholder="예: 반려 동물과 함께 포항 최고봉에서 하늘길을 열다!"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="characterId">캐릭터 선택</Label>
            <Select
              value={formData.characterId}
              onValueChange={(value: 'cheongmyeong' | 'baeknyang') =>
                setFormData((prev) => ({ ...prev, characterId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cheongmyeong">청멍이</SelectItem>
                <SelectItem value="baeknyang">백냥이</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명 *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="이벤트에 대한 간단한 소개"
              className="min-h-[100px]"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>이벤트 개요</CardTitle>
          <CardDescription>이벤트의 상세 정보를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">위치</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="예: 포항 운제산 정상 (해발 482m)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="period">기간</Label>
            <Input
              id="period"
              value={formData.period}
              onChange={(e) => setFormData((prev) => ({ ...prev, period: e.target.value }))}
              placeholder="예: 2024년 5월 1일 ~ 5월 31일 (한 달간 진행)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">대상</Label>
            <Input
              id="target"
              value={formData.target}
              onChange={(e) => setFormData((prev) => ({ ...prev, target: e.target.value }))}
              placeholder="예: 반려 동물과 함께하는 모든 청멍이 팬"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission">미션</Label>
            <Input
              id="mission"
              value={formData.mission}
              onChange={(e) => setFormData((prev) => ({ ...prev, mission: e.target.value }))}
              placeholder="예: 반려 동물과 함께 운제산 정상에서 인증샷 촬영"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>컨셉 스토리</CardTitle>
          <CardDescription>이벤트의 배경 스토리를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.conceptStory}
            onChange={(e) => setFormData((prev) => ({ ...prev, conceptStory: e.target.value }))}
            placeholder="이벤트의 컨셉과 스토리를 작성해주세요."
            className="min-h-[150px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>참여 방법</CardTitle>
          <CardDescription>참여 방법을 단계별로 추가해주세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newParticipationMethod}
              onChange={(e) => setNewParticipationMethod(e.target.value)}
              placeholder="예: STEP 1: 맛집 리스트 확인"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addParticipationMethod()
                }
              }}
            />
            <Button type="button" onClick={addParticipationMethod}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.participationMethod.map((method, index) => (
              <div key={index} className="flex items-center gap-2 rounded-md bg-gray-50 p-2">
                <span className="flex-1 text-sm">{method}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeParticipationMethod(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>상품</CardTitle>
          <CardDescription>이벤트 상품을 추가해주세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newPrizeTitle}
              onChange={(e) => setNewPrizeTitle(e.target.value)}
              placeholder="상품명 (예: 용의 정수 상)"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addPrize()
                }
              }}
            />
            <Button type="button" onClick={addPrize}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.prizes.map((prize, prizeIndex) => (
            <Card key={prizeIndex} className="bg-gray-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{prize.title}</CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removePrize(prizeIndex)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newPrizeItem}
                    onChange={(e) => setNewPrizeItem(e.target.value)}
                    placeholder="상품 항목 (예: 프리미엄 펫 캐리어)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addPrizeItem(prizeIndex)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setSelectedPrizeIndex(prizeIndex)
                      addPrizeItem(prizeIndex)
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {prize.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2 rounded-md bg-white p-2">
                      <span className="flex-1 text-sm">• {item}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePrizeItem(prizeIndex, itemIndex)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>공지사항</CardTitle>
          <CardDescription>이벤트 공지사항을 추가해주세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newNotice}
              onChange={(e) => setNewNotice(e.target.value)}
              placeholder="예: 반려 동물 안전 수칙 준수 필수"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addNotice()
                }
              }}
            />
            <Button type="button" onClick={addNotice}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.notices.map((notice, index) => (
              <div key={index} className="flex items-center gap-2 rounded-md bg-gray-50 p-2">
                <span className="flex-1 text-sm">{notice}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeNotice(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>해시태그</CardTitle>
          <CardDescription>SNS 해시태그를 추가해주세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
              placeholder="예: #청멍이와함께"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addHashtag()
                }
              }}
            />
            <Button type="button" onClick={addHashtag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.hashtags.map((hashtag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm"
              >
                <span>{hashtag}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0"
                  onClick={() => removeHashtag(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>썸네일 이미지</CardTitle>
          <CardDescription>이벤트 썸네일 이미지를 업로드해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            folder="events"
            onUploadComplete={handleImageUpload}
            currentImageUrl={formData.thumbnail}
            onRemove={() => setFormData((prev) => ({ ...prev, thumbnail: '' }))}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit">{event ? '수정하기' : '추가하기'}</Button>
      </div>
    </form>
  )
}

