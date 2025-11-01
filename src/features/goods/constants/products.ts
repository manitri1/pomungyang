export type Product = {
  id: string
  name: string
  price: number
  thumbnail: string
  description: string
  buyUrl: string
}

export const products: Product[] = [
  {
    id: 'mug-goodvibes',
    name: 'Good Vibes 머그컵',
    price: 15000,
    thumbnail: '/goods/mugs/mug_goodvibes_main.jpg',
    description: 'GOOD VIBES & ADVENTURES 디자인의 프리미엄 머그컵. 흰색 머그에 귀여운 캐릭터 디자인이 인쇄되어 있어 매일 사용하는 컵이 즐거워집니다.',
    buyUrl: 'https://example.com/buy/mug-goodvibes',
  },
  {
    id: 'tote-goodvibes',
    name: 'Good Vibes 토트백',
    price: 25000,
    thumbnail: '/goods/tote-bags/tote_goodvibes_main.jpg',
    description: 'GOOD VIBES & ADVENTURES 디자인의 크림색 캔버스 토트백. 튼튼한 소재로 제작되어 일상생활과 여행에 실용적으로 사용할 수 있습니다.',
    buyUrl: 'https://example.com/buy/tote-goodvibes',
  },
  {
    id: 'notebook-goodvibes',
    name: 'Good Vibes 노트북',
    price: 12000,
    thumbnail: '/goods/notebooks/notebook_goodvibes_main.jpg',
    description: 'GOOD VIBES & ADVENTURES 디자인의 스파이럴 노트북. 크림색 표지에 귀여운 캐릭터 디자인이 인쇄되어 있어 매일의 기록이 더욱 특별해집니다.',
    buyUrl: 'https://example.com/buy/notebook-goodvibes',
  },
  {
    id: 'phone-case-yongrin',
    name: '✨ 용린 (龍鱗) 폰케이스',
    price: 35000,
    thumbnail: '/goods/phone-cases/phone_case_yongrin_main.jpg',
    description: '손 안에서 느껴지는 용의 웅장함! 청명이의 신비로운 비늘을 형상화한 폰케이스로 여러분의 스마트폰을 특별하게 만들어 보세요. 견고한 보호력은 물론, 시선을 사로잡는 아름다움을 선사합니다. 빛의 각도에 따라 오묘하게 빛나는 이리데슨트(Iridescent) 효과와 특수 TPU & PC (홀로그램 코팅) 소재로 제작되었습니다.',
    buyUrl: 'https://example.com/buy/phone-case-yongrin',
  },
  {
    id: 'pendant-yeoiju',
    name: '✨ 여의주 (如意珠) 펜던트 ✨ (리미티드)',
    price: 89000,
    thumbnail: '/goods/pendants/pendant_yeoiju_main.jpg',
    description: '청명이의 가장 소중한 보물, 여의주를 당신의 품에! 한정 수량으로 제작되는 특별한 펜던트로, 지니는 이에게 행운과 소원 성취의 기운을 전해줄 것입니다. 소장 가치 200%! 영롱한 푸른빛의 스와로브스키 크리스탈 구슬이 섬세한 용 비늘 패턴의 925 실버 세공에 감싸여 있습니다.',
    buyUrl: 'https://example.com/buy/pendant-yeoiju',
  },
  {
    id: 'badge-set-yongan',
    name: '✨ 용안 (龍眼) 뱃지 세트',
    price: 25000,
    thumbnail: '/goods/badges/badge_set_yongan_main.jpg',
    description: '청명이의 지혜와 통찰력을 담은 용안 뱃지 세트! 가방이나 옷에 달아 청명이의 신비로운 기운을 함께하세요. 깊은 푸른색과 금색 테두리가 어우러져 몽환적인 분위기를 연출합니다. 총 3가지 디자인 (정면, 측면, 감은 눈)으로 구성되어 있으며, 금속 에나멜 코팅으로 제작되었습니다.',
    buyUrl: 'https://example.com/buy/badge-set-yongan',
  },
]

export function formatCurrency(krw: number) {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(krw)
}


