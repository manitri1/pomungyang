'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ContentIdeaGenerator } from '@/features/characters/components/ContentIdeaGenerator'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { characters } from '@/features/characters/constants/characters'

export default function AdminContentIdeaPage() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('')
  const selectedCharacter = characters.find((c) => c.id === selectedCharacterId)

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-12">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">컨텐츠 아이디어 생성</h1>
          <p className="mt-1 text-gray-600">AI를 활용하여 창의적인 컨텐츠 아이디어를 생성합니다.</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">캐릭터 선택 (선택사항)</label>
        <Select 
          value={selectedCharacterId || undefined} 
          onValueChange={(value) => setSelectedCharacterId(value || '')}
        >
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="캐릭터를 선택하세요 (선택사항)" />
          </SelectTrigger>
          <SelectContent>
            {characters.map((character) => (
              <SelectItem key={character.id} value={character.id}>
                {character.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCharacterId && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCharacterId('')}
            className="mt-2"
          >
            선택 해제
          </Button>
        )}
      </div>

      <ContentIdeaGenerator
        characterName={selectedCharacter?.name}
        characterPersona={selectedCharacter?.persona}
      />
    </div>
  )
}

