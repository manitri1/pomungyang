'use client'

import PopupInfo from '@/features/popup/components/PopupInfo'

export default function Page({ params }: { params: Promise<Record<string, string>> }) {
  void params
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold">팝업스토어 안내</h1>
        <p className="text-sm text-secondary-token">위치 · 일정 · 갤러리를 확인하세요.</p>
      </header>
      <PopupInfo />
    </div>
  )
}


