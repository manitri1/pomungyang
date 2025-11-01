'use client'

import TourMap from '@/features/tour/components/TourMap'

export default function Page({ params }: { params: Promise<Record<string, string>> }) {
  void params
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold">캐릭터 투어</h1>
        <p className="text-sm text-secondary-token">포인트를 방문하고 스탬프를 모아 리워드를 획득하세요.</p>
      </header>
      <TourMap />
    </div>
  )
}


