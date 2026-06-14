# RITEL WEB — Premium Jasa Pembuatan Website

Website agency jasa pembuatan website premium yang dibangun dengan Next.js 15, Tailwind CSS, Framer Motion, dan Supabase.

---

## Fitur Utama

- Landing page dengan animasi Framer Motion dan smooth scrolling Lenis
- Halaman order dengan form validasi lengkap
- Sistem Syarat & Ketentuan dengan logic checkbox (payment hanya muncul setelah disetujui)
- 3 metode pembayaran: SeaBank, DANA, GoPay
- Generate invoice otomatis dengan format `INV-YYYYMMDD-XXXX`
- Konfirmasi pembayaran via WhatsApp dengan pesan pre-filled
- Integrasi Pakasir payment gateway (opsional)
- Database Supabase untuk menyimpan orders, payments, dan invoices

---

## Instalasi

```bash
# Clone repo
git clone https://github.com/pediaboy/ritelweb.git
cd ritelweb

# Install dependencies
npm install
```

---

## Environment Variables

Buat file `.env.local` di root folder:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PAKASIR_API_KEY=your-pakasir-api-key
PAKASIR_PROJECT_SLUG=your-project-slug
NEXT_PUBLIC_SITE_URL=https://ritelweb.vercel.app
```

---

## Setup Database Supabase

Jalankan SQL ini di Supabase SQL Editor:

```sql
-- Tabel orders
CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id text UNIQUE NOT NULL,
  nama text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  jenis_website text NOT NULL,
  budget text,
  detail text,
  total_harga numeric NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Tabel payments
CREATE TABLE payments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id text NOT NULL,
  order_id uuid REFERENCES orders(id),
  metode text NOT NULL,
  jumlah numeric NOT NULL,
  status text DEFAULT 'pending',
  pakasir_ref text,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Tabel invoices
CREATE TABLE invoices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id text UNIQUE NOT NULL,
  order_id uuid REFERENCES orders(id),
  nama text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  jenis_website text NOT NULL,
  detail text,
  metode_pembayaran text NOT NULL,
  total_harga numeric NOT NULL,
  status text DEFAULT 'Menunggu Pembayaran',
  created_at timestamptz DEFAULT now()
);
```

---

## Menjalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## Build Production

```bash
npm run build
npm start
```

---

## Deploy ke Vercel

1. Push ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import repo `ritelweb`
3. Tambahkan semua environment variables di dashboard Vercel
4. Klik Deploy

Vercel akan otomatis detect Next.js dan build dengan konfigurasi yang tepat.

---

## Integrasi Pakasir

1. Daftar di [pakasir.zone.id](https://pakasir.zone.id)
2. Buat project baru dan catat `API Key` dan `Project Slug`
3. Masukkan ke environment variables
4. Set webhook URL ke: `https://your-domain.vercel.app/api/payment/webhook`

Pakasir digunakan untuk memproses pembayaran. Jika `PAKASIR_API_KEY` tidak diset, sistem tetap berjalan dengan konfirmasi manual via WhatsApp.

---

## Struktur Folder

```
ritelweb/
├── app/
│   ├── api/
│   │   └── payment/
│   │       ├── create/route.ts    # Endpoint buat invoice
│   │       └── webhook/route.ts   # Endpoint callback Pakasir
│   ├── components/
│   │   ├── LenisProvider.tsx      # Smooth scrolling
│   │   └── Navbar.tsx             # Navbar fixed glassmorphism
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client
│   │   └── utils.ts               # Helper functions & konstanta
│   ├── order/
│   │   ├── page.tsx               # Halaman order form
│   │   └── invoice/[invoiceId]/
│   │       ├── page.tsx           # Server component invoice
│   │       └── InvoiceClient.tsx  # Client component invoice
│   ├── globals.css                # Global styles & animasi
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Homepage
├── public/
├── .env.example
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| Next.js 15 | Framework utama |
| Tailwind CSS | Styling |
| Framer Motion | Animasi |
| @studio-freight/lenis | Smooth scrolling |
| Lucide React | Icon library |
| Supabase | Database PostgreSQL |
| Pakasir | Payment gateway |
| Vercel | Deployment |

---

Development by **THIRAFI THARIQ AL IDRIS**
