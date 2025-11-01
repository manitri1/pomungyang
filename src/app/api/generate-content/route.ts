import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('🚀 API 라우트 시작')
  
  try {
    console.log('📥 요청 수신, 본문 파싱 시작...')
    const body = await request.json()
    console.log('📥 요청 본문:', JSON.stringify(body, null, 2))
    
    const { prompt, characterName, characterPersona } = body

    if (!prompt) {
      console.log('❌ 프롬프트 없음')
      return NextResponse.json(
        { error: '프롬프트가 필요합니다.' },
        { status: 400 }
      )
    }

    console.log('🔑 API 키 확인 중...')
    const apiKey = process.env.GEMINI_API_KEY
    
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      console.log('❌ API 키 없음')
      return NextResponse.json(
        { error: 'Gemini API 키가 설정되지 않았습니다. 환경 변수 GEMINI_API_KEY를 설정해주세요.' },
        { status: 500 }
      )
    }
    
    console.log('✅ API 키 확인 완료 (길이:', apiKey.length, ')')

    // 최신 Gemini 모델 - 우선순위 순서
    const models = [
      'gemini-2.5-flash',
      'gemini-2.0-flash-exp',
      'gemini-1.5-flash-latest',
      'gemini-1.5-flash',
      'gemini-1.5-pro-latest',
      'gemini-1.5-pro',
      'gemini-pro',
    ]

    const systemInstruction = characterName && characterPersona
      ? `당신은 ${characterName} 캐릭터의 컨텐츠 기획 전문가입니다. ${characterName}은 ${characterPersona}입니다. 사용자의 요청에 맞는 창의적이고 실현 가능한 컨텐츠 아이디어를 제안해주세요.`
      : '당신은 창의적인 컨텐츠 기획 전문가입니다. 사용자의 요청에 맞는 창의적이고 실현 가능한 컨텐츠 아이디어를 제안해주세요.'

    // Gemini API 요청 본문 - systemInstruction을 별도 필드로 설정
    const requestBody: any = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      systemInstruction: {
        parts: [
          {
            text: systemInstruction,
          },
        ],
      },
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 8192, // 최대 토큰 수 증가 (Gemini 2.5 Flash 최대 지원)
        topP: 0.95,
        topK: 40,
      },
    }
    
    console.log('📤 요청 본문:', JSON.stringify(requestBody, null, 2))

    let lastError = null
    let response: Response | null = null
    let responseText = ''
    let successfulModel = ''

    // 여러 모델 순차 시도
    console.log('🔄 모델 시도 시작, 총', models.length, '개')
    for (const modelName of models) {
      try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`
        console.log(`🔄 모델 시도 중: ${modelName}`)
        console.log(`🌐 API URL: ${apiUrl.replace(apiKey, '***')}`)
        
        const fetchStart = Date.now()
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
        const fetchTime = Date.now() - fetchStart
        console.log(`⏱️  요청 소요 시간: ${fetchTime}ms`)

        responseText = await response.text()
        
        console.log(`📥 모델 ${modelName} 응답 상태:`, response.status)
        if (response.ok) {
          console.log(`📥 모델 ${modelName} 응답 본문 (처음 500자):`, responseText.substring(0, 500))
        } else {
          console.log(`📥 모델 ${modelName} 에러 응답:`, responseText.substring(0, 500))
        }

        if (response.ok) {
          successfulModel = modelName
          console.log(`✅ 성공한 모델: ${modelName}`)
          break
        }

        // 에러 파싱
        try {
          const errorData = JSON.parse(responseText)
          lastError = errorData.error?.message || errorData.error?.code || JSON.stringify(errorData.error || errorData)
        } catch {
          lastError = `HTTP ${response.status}: ${responseText.substring(0, 200)}`
        }

        console.log(`❌ 모델 ${modelName} 실패:`, lastError)
      } catch (error) {
        lastError = error instanceof Error ? error.message : '알 수 없는 오류'
        console.log(`❌ 모델 ${modelName} 예외:`, lastError)
        continue
      }
    }

    if (!response || !response.ok) {
      return NextResponse.json(
        {
          error: '모든 모델 시도 실패',
          details: lastError || '알 수 없는 오류',
        },
        { status: response?.status || 500 }
      )
    }

    // 응답 파싱
    let data
    try {
      data = JSON.parse(responseText)
      console.log('📦 파싱된 응답 데이터:', JSON.stringify(data, null, 2))
    } catch (parseError) {
      console.error('❌ JSON 파싱 오류:', parseError)
      console.error('❌ 원본 응답:', responseText)
      return NextResponse.json(
        { error: '응답 파싱 실패', details: '서버 응답을 읽을 수 없습니다.' },
        { status: 500 }
      )
    }

    // Gemini API 표준 응답 형식: candidates[0].content.parts[0].text
    if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
      console.error('응답에 candidates가 없음:', JSON.stringify(data, null, 2))
      return NextResponse.json(
        {
          error: '응답 형식 오류',
          details: 'API 응답에 candidates가 없습니다.',
          debug: { responseKeys: Object.keys(data) },
        },
        { status: 500 }
      )
    }

    const candidate = data.candidates[0]

    // finishReason 확인 및 처리
    let isTruncated = false
    if (candidate.finishReason) {
      if (candidate.finishReason === 'MAX_TOKENS') {
        isTruncated = true
        console.warn('⚠️ 최대 토큰 수에 도달했습니다. 응답이 잘릴 수 있습니다.')
      } else if (candidate.finishReason === 'SAFETY') {
        console.warn('⚠️ 안전 필터에 의해 응답이 차단되었습니다.')
        return NextResponse.json(
          {
            error: '안전 필터',
            details: '콘텐츠가 안전 정책에 위배되어 응답을 생성할 수 없습니다.',
          },
          { status: 400 }
        )
      } else if (candidate.finishReason === 'STOP') {
        console.log('✅ 정상적으로 응답 완료')
      }
    }

    // 텍스트 추출
    if (!candidate.content || !candidate.content.parts || !Array.isArray(candidate.content.parts)) {
      console.error('응답 구조 오류:', JSON.stringify(candidate, null, 2))
      return NextResponse.json(
        {
          error: '응답 형식 오류',
          details: 'API 응답 구조가 예상과 다릅니다.',
          debug: { candidate: JSON.stringify(candidate, null, 2) },
        },
        { status: 500 }
      )
    }

    const parts = candidate.content.parts
    let content = ''

    for (const part of parts) {
      if (part && typeof part === 'object' && part.text) {
        content += part.text
      }
    }

    if (!content || content.trim().length === 0) {
      console.error('응답에서 텍스트를 찾을 수 없음:', JSON.stringify(candidate, null, 2))
      return NextResponse.json(
        {
          error: '응답 형식 오류',
          details: 'API 응답에서 텍스트를 찾을 수 없습니다.',
          debug: {
            partsCount: parts.length,
            parts: JSON.stringify(parts, null, 2),
          },
        },
        { status: 500 }
      )
    }

    console.log(`✅ 응답 생성 완료 (모델: ${successfulModel}, 길이: ${content.length}자)`)

    return NextResponse.json({ 
      content: content.trim(),
      truncated: isTruncated, // 응답이 잘렸는지 여부
      finishReason: candidate.finishReason,
    })
  } catch (error) {
    console.error('❌ API 에러 발생:', error)
    console.error('❌ 에러 스택:', error instanceof Error ? error.stack : '스택 없음')
    console.error('❌ 에러 타입:', typeof error)
    console.error('❌ 에러 메시지:', error instanceof Error ? error.message : String(error))
    
    return NextResponse.json(
      {
        error: '서버 에러가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 에러',
        type: typeof error,
      },
      { status: 500 }
    )
  }
}
