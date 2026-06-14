import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/app/lib/supabase'
import { generateInvoiceId } from '@/app/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      nama,
      email,
      whatsapp,
      jenisWebsite,
      budget,
      detail,
      metodePembayaran,
      totalHarga,
    } = body

    if (!nama || !email || !whatsapp || !jenisWebsite || !metodePembayaran) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    const invoiceId = generateInvoiceId()
    const supabase = getServiceClient()

    // Simpan order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        invoice_id: invoiceId,
        nama,
        email,
        whatsapp,
        jenis_website: jenisWebsite,
        budget,
        detail,
        total_harga: totalHarga,
        status: 'pending',
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order error:', orderError)
      return NextResponse.json({ error: 'Gagal menyimpan order' }, { status: 500 })
    }

    // Simpan payment info
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        invoice_id: invoiceId,
        order_id: orderData.id,
        metode: metodePembayaran,
        jumlah: totalHarga,
        status: 'pending',
      })

    if (paymentError) {
      console.error('Payment error:', paymentError)
    }

    // Simpan invoice
    const { error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        invoice_id: invoiceId,
        order_id: orderData.id,
        nama,
        email,
        whatsapp,
        jenis_website: jenisWebsite,
        detail,
        metode_pembayaran: metodePembayaran,
        total_harga: totalHarga,
        status: 'Menunggu Pembayaran',
        created_at: new Date().toISOString(),
      })

    if (invoiceError) {
      console.error('Invoice error:', invoiceError)
    }

    // Pakasir integration (jika API key tersedia)
    const pakasirKey = process.env.PAKASIR_API_KEY
    const pakasirSlug = process.env.PAKASIR_PROJECT_SLUG

    if (pakasirKey && pakasirSlug) {
      try {
        const pakasirRes = await fetch(`https://pakasir.zone.id/api/v1/payment/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pakasirKey}`,
          },
          body: JSON.stringify({
            project_slug: pakasirSlug,
            invoice_id: invoiceId,
            amount: totalHarga,
            customer_name: nama,
            customer_email: email,
            customer_phone: whatsapp,
            description: `Jasa pembuatan ${jenisWebsite}`,
            payment_method: metodePembayaran,
            callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/webhook`,
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/invoice/${invoiceId}`,
          }),
        })

        const pakasirData = await pakasirRes.json()

        if (pakasirData.success) {
          await supabase
            .from('payments')
            .update({ pakasir_ref: pakasirData.data?.reference })
            .eq('invoice_id', invoiceId)
        }
      } catch (e) {
        console.error('Pakasir integration error:', e)
        // Tidak gagalkan order jika Pakasir bermasalah
      }
    }

    return NextResponse.json({
      success: true,
      invoiceId,
      message: 'Order berhasil dibuat',
    })
  } catch (error) {
    console.error('Create payment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
