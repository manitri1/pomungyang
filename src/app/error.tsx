'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold">500</h1>
      <h2 className="text-2xl font-semibold">서버 오류가 발생했습니다</h2>
      <p className="text-secondary-token">일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={reset}
          className="rounded bg-[color:rgb(var(--color-primary-500))] px-6 py-2 text-white"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="rounded border border-gray-300 px-6 py-2"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
