import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h2>
      <p className="text-secondary-token">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link
        href="/"
        className="mt-4 rounded bg-[color:rgb(var(--color-primary-500))] px-6 py-2 text-white"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
