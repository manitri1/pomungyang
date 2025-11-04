'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import ChallengeCard from '@/features/challenges/components/ChallengeCard'
import ChallengeDetailSheet from '@/features/challenges/components/ChallengeDetailSheet'
import { PROGRESS_KEY, challenges, type ChallengeProgress, type Challenge } from '@/features/challenges/constants/challenges'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/ui/stagger-container'
import { FadeIn } from '@/components/ui/fade-in'

export default function Page({
  params,
}: {
  params: Promise<Record<string, string>>
}) {
  void params

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<Challenge | null>(null)
  const [progress, setProgress] = useState<ChallengeProgress>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY)
      if (raw) setProgress(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    } catch {}
  }, [progress])

  const onOpen = (c: Challenge) => {
    setActive(c)
    setOpen(true)
  }

  const onToggleStep = (stepId: string) => {
    if (!active) return
    setProgress((p) => {
      const current = new Set(p[active.id] || [])
      current.has(stepId) ? current.delete(stepId) : current.add(stepId)
      return { ...p, [active.id]: Array.from(current) }
    })
  }

  const computed = useMemo(() => {
    return challenges.map((c) => ({ c, prog: progress[c.id] || [] }))
  }, [progress])

  return (
    <div className="space-y-4">
      <FadeIn>
        <header>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">캐릭터 챌린지</h1>
              <p className="text-sm text-secondary-token">진행 중 챌린지를 선택해 상세를 확인하고 단계를 완료하세요.</p>
            </div>
            <Link href="/challenges/events">
              <Button>
                <Sparkles className="mr-2 h-4 w-4" />
                이벤트 보기
              </Button>
            </Link>
          </div>
        </header>
      </FadeIn>
      <section aria-label="챌린지 목록" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StaggerContainer>
          {computed.map(({ c, prog }) => (
            <StaggerItem key={c.id}>
              <ChallengeCard challenge={c} progress={prog} onOpen={onOpen} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
      <ChallengeDetailSheet
        open={open}
        onOpenChange={setOpen}
        challenge={active}
        progress={active ? progress[active.id] || [] : []}
        onToggleStep={onToggleStep}
      />
    </div>
  )
}


