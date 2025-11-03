import Hero from '@/components/home/Hero'

export default function Home() {
  return (
    <div className="space-y-6">
      <Hero />
      <section aria-label="소식 및 이벤트" className="grid gap-4 md:grid-cols-3">
        {[2,3,4].map((n) => (
          <article key={n} className="overflow-hidden rounded-lg border bg-white">
            <img
              src={`https://picsum.photos/800/400?random=${n}`}
              alt="이벤트 티저 이미지"
              className="h-36 w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="space-y-1 p-4">
              <h3 className="line-clamp-1 font-semibold">최신 이벤트 티저 {n}</h3>
              <p className="line-clamp-2 text-sm text-secondary-token">청멍이/고양이 세계관 기반 참여형 콘텐츠를 만나보세요.</p>
              <a href="/challenges" className="text-sm underline">자세히 보기</a>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
