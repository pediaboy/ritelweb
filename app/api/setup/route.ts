import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== 'ritelweb_setup_2025') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  const headers: Record<string, string> = {
    'apikey': serviceKey,
    'Authorization': `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
  }

  const results: Record<string, string> = {}

  const testOrders = await fetch(`${supabaseUrl}/rest/v1/orders?limit=1`, { headers })
  results['orders_status'] = `${testOrders.status}`

  const testPayments = await fetch(`${supabaseUrl}/rest/v1/payments?limit=1`, { headers })
  results['payments_status'] = `${testPayments.status}`

  const testInvoices = await fetch(`${supabaseUrl}/rest/v1/invoices?limit=1`, { headers })
  results['invoices_status'] = `${testInvoices.status}`

  const allOk = testOrders.status === 200 && testPayments.status === 200 && testInvoices.status === 200
  results['all_tables_ready'] = allOk ? 'YES' : 'NO - run SQL in Supabase'

  return NextResponse.json({ success: true, results })
}
