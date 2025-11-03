-- PoMungYang 사용자 테이블 추가
-- 이 파일의 내용을 Supabase 대시보드의 SQL Editor에서 실행하세요

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

-- 사용자 정보는 본인만 읽을 수 있도록 정책 설정 (필요시 수정)
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (true); -- 개발 단계에서는 모든 사용자 읽기 허용

-- 사용자는 자신의 정보만 수정 가능 (필요시 수정)
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (true); -- 개발 단계에서는 모든 사용자 수정 허용

-- 공개 회원가입 허용
CREATE POLICY "Allow public registration" ON users
  FOR INSERT WITH CHECK (true);

