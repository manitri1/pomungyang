'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Plus, Trash2, Edit2, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GoodsManageForm } from '@/features/goods/components/GoodsManageForm'
import { products as initialProducts, type Product } from '@/features/goods/constants/products'
import { formatCurrency } from '@/features/goods/constants/products'

const STORAGE_KEY = 'admin_goods_products'
const PUBLIC_STORAGE_KEY = 'public_goods_products'

export default function AdminGoodsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    if (typeof window === 'undefined') return
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setProducts(JSON.parse(saved))
      } else {
        // 초기 제품 로드
        setProducts(initialProducts)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts))
      }
    } catch {
      setProducts(initialProducts)
    }
  }

  const saveProducts = (newProducts: Product[]) => {
    try {
      setProducts(newProducts)
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts))
        // 공개 굿즈샵에도 동기화
        localStorage.setItem(PUBLIC_STORAGE_KEY, JSON.stringify(newProducts))
        // 커스텀 이벤트 발생으로 굿즈샵 페이지 업데이트
        window.dispatchEvent(new Event('goodsUpdated'))
      }
      console.log('✅ 제품 저장 완료:', newProducts.length, '개')
    } catch (error) {
      console.error('❌ 제품 저장 실패:', error)
    }
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('정말 이 제품을 삭제하시겠습니까?')) {
      const newProducts = products.filter((p) => p.id !== id)
      saveProducts(newProducts)
    }
  }

  const handleSave = (product: Product) => {
    let newProducts: Product[]
    
    if (editingProduct) {
      // 수정
      newProducts = products.map((p) => (p.id === product.id ? product : p))
    } else {
      // 추가
      newProducts = [...products, product]
    }
    
    saveProducts(newProducts)
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  if (showForm) {
    return (
      <div className="mx-auto max-w-4xl p-6 lg:p-12">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            {editingProduct ? '굿즈 수정' : '굿즈 추가'}
          </h1>
        </div>

        <GoodsManageForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">굿즈 관리</h1>
            <p className="mt-1 text-gray-600">굿즈 아이템을 추가, 수정, 삭제할 수 있습니다.</p>
          </div>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          제품 추가
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
              {product.thumbnail ? (
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized={product.thumbnail.startsWith('http')}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-base">{product.name}</CardTitle>
              <CardDescription className="line-clamp-2">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{formatCurrency(product.price)}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="mb-4 h-12 w-12 text-gray-400" />
            <p className="text-lg font-medium text-gray-600">등록된 제품이 없습니다.</p>
            <p className="mt-2 text-sm text-gray-500">제품을 추가해보세요.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

