# Supabase 환경 변수 값 찾는 방법

## 환경 변수 목록

`.env.local` 파일에 필요한 환경 변수:
```
NEXT_PUBLIC_SUPABASE_URL=여기에_프로젝트_URL_입력
NEXT_PUBLIC_SUPABASE_ANON_KEY=여기에_anon_키_입력
```

## 🔍 값 찾는 단계별 가이드

### 1단계: Supabase 대시보드 접속
1. [Supabase](https://supabase.com)에 로그인
2. 프로젝트 선택 (또는 새 프로젝트 생성)

### 2단계: API 설정 페이지로 이동
1. 왼쪽 사이드바에서 **Settings** (⚙️ 아이콘) 클릭
2. **API** 메뉴 클릭

### 3단계: 값 복사

**Project URL 찾기:**
- 페이지 상단의 **Project URL** 섹션에서 확인
- 예시: `https://abcdefghijklmnop.supabase.co`
- 이 값 전체를 복사하여 `NEXT_PUBLIC_SUPABASE_URL`에 붙여넣기

**anon public 키 찾기:**
- **Project API keys** 섹션에서 확인
- **anon** 또는 **anon public** 라벨이 있는 키 찾기
- 키 옆의 **복사 버튼** 또는 **눈 아이콘** 클릭하여 복사
- 예시: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYz...`
- 이 값 전체를 복사하여 `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 붙여넣기

### 4단계: .env.local 파일 생성

프로젝트 루트 디렉토리(`pomung/`)에 `.env.local` 파일을 생성하고:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**주의사항:**
- 값 앞뒤에 따옴표(') 또는 쌍따옴표(")를 붙이지 마세요
- 등호(=) 앞뒤에 공백 없이 작성하세요
- `your-project-url` 부분을 실제 프로젝트 URL로 교체하세요
- `your-anon-key` 부분을 실제 anon 키로 교체하세요

## 📸 화면 위치

```
Supabase 대시보드
└── Settings (왼쪽 사이드바)
    └── API
        ├── Project URL ← 여기서 복사
        └── Project API keys
            └── anon public ← 여기서 복사
```

## ✅ 확인 방법

환경 변수가 올바르게 설정되었는지 확인:

1. 개발 서버 재시작: `npm run dev`
2. 브라우저 콘솔에서 경고 메시지 확인
3. 경고가 없으면 정상적으로 설정된 것입니다

## 🔒 보안 주의사항

- `.env.local` 파일은 **절대 Git에 커밋하지 마세요** (이미 `.gitignore`에 포함되어 있음)
- `anon public` 키는 프론트엔드에서 사용해도 안전하도록 설계되었습니다
- 프로덕션 배포 시 Vercel에도 동일한 환경 변수를 설정해야 합니다

