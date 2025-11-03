# Supabase 통합 가이드

## 개요

현재 프로젝트는 localStorage를 사용하고 있으나, Supabase로 전환하면 다음과 같은 이점이 있습니다:

- ✅ 데이터 영구 저장 (브라우저를 닫아도 데이터 유지)
- ✅ 여러 기기에서 동일한 데이터 접근
- ✅ 실시간 업데이트 가능
- ✅ 서버 사이드에서도 데이터 접근 가능

## 설정 단계

### 1. 패키지 설치

```bash
npm install @supabase/supabase-js
```

### 2. Supabase 프로젝트 생성 및 설정

1. [Supabase](https://supabase.com)에 가입
2. 새 프로젝트 생성
3. `supabase/migrations/001_initial_schema.sql` 파일 내용을 SQL Editor에서 실행
4. Settings > API에서 URL과 anon key 복사

### 3. 환경 변수 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Vercel에도 환경 변수 추가 필요.

## 코드 전환 방법

### 현재 구조 (localStorage)

```typescript
import { worldviewStorage } from '@/features/characters/constants/worldview'

// 사용
const posts = worldviewStorage.getAll(characterId)
worldviewStorage.save(post)
```

### Supabase 전환 후

```typescript
import { worldviewSupabaseStorage } from '@/features/characters/lib/worldviewSupabase'

// 비동기 처리 필요
const posts = await worldviewSupabaseStorage.getAll(characterId)
await worldviewSupabaseStorage.save(post)
```

## 전환 작업 항목

### 1. 세계관 게시물 (`worldview.ts`)

**파일:** `src/features/characters/constants/worldview.ts`
**새 파일:** `src/features/characters/lib/worldviewSupabase.ts` (이미 생성됨)

**변경 사항:**
- 모든 함수가 `async/await` 패턴으로 변경
- 컴포넌트에서 `useEffect`와 `useState` 사용 방식 조정 필요

**예시 변경:**

```typescript
// Before (localStorage)
const posts = worldviewStorage.getAll(characterId)

// After (Supabase)
const [posts, setPosts] = useState<WorldviewPost[]>([])

useEffect(() => {
  const loadPosts = async () => {
    const data = await worldviewSupabaseStorage.getAll(characterId)
    setPosts(data)
  }
  loadPosts()
}, [characterId])
```

### 2. 이벤트 인증 포스트 (`eventPosts.ts`)

**파일:** `src/features/challenges/constants/eventPosts.ts`
**새 파일:** `src/features/challenges/lib/eventPostsSupabase.ts` (이미 생성됨)

동일한 방식으로 전환.

### 3. 굿즈 관리 (`admin/goods/page.tsx`)

굿즈 테이블 스키마도 마이그레이션에 포함되어 있으므로, 동일한 방식으로 전환 가능.

## 점진적 전환 전략

1. **단계 1:** Supabase 클라이언트와 스토리지 함수 준비 (완료)
2. **단계 2:** 환경 변수 설정 및 마이그레이션 실행
3. **단계 3:** 컴포넌트에서 Supabase 스토리지로 전환
4. **단계 4:** 테스트 및 배포

## 주의사항

1. **비동기 처리:** Supabase는 비동기이므로 모든 함수 호출에 `await` 필요
2. **에러 핸들링:** 네트워크 오류 등에 대한 처리 추가
3. **로딩 상태:** 데이터 로딩 중 로딩 UI 표시 필요
4. **타입 안정성:** Supabase의 Row 타입과 앱의 타입 간 변환 필요 (이미 구현됨)

## 다음 단계

1. Supabase 프로젝트 생성 및 마이그레이션 실행
2. 환경 변수 설정
3. 한 번에 하나씩 컴포넌트 전환 (세계관 → 이벤트 → 굿즈)
4. 각 전환 후 테스트

