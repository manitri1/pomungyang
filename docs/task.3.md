# 🧱 프로젝트 작업 계획서 – 3단계 (확장 · 운영)

> 참조 문서: `design.md`, `ia.md`, `prd.md`, `usecase.md`

---

## 3단계: 확장 · 운영 (투어 스탬프 · 마이페이지 · SEO/성능)

### task_01 — 캐릭터 투어(`/tour`) 스탬프 수집
- 범위: 스탬프 지도, QR/버튼 대체 수집, 리워드 조건.
- 산출물:
  - `TourMap`(더미 포인트), 스탬프 상태 저장/복원
  - 리워드 획득 조건 체크 로직
- 기준(AC):
  - 중복 획득 방지, 취소선/완료 표시
  - 오프라인 상태에서도 기록 유지
- 캐릭터 연계:
  - 청명이 중심 AR/LBS 비전 콘텐츠 노출(스탬프/리워드 테마 적용)
- 미리보기:
  - 청명이: ![cheongmyeong](/characters/cheongmyeong.png)
 - 진행상태: 완료
 - 구현 경로:
   - `src/features/tour/constants/tour.ts`
   - `src/features/tour/components/TourMap.tsx`
   - `src/app/tour/page.tsx`

### task_02 — 마이페이지(`/mypage`) 참여 현황 집계
- 범위: 내 스탬프/내 챌린지 리스트, 프로필 간단 설정.
- 산출물:
  - 참여 로그 요약 카드, 진행률/뱃지 UI
  - LocalStorage 동기화 유틸
- 기준(AC):
  - 데이터 불일치 시 복구 전략(초기화/합치기) 제공
  - 접근성 라벨과 키보드 탐색 보장
 - 진행상태: 완료
 - 구현 경로:
   - `src/app/mypage/page.tsx`

### task_03 — SEO/분석/성능 파이프라인
- 범위: 메타 태그/OG, sitemap/robots, GA4, 이미지 최적화.
- 산출물:
  - URL 스키마 준수, 정적 메타 생성
  - 이미지 사이즈/포맷 최적화, 코드 스플리팅 점검
- 기준(AC):
  - Lighthouse SEO ≥ 90, Performance ≥ 85(로컬 기준)
  - 404/500 오류 페이지 구성
- 진행상태: 완료
- 구현 경로:
  - `src/app/layout.tsx` (메타 태그/OG/Twitter 카드)
  - `src/app/sitemap.ts` (동적 sitemap 생성)
  - `public/robots.txt` (크롤러 지시)
  - `src/app/not-found.tsx` (404 페이지)
  - `src/app/error.tsx` (500 에러 페이지)
  - `src/components/home/Hero.tsx` (Next.js Image 적용 예시)
