# 굿즈 이미지 관리 가이드

## 📁 폴더 구조

```
public/goods/
├── mugs/              # 머그컵 이미지
├── tote-bags/         # 토트백/에코백 이미지
├── notebooks/         # 노트북/노트 이미지
├── badges/            # 뱃지 이미지
└── others/            # 기타 제품 이미지
```

## 📝 파일 명명 규칙

### 형식
```
{product-id}_{image-type}.{extension}
```

### 예시
- `mug_goodvibes_main.jpg` - 머그컵 메인 이미지
- `mug_goodvibes_detail.jpg` - 머그컵 상세 이미지
- `tote_goodvibes_main.jpg` - 토트백 메인 이미지
- `notebook_goodvibes_main.jpg` - 노트북 메인 이미지

### 이미지 타입
- `main` - 메인 썸네일 이미지 (카드용)
- `detail` - 상세 페이지용 이미지
- `gallery-1`, `gallery-2` - 갤러리 이미지

## 🖼️ 이미지 권장 사양

### 메인 썸네일
- **크기**: 600x600px (정사각형)
- **형식**: JPG 또는 PNG
- **최적화**: WebP 권장
- **용량**: 200KB 이하

### 상세 이미지
- **크기**: 1200x1200px (정사각형) 또는 1200x800px (가로형)
- **형식**: JPG 또는 PNG
- **최적화**: WebP 권장
- **용량**: 500KB 이하

## 📦 제품별 이미지 예시

### 1. 머그컵 (Mugs)
- 파일 위치: `public/goods/mugs/`
- 예시: `mug_goodvibes_main.jpg`

### 2. 토트백/에코백 (Tote Bags)
- 파일 위치: `public/goods/tote-bags/`
- 예시: `tote_goodvibes_main.jpg`

### 3. 노트북/노트 (Notebooks)
- 파일 위치: `public/goods/notebooks/`
- 예시: `notebook_goodvibes_main.jpg`

### 4. 뱃지 (Badges)
- 파일 위치: `public/goods/badges/`
- 예시: `badge_cheongmyeong_main.jpg`

## 🔗 코드에서 사용하기

### products.ts에서 이미지 경로 설정

```typescript
export const products: Product[] = [
  {
    id: 'mug-goodvibes',
    name: 'Good Vibes 머그컵',
    price: 15000,
    thumbnail: '/goods/mugs/mug_goodvibes_main.jpg',
    description: 'GOOD VIBES & ADVENTURES 디자인의 머그컵',
    buyUrl: 'https://example.com/buy/mug-goodvibes',
  },
  {
    id: 'tote-goodvibes',
    name: 'Good Vibes 토트백',
    price: 25000,
    thumbnail: '/goods/tote-bags/tote_goodvibes_main.jpg',
    description: 'GOOD VIBES & ADVENTURES 디자인의 토트백',
    buyUrl: 'https://example.com/buy/tote-goodvibes',
  },
  {
    id: 'notebook-goodvibes',
    name: 'Good Vibes 노트북',
    price: 12000,
    thumbnail: '/goods/notebooks/notebook_goodvibes_main.jpg',
    description: 'GOOD VIBES & ADVENTURES 디자인의 노트북',
    buyUrl: 'https://example.com/buy/notebook-goodvibes',
  },
]
```

## 📤 이미지 업로드 방법

### 방법 1: 수동 업로드
1. 제품 이미지를 준비
2. 적절한 폴더에 파일 복사
3. 파일명 규칙에 맞게 이름 변경
4. `products.ts`에서 경로 업데이트

### 방법 2: API를 통한 업로드 (향후 구현)
```typescript
// /api/upload-goods-image
const formData = new FormData()
formData.append('file', imageFile)
formData.append('productId', 'mug-goodvibes')
formData.append('category', 'mugs')

const response = await fetch('/api/upload-goods-image', {
  method: 'POST',
  body: formData,
})
```

## 🎨 이미지 최적화 도구

### 온라인 도구
- [Squoosh](https://squoosh.app/) - 이미지 압축 및 형식 변환
- [TinyPNG](https://tinypng.com/) - PNG/JPG 압축

### CLI 도구
```bash
# ImageMagick 사용 예시
convert input.jpg -resize 600x600 -quality 85 output.jpg

# Sharp (Node.js)
npm install sharp
```

## ✅ 체크리스트

이미지 추가 시 확인사항:
- [ ] 파일명 규칙 준수
- [ ] 적절한 폴더에 저장
- [ ] 이미지 크기 및 용량 최적화
- [ ] `products.ts` 경로 업데이트
- [ ] Next.js Image 컴포넌트 사용 (필요시)
- [ ] 대체 텍스트(alt) 추가

## 📝 참고사항

- 모든 이미지는 `public/goods/` 폴더 기준으로 상대 경로 사용
- Next.js는 `public` 폴더를 루트로 인식하므로 `/goods/...` 형식 사용
- Git에 큰 이미지 파일이 포함되지 않도록 `.gitignore` 확인 (필요시 Git LFS 사용)

