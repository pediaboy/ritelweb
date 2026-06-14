export function generateInvoiceId(): string {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `INV-${date}-${rand}`
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export const PAYMENT_METHODS = [
  {
    id: 'seabank',
    name: 'SeaBank',
    account: '901555691160',
    holder: 'Thirafi Thariq Al Idris',
    color: 'from-green-600/20 to-emerald-600/10',
    border: 'border-green-500/30',
    accent: 'text-green-400',
  },
  {
    id: 'dana',
    name: 'DANA',
    account: '082218723401',
    holder: 'Thirafi Thariq Al Idris',
    color: 'from-blue-600/20 to-blue-600/10',
    border: 'border-blue-500/30',
    accent: 'text-blue-400',
  },
  {
    id: 'gopay',
    name: 'GoPay',
    account: '082218723401',
    holder: 'Thirafi Thariq Al Idris',
    color: 'from-teal-600/20 to-teal-600/10',
    border: 'border-teal-500/30',
    accent: 'text-teal-400',
  },
]

export const WEBSITE_TYPES = [
  { label: 'Landing Page', price: 300000 },
  { label: 'Company Profile', price: 500000 },
  { label: 'Toko Online', price: 1000000 },
  { label: 'Sistem Booking', price: 1200000 },
  { label: 'Website Komunitas', price: 1500000 },
  { label: 'Dashboard Internal', price: 2000000 },
  { label: 'Membership Website', price: 2500000 },
  { label: 'Custom Development', price: 3500000 },
]
