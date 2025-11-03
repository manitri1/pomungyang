-- PoMungYang 초기 스키마
-- 이 파일의 내용을 Supabase 대시보드의 SQL Editor에서 실행하세요

-- 세계관 게시물 테이블
CREATE TABLE IF NOT EXISTS worldview_posts (
  id TEXT PRIMARY KEY,
  character_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  media JSONB DEFAULT '[]'::jsonb,
  author TEXT,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000,
  updated_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_worldview_posts_character_id ON worldview_posts(character_id);
CREATE INDEX IF NOT EXISTS idx_worldview_posts_created_at ON worldview_posts(created_at DESC);

-- 이벤트 인증 포스트 테이블
CREATE TABLE IF NOT EXISTS event_posts (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sns_link TEXT,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000,
  likes INTEGER DEFAULT 0
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_event_posts_event_id ON event_posts(event_id);
CREATE INDEX IF NOT EXISTS idx_event_posts_created_at ON event_posts(created_at DESC);

-- 굿즈 상품 테이블
CREATE TABLE IF NOT EXISTS goods_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  thumbnail TEXT,
  description TEXT,
  buy_url TEXT,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000,
  updated_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000
);

-- RLS (Row Level Security) 활성화 - 공개 읽기, 인증된 사용자만 쓰기
ALTER TABLE worldview_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE goods_products ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (모든 사용자가 읽을 수 있음)
CREATE POLICY "Allow public read access" ON worldview_posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON event_posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON goods_products
  FOR SELECT USING (true);

-- 공개 쓰기 정책 (모든 사용자가 쓸 수 있음 - 나중에 인증 추가 가능)
CREATE POLICY "Allow public insert" ON worldview_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON worldview_posts
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON worldview_posts
  FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON event_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON event_posts
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON event_posts
  FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON goods_products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON goods_products
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON goods_products
  FOR DELETE USING (true);

