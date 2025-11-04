'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { UserMenu } from '@/components/auth/UserMenu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MobileMenu } from './MobileMenu'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* 모바일 메뉴 버튼 */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden"
                aria-label="메뉴 열기"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-56 p-0">
              <MobileMenu onNavigate={() => setMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-brand-primary" aria-hidden />
            <span className="font-semibold">PoMungYang</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          <Link href="/characters" className="hover:underline">Characters</Link>
          <Link href="/challenges" className="hover:underline">Challenges</Link>
          <Link href="/popup" className="hover:underline">Popup</Link>
          <Link href="/tour" className="hover:underline">Tour</Link>
          <Link href="/goods" className="hover:underline">Goods</Link>
          <Link href="/support" className="hover:underline">Support</Link>
        </nav>
        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}


