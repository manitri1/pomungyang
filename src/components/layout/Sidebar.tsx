'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

type MenuItem = {
  href?: string
  label: string
  children?: MenuItem[]
}

const items: MenuItem[] = [
  { href: '/characters', label: '캐릭터 소개' },
  {
    label: '세계관 만들기',
    children: [
      { href: '/characters/cheongmyeong/worldview', label: '청명이 세계관' },
      { href: '/characters/baeknyang/worldview', label: '백냥이 세계관' },
    ],
  },
  { href: '/challenges', label: '챌린지' },
  { href: '/popup', label: '팝업스토어' },
  { href: '/tour', label: '캐릭터 투어' },
  { href: '/goods', label: '굿즈샵' },
  { href: '/mypage', label: '마이페이지' },
  { href: '/support', label: '고객센터' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(['세계관 만들기'])

  const toggleItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    )
  }

  const isItemActive = (item: MenuItem): boolean => {
    if (item.href) {
      return pathname?.startsWith(item.href) ?? false
    }
    if (item.children) {
      return item.children.some((child) => isItemActive(child))
    }
    return false
  }

  const isChildActive = (child: MenuItem): boolean => {
    return pathname?.startsWith(child.href || '') ?? false
  }

  return (
    <aside className="hidden w-56 shrink-0 border-r bg-white md:block">
      <nav className="sticky top-14 flex h-[calc(100dvh-56px)] flex-col gap-1 overflow-y-auto p-3 text-sm">
        {items.map((it) => {
          const hasChildren = it.children && it.children.length > 0
          const isExpanded = expandedItems.includes(it.label)
          const active = isItemActive(it)

          return (
            <div key={it.label}>
              {hasChildren ? (
                <button
                  onClick={() => toggleItem(it.label)}
                  className={`flex w-full items-center justify-between rounded px-3 py-2 hover:bg-neutral-100 ${
                    active ? 'bg-neutral-100 font-medium' : ''
                  }`}
                >
                  <span>{it.label}</span>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <Link
                  href={it.href || '#'}
                  className={`block rounded px-3 py-2 hover:bg-neutral-100 ${
                    active ? 'bg-neutral-100 font-medium' : ''
                  }`}
                >
                  {it.label}
                </Link>
              )}
              {hasChildren && isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {it.children?.map((child) => {
                    const childActive = isChildActive(child)
                    return (
                      <Link
                        key={child.href}
                        href={child.href || '#'}
                        className={`block rounded px-3 py-1.5 text-xs hover:bg-neutral-100 ${
                          childActive ? 'bg-neutral-100 font-medium text-[color:rgb(var(--color-primary-500))]' : ''
                        }`}
                      >
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}


