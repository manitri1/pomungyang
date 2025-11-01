'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Character } from '../constants/characters'
import Image from 'next/image'

type Props = {
  character: Character
}

export default function CharacterCard({ character }: Props) {
  return (
    <Link href={`/characters/${character.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:bg-[color:rgb(var(--color-accent-500))]/10">
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <Image
          src={character.image}
          alt={`${character.name} 이미지`}
          fill
          className="object-cover transition-transform group-hover:scale-[1.03]"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{character.name}</CardTitle>
        <p className="text-sm font-medium text-[color:rgb(var(--color-primary-500))]">{character.persona}</p>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div>
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-secondary-token">페르소나 소개</h4>
          <p className="text-sm leading-relaxed text-secondary-token">{character.personaIntro}</p>
        </div>
        <div>
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-secondary-token">탄생 배경</h4>
          <p className="text-sm leading-relaxed text-secondary-token">{character.originStory}</p>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}


