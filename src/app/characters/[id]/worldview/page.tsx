'use client'

import { use } from 'react'
import Link from 'next/link'
import { characters } from '@/features/characters/constants/characters'
import { ArrowLeft, Plus, Image as ImageIcon, Video, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WorldviewPostList } from '@/features/characters/components/WorldviewPostList'
import { useState, useEffect } from 'react'

export default function WorldviewPage({
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
    <div className="mx-auto max-w-6xl p-6 lg:p-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/characters/${id}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              {character.name}의 세계관
            </h1>
            <p className="mt-1 text-gray-600">
              {character.name}의 세계관과 이야기를 공유해보세요.
            </p>
          </div>
        </div>
        <Link href={`/characters/${id}/worldview/create`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            글 쓰기
          </Button>
        </Link>
      </div>

      <WorldviewPostList characterId={id} />
    </div>
  )
}

