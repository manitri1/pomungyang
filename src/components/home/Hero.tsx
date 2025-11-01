'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section aria-label="브랜드 히어로" className="relative isolate overflow-hidden rounded-lg border bg-white">
      <div className="grid gap-6 p-6 md:grid-cols-2 md:p-10">
        <div className="flex flex-col justify-center gap-4">
          <p className="text-xs uppercase tracking-widest text-secondary-token">Transmedia Character Platform</p>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            청명이와 함께 떠나는
            <span className="block text-[color:rgb(var(--color-primary-500))]">해양 도시 비전 투어</span>
          </h1>
          <p className="max-w-prose text-sm text-secondary-token md:text-base">
            지역의 전설과 미래 혁신을 연결하는 AR/LBS 체험. 챌린지로 참여하고 굿즈로 기억하세요.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/challenges"
              className="rounded-md bg-[color:rgb(var(--color-primary-500))] px-4 py-2 text-white shadow hover:opacity-90"
            >
              챌린지 참여
            </Link>
            <Link
              href="/goods"
              className="rounded-md bg-[color:rgb(var(--color-secondary-500))] px-4 py-2 text-white shadow hover:opacity-90"
            >
              굿즈샵 보기
            </Link>
          </div>
        </div>
        <div className="relative h-64 w-full md:h-full">
          <Image
            src="https://picsum.photos/1600/800?random=1"
            alt="히어로 배경 이미지"
            fill
            className="rounded-md object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}


