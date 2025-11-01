'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Challenge } from '../constants/challenges'

type Props = {
  challenge: Challenge
  progress: string[]
  onOpen: (challenge: Challenge) => void
}

export default function ChallengeCard({ challenge, progress, onOpen }: Props) {
  const total = challenge.steps.length
  const done = progress.length
  const percent = Math.round((done / total) * 100)
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[2/1] w-full overflow-hidden">
        <img
          src={challenge.thumbnail}
          alt={`${challenge.title} 썸네일`}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{challenge.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="line-clamp-2 text-sm text-secondary-token">{challenge.description}</p>
        <div className="flex items-center justify-between text-xs">
          <span>진행률 {done}/{total} ({percent}%)</span>
          <button
            onClick={() => onOpen(challenge)}
            className="rounded bg-[color:rgb(var(--color-primary-500))] px-3 py-1 text-white"
          >
            자세히
          </button>
        </div>
      </CardContent>
    </Card>
  )
}


