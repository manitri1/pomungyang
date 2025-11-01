'use client'

import CharacterCard from '@/features/characters/components/CharacterCard'
import { characters } from '@/features/characters/constants/characters'

export default function Page({
  params,
}: {
  params: Promise<Record<string, string>>
}) {
  // params는 규칙상 Promise 형태로 받되, 본 스켈레톤에서는 사용하지 않습니다.
  void params
  return (
    <div className="space-y-4">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">캐릭터 소개</h1>
          <p className="text-sm text-secondary-token">세계관의 캐릭터를 탐색해 보세요.</p>
        </div>
      </header>
      <section aria-label="캐릭터 목록" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {characters.map((ch) => (
          <CharacterCard key={ch.id} character={ch} />
        ))}
      </section>
    </div>
  )
}


