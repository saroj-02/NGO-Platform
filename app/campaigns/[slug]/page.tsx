import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle2, MapPin, Users } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { DonationWidget } from '@/components/donation-widget'
import { campaigns, formatCurrency } from '@/lib/data'

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const campaign = campaigns.find((c) => c.slug === slug)
  if (!campaign) return { title: 'Campaign — HFS' }
  return {
    title: `${campaign.title} — HFS`,
    description: campaign.summary,
  }
}

const highlights = [
  'Verified by HFS field teams on the ground',
  'Transparent reporting with photos and receipts',
  '94% of funds go directly to program delivery',
]

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const campaign = campaigns.find((c) => c.slug === slug)
  if (!campaign) notFound()

  const pct = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100))

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All campaigns
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-border">
                <Image
                  src={campaign.image || '/placeholder.svg'}
                  alt={campaign.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <Badge className="absolute left-4 top-4 border-0 bg-brand text-brand-foreground">
                  {campaign.category}
                </Badge>
              </div>

              <p className="mt-6 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <MapPin className="size-4 text-brand" /> {campaign.location}
              </p>
              <h1 className="mt-2 text-balance font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {campaign.title}
              </h1>

              <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
                <p>{campaign.summary}</p>
                <p>
                  In partnership with local leaders, this campaign delivers
                  durable infrastructure and training so the impact lasts long
                  after the project ends. Every contribution is tracked from the
                  moment you give to the day the community celebrates completion.
                </p>
                <p>
                  When you donate, you join a community of supporters who receive
                  regular updates, photos, and a full accounting of how funds are
                  spent. Transparency is at the heart of everything we do.
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-secondary/50 p-6 ring-1 ring-border">
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Why you can trust this campaign
                </h2>
                <ul className="mt-4 space-y-3">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                  <div className="flex items-baseline justify-between">
                    <span className="font-heading text-2xl font-extrabold text-foreground">
                      {formatCurrency(campaign.raised)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {pct}% funded
                    </span>
                  </div>
                  <Progress value={pct} className="mt-3 h-2.5" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    raised of {formatCurrency(campaign.goal)} goal
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="size-4" />{' '}
                      {campaign.donors.toLocaleString()} donors
                    </span>
                    <span className="font-medium text-foreground">
                      {campaign.daysLeft} days left
                    </span>
                  </div>
                </div>

                <DonationWidget campaign={campaign} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
