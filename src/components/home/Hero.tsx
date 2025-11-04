'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section aria-label="브랜드 히어로" className="relative isolate overflow-hidden rounded-lg border bg-white">
      <div className="grid gap-6 p-6 md:grid-cols-2 md:p-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center gap-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-secondary-token"
          >
            Transmedia Character Platform
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-extrabold leading-tight md:text-5xl"
          >
            청멍이와 함께 떠나는
            <span className="block text-[color:rgb(var(--color-primary-500))]">해양 도시 비전 투어</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-prose text-sm text-secondary-token md:text-base"
          >
            지역의 전설과 미래 혁신을 연결하는 AR/LBS 체험. 챌린지로 참여하고 굿즈로 기억하세요.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/challenges"
              className="rounded-md bg-[color:rgb(var(--color-primary-500))] px-4 py-2 text-white shadow hover:opacity-90 transition-opacity"
            >
              챌린지 참여
            </Link>
            <Link
              href="/goods"
              className="rounded-md bg-[color:rgb(var(--color-secondary-500))] px-4 py-2 text-white shadow hover:opacity-90 transition-opacity"
            >
              굿즈샵 보기
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-64 w-full md:h-full"
        >
          <Image
            src="https://picsum.photos/1600/800?random=1"
            alt="히어로 배경 이미지"
            fill
            className="rounded-md object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  )
}


