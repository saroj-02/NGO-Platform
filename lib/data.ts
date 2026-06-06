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
    slug: 'clean-water-for-kibera',
    title: 'Clean Water Wells for Kibera',
    category: 'Water',
    location: 'Nairobi, Kenya',
    image: '/images/campaign-water.png',
    summary:
      'Build six solar-powered wells delivering safe drinking water to 12,000 people and ending the daily walk for water.',
    raised: 84200,
    goal: 120000,
    donors: 1842,
    daysLeft: 21,
    featured: true,
  },
  {
    slug: 'classrooms-for-every-child',
    title: 'Classrooms for Every Child',
    category: 'Education',
    location: 'Sylhet, Bangladesh',
    image: '/images/campaign-education.png',
    summary:
      'Fund teachers, supplies, and three new classrooms so 600 children can continue their education year-round.',
    raised: 56750,
    goal: 90000,
    donors: 1120,
    daysLeft: 34,
    featured: true,
  },
  {
    slug: 'meals-for-families',
    title: 'Emergency Meals for Families',
    category: 'Food',
    location: 'Tigray, Ethiopia',
    image: '/images/campaign-food.png',
    summary:
      'Provide nutritious food parcels to 3,500 families facing acute shortages after a prolonged drought.',
    raised: 102300,
    goal: 110000,
    donors: 2630,
    daysLeft: 9,
    featured: true,
  },
  {
    slug: 'mobile-medical-clinics',
    title: 'Mobile Medical Clinics',
    category: 'Healthcare',
    location: 'Rural Guatemala',
    image: '/images/campaign-medical.png',
    summary:
      'Equip two mobile clinics bringing checkups, vaccines, and maternal care to remote mountain villages.',
    raised: 41900,
    goal: 95000,
    donors: 870,
    daysLeft: 48,
  },
]

export const impactStats = [
  { value: '2.4M', label: 'Lives impacted' },
  { value: '46', label: 'Countries reached' },
  { value: '$128M', label: 'Funds delivered' },
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
    name: 'Amara',
    role: 'Student, age 11',
    image: '/images/story-portrait-1.png',
    excerpt:
      'After her village gained a clean water well, Amara no longer walks four hours a day. She is back in school and dreams of becoming a nurse.',
    category: 'Water & Education',
  },
  {
    slug: 'a-village-transformed',
    name: 'Kibera Community',
    role: 'Nairobi, Kenya',
    image: '/images/campaign-water.png',
    excerpt:
      'In just eighteen months, waterborne illness dropped by 70% and school attendance doubled across the neighborhood.',
    category: 'Clean Water',
  },
  {
    slug: 'learning-without-limits',
    name: 'Sylhet School',
    role: 'Bangladesh',
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
