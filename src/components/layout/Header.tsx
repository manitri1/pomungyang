'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-brand-primary" aria-hidden />
          <span className="font-semibold">PoMungYang</span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          <Link href="/characters" className="hover:underline">Characters</Link>
          <Link href="/challenges" className="hover:underline">Challenges</Link>
          <Link href="/popup" className="hover:underline">Popup</Link>
          <Link href="/tour" className="hover:underline">Tour</Link>
          <Link href="/goods" className="hover:underline">Goods</Link>
          <Link href="/support" className="hover:underline">Support</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/auth/login" className="rounded bg-brand-secondary px-3 py-1.5 text-white">로그인</Link>
        </div>
      </div>
    </header>
  )
}


