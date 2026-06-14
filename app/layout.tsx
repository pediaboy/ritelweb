import type { Metadata } from 'next'
import './globals.css'
import { LenisProvider } from './components/LenisProvider'
import { Navbar } from './components/Navbar'

export const metadata: Metadata = {
  title: 'RITEL WEB — Premium Jasa Pembuatan Website',
  description: 'Jasa pembuatan website premium untuk bisnis, UMKM, personal branding, dan komunitas. Desain modern, performa cepat, harga terjangkau.',
  keywords: 'jasa website, pembuatan website, web developer Indonesia, landing page, company profile, toko online',
  openGraph: {
    title: 'RITEL WEB — Premium Jasa Pembuatan Website',
    description: 'Website premium untuk bisnis dan personal branding Anda',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-deep-black text-white overflow-x-hidden w-full">
        <LenisProvider>
          {/* Animated mesh background */}
          <div className="mesh-bg" aria-hidden="true">
            <div className="mesh-orb mesh-orb-1" />
            <div className="mesh-orb mesh-orb-2" />
            <div className="mesh-orb mesh-orb-3" />
            <div className="mesh-orb mesh-orb-4" />
          </div>
          <Navbar />
          <main className="relative z-10 overflow-x-hidden w-full">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  )
}
