'use client'

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-secondary-token">
        <p>© {new Date().getFullYear()} PoMungYang. All rights reserved.</p>
      </div>
    </footer>
  )
}


