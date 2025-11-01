'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { Challenge } from '../constants/challenges'

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  challenge: Challenge | null
  progress: string[]
  onToggleStep: (stepId: string) => void
}

export default function ChallengeDetailSheet({ open, onOpenChange, challenge, progress, onToggleStep }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md">
        {challenge && (
          <div className="space-y-4">
            <SheetHeader>
              <SheetTitle>{challenge.title}</SheetTitle>
            </SheetHeader>
            <img
              src={challenge.thumbnail}
              alt={`${challenge.title} 이미지`}
              className="h-40 w-full rounded object-cover"
            />
            <p className="text-sm text-secondary-token">{challenge.description}</p>
            <ul className="space-y-2">
              {challenge.steps.map((s) => {
                const checked = progress.includes(s.id)
                return (
                  <li key={s.id} className="flex items-center justify-between rounded border p-2">
                    <span className="text-sm">{s.label}</span>
                    <button
                      onClick={() => onToggleStep(s.id)}
                      className={`rounded px-2 py-1 text-xs ${checked ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                    >
                      {checked ? '완료' : '완료 처리'}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}


