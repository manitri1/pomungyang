export type Challenge = {
  id: string
  title: string
  thumbnail: string
  characterId: 'cheongmyeong' | 'cat'
  description: string
  steps: { id: string; label: string }[]
}

export const challenges: Challenge[] = [
  {
    id: 'vision-tour',
    title: '비전 투어 스탬프',
    thumbnail: 'https://picsum.photos/800/400?random=21',
    characterId: 'cheongmyeong',
    description: '해양 도시 전설을 따라 걷는 AR/LBS 스탬프 투어',
    steps: [
      { id: 'arrive-dock', label: '부두 도착 인증' },
      { id: 'scan-qr', label: '전설 QR 스캔' },
      { id: 'vision-note', label: '비전 노트 작성' },
    ],
  },
  {
    id: 'o2o-goods',
    title: 'O2O 굿즈 헌터',
    thumbnail: 'https://picsum.photos/800/400?random=22',
    characterId: 'cat',
    description: '팝업스토어에서 셀프 체크아웃을 체험하고 굿즈를 수집해요',
    steps: [
      { id: 'find-popup', label: '팝업 위치 찾기' },
      { id: 'self-checkout', label: '셀프 결제 체험' },
      { id: 'share-photo', label: '굿즈 인증샷 공유' },
    ],
  },
]

export const PROGRESS_KEY = 'challenges.progress.v1'

export type ChallengeProgress = Record<string, string[]> // challengeId -> completed step ids

