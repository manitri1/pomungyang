export type Character = {
  id: string
  name: string
  persona: string
  personaIntro: string
  originStory: string
  image: string
}

export const characters: Character[] = [
  {
    id: 'cheongmyeong',
    name: '청멍이',
    persona: '승천을 꿈꾸는 마지막 용의 후예',
    personaIntro:
      '순수한 열망을 가진 용의 후예. 침체된 해양 도시가 회복해야 할 영광과 혁신의 미래 비전을 상징합니다. AR/LBS 기반 체험·탐험 콘텐츠를 통해 "우리는 용의 후예이며 다시 날아오를 수 있다"는 희망의 메시지를 전달합니다.',
    originStory:
      '구릉포에는 아홉 마리의 용이 승천했다는 전설이 있습니다. 하지만 마지막 한 마리의 용은 승천하지 못하고 남게 되었고, 그 용의 후예라고 믿고 싶은 청멍이는 청룡이 되고 싶어합니다. 과거 용의 영광과 미래 혁신 잠재력을 연결하는 존재입니다.',
    image: '/characters/chungmung_intro.png',
  },
  {
    id: 'baeknyang',
    name: '백냥이',
    persona: '재물과 효율을 중시하는 현실주의자',
    personaIntro:
      '냉철하고 현실적인 고양이. "돈이 최고!"라고 외치며 냉철한 판단을 내리는데 능숙합니다. O2O 효율화 시스템과 실제 구매 행위에 관여하여, 이상적인 비전을 현실적인 재정 성과로 전환하는 역할을 맡습니다.',
    originStory:
      '"포항엔 철이 유명하다"라는 말처럼, 돈이 천부인 백냥이는 약간은 "철"들었다고 생각하는 고양이입니다. 현재의 경제 상황, 실질적인 수익 창출 및 효율적인 관광 운영 모델을 상징하며, 팝업스토어 운영의 핵심인 O2O 효율화 시스템을 담당합니다.',
    image: '/characters/baeknyang_intro.png',
  },
  {
    id: 'cat',
    name: '고양이',
    persona: '현실과 이상의 균형자',
    personaIntro:
      '청멍이의 꿈을 현실로 연결하는 조력자. 실용적인 조언과 효율적인 시스템을 통해 지역의 경제적 성장을 돕습니다.',
    originStory:
      '해양 도시의 실용주의를 대표하는 캐릭터로, 지역 경제의 실질적인 발전을 도모합니다.',
    image: '/characters/baeknyang_intro.png',
  },
]


