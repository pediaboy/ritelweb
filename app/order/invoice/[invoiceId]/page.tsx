import { notFound } from 'next/navigation'
import { getServiceClient } from '@/app/lib/supabase'
import { formatRupiah, formatDate, PAYMENT_METHODS } from '@/app/lib/utils'
import { InvoiceClient } from './InvoiceClient'

async function getInvoice(invoiceId: string) {
  try {
    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('invoice_id', invoiceId)
      .single()
    if (error || !data) return null
    return data
  } catch {
    return null
  }
}

type Props = {
  params: Promise<{ invoiceId: string }>
}

export default async function InvoicePage({ params }: Props) {
  const { invoiceId } = await params
  const invoice = await getInvoice(invoiceId)
  if (!invoice) notFound()

  const paymentMethod = PAYMENT_METHODS.find(m => m.id === invoice.metode_pembayaran)

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 w-full overflow-x-hidden">
      <div className="max-w-2xl mx-auto">
        <InvoiceClient
          invoice={invoice}
          paymentMethod={paymentMethod}
          formattedTotal={formatRupiah(invoice.total_harga)}
          formattedDate={formatDate(invoice.created_at)}
        />
      </div>
    </div>
  )
}
