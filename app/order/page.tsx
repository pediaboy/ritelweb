'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CheckCircle2, AlertCircle, ChevronDown, Copy, Check, Loader2, Shield } from 'lucide-react'
import { PAYMENT_METHODS, WEBSITE_TYPES, formatRupiah } from '../lib/utils'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const SK_POINTS = [
  {
    title: '1. Pembayaran',
    content: 'Pembayaran dilakukan dengan sistem DP 50% di awal sebelum pengerjaan dimulai. Sisa 50% dibayar setelah website selesai dan disetujui klien. DP tidak dapat dikembalikan apabila klien membatalkan proyek di tengah pengerjaan.',
  },
  {
    title: '2. Revisi',
    content: 'Revisi diberikan sesuai dengan paket yang dipilih. Revisi yang dimaksud adalah perubahan pada konten, warna, dan tata letak yang sudah ada — bukan penambahan fitur baru. Penambahan fitur di luar scope akan dikenakan biaya tambahan.',
  },
  {
    title: '3. Waktu Pengerjaan',
    content: 'Estimasi waktu pengerjaan diberikan di awal setelah brief diterima. Keterlambatan dari pihak klien dalam memberikan konten atau feedback dapat memperpanjang waktu pengerjaan.',
  },
  {
    title: '4. Konten',
    content: 'Klien bertanggung jawab atas legalitas konten yang diberikan (teks, gambar, logo, dll). RITEL WEB tidak bertanggung jawab atas klaim pelanggaran hak cipta atas konten yang disediakan klien.',
  },
  {
    title: '5. Domain dan Hosting',
    content: 'Biaya domain dan hosting tidak termasuk dalam harga pengerjaan kecuali disebutkan secara eksplisit dalam penawaran. Perpanjangan domain dan hosting adalah tanggung jawab klien.',
  },
  {
    title: '6. Kepemilikan',
    content: 'Setelah pelunasan, seluruh hak atas website berpindah kepada klien. Source code diserahkan setelah pembayaran lunas. Sebelum pelunasan, RITEL WEB berhak menahan akses ke source code.',
  },
  {
    title: '7. Garansi',
    content: 'Garansi bug fixing diberikan selama 30 hari setelah website diluncurkan. Garansi tidak mencakup perubahan desain, penambahan fitur, atau kerusakan akibat tindakan klien sendiri (misalnya mengubah kode secara manual).',
  },
  {
    title: '8. Kerahasiaan',
    content: 'Seluruh informasi yang diberikan klien selama proses pengerjaan bersifat rahasia dan tidak akan dibagikan ke pihak ketiga manapun tanpa izin eksplisit dari klien.',
  },
  {
    title: '9. Pembatalan',
    content: 'Pembatalan dapat dilakukan sebelum pengerjaan dimulai dengan pengembalian DP penuh. Pembatalan setelah pengerjaan dimulai dikenakan biaya pengerjaan proporsional dan DP tidak dapat dikembalikan.',
  },
  {
    title: '10. Penyelesaian Sengketa',
    content: 'Apabila terjadi perselisihan, kedua pihak sepakat untuk menyelesaikan melalui musyawarah mufakat terlebih dahulu. Jika tidak tercapai kesepakatan, penyelesaian dilakukan sesuai hukum yang berlaku di Indonesia.',
  },
  {
    title: '11. Perubahan Scope',
    content: 'Perubahan scope atau kebutuhan yang signifikan setelah pengerjaan dimulai akan dikenakan biaya tambahan yang disepakati bersama. Perubahan kecil dalam lingkup revisi tidak dikenakan biaya tambahan.',
  },
  {
    title: '12. Komunikasi',
    content: 'Klien wajib merespons permintaan feedback atau konten dalam waktu 3 hari kerja. Ketidakresponsifan selama lebih dari 7 hari kerja dapat menyebabkan proyek ditangguhkan sementara.',
  },
]

export default function OrderPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nama: '', email: '', whatsapp: '', jenisWebsite: '', budget: '', detail: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [agreeSK, setAgreesk] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('')
  const [copiedAccount, setCopiedAccount] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const selectedType = WEBSITE_TYPES.find(t => t.label === form.jenisWebsite)
  const totalHarga = selectedType?.price || 0

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nama.trim()) e.nama = 'Nama lengkap wajib diisi'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email tidak valid'
    if (!form.whatsapp.trim() || !/^[0-9]{10,15}$/.test(form.whatsapp.replace(/\s/g, ''))) e.whatsapp = 'Nomor WhatsApp tidak valid'
    if (!form.jenisWebsite) e.jenisWebsite = 'Pilih jenis website'
    if (!form.detail.trim() || form.detail.trim().length < 20) e.detail = 'Ceritakan kebutuhan minimal 20 karakter'
    if (agreeSK && !selectedPayment) e.payment = 'Pilih metode pembayaran'
    return e
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAccount(id)
    setTimeout(() => setCopiedAccount(''), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: form.nama, email: form.email, whatsapp: form.whatsapp,
          jenisWebsite: form.jenisWebsite, budget: form.budget,
          detail: form.detail, metodePembayaran: selectedPayment, totalHarga,
        }),
      })
      const data = await res.json()
      if (data.success) {
        router.push(`/order/invoice/${data.invoiceId}`)
      } else {
        setSubmitError(data.error || 'Terjadi kesalahan. Coba lagi.')
      }
    } catch {
      setSubmitError('Gagal terhubung ke server. Periksa koneksi internet Anda.')
    } finally {
      setLoading(false)
    }
  }

  const InputField = ({ name, label, type = 'text', placeholder }: { name: keyof typeof form; label: string; type?: string; placeholder: string }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-300">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={e => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className={`w-full glass rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500/60 transition-all duration-200 border ${errors[name] ? 'border-red-500/60' : 'border-blue-900/40'}`}
      />
      {errors[name] && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12} />{errors[name]}</p>}
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 w-full overflow-x-hidden">
      <div className="max-w-2xl mx-auto">
        <FadeIn className="text-center mb-12">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Order</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Pesan Website Sekarang</h1>
          <p className="text-slate-400">Isi form di bawah, gua balas dalam hitungan jam.</p>
        </FadeIn>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Form Fields */}
          <FadeIn delay={0.1}>
            <div className="glass-strong rounded-3xl p-6 sm:p-8 neon-border flex flex-col gap-5">
              <h2 className="font-bold text-white text-lg border-b border-blue-900/30 pb-3">Data Diri</h2>
              <InputField name="nama" label="Nama Lengkap" placeholder="Nama lengkap Anda" />
              <InputField name="email" label="Email" type="email" placeholder="email@example.com" />
              <InputField name="whatsapp" label="Nomor WhatsApp" placeholder="0812xxxxxxxx" />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="glass-strong rounded-3xl p-6 sm:p-8 neon-border flex flex-col gap-5">
              <h2 className="font-bold text-white text-lg border-b border-blue-900/30 pb-3">Detail Proyek</h2>

              {/* Jenis Website */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300">Jenis Website</label>
                <div className="relative">
                  <select
                    value={form.jenisWebsite}
                    onChange={e => setForm({ ...form, jenisWebsite: e.target.value })}
                    className={`w-full glass rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 transition-all duration-200 border appearance-none bg-transparent ${errors.jenisWebsite ? 'border-red-500/60' : 'border-blue-900/40'}`}
                  >
                    <option value="" className="bg-slate-900">-- Pilih jenis website --</option>
                    {WEBSITE_TYPES.map(t => (
                      <option key={t.label} value={t.label} className="bg-slate-900">
                        {t.label} — {formatRupiah(t.price)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                {errors.jenisWebsite && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12} />{errors.jenisWebsite}</p>}
                {totalHarga > 0 && (
                  <div className="glass rounded-xl px-4 py-3 border border-blue-500/30 mt-1">
                    <p className="text-xs text-slate-400">Estimasi harga</p>
                    <p className="text-blue-400 font-bold text-lg">{formatRupiah(totalHarga)}</p>
                    <p className="text-xs text-slate-500 mt-1">DP 50% = {formatRupiah(totalHarga / 2)}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300">Budget (Opsional)</label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                  placeholder="Contoh: 500.000 - 1.000.000"
                  className="w-full glass rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500/60 transition-all duration-200 border border-blue-900/40"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300">Detail Kebutuhan</label>
                <textarea
                  value={form.detail}
                  onChange={e => setForm({ ...form, detail: e.target.value })}
                  placeholder="Ceritakan kebutuhan website Anda. Bisnis apa, target audience siapa, fitur apa yang diinginkan, referensi desain ada atau tidak, dll."
                  rows={5}
                  className={`w-full glass rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500/60 transition-all duration-200 border resize-none ${errors.detail ? 'border-red-500/60' : 'border-blue-900/40'}`}
                />
                {errors.detail && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12} />{errors.detail}</p>}
              </div>
            </div>
          </FadeIn>

          {/* Syarat & Ketentuan */}
          <FadeIn delay={0.2}>
            <div className="glass-strong rounded-3xl p-6 sm:p-8 neon-border">
              <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                <Shield size={18} className="text-blue-400" />
                Syarat & Ketentuan
              </h2>
              <div className="glass rounded-2xl border border-blue-900/30 p-5 h-64 overflow-y-auto mb-5 flex flex-col gap-4 custom-scroll">
                {SK_POINTS.map((point, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-blue-300">{point.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{point.content}</p>
                  </div>
                ))}
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => setAgreesk(!agreeSK)}
                  className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${agreeSK ? 'bg-blue-600 border-blue-600' : 'border-blue-700/50 bg-transparent hover:border-blue-500'}`}
                >
                  {agreeSK && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Saya telah membaca dan menyetujui <span className="text-blue-400 font-semibold">Syarat & Ketentuan</span> yang berlaku
                </span>
              </label>
            </div>
          </FadeIn>

          {/* Payment Methods — ONLY visible after S&K checked */}
          <AnimatePresence>
            {agreeSK && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="glass-strong rounded-3xl p-6 sm:p-8 neon-border">
                  <h2 className="font-bold text-white text-lg mb-6">Metode Pembayaran</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {PAYMENT_METHODS.map(method => (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all duration-300 bg-gradient-to-br ${method.color} ${
                          selectedPayment === method.id
                            ? `${method.border} shadow-lg`
                            : 'border-slate-700/30 hover:border-slate-600/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPayment === method.id ? 'border-blue-400 bg-blue-600' : 'border-slate-600'}`}>
                              {selectedPayment === method.id && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className={`font-bold text-base ${method.accent}`}>{method.name}</span>
                          </div>
                          {selectedPayment === method.id && <CheckCircle2 size={18} className={method.accent} />}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-slate-400 text-xs">Nomor Rekening / Dompet</p>
                            <p className="text-white font-bold text-lg tracking-wider mt-0.5">{method.account}</p>
                            <p className="text-slate-400 text-xs mt-0.5">a.n. {method.holder}</p>
                          </div>
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation(); handleCopy(method.account, method.id) }}
                            className={`glass p-2.5 rounded-xl border transition-all duration-200 ${method.border} hover:bg-blue-900/30`}
                          >
                            {copiedAccount === method.id ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-slate-400" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.payment && (
                    <p className="text-red-400 text-xs flex items-center gap-1 mt-3">
                      <AlertCircle size={12} />{errors.payment}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {submitError && (
            <div className="glass rounded-2xl border border-red-500/30 px-5 py-4 flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle size={18} />
              {submitError}
            </div>
          )}

          {/* Submit */}
          <FadeIn delay={0.3}>
            <button
              type="submit"
              disabled={loading || !agreeSK}
              className={`w-full btn-primary py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-3 relative z-10 transition-all duration-300 ${(!agreeSK || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Memproses Order...
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  Buat Invoice & Konfirmasi Order
                </>
              )}
            </button>
            {!agreeSK && (
              <p className="text-center text-slate-500 text-xs mt-3">
                Setujui Syarat & Ketentuan untuk melanjutkan
              </p>
            )}
          </FadeIn>
        </form>
      </div>
    </div>
  )
}
