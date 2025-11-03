import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import { AuthProvider } from '@/components/auth/auth-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'PoMungYang - 트랜스미디어 캐릭터 플랫폼',
    template: '%s | PoMungYang',
  },
  description: '청멍이와 고양이와 함께 떠나는 해양 도시 비전 투어. AR/LBS 체험, 챌린지, 굿즈샵을 만나보세요.',
  keywords: ['캐릭터', '트랜스미디어', 'AR', 'LBS', '투어', '챌린지', '굿즈'],
  authors: [{ name: 'PoMungYang' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://pomungyang.com',
    siteName: 'PoMungYang',
    title: 'PoMungYang - 트랜스미디어 캐릭터 플랫폼',
    description: '청멍이와 고양이와 함께 떠나는 해양 도시 비전 투어',
    images: [
      {
        url: '/characters/cheongmyeong.png',
        width: 1200,
        height: 630,
        alt: 'PoMungYang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PoMungYang - 트랜스미디어 캐릭터 플랫폼',
    description: '청멍이와 고양이와 함께 떠나는 해양 도시 비전 투어',
    images: ['/characters/cheongmyeong.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main" className="skip-link">본문으로 건너뛰기</a>
        <Providers>
          <AuthProvider>
            <Header />
            <div className="mx-auto max-w-6xl px-4">
              <div className="flex gap-6">
                <Sidebar />
                <main id="main" className="min-h-[60dvh] w-full py-6">
                  {children}
                </main>
              </div>
            </div>
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
