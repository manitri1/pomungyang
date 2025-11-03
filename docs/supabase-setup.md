# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성합니다.
2. 프로젝트가 생성될 때까지 기다립니다 (약 2분 소요).

## 2. 데이터베이스 스키마 생성

1. Supabase 대시보드에서 **SQL Editor**로 이동합니다.
2. `supabase/migrations/001_initial_schema.sql` 파일의 내용을 복사합니다.
3. SQL Editor에 붙여넣고 **RUN** 버튼을 클릭합니다.
4. 테이블이 성공적으로 생성되었는지 확인합니다:
   - `worldview_posts` (세계관 게시물)
   - `event_posts` (이벤트 인증 포스트)
   - `goods_products` (굿즈 상품)

## 3. 환경 변수 설정

1. Supabase 대시보드에서 **Settings** > **API**로 이동합니다.
2. 다음 정보를 복사합니다:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. 프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Vercel 배포 시에도 환경 변수를 추가해야 합니다:
   - Vercel 대시보드 > 프로젝트 > Settings > Environment Variables
   - 위 두 변수를 추가합니다.

## 4. 패키지 설치

```bash
npm install @supabase/supabase-js
```

## 5. 코드 전환

현재 localStorage를 사용하는 데이터 저장소를 Supabase 클라이언트로 전환합니다:

- `src/features/characters/constants/worldview.ts` - 세계관 게시물
- `src/features/challenges/constants/eventPosts.ts` - 이벤트 인증 포스트
- `src/app/admin/goods/page.tsx` - 굿즈 관리

## 6. 데이터 마이그레이션 (선택사항)

기존 localStorage 데이터를 Supabase로 마이그레이션하려면:

1. 브라우저 개발자 도구에서 localStorage 데이터를 확인합니다.
2. Supabase 대시보드의 **Table Editor**에서 직접 데이터를 입력하거나
3. 마이그레이션 스크립트를 작성하여 일괄 이관할 수 있습니다.

## 보안 설정

현재 모든 테이블이 공개 읽기/쓰기로 설정되어 있습니다. 
프로덕션 환경에서는 인증을 추가하여 더 안전하게 설정하는 것을 권장합니다.

