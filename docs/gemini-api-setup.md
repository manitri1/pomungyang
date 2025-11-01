# Gemini API 설정 가이드

## 1. Google AI Studio에서 API 키 발급

1. [Google AI Studio](https://aistudio.google.com/) 접속
2. Google 계정으로 로그인
3. "Get API Key" 클릭
4. 프로젝트 선택 또는 새 프로젝트 생성
5. API 키 복사

## 2. 환경 변수 설정

### 로컬 개발 환경

`.env.local` 파일 생성 (프로젝트 루트에):

```env
GEMINI_API_KEY=your_api_key_here
```

### 프로덕션 환경

배포 플랫폼에 따라 환경 변수 설정:

- **Vercel**: Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **기타**: 해당 플랫폼의 환경 변수 설정 방법 참고

## 3. 사용 모델

현재 설정: **Gemini 1.5 Flash**
- 무료 티어 사용 가능
- 빠른 응답 속도
- 저렴한 비용 (무료 티어 초과 시 $0.075/$0.30 per 1M tokens)

### 다른 모델 사용 방법

코드에서 모델 변경:

```typescript
// Gemini 1.5 Flash (현재 설정)
const model = 'gemini-1.5-flash'

// Gemini 1.5 Pro (더 고성능, 더 비쌈)
const model = 'gemini-1.5-pro'

// Gemini Pro (구 버전)
const model = 'gemini-pro'
```

## 4. 무료 티어 제한

Google AI Studio 무료 티어:
- 일일/월간 요청 수 제한 존재 (변동 가능)
- Google 정책에 따라 변경될 수 있음
- 상세 제한은 [Google AI Studio](https://aistudio.google.com/)에서 확인

## 5. API 키 보안 주의사항

⚠️ **중요**: API 키를 절대 공개 저장소에 커밋하지 마세요!

- `.env.local`은 `.gitignore`에 포함되어 있는지 확인
- 프로덕션에서는 환경 변수로만 관리
- API 키 유출 시 즉시 재발급 받으세요

## 6. 테스트

API 키 설정 후 테스트:

```bash
curl -X POST http://localhost:3000/api/generate-content \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "소셜 미디어 게시물 아이디어 3개",
    "characterName": "청명이",
    "characterPersona": "승천을 꿈꾸는 마지막 용의 후예"
  }'
```

## 7. 문제 해결

### "Gemini API 키가 설정되지 않았습니다" 오류

1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 환경 변수 이름이 `GEMINI_API_KEY`인지 확인
3. 서버 재시작 (환경 변수 변경 후 필요)

### API 호출 실패

1. API 키가 유효한지 확인
2. 무료 티어 제한 초과 여부 확인
3. 네트워크 연결 확인
4. Google AI Studio에서 API 상태 확인

