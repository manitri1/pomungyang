'use client'

import { popupLocation, schedules, gallery } from '../constants/popup'

export default function PopupInfo() {
  return (
    <div className="space-y-6">
      <section aria-label="위치 지도" className="overflow-hidden rounded-lg border bg-white">
        <div className="aspect-[16/9] w-full">
          <iframe
            title="Google Map"
            src={popupLocation.mapEmbedSrc}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="p-4 text-sm">
          <p className="font-medium">{popupLocation.title}</p>
          <p className="text-secondary-token">{popupLocation.address}</p>
          <a className="underline" href={popupLocation.mapEmbedSrc} target="_blank" rel="noopener noreferrer">
            큰 지도에서 보기
          </a>
        </div>
      </section>

      <section aria-label="일정" className="overflow-hidden rounded-lg border bg-white">
        <div className="p-4">
          <h2 className="mb-2 text-lg font-semibold">이벤트 일정</h2>
          <ul className="divide-y text-sm">
            {schedules.map((s) => (
              <li key={s.date} className="flex items-center justify-between py-2">
                <span className="w-32 tabular-nums">{s.date}</span>
                <span className="w-32">{s.time}</span>
                <span className="flex-1 text-secondary-token">{s.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="갤러리" className="overflow-hidden rounded-lg border bg-white">
        <div className="p-4">
          <h2 className="mb-3 text-lg font-semibold">갤러리</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.map((src, idx) => (
              <img key={idx} src={src} alt="팝업스토어 이미지" className="h-28 w-full rounded object-cover md:h-32" loading="lazy" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


