import { NextResponse } from 'next/server'
import { recordDonation } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { slug, amount, sessionId, donorName, donorEmail } = await request.json()

    if (!slug || !amount || amount <= 0 || !sessionId) {
      return NextResponse.json({ error: 'Missing or invalid parameters.' }, { status: 400 })
    }

    const result = recordDonation(slug, amount, sessionId, donorName, donorEmail)
    return NextResponse.json(result)
  } catch (err: any) {
    console.error('Error recording donation:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
