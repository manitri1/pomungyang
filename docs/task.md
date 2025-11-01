# 🧱 프로젝트 작업 계획서 (Task Plan)

> 참조 문서: `design.md`, `ia.md`, `prd.md`, `usecase.md`

---

## 1단계: MVP 기초 구축 (정보 구조 · 레이아웃 · 캐릭터 리스트)

### task_01 — 디자인 시스템과 공통 레이아웃 구축
- 범위: Tailwind 토큰/색상, 글로벌 스타일(`globals.css`), `Header`/`Footer`/`Sidebar` 기본 뼈대, `layout.tsx` 구조.
- 산출물:
  - 컬러 팔레트 변수 및 타이포 스케일 반영
  - 반응형 그리드/브레이크포인트 적용
  - 접근성 고려한 네비게이션 스켈레톤
- 기준(AC):
  - 모바일/태블릿/데스크탑 레이아웃 정상 전환
  - 키보드 포커스 이동 및 스킵 링크 동작
 - 진행상태: 완료
 - 구현 경로: `src/app/globals.css`, `src/components/layout/*`, `src/app/layout.tsx`

### task_02 — 메인 페이지(루트) 히어로 섹션 및 CTA
- 범위: 히어로 배너, 최신 소식/이벤트 티저, Quick CTA 버튼.
- 산출물:
  - 1:1/16:9 반응형 이미지 처리(placeholder: `picsum.photos`)
  - CTA(챌린지 참여, 굿즈 보기) 버튼 컴포넌트
- 기준(AC):
  - LCP 영역 2.5s 이내(로컬 기준)
  - 시멘틱 마크업 및 스크린리더 읽기 가능
 - 진행상태: 완료
 - 구현 경로: `src/components/home/Hero.tsx`, `src/app/page.tsx`

### task_03 — 캐릭터 리스트 페이지(`/characters`) 스켈레톤
- 범위: 카드 그리드(모바일1/태블릿2/데스크탑3열), 간단 페르소나 요약.
- 산출물:
  - `CharacterCard` 컴포넌트(이미지, 이름, 성격 요약)
  - Hover 모션(색 전환)
- 기준(AC):
  - 12개 카드 테스트 데이터로 레이아웃 붕괴 없음
  - 이미지 로드 실패 시 대체 텍스트 출력
 - 진행상태: 완료
 - 구현 경로: `src/features/characters/constants/characters.ts`, `src/features/characters/components/CharacterCard.tsx`, `src/app/characters/page.tsx`

---

## 2단계: 참여 기능 강화 (챌린지 · 팝업스토어 · 굿즈)

### task_01 — 캐릭터 챌린지(`/challenges`) 리스트·상세(모달)
- 범위: 진행 중 챌린지 카드, 진행도 바, 리워드 팝업.
- 산출물:
  - `ChallengeCard`, `MissionTracker`, 리워드 모달
  - 진행 상태 LocalStorage 저장/복원
- 기준(AC):
  - 새로고침 후 진행률 유지
  - 이미 참여한 챌린지 표시 상태 분기
 - 진행상태: 완료
 - 구현 경로: `src/features/challenges/constants/challenges.ts`, `src/features/challenges/components/ChallengeCard.tsx`, `src/features/challenges/components/ChallengeDetailSheet.tsx`, `src/app/challenges/page.tsx`

### task_02 — 팝업스토어 안내(`/popup`) 맵/일정/갤러리
- 범위: Google Map 임베드, 일정 표, 갤러리 슬라이드.
- 산출물:
  - `PopupInfo` 섹션 3분할 구성(맵/일정/갤러리)
  - 이미지 프리로드 및 스켈레톤 처리
- 기준(AC):
  - 네트워크 지연 시 로딩 피드백 노출
  - 지도 접근성 대체 링크 제공(지도 열기)
 - 진행상태: 완료
 - 구현 경로: `src/features/popup/constants/popup.ts`, `src/features/popup/components/PopupInfo.tsx`, `src/app/popup/page.tsx`

### task_03 — 굿즈 리스트(`/goods`)와 상세 모달
- 범위: 상품 카드, 가격/구매 링크, 상세 모달 구조.
- 산출물:
  - `GoodsCard`, `GoodsDetail` 모달
  - 외부 결제 링크 연동(더미)
- 기준(AC):
  - 새 탭 링크 보안 속성(rel) 적용
  - 가격 서식/통화 표기 일관성
 - 진행상태: 완료
 - 구현 경로: `src/features/goods/constants/products.ts`, `src/features/goods/components/GoodsCard.tsx`, `src/features/goods/components/GoodsDetailSheet.tsx`, `src/app/goods/page.tsx`

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
 - 진행상태: 완료
 - 구현 경로: `src/features/tour/constants/tour.ts`, `src/features/tour/components/TourMap.tsx`, `src/app/tour/page.tsx`

### task_02 — 마이페이지(`/mypage`) 참여 현황 집계
- 범위: 내 스탬프/내 챌린지 리스트, 프로필 간단 설정.
- 산출물:
  - 참여 로그 요약 카드, 진행률/뱃지 UI
  - LocalStorage 동기화 유틸
- 기준(AC):
  - 데이터 불일치 시 복구 전략(초기화/합치기) 제공
  - 접근성 라벨과 키보드 탐색 보장
 - 진행상태: 완료
 - 구현 경로: `src/app/mypage/page.tsx`

### task_03 — SEO/분석/성능 파이프라인
- 범위: 메타 태그/OG, sitemap/robots, GA4, 이미지 최적화.
- 산출물:
  - URL 스키마 준수, 정적 메타 생성
  - 이미지 사이즈/포맷 최적화, 코드 스플리팅 점검
- 기준(AC):
  - Lighthouse SEO ≥ 90, Performance ≥ 85(로컬 기준)
  - 404/500 오류 페이지 구성
- 진행상태: 완료
- 구현 경로: `src/app/layout.tsx` (메타/OG), `src/app/sitemap.ts`, `public/robots.txt`, `src/app/not-found.tsx`, `src/app/error.tsx`

---

## 참고 및 제약
- 네이밍/URL: 영문 소문자 + 하이픈, 문서의 IA 구조 준수
- 반응형: 모바일/태블릿/데스크탑/와이드 브레이크포인트
- 접근성: 시멘틱 구조, 대체 텍스트, 포커스 트랩/리턴
- 데이터 저장: 초기엔 LocalStorage 기반(서버 연동 전제 아님)
- 이미지: 유효한 `picsum.photos` placeholder 사용
