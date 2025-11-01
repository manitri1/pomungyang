export type TourPoint = {
  id: string
  name: string
  hint: string
}

export const TOUR_PROGRESS_KEY = 'tour.stamps.v1'

export const tourPoints: TourPoint[] = [
  { id: 'dock', name: '용의 부두', hint: '전설이 시작된 곳' },
  { id: 'lighthouse', name: '희망의 등대', hint: '밤바다를 비추는 길' },
  { id: 'market', name: '바닷바람 시장', hint: '활기찬 상인의 거리' },
  { id: 'cliff', name: '청명의 절벽', hint: '비상(飛上)을 준비하는 곳' },
]

export const REWARD_THRESHOLD = 3 // 스탬프 3개 이상 달성 시 리워드


