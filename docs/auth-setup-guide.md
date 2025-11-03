# 로그인 및 회원가입 기능 설정 가이드

## 개요

프로젝트에 Supabase를 사용한 회원가입 및 로그인 기능이 구현되었습니다.

## 구현된 기능

### 1. 회원가입
- `/auth/register` - 회원가입 페이지
- 아이디, 비밀번호, 이름, 이메일 입력
- 아이디 중복 확인
- 비밀번호 확인
- 입력 검증

### 2. 로그인
- `/auth/login-idpw` - 로그인 페이지
- NextAuth를 통한 세션 관리
- Supabase 데이터베이스와 연동

### 3. 사용자 메뉴
- Header에 로그인 상태 표시
- 로그아웃 기능
- 마이페이지 링크

## 데이터베이스 설정

### Supabase 마이그레이션 실행

1. Supabase 대시보드에 로그인
2. **SQL Editor** 메뉴 클릭
3. `supabase/migrations/002_add_users_table.sql` 파일의 내용을 복사하여 실행

또는 터미널에서:

```sql
-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000,
  updated_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 개발용 정책 (모든 사용자 읽기/쓰기 허용)
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (true);

CREATE POLICY "Allow public registration" ON users
  FOR INSERT WITH CHECK (true);
```

## 설치된 패키지

- `bcryptjs` - 비밀번호 해시화
- `@types/bcryptjs` - TypeScript 타입 정의

## 주요 파일

### 1. 인증 설정
- `src/lib/auth.ts` - NextAuth 설정 및 Supabase 연동

### 2. API 라우트
- `src/app/api/auth/register/route.ts` - 회원가입 API

### 3. 페이지
- `src/app/auth/login-idpw/page.tsx` - 로그인 페이지
- `src/app/auth/register/page.tsx` - 회원가입 페이지

### 4. 컴포넌트
- `src/components/auth/UserMenu.tsx` - 사용자 메뉴 드롭다운

## 사용 방법

### 회원가입
1. `/auth/register` 페이지 접속
2. 아이디, 비밀번호, 비밀번호 확인 입력
3. 이름, 이메일 선택 입력
4. 회원가입 버튼 클릭
5. 로그인 페이지로 자동 이동

### 로그인
1. `/auth/login-idpw` 페이지 접속
2. 아이디와 비밀번호 입력
3. 로그인 버튼 클릭
4. 홈 페이지로 이동

### 로그아웃
1. Header의 사용자 아이콘 클릭
2. 드롭다운 메뉴에서 "로그아웃" 클릭

## 보안 고려사항

### 현재 상태
- 비밀번호는 bcrypt로 해시화되어 저장됨
- RLS 정책이 활성화되어 있지만 개발용으로 공개 접근 허용
- 세션은 JWT로 관리됨

### 프로덕션 환경 권장사항
1. **RLS 정책 강화**
   - 사용자는 자신의 정보만 읽기/수정 가능하도록 정책 수정
   - 관리자 권한 분리

2. **비밀번호 정책**
   - 최소 길이, 특수문자, 대소문자 등 요구사항 추가

3. **이메일 인증**
   - 회원가입 시 이메일 인증 추가
   - 비밀번호 재설정 기능

4. **Rate Limiting**
   - 로그인 시도 제한
   - 회원가입 제한

5. **CSRF 보호**
   - NextAuth의 CSRF 보호 기능 활용

## 문제 해결

### 회원가입이 안 되는 경우
1. Supabase 데이터베이스에 `users` 테이블이 생성되었는지 확인
2. RLS 정책이 올바르게 설정되었는지 확인
3. 브라우저 콘솔에서 오류 메시지 확인

### 로그인이 안 되는 경우
1. `NEXTAUTH_SECRET` 환경 변수가 설정되었는지 확인
2. Supabase 연결이 정상인지 확인
3. 사용자가 데이터베이스에 올바르게 저장되었는지 확인

### 세션 오류
- `.env.local` 파일에 `NEXTAUTH_SECRET` 설정 확인
- 브라우저 쿠키 삭제 후 재시도

## 다음 단계

- [ ] 프로필 수정 기능
- [ ] 비밀번호 변경 기능
- [ ] 이메일 인증
- [ ] 소셜 로그인 (Google 등) 추가
- [ ] 관리자 권한 시스템

