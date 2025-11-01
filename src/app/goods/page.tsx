'use client'

import { useState } from 'react'
import { products, type Product } from '@/features/goods/constants/products'
import GoodsCard from '@/features/goods/components/GoodsCard'
import GoodsDetailSheet from '@/features/goods/components/GoodsDetailSheet'

export default function Page({ params }: { params: Promise<Record<string, string>> }) {
  void params
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<Product | null>(null)
  const onOpen = (p: Product) => { setActive(p); setOpen(true) }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold">굿즈샵</h1>
        <p className="text-sm text-secondary-token">캐릭터 굿즈를 확인하고 구매 링크로 이동하세요.</p>
      </header>
      <section aria-label="굿즈 목록" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <GoodsCard key={p.id} product={p} onOpen={onOpen} />
        ))}
      </section>
      <GoodsDetailSheet open={open} onOpenChange={setOpen} product={active} />
    </div>
  )
}


