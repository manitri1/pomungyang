# 🧱 프로젝트 작업 계획서 – 2단계 (참여 기능 강화)

> 참조 문서: `design.md`, `ia.md`, `prd.md`, `usecase.md`

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
 - 구현 경로:
   - `src/features/challenges/constants/challenges.ts`
   - `src/features/challenges/components/ChallengeCard.tsx`
   - `src/features/challenges/components/ChallengeDetailSheet.tsx` (Sheet 기반 상세)
   - `src/app/challenges/page.tsx`

### task_02 — 팝업스토어 안내(`/popup`) 맵/일정/갤러리
- 범위: Google Map 임베드, 일정 표, 갤러리 슬라이드.
- 산출물:
  - `PopupInfo` 섹션 3분할 구성(맵/일정/갤러리)
  - 이미지 프리로드 및 스켈레톤 처리
- 기준(AC):
  - 네트워크 지연 시 로딩 피드백 노출
  - 지도 접근성 대체 링크 제공(지도 열기)
- 캐릭터 연계:
  - 청명이: 지역 전설/비전 스토리 강조 섹션
  - 고양이: 방문-구매 동선(O2O) 안내 배지/툴팁
- 미리보기:
  - 청명이: ![cheongmyeong](/characters/cheongmyeong.png)
 - 진행상태: 완료
 - 구현 경로:
   - `src/features/popup/constants/popup.ts`
   - `src/features/popup/components/PopupInfo.tsx`
   - `src/app/popup/page.tsx`

### task_03 — 굿즈 리스트(`/goods`)와 상세 모달
- 범위: 상품 카드, 가격/구매 링크, 상세 모달 구조.
- 산출물:
  - `GoodsCard`, `GoodsDetail` 모달
  - 외부 결제 링크 연동(더미)
- 기준(AC):
  - 새 탭 링크 보안 속성(rel) 적용
  - 가격 서식/통화 표기 일관성
- 캐릭터 연계:
  - 고양이 중심 실용·가성비 메시지, O2O 셀프 체크아웃 안내
- 미리보기:
  - 고양이: ![cat](/characters/cat.png)
 - 진행상태: 완료
 - 구현 경로:
   - `src/features/goods/constants/products.ts`
   - `src/features/goods/components/GoodsCard.tsx`
   - `src/features/goods/components/GoodsDetailSheet.tsx`
   - `src/app/goods/page.tsx`
