'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap, Search, RefreshCw, Star, ChevronDown, ChevronUp, Globe, ShoppingCart, Calendar, Users, LayoutDashboard, Crown, Code, Layers } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// ===== FADE IN COMPONENT =====
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ===== SERVICES =====
const services = [
  {
    icon: Globe,
    title: 'Landing Page',
    desc: 'Halaman tunggal yang didesain untuk konversi maksimal. Cocok untuk promosi produk, event, atau kampanye digital.',
    price: 'Mulai Rp 300.000',
  },
  {
    icon: Layers,
    title: 'Company Profile',
    desc: 'Website profesional untuk memperkenalkan bisnis dan brand Anda ke calon klien dan mitra.',
    price: 'Mulai Rp 500.000',
  },
  {
    icon: ShoppingCart,
    title: 'Toko Online',
    desc: 'Platform e-commerce dengan manajemen produk, keranjang belanja, dan integrasi pembayaran.',
    price: 'Mulai Rp 1.000.000',
  },
  {
    icon: Calendar,
    title: 'Sistem Booking',
    desc: 'Website dengan fitur reservasi dan penjadwalan. Ideal untuk salon, klinik, restoran, atau studio.',
    price: 'Mulai Rp 1.200.000',
  },
  {
    icon: Users,
    title: 'Website Komunitas',
    desc: 'Platform untuk membangun komunitas online dengan forum, event, dan manajemen anggota.',
    price: 'Mulai Rp 1.500.000',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard Internal',
    desc: 'Sistem manajemen data internal untuk tim Anda. Laporan, analitik, dan pengelolaan operasional.',
    price: 'Mulai Rp 2.000.000',
  },
  {
    icon: Crown,
    title: 'Membership Website',
    desc: 'Website dengan sistem keanggotaan berbayar, konten eksklusif, dan manajemen subscriber.',
    price: 'Mulai Rp 2.500.000',
  },
  {
    icon: Code,
    title: 'Custom Development',
    desc: 'Punya kebutuhan spesifik? Kami bisa bangun dari nol sesuai requirement Anda.',
    price: 'Mulai Rp 3.500.000',
  },
]

// ===== FAQ =====
const faqs = [
  {
    q: 'Berapa lama proses pengerjaannya?',
    a: 'Tergantung jenis website. Landing page biasanya 3-5 hari kerja. Company profile 5-7 hari. Toko online dan sistem yang lebih kompleks bisa 2-4 minggu. Gua selalu kasih estimasi realistis sebelum mulai kerja.',
  },
  {
    q: 'Apakah bisa revisi setelah selesai?',
    a: 'Bisa. Setiap paket sudah termasuk revisi sesuai kesepakatan di awal. Gua kerja sampai lu puas, tapi pastikan requirement sudah jelas sejak awal biar prosesnya lebih lancar.',
  },
  {
    q: 'Bayarnya gimana? Harus lunas dulu?',
    a: 'Tidak harus lunas. Sistemnya DP 50% di depan sebelum pengerjaan dimulai, sisanya dibayar saat website sudah selesai dan disetujui. Metode pembayaran via transfer bank atau dompet digital.',
  },
  {
    q: 'Domain dan hosting termasuk atau tidak?',
    a: 'Belum termasuk. Harga yang tertera adalah biaya pengerjaan. Untuk domain dan hosting, kita diskusikan terpisah. Bisa pakai yang sudah punya atau gua bantu rekomendasikan yang sesuai budget.',
  },
  {
    q: 'Apakah website mobile-friendly?',
    a: 'Sudah pasti. Semua website yang gua buat 100% responsif dan diuji di berbagai ukuran layar. Di era sekarang tidak ada alasan buat website yang tidak mobile-friendly.',
  },
  {
    q: 'Apakah ada garansi setelah website jadi?',
    a: 'Ada garansi bug fixing selama 30 hari setelah launch. Kalau ada yang tidak beres secara teknis, langsung kabarin dan gua perbaiki tanpa biaya tambahan.',
  },
  {
    q: 'Bagaimana kalau gua tidak punya konten?',
    a: 'Bisa diskusi. Gua bisa bantu dengan placeholder konten untuk sementara, atau kasih saran tentang konten apa yang perlu disiapkan. Tapi konten final tetap dari lu karena yang paling tahu bisnis sendiri ya lu sendiri.',
  },
  {
    q: 'Bisa minta contoh website yang pernah dibuat?',
    a: 'Tentu. Hubungi via WhatsApp dan gua siapkan portfolio yang relevan dengan kebutuhan lu. Lebih enak diskusi langsung biar bisa lebih detail.',
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeIn delay={index * 0.05}>
      <div className={`glass rounded-2xl overflow-hidden neon-border transition-all duration-300 ${open ? 'bg-blue-950/20' : ''}`}>
        <button
          className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
          onClick={() => setOpen(!open)}
        >
          <span className="font-semibold text-slate-100 text-sm sm:text-base">{q}</span>
          <div className="flex-shrink-0 text-blue-400">
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-blue-900/30 pt-4">
                {a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  )
}

import { AnimatePresence } from 'framer-motion'

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ===== HERO ===== */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16 relative">
        <div className="max-w-5xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-blue-300 mb-8 neon-border">
              <Star size={12} className="fill-blue-400 text-blue-400" />
              <span>Jasa Web Premium · Terpercaya · Harga Masuk Akal</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6"
          >
            <span className="text-white">Premium Jasa</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent neon-text">
              Pembuatan Website
            </span>
            <br />
            <span className="text-slate-300 text-3xl sm:text-4xl md:text-5xl font-bold">
              untuk Bisnis & Personal Branding
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Gua bantu UMKM, bisnis lokal, dan personal brand punya website yang beneran bagus — bukan template generik yang semua orang punya. Desain premium, cepat, dan sesuai karakter bisnis lu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/order" className="btn-primary px-8 py-4 rounded-2xl font-bold text-white text-lg flex items-center gap-3 relative z-10 w-full sm:w-auto justify-center">
              Pesan Sekarang
              <ArrowRight size={20} />
            </Link>
            <Link href="/#layanan" className="glass px-8 py-4 rounded-2xl font-semibold text-slate-300 hover:text-white transition-colors neon-border w-full sm:w-auto text-center">
              Lihat Layanan
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {[
              { val: '50+', label: 'Proyek Selesai' },
              { val: '98%', label: 'Klien Puas' },
              { val: '3 Hari', label: 'Pengerjaan Cepat' },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-4 text-center neon-border">
                <div className="text-2xl font-black text-blue-400">{stat.val}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PRICING OVERVIEW ===== */}
      <section id="harga" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Harga</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Mulai dari{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Rp 300.000
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">hingga Rp 3.500.000 untuk proyek yang lebih kompleks. Harga transparan, tidak ada biaya tersembunyi.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: CheckCircle2, title: 'Desain Premium', desc: 'Bukan template — didesain khusus sesuai identitas bisnis lu' },
              { icon: Zap, title: 'Performa Cepat', desc: 'Dioptimasi untuk loading yang cepat di semua perangkat' },
              { icon: Search, title: 'Optimasi SEO', desc: 'Struktur yang ramah mesin pencari sejak awal' },
              { icon: RefreshCw, title: 'Revisi Terbuka', desc: 'Revisi sesuai kesepakatan sampai lu puas dengan hasilnya' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 neon-border h-full flex flex-col gap-3 hover:bg-blue-950/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                    <item.icon size={20} className="text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="layanan" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Layanan</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Yang Bisa Gua Buatin</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Dari landing page sederhana sampai sistem yang kompleks, semuanya dikerjain serius.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <FadeIn key={i} delay={(i % 4) * 0.1}>
                <div className="glass rounded-2xl p-6 neon-border h-full flex flex-col gap-4 hover:bg-blue-950/20 transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center group-hover:from-blue-600/50 transition-all duration-300">
                    <service.icon size={22} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-base mb-2">{service.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                  <div className="text-blue-400 text-sm font-semibold pt-2 border-t border-blue-900/30">
                    {service.price}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Pertanyaan Umum</h2>
            <p className="text-slate-400">Yang sering ditanyain sebelum order. Kalau masih ada yang kurang jelas, langsung WA aja.</p>
          </FadeIn>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-24 px-4">
        <FadeIn>
          <div className="max-w-4xl mx-auto glass-strong rounded-3xl p-10 sm:p-16 text-center neon-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
                Siap Punya Website
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  yang Beneran Bagus?
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Jangan tunda lagi. Mulai sekarang, isi form order dan gua balas dalam hitungan jam.
              </p>
              <Link
                href="/order"
                className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-white text-lg relative z-10"
              >
                Pesan Website Sekarang
                <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/20 py-8 px-4 text-center text-slate-500 text-sm">
        <p>© 2025 RITEL WEB. Semua hak dilindungi.</p>
        <p className="mt-1">Development by <span className="text-blue-400 font-semibold">THIRAFI THARIQ AL IDRIS</span></p>
      </footer>
    </div>
  )
}
