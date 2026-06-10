import { NextResponse } from 'next/server'
import { getDonations } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId parameter.' }, { status: 400 })
    }

    const donations = getDonations()
    const donation = donations.find((d) => d.sessionId === sessionId)

    if (donation) {
      return NextResponse.json({ success: true, donationId: donation.id })
    }

    return NextResponse.json({ success: false })
  } catch (err: any) {
    console.error('Error checking donation status:', err)
    return NextResponse.json({ success: false, error: err.message })
  }
}
