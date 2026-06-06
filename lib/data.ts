export type Campaign = {
  slug: string
  title: string
  category: 'Water' | 'Education' | 'Food' | 'Healthcare'
  location: string
  image: string
  summary: string
  raised: number
  goal: number
  donors: number
  daysLeft: number
  featured?: boolean
}

export const campaigns: Campaign[] = [
  {
    slug: 'clean-water-for-bundelkhand',
    title: 'Clean Water Wells for Bundelkhand',
    category: 'Water',
    location: 'Bundelkhand, Uttar Pradesh',
    image: '/images/campaign-water.png',
    summary:
      'Build six solar-powered wells delivering safe drinking water to 12,000 people and ending the daily walk for water.',
    raised: 6820000,
    goal: 9600000,
    donors: 1842,
    daysLeft: 21,
    featured: true,
  },
  {
    slug: 'classrooms-for-every-child',
    title: 'Classrooms for Every Child',
    category: 'Education',
    location: 'Sundarbans, West Bengal',
    image: '/images/campaign-education.png',
    summary:
      'Fund teachers, supplies, and three new classrooms so 600 children can continue their education year-round.',
    raised: 4560000,
    goal: 7200000,
    donors: 1120,
    daysLeft: 34,
    featured: true,
  },
  {
    slug: 'meals-for-families',
    title: 'Emergency Meals for Families',
    category: 'Food',
    location: 'Marathwada, Maharashtra',
    image: '/images/campaign-food.png',
    summary:
      'Provide nutritious food parcels to 3,500 families facing acute shortages after a prolonged drought.',
    raised: 8240000,
    goal: 8800000,
    donors: 2630,
    daysLeft: 9,
    featured: true,
  },
  {
    slug: 'mobile-medical-clinics',
    title: 'Mobile Medical Clinics',
    category: 'Healthcare',
    location: 'Rural Rajasthan',
    image: '/images/campaign-medical.png',
    summary:
      'Equip two mobile clinics bringing checkups, vaccines, and maternal care to remote desert villages.',
    raised: 3380000,
    goal: 7600000,
    donors: 870,
    daysLeft: 48,
  },
]

export const impactStats = [
  { value: '2.4M', label: 'Lives impacted' },
  { value: '28', label: 'States reached' },
  { value: '₹920Cr', label: 'Funds delivered' },
  { value: '94%', label: 'Goes to programs' },
]

export type Story = {
  slug: string
  name: string
  role: string
  image: string
  excerpt: string
  category: string
}

export const stories: Story[] = [
  {
    slug: 'amara-back-in-school',
    name: 'Aarti',
    role: 'Student, age 11',
    image: '/images/story-portrait-1.png',
    excerpt:
      'After her village gained a clean water well, Aarti no longer walks four hours a day. She is back in school and dreams of becoming a nurse.',
    category: 'Water & Education',
  },
  {
    slug: 'a-village-transformed',
    name: 'Bundelkhand Community',
    role: 'Uttar Pradesh',
    image: '/images/campaign-water.png',
    excerpt:
      'In just eighteen months, waterborne illness dropped by 70% and school attendance doubled across the village.',
    category: 'Clean Water',
  },
  {
    slug: 'learning-without-limits',
    name: 'Sundarbans School',
    role: 'West Bengal',
    image: '/images/campaign-education.png',
    excerpt:
      'Three new classrooms and trained local teachers gave 600 children a safe place to learn through every season.',
    category: 'Education',
  },
]

export type EventItem = {
  title: string
  date: string
  location: string
  type: 'Volunteer' | 'Fundraiser' | 'Community'
  spots: string
}

export const events: EventItem[] = [
  {
    title: 'Global Water Walk 2026',
    date: 'Apr 12, 2026',
    location: 'Central Park, New York',
    type: 'Fundraiser',
    spots: '320 joined',
  },
  {
    title: 'Build Day: School Construction',
    date: 'May 03, 2026',
    location: 'Sylhet, Bangladesh',
    type: 'Volunteer',
    spots: '8 spots left',
  },
  {
    title: 'Community Meal Packing',
    date: 'May 18, 2026',
    location: 'Chicago, IL',
    type: 'Community',
    spots: '45 spots left',
  },
]

export const volunteerRoles = [
  {
    title: 'Field Volunteer',
    description:
      'Join on-the-ground teams building wells, classrooms, and clinics in partner communities.',
    commitment: '1–4 weeks',
  },
  {
    title: 'Skilled Professional',
    description:
      'Lend your expertise in engineering, healthcare, education, or logistics to active projects.',
    commitment: 'Flexible',
  },
  {
    title: 'Local Ambassador',
    description:
      'Host events, raise awareness, and grow the HopeBridge community in your own city.',
    commitment: 'Ongoing',
  },
]

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}
