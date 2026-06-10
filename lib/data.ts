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
  {
    slug: 'digital-literacy-for-girls',
    title: 'Digital Literacy for Rural Girls',
    category: 'Education',
    location: 'India',
    image: '/images/campaign-digital-literacy.png',
    summary:
      'Provide laptops, internet connectivity, and basic computer science training to 1,200 underprivileged rural girls across government schools.',
    raised: 1520000,
    goal: 5000000,
    donors: 420,
    daysLeft: 25,
    featured: true,
  },
  {
    slug: 'rainwater-harvesting-communities',
    title: 'Rainwater Harvesting for Dry Villages',
    category: 'Water',
    location: 'India',
    image: '/images/campaign-rainwater-harvesting.png',
    summary:
      'Install community rainwater harvesting units and restore traditional stepwells to secure sustainable agricultural water for 500 dryland farmers.',
    raised: 2890000,
    goal: 6000000,
    donors: 710,
    daysLeft: 18,
  },
  {
    slug: 'midday-meals-street-children',
    title: 'Midday Meals for Street Children',
    category: 'Food',
    location: 'India',
    image: '/images/campaign-meals-slum.png',
    summary:
      'Deliver freshly prepared hot nutritious midday meals daily to 2,000 children living in slums and temporary street shelters.',
    raised: 3120000,
    goal: 4000000,
    donors: 1240,
    daysLeft: 12,
    featured: true,
  },
  {
    slug: 'cataract-surgeries-elderly',
    title: 'Restoring Sight: Cataract Surgeries for Elders',
    category: 'Healthcare',
    location: 'India',
    image: '/images/campaign-cataract-surgeries.png',
    summary:
      'Sponsor safe, quick, and free intraocular lens cataract surgeries to restore vision for 800 elderly village citizens who cannot afford private care.',
    raised: 1850000,
    goal: 3500000,
    donors: 530,
    daysLeft: 30,
  },
  {
    slug: 'mobile-dental-clinics',
    title: 'Mobile Dental & Oral Care Clinics',
    category: 'Healthcare',
    location: 'India',
    image: '/images/campaign-dental-clinics.png',
    summary:
      'Equip mobile vans with modern dental tools to provide free checkups, cleanings, extractions, and oral hygiene education to children in slum neighborhoods.',
    raised: 1200000,
    goal: 3000000,
    donors: 340,
    daysLeft: 38,
  },
  {
    slug: 'science-labs-rural-schools',
    title: 'Science Lab Kits for Government Schools',
    category: 'Education',
    location: 'India',
    image: '/images/campaign-science-kits.png',
    summary:
      'Distribute hands-on physics, chemistry, and biology kit boxes to 150 rural government schools, enabling active science experimentation for 15,000 children.',
    raised: 2450000,
    goal: 4500000,
    donors: 680,
    daysLeft: 42,
    featured: true,
  },
  {
    slug: 'lake-restoration-conservation',
    title: 'Community Lake & Wetland Restoration',
    category: 'Water',
    location: 'India',
    image: '/images/campaign-lake-restoration.png',
    summary:
      'De-silt and ecologically restore community water reservoirs to recharge groundwater aquifers and provide drinking water sources for 15 villages.',
    raised: 4350000,
    goal: 8000000,
    donors: 920,
    daysLeft: 60,
  },
  {
    slug: 'community-kitchens-slums',
    title: 'Empowering Women via Community Kitchens',
    category: 'Food',
    location: 'India',
    image: '/images/campaign-women-kitchen.png',
    summary:
      'Train women self-help groups to operate community kitchens that serve low-cost, wholesome hot meals to migrant laborers and marginalized elders.',
    raised: 980000,
    goal: 2500000,
    donors: 310,
    daysLeft: 15,
  },
  {
    slug: 'maternal-child-nutrition-kits',
    title: 'Maternal & Child Nutritional Support',
    category: 'Healthcare',
    location: 'India',
    image: '/images/campaign-maternal-nutrition.png',
    summary:
      'Provide direct critical prenatal vitamins, iron supplements, and fortified nutrient mixes to 3,000 expectant mothers in remote tribal communities.',
    raised: 1670000,
    goal: 3800000,
    donors: 512,
    daysLeft: 20,
    featured: true,
  },
  {
    slug: 'special-education-learning-aids',
    title: 'Learning Aids for Differently-Abled Children',
    category: 'Education',
    location: 'India',
    image: '/images/campaign-special-learning.png',
    summary:
      'Distribute sensory kits, Braille teaching devices, and speech-assistive learning tablets to 600 special education students in low-income schools.',
    raised: 1400000,
    goal: 3200000,
    donors: 390,
    daysLeft: 28,
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
    location: 'Lodhi Garden, New Delhi',
    type: 'Fundraiser',
    spots: '320 joined',
  },
  {
    title: 'Build Day: School Construction',
    date: 'May 03, 2026',
    location: 'Bhubaneswar, Odisha',
    type: 'Volunteer',
    spots: '8 spots left',
  },
  {
    title: 'Community Meal Packing',
    date: 'May 18, 2026',
    location: 'Pune, Maharashtra',
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
      'Host events, raise awareness, and grow the HFS community in your own city.',
    commitment: 'Ongoing',
  },
]

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
