'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Product } from '../constants/products'
import { ImageUpload } from '@/features/characters/components/ImageUpload'
import { useToast } from '@/hooks/use-toast'

interface GoodsManageFormProps {
  product: Product | null
  onSave: (product: Product) => void
  onCancel: () => void
}

export function GoodsManageForm({ product, onSave, onCancel }: GoodsManageFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    thumbnail: '',
    description: '',
    buyUrl: '',
  })

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        price: product.price.toString(),
        thumbnail: product.thumbnail,
        description: product.description,
        buyUrl: product.buyUrl,
      })
    } else {
      // 새 제품의 경우 ID 자동 생성
      setFormData({
        id: `product-${Date.now()}`,
        name: '',
        price: '',
        thumbnail: '',
        description: '',
        buyUrl: '',
      })
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.price.trim()) {
      toast({
        title: '입력 오류',
        description: '제품명과 가격을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    const price = parseFloat(formData.price)
    if (isNaN(price) || price < 0) {
      toast({
        title: '입력 오류',
        description: '올바른 가격을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    const newProduct: Product = {
      id: formData.id,
      name: formData.name.trim(),
      price: price,
      thumbnail: formData.thumbnail || '/goods/others/placeholder.jpg',
      description: formData.description.trim(),
      buyUrl: formData.buyUrl.trim() || 'https://example.com/buy',
    }

    onSave(newProduct)
    toast({
      title: product ? '수정 완료' : '추가 완료',
      description: '제품이 저장되었습니다.',
    })
  }

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, thumbnail: url }))
    toast({
      title: '이미지 업로드 완료',
      description: '이미지가 폼에 추가되었습니다.',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>제품 정보</CardTitle>
          <CardDescription>제품의 기본 정보를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">제품명 *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="예: Good Vibes 머그컵"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">가격 (원) *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="예: 15000"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="제품에 대한 상세 설명을 입력해주세요."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buyUrl">구매 링크</Label>
            <Input
              id="buyUrl"
              type="url"
              value={formData.buyUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, buyUrl: e.target.value }))}
              placeholder="https://example.com/buy"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>제품 이미지</CardTitle>
          <CardDescription>제품 이미지를 업로드해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            folder="goods"
            onUploadComplete={handleImageUpload}
            currentImageUrl={formData.thumbnail}
            onRemove={() => setFormData((prev) => ({ ...prev, thumbnail: '' }))}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit">{product ? '수정하기' : '추가하기'}</Button>
      </div>
    </form>
  )
}

