'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Sparkles, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">관리자 페이지</h1>
        <p className="mt-2 text-gray-600">콘텐츠 아이디어 생성, 굿즈 관리, 이벤트 관리를 할 수 있습니다.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <Link href="/admin/content-idea">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>컨텐츠 아이디어 생성</CardTitle>
                  <CardDescription>AI를 활용한 컨텐츠 아이디어 생성</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                이동하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <Link href="/admin/goods">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-3">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>굿즈 관리</CardTitle>
                  <CardDescription>굿즈 아이템 추가, 수정, 삭제</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                이동하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <Link href="/admin/events">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-3">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>이벤트 관리</CardTitle>
                  <CardDescription>이벤트 등록, 수정, 삭제</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                이동하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  )
}

