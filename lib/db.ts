import fs from 'fs'
import path from 'path'
import { campaigns as defaultCampaigns, type Campaign } from './data'

export type DonationRecord = {
  id: string
  campaignSlug: string
  campaignTitle: string
  amount: number
  date: string
  donorName: string
  donorEmail: string
  sessionId: string
}

const DB_DIR = path.join(process.cwd(), 'data')
const CAMPAIGNS_FILE = path.join(DB_DIR, 'campaigns.json')
const SESSIONS_FILE = path.join(DB_DIR, 'sessions.json')
const DONATIONS_FILE = path.join(DB_DIR, 'donations.json')

function initDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true })
  }
  if (!fs.existsSync(CAMPAIGNS_FILE)) {
    fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(defaultCampaigns, null, 2))
  }
  if (!fs.existsSync(SESSIONS_FILE)) {
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify([], null, 2))
  }
  if (!fs.existsSync(DONATIONS_FILE)) {
    fs.writeFileSync(DONATIONS_FILE, JSON.stringify([], null, 2))
  }
}

export function getCampaigns(): Campaign[] {
  initDb()
  try {
    const data = fs.readFileSync(CAMPAIGNS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Failed to read campaigns db', err)
    return defaultCampaigns
  }
}

export function getCampaign(slug: string): Campaign | undefined {
  const campaigns = getCampaigns()
  return campaigns.find((c) => c.slug === slug)
}

export function getDonations(): DonationRecord[] {
  initDb()
  try {
    const data = fs.readFileSync(DONATIONS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Failed to read donations db', err)
    return []
  }
}

export function getDonation(id: string): DonationRecord | undefined {
  const donations = getDonations()
  return donations.find((d) => d.id === id)
}

export function recordDonation(
  slug: string,
  amount: number,
  sessionId: string,
  donorName: string = 'Guest Donor',
  donorEmail: string = 'guest_donor@gmail.com'
): { success: boolean; donationId?: string } {
  initDb()
  try {
    // Check if session already recorded
    const sessionsData = fs.readFileSync(SESSIONS_FILE, 'utf8')
    const sessions: string[] = JSON.parse(sessionsData)
    if (sessions.includes(sessionId)) {
      // Find existing donation record
      const donations = getDonations()
      const existing = donations.find((d) => d.sessionId === sessionId)
      return { success: false, donationId: existing?.id }
    }

    // Update campaign
    const campaigns = getCampaigns()
    const campaignIndex = campaigns.findIndex((c) => c.slug === slug)
    if (campaignIndex === -1) {
      return { success: false }
    }

    campaigns[campaignIndex].raised += amount
    campaigns[campaignIndex].donors += 1

    // Write back campaigns
    fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2))

    // Log session
    sessions.push(sessionId)
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2))

    // Create donation record
    const donations = getDonations()
    const donationId = `don_${Math.random().toString(36).substr(2, 9)}`
    const newDonation: DonationRecord = {
      id: donationId,
      campaignSlug: slug,
      campaignTitle: campaigns[campaignIndex].title,
      amount,
      date: new Date().toISOString(),
      donorName,
      donorEmail,
      sessionId
    }
    donations.push(newDonation)
    fs.writeFileSync(DONATIONS_FILE, JSON.stringify(donations, null, 2))

    return { success: true, donationId }
  } catch (err) {
    console.error('Failed to record donation', err)
    return { success: false }
  }
}
