'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { Product } from '../constants/products'
import { formatCurrency } from '../constants/products'

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  product: Product | null
}

export default function GoodsDetailSheet({ open, onOpenChange, product }: Props) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (product?.thumbnail && !product.thumbnail.startsWith('http')) {
      const img = new window.Image()
      img.onload = () => setImageLoaded(true)
      img.onerror = () => setImageError(true)
      img.src = product.thumbnail
    } else if (product?.thumbnail?.startsWith('http')) {
      setImageLoaded(true)
    }
  }, [product?.thumbnail])

  const showPlaceholder = !product || imageError || !product.thumbnail || (!imageLoaded && !product.thumbnail.startsWith('http'))

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md">
        {product && (
          <div className="space-y-4">
            <SheetHeader>
              <SheetTitle>{product.name}</SheetTitle>
            </SheetHeader>
            <div className="relative h-48 w-full overflow-hidden rounded bg-gray-100">
              {showPlaceholder ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center">
                    <div className="mb-2 text-4xl">🛍️</div>
                    <p className="text-xs text-gray-500">이미지 준비 중</p>
                  </div>
                </div>
              ) : (
                <Image
                  src={product.thumbnail}
                  alt={`${product.name} 이미지`}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  onLoad={() => setImageLoaded(true)}
                  unoptimized={product.thumbnail.startsWith('http')}
                />
              )}
            </div>
            <p className="text-sm text-secondary-token">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold">{formatCurrency(product.price)}</span>
              <a
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-[color:rgb(var(--color-secondary-500))] px-4 py-2 text-white"
              >
                구매하기
              </a>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}


