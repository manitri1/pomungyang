'use client'

import { useEffect, useMemo, useState } from 'react'
import { REWARD_THRESHOLD, TOUR_PROGRESS_KEY, tourPoints } from '../constants/tour'

export default function TourMap() {
  const [stamps, setStamps] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(TOUR_PROGRESS_KEY)
      if (raw) setStamps(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(TOUR_PROGRESS_KEY, JSON.stringify(stamps))
    } catch {}
  }, [stamps])

  const toggle = (id: string) => {
    setStamps((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const achievedReward = useMemo(() => stamps.length >= REWARD_THRESHOLD, [stamps])

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-lg border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">스탬프 포인트</h2>
        <ul className="divide-y text-sm">
          {tourPoints.map((p) => {
            const checked = stamps.includes(p.id)
            return (
              <li key={p.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-secondary-token">{p.hint}</p>
                </div>
                <button
                  onClick={() => toggle(p.id)}
                  className={`rounded px-3 py-1 text-xs ${checked ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                >
                  {checked ? '획득' : '획득하기'}
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="overflow-hidden rounded-lg border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">리워드</h2>
        <p className="text-sm">스탬프 {REWARD_THRESHOLD}개 이상 획득 시 리워드를 드립니다.</p>
        <div className="mt-3 rounded border p-3 text-sm">
          {achievedReward ? (
            <div className="flex items-center gap-2 text-green-700">
              <span className="rounded bg-green-100 px-2 py-1">달성</span>
              청명이 배지 리워드 지급 대상입니다!
            </div>
          ) : (
            <div className="text-secondary-token">아직 리워드 조건을 충족하지 않았습니다.</div>
          )}
        </div>
      </section>
    </div>
  )
}


