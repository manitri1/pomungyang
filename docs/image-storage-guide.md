# 이미지 저장 및 관리 가이드

## 현재 구조

현재 이미지는 `public/characters/` 폴더에 정적 파일로 저장되어 있습니다.
- 경로: `/characters/chungmung_intro.png`
- 관리: 수동으로 파일 업로드 필요

---

## 추천 방법

### 방법 1: Supabase Storage (권장) ⭐

**장점:**
- 데이터베이스와 통합 관리
- CDN 자동 제공 (빠른 전송)
- 접근 권한 관리 가능
- 확장성 우수
- 무료 티어 제공 (5GB 저장소)

**설정 방법:**

1. **Supabase Storage 버킷 생성**
   - Supabase Dashboard > Storage
   - `characters` 버킷 생성
   - Public 접근 허용 설정

2. **이미지 업로드 API 생성**

```typescript
// src/app/api/upload-image/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `characters/${fileName}`

    const { data, error } = await supabase.storage
      .from('characters')
      .upload(filePath, file)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from('characters')
      .getPublicUrl(filePath)

    return NextResponse.json({ url: publicUrl, path: filePath })
  } catch (error) {
    return NextResponse.json(
      { error: '업로드 실패' },
      { status: 500 }
    )
  }
}
```

3. **이미지 URL 사용**
   - 데이터베이스에 URL 저장
   - 또는 Storage 경로 저장 후 동적 URL 생성

---

### 방법 2: 로컬 파일 시스템 (현재 방식 개선)

**장점:**
- 간단한 구현
- 추가 서비스 불필요
- 빠른 로컬 개발

**단점:**
- 배포 시 파일 관리 복잡
- 확장성 제한
- Git 저장소 크기 증가

**개선 방법:**

```typescript
// src/app/api/upload-image/route.ts
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileName = `${Date.now()}-${file.name}`
    const filePath = join(process.cwd(), 'public', 'characters', fileName)

    await writeFile(filePath, buffer)

    return NextResponse.json({ 
      url: `/characters/${fileName}`,
      path: fileName 
    })
  } catch (error) {
    return NextResponse.json(
      { error: '업로드 실패' },
      { status: 500 }
    )
  }
}
```

---

### 방법 3: Cloudinary (외부 서비스)

**장점:**
- 이미지 최적화 자동
- CDN 제공
- 변환 기능 (리사이즈, 포맷 변환 등)
- 무료 티어 제공

**단점:**
- 외부 서비스 의존
- 비용 발생 가능

---

## 데이터베이스 스키마 예시

### Supabase 사용 시

```sql
-- images 테이블 생성
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  character_id TEXT REFERENCES characters(id),
  url TEXT NOT NULL,
  storage_path TEXT,
  file_name TEXT,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- characters 테이블에 image_url 추가 (선택)
ALTER TABLE characters ADD COLUMN image_url TEXT;
```

---

## 구현 우선순위

### 1단계: Supabase Storage 설정
1. Supabase 프로젝트 생성
2. Storage 버킷 생성
3. 이미지 업로드 API 구현

### 2단계: 프론트엔드 연동
1. 이미지 업로드 컴포넌트
2. 업로드 진행률 표시
3. 미리보기 기능

### 3단계: 데이터베이스 연동
1. 이미지 메타데이터 저장
2. 이미지 관리 페이지
3. 이미지 삭제 기능

---

## 예상 비용

### Supabase Storage 무료 티어
- **저장소**: 5GB
- **대역폭**: 200GB/월
- **파일 수**: 무제한
- **비용**: $0 (무료 티어 내에서)

### 유료 요금제
- **추가 저장소**: $0.021/GB/월
- **추가 대역폭**: $0.09/GB

---

## 추천: Supabase Storage 사용

프로젝트 규칙에 Supabase가 언급되어 있으므로, Supabase Storage를 사용하는 것을 권장합니다.

**이유:**
1. 프로젝트와 일관성 유지
2. 확장성 우수
3. 무료 티어로 시작 가능
4. 데이터베이스와 통합 관리

