'use client'

import { useEffect, useMemo, useState } from 'react'
import { PROGRESS_KEY as CH_PROGRESS_KEY, type ChallengeProgress } from '@/features/challenges/constants/challenges'
import { TOUR_PROGRESS_KEY } from '@/features/tour/constants/tour'

export default function Page({ params }: { params: Promise<Record<string, string>> }) {
  void params
  const [ch, setCh] = useState<ChallengeProgress>({})
  const [tour, setTour] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CH_PROGRESS_KEY)
      if (raw) setCh(JSON.parse(raw))
    } catch {}
    try {
      const rawTour = localStorage.getItem(TOUR_PROGRESS_KEY)
      if (rawTour) setTour(JSON.parse(rawTour))
    } catch {}
  }, [])

  const challengeSummary = useMemo(() => {
    const ids = Object.keys(ch)
    const completedSteps = ids.reduce((acc, id) => acc + (ch[id]?.length || 0), 0)
    return { challengeCount: ids.length, completedSteps }
  }, [ch])

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold">마이페이지</h1>
        <p className="text-sm text-secondary-token">내 스탬프/챌린지 진행 현황입니다.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border bg-white p-4">
          <h2 className="mb-2 text-lg font-semibold">투어 스탬프</h2>
          <p className="text-sm">획득 스탬프: <span className="font-semibold">{tour.length}</span></p>
        </article>
        <article className="rounded-lg border bg-white p-4">
          <h2 className="mb-2 text-lg font-semibold">챌린지 진행</h2>
          <p className="text-sm">참여 챌린지 수: <span className="font-semibold">{challengeSummary.challengeCount}</span></p>
          <p className="text-sm">완료한 단계 합계: <span className="font-semibold">{challengeSummary.completedSteps}</span></p>
        </article>
      </section>
    </div>
  )
}


