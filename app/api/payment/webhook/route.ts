import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/app/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = getServiceClient()

    const {
      invoice_id,
      status,
      amount,
      reference,
      paid_at,
    } = body

    if (!invoice_id) {
      return NextResponse.json({ error: 'Invoice ID tidak ditemukan' }, { status: 400 })
    }

    // Map status Pakasir ke status lokal
    const statusMap: Record<string, string> = {
      'paid': 'Lunas',
      'success': 'Lunas',
      'pending': 'Menunggu Pembayaran',
      'failed': 'Gagal',
      'expired': 'Kadaluarsa',
      'cancelled': 'Dibatalkan',
    }

    const localStatus = statusMap[status] || 'Menunggu Pembayaran'

    // Update payments
    await supabase
      .from('payments')
      .update({
        status: status,
        pakasir_ref: reference,
        paid_at: paid_at || null,
      })
      .eq('invoice_id', invoice_id)

    // Update invoices
    await supabase
      .from('invoices')
      .update({ status: localStatus })
      .eq('invoice_id', invoice_id)

    // Update orders
    await supabase
      .from('orders')
      .update({ status: status === 'paid' || status === 'success' ? 'paid' : status })
      .eq('invoice_id', invoice_id)

    return NextResponse.json({ success: true, message: 'Webhook diproses' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint aktif', method: 'POST' })
}
