'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Copy, Check, MessageCircle, Download, Code2 } from 'lucide-react'
import { useState } from 'react'

interface Props {
  invoice: {
    invoice_id: string
    nama: string
    email: string
    whatsapp: string
    jenis_website: string
    detail: string
    metode_pembayaran: string
    total_harga: number
    status: string
    created_at: string
  }
  paymentMethod?: {
    name: string
    account: string
    holder: string
    color: string
    border: string
    accent: string
  }
  formattedTotal: string
  formattedDate: string
}

export function InvoiceClient({ invoice, paymentMethod, formattedTotal, formattedDate }: Props) {
  const [copied, setCopied] = useState(false)
  const isPaid = invoice.status === 'Lunas'

  const waMessage = encodeURIComponent(
    `Halo, saya ingin melakukan konfirmasi pembayaran.\n\n` +
    `Nomor Invoice: ${invoice.invoice_id}\n` +
    `Nama: ${invoice.nama}\n` +
    `Email: ${invoice.email}\n` +
    `Nominal: ${formattedTotal}\n` +
    `Metode Pembayaran: ${paymentMethod?.name || invoice.metode_pembayaran}\n\n` +
    `Mohon dicek kembali. Terima kasih.`
  )
  const waUrl = `https://wa.me/6282172222494?text=${waMessage}`

  const handleCopy = () => {
    navigator.clipboard.writeText(invoice.invoice_id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-center">
        <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${isPaid ? 'bg-green-600/20 border-2 border-green-500/40' : 'bg-blue-600/20 border-2 border-blue-500/40'}`}>
          {isPaid ? <CheckCircle2 size={36} className="text-green-400" /> : <Clock size={36} className="text-blue-400" />}
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Invoice Berhasil Dibuat</h1>
        <p className="text-slate-400">
          {isPaid ? 'Pembayaran sudah diterima. Terima kasih!' : 'Lakukan pembayaran dan konfirmasi via WhatsApp.'}
        </p>
      </motion.div>

      {/* Invoice Card */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="glass-strong rounded-3xl p-6 sm:p-8 neon-border">

        {/* Invoice Header */}
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-blue-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Code2 size={18} className="text-white" />
            </div>
            <div>
              <p className="font-black text-white text-lg">RITEL<span className="text-blue-400">WEB</span></p>
              <p className="text-xs text-slate-500">Premium Web Agency</p>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
            isPaid ? 'bg-green-900/30 border-green-500/30 text-green-400' : 'bg-yellow-900/30 border-yellow-500/30 text-yellow-400'
          }`}>
            {invoice.status}
          </div>
        </div>

        {/* Invoice ID */}
        <div className="glass rounded-2xl border border-blue-900/30 p-4 mb-5">
          <p className="text-xs text-slate-500 mb-1">Nomor Invoice</p>
          <div className="flex items-center justify-between">
            <p className="text-blue-400 font-bold text-xl tracking-wider">{invoice.invoice_id}</p>
            <button onClick={handleCopy} className="glass p-2 rounded-lg border border-blue-900/40 hover:bg-blue-900/20 transition-colors">
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-slate-400" />}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">{formattedDate}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {[
            { label: 'Nama Klien', value: invoice.nama },
            { label: 'Email', value: invoice.email },
            { label: 'WhatsApp', value: invoice.whatsapp },
            { label: 'Jenis Website', value: invoice.jenis_website },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="text-white text-sm font-semibold break-all">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Detail Kebutuhan */}
        <div className="glass rounded-2xl border border-blue-900/20 p-4 mb-5">
          <p className="text-xs text-slate-500 mb-2">Detail Kebutuhan</p>
          <p className="text-slate-300 text-sm leading-relaxed">{invoice.detail}</p>
        </div>

        {/* Payment Method */}
        {paymentMethod && (
          <div className={`rounded-2xl border p-4 mb-5 bg-gradient-to-br ${paymentMethod.color} ${paymentMethod.border}`}>
            <p className="text-xs text-slate-500 mb-2">Metode Pembayaran</p>
            <p className={`font-bold text-base ${paymentMethod.accent}`}>{paymentMethod.name}</p>
            <p className="text-white font-bold text-xl tracking-wider mt-1">{paymentMethod.account}</p>
            <p className="text-slate-400 text-xs mt-0.5">a.n. {paymentMethod.holder}</p>
          </div>
        )}

        {/* Total */}
        <div className="glass rounded-2xl border border-blue-500/30 p-5 bg-blue-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Total Pembayaran</p>
              <p className="text-3xl font-black text-white mt-1">{formattedTotal}</p>
              <p className="text-xs text-slate-500 mt-1">DP 50% = {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(invoice.total_harga / 2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Status</p>
              <p className={`font-bold text-base mt-1 ${isPaid ? 'text-green-400' : 'text-yellow-400'}`}>{invoice.status}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      {!isPaid && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 transition-colors px-6 py-4 rounded-2xl font-bold text-white text-base shadow-lg shadow-green-900/30"
          >
            <MessageCircle size={22} />
            Konfirmasi Pembayaran via WhatsApp
          </a>
          <p className="text-center text-slate-500 text-xs">
            Klik tombol di atas setelah melakukan transfer. Admin akan memverifikasi dalam 1×24 jam.
          </p>
        </motion.div>
      )}

      {/* Footer note */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
        className="glass rounded-2xl border border-blue-900/20 p-4 text-center">
        <p className="text-slate-400 text-xs leading-relaxed">
          Simpan nomor invoice ini sebagai bukti order Anda. Jika ada pertanyaan, hubungi kami via WhatsApp{' '}
          <a href="https://wa.me/6282172222494" className="text-blue-400 font-semibold">082218723401</a>
        </p>
      </motion.div>
    </div>
  )
}
