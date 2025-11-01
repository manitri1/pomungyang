# 🧱 프로젝트 작업 계획서 – 1단계 (MVP 기초 구축)

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
 - 구현 경로:
   - `src/app/globals.css` (디자인 토큰/포커스/스킵링크)
   - `src/components/layout/Header.tsx`, `Sidebar.tsx`, `Footer.tsx`
   - `src/app/layout.tsx` (공통 레이아웃 적용)

### task_02 — 메인 페이지(루트) 히어로 섹션 및 CTA
- 범위: 히어로 배너, 최신 소식/이벤트 티저, Quick CTA 버튼.
- 산출물:
  - 1:1/16:9 반응형 이미지 처리(placeholder: `picsum.photos`)
  - CTA(챌린지 참여, 굿즈 보기) 버튼 컴포넌트
- 기준(AC):
  - LCP 영역 2.5s 이내(로컬 기준)
  - 시멘틱 마크업 및 스크린리더 읽기 가능
 - 진행상태: 완료
 - 구현 경로:
   - `src/components/home/Hero.tsx`
   - `src/app/page.tsx` (히어로 + 이벤트 티저 카드)

### task_03 — 캐릭터 리스트 페이지(`/characters`) 스켈레톤
- 범위: 카드 그리드(모바일1/태블릿2/데스크탑3열), 간단 페르소나 요약.
- 산출물:
  - `CharacterCard` 컴포넌트(이미지, 이름, 성격 요약)
  - Hover 모션(색 전환)
- 기준(AC):
  - 12개 카드 테스트 데이터로 레이아웃 붕괴 없음
  - 이미지 로드 실패 시 대체 텍스트 출력
 - 진행상태: 완료
 - 구현 경로:
   - `src/features/characters/constants/characters.ts`
   - `src/features/characters/components/CharacterCard.tsx`
   - `src/app/characters/page.tsx`
