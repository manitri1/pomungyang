'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Product } from '../constants/products'
import { formatCurrency } from '../constants/products'

type Props = {
  product: Product
  onOpen: (p: Product) => void
}

export default function GoodsCard({ product, onOpen }: Props) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // 이미지 파일 존재 여부 확인
    if (product.thumbnail && !product.thumbnail.startsWith('http')) {
      const img = new window.Image()
      img.onload = () => setImageLoaded(true)
      img.onerror = () => setImageError(true)
      img.src = product.thumbnail
    } else if (product.thumbnail?.startsWith('http')) {
      setImageLoaded(true)
    }
  }, [product.thumbnail])

  const showPlaceholder = imageError || !product.thumbnail || (!imageLoaded && !product.thumbnail.startsWith('http'))

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
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
      <CardHeader className="pb-2"><CardTitle className="text-base">{product.name}</CardTitle></CardHeader>
      <CardContent className="flex items-center justify-between text-sm">
        <span className="font-medium">{formatCurrency(product.price)}</span>
        <button onClick={() => onOpen(product)} className="rounded bg-[color:rgb(var(--color-secondary-500))] px-3 py-1 text-white">보기</button>
      </CardContent>
    </Card>
  )
}


