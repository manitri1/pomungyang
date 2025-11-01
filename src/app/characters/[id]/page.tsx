'use client'

import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { characters } from '@/features/characters/constants/characters'
import { ArrowLeft, Heart, Folder, Briefcase, Settings, Sparkles } from 'lucide-react'

export default function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const character = characters.find((c) => c.id === id)

  if (!character) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4">
        <p className="text-lg">캐릭터를 찾을 수 없습니다.</p>
        <Link href="/characters" className="text-primary-token underline">
          캐릭터 목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-200px)] overflow-hidden bg-white">
      {/* Decorative Icons - positioned relative to right column */}
      <div className="absolute right-8 top-8 z-10 hidden lg:block">
        <Sparkles className="h-5 w-5 text-blue-400" />
      </div>
      <div className="absolute right-16 bottom-32 z-10 hidden lg:block">
        <Briefcase className="h-6 w-6 fill-amber-300 text-amber-600" />
        <Sparkles className="absolute -bottom-2 left-0 h-3 w-3 text-yellow-300" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 p-6 lg:grid-cols-[1.8fr_1.2fr] lg:p-12">
        {/* Left: Text Content (60-70% width) */}
        <div className="flex flex-col justify-center space-y-8 lg:space-y-10">
          <div className="flex items-center gap-4">
            <Link
              href="/characters"
              className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl font-bold leading-tight text-gray-800 lg:text-6xl">
              <span className="font-normal text-gray-600">안녕! 나는 </span>
              <span className="text-[color:rgb(var(--color-primary-500))]">{character.name}</span>
            </h1>
            <p className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
              {character.persona}
            </p>
          </div>

          <p className="text-base text-gray-600 lg:text-lg">해양 도시에서 온</p>

          <div className="space-y-6 text-base leading-relaxed lg:text-lg">
            <div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 lg:text-2xl">페르소나 소개</h3>
              <p className="text-gray-700 leading-7">{character.personaIntro}</p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 lg:text-2xl">탄생 배경</h3>
              <p className="text-gray-700 leading-7">{character.originStory}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Link
              href={`/characters/${id}/worldview`}
              className="rounded-md bg-[color:rgb(var(--color-primary-500))] px-8 py-3 text-base font-medium text-white hover:opacity-90 transition-opacity"
            >
              세계관 보기
            </Link>
            <Link
              href="/challenges"
              className="rounded-md border-2 border-gray-300 px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              챌린지 참여
            </Link>
            <Link
              href="/goods"
              className="rounded-md border-2 border-gray-300 px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              굿즈 보기
            </Link>
          </div>
        </div>

        {/* Right: Character Illustration (30-40% width) */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative h-[400px] w-full lg:h-[600px] lg:max-w-sm">
            <Image
              src={character.image}
              alt={`${character.name} 일러스트`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          {/* Floating sparkles positioned relative to character */}
          <Sparkles className="absolute right-4 top-12 h-4 w-4 animate-pulse text-pink-300 lg:right-8" />
          <Sparkles className="absolute bottom-24 right-8 h-3 w-3 animate-pulse text-blue-300" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

    </div>
  )
}

