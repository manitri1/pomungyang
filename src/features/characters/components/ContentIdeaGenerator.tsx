'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ContentIdeaGeneratorProps {
  characterName?: string
  characterPersona?: string
}

export function ContentIdeaGenerator({
  characterName,
  characterPersona,
}: ContentIdeaGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: '입력 필요',
        description: '아이디어 생성을 위한 요청사항을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    setGeneratedContent('')

    try {
      console.log('🚀 프론트엔드: 요청 시작', { prompt, characterName, characterPersona })
      
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          characterName,
          characterPersona,
        }),
      })

      console.log('📥 프론트엔드: 응답 상태', response.status, response.ok)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('❌ 프론트엔드: 에러 응답', errorData)
        let errorMessage = errorData.error || errorData.details || `서버 오류 (${response.status})`
        
        // 디버그 정보가 있으면 추가
        if (errorData.debug) {
          console.error('에러 디버그 정보:', errorData.debug)
          errorMessage += `\n\n디버그: 응답 키 - ${errorData.debug.responseKeys?.join(', ') || '없음'}`
        }
        
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log('📦 프론트엔드: 파싱된 응답', { 
        hasContent: !!data.content, 
        contentLength: data.content?.length || 0,
        contentPreview: data.content?.substring(0, 100) || '없음',
        truncated: data.truncated,
        finishReason: data.finishReason,
      })

      if (!data.content) {
        console.error('❌ 프론트엔드: 응답에 content 없음', data)
        throw new Error('응답 내용이 없습니다.')
      }

      console.log('✅ 프론트엔드: 컨텐츠 설정 중...', data.content.length, '자')
      setGeneratedContent(data.content)
      console.log('✅ 프론트엔드: 컨텐츠 설정 완료')
      
      // 응답이 잘렸는지 확인하고 사용자에게 알림
      if (data.truncated) {
        toast({
          title: '생성 완료 (부분 응답)',
          description: `컨텐츠 아이디어가 생성되었습니다. (응답이 최대 길이에 도달하여 일부가 잘릴 수 있습니다)`,
          variant: 'default',
        })
      } else {
        toast({
          title: '생성 완료',
          description: '컨텐츠 아이디어가 생성되었습니다.',
        })
      }
    } catch (error) {
      console.error('Error generating content:', error)
      const errorMessage = error instanceof Error ? error.message : '아이디어 생성 중 오류가 발생했습니다.'
      setGeneratedContent('')
      toast({
        title: '생성 실패',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!generatedContent) return

    try {
      await navigator.clipboard.writeText(generatedContent)
      setCopied(true)
      toast({
        title: '복사 완료',
        description: '클립보드에 복사되었습니다.',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: '복사 실패',
        description: '클립보드 복사에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  const examplePrompts = [
    '소셜 미디어 게시물 아이디어 5개',
    '웹툰 에피소드 스토리 아이디어',
    '팝업스토어 이벤트 기획안',
    '캐릭터 굿즈 디자인 컨셉',
    'AR 체험 콘텐츠 아이디어',
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[color:rgb(var(--color-primary-500))]" />
          <CardTitle>컨텐츠 아이디어 생성기</CardTitle>
        </div>
        <CardDescription>
          AI가 {characterName ? `${characterName} 캐릭터` : '캐릭터'}를 기반으로 창의적인 컨텐츠 아이디어를 생성합니다.
        </CardDescription>
        <div className="mt-2 rounded-md bg-blue-50 p-3 text-xs text-blue-700">
          <div className="font-semibold mb-1">💡 사용량 정보</div>
          <div>• 무료 티어: 일일 약 900회 (1분당 15회)</div>
          <div>• 비용: 무료 티어 내에서 $0</div>
          <div>• 무료 초과 시: 약 $0.31/일 (1,000회 기준)</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium">
            아이디어 요청
          </label>
          <Textarea
            id="prompt"
            placeholder="원하는 컨텐츠 아이디어를 설명해주세요. 예: 소셜 미디어 게시물 아이디어, 웹툰 스토리, 이벤트 기획 등"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
            disabled={isLoading}
          />
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(example)}
                disabled={isLoading}
                className="text-xs"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              생성 중...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              아이디어 생성하기
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">생성된 아이디어</label>
                {generatedContent.length > 3000 && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    ⚠️ 긴 응답 (일부 잘릴 수 있음)
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    복사
                  </>
                )}
              </Button>
            </div>
            <div className="rounded-md border bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                {generatedContent}
              </p>
              {generatedContent.length > 3000 && (
                <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                  💡 더 긴 응답이 필요하시면 요청을 나눠서 입력해주세요. 예: "1~5번 아이디어", "6~10번 아이디어"
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

