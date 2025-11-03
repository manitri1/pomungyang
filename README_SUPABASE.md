# Supabase 통합 완료

## ✅ 전환 완료 항목

모든 데이터 저장소가 localStorage에서 Supabase로 전환되었습니다:

1. **세계관 게시물** (`worldview_posts`)
   - ✅ `WorldviewPostList` 컴포넌트
   - ✅ `CreateWorldviewPostPage` 페이지
   - ✅ `WorldviewPostDetailPage` 페이지

2. **이벤트 인증 포스트** (`event_posts`)
   - ✅ `EventDetailPage` 페이지
   - ✅ `CreateEventPostPage` 페이지
   - ✅ `EventPostDetailPage` 페이지

## 📋 설정 필요 사항

### 1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트 생성
2. 프로젝트 생성 완료 대기 (약 2분)

### 2. 데이터베이스 스키마 생성
1. Supabase 대시보드에서 **SQL Editor** 열기
2. `supabase/migrations/001_initial_schema.sql` 파일 내용 복사
3. SQL Editor에 붙여넣고 **RUN** 실행
4. 테이블 생성 확인:
   - `worldview_posts`
   - `event_posts`
   - `goods_products`

### 3. 환경 변수 설정

**로컬 환경:**
`.env.local` 파일 생성:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Vercel 배포:**
1. Vercel 대시보드 > 프로젝트 > Settings > Environment Variables
2. 다음 변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. 환경 변수 값 확인 방법
1. Supabase 대시보드 > Settings > API
2. **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
3. **anon public** 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🔄 변경 사항

### 코드 전환 내용
- 모든 `localStorage` 호출을 `Supabase` 비동기 호출로 변경
- 컴포넌트에 로딩 상태 추가
- 에러 핸들링 강화
- UUID 기반 ID 생성으로 변경

### 주요 변경 파일
- `src/features/characters/components/WorldviewPostList.tsx`
- `src/app/characters/[id]/worldview/create/page.tsx`
- `src/app/characters/[id]/worldview/[postId]/page.tsx`
- `src/app/challenges/events/[eventId]/page.tsx`
- `src/app/challenges/events/[eventId]/create/page.tsx`
- `src/app/challenges/events/[eventId]/posts/[postId]/page.tsx`

## ⚠️ 주의사항

1. **환경 변수 설정 필수**: Supabase URL과 키를 설정하지 않으면 데이터 저장이 실패합니다.
2. **기존 localStorage 데이터**: 기존에 localStorage에 저장된 데이터는 수동으로 마이그레이션해야 합니다.
3. **네트워크 의존성**: Supabase는 네트워크 연결이 필요하므로 오프라인에서는 작동하지 않습니다.

## 📝 다음 단계

1. Supabase 프로젝트 생성 및 마이그레이션 실행
2. 환경 변수 설정
3. 애플리케이션 테스트
4. (선택) 기존 localStorage 데이터 마이그레이션

## 🔍 테스트 체크리스트

- [ ] 세계관 게시물 작성
- [ ] 세계관 게시물 목록 조회
- [ ] 세계관 게시물 상세 보기
- [ ] 세계관 게시물 삭제
- [ ] 이벤트 인증 포스트 작성
- [ ] 이벤트 인증 포스트 목록 조회
- [ ] 이벤트 인증 포스트 좋아요
- [ ] 이벤트 인증 포스트 삭제

