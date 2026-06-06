import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CampaignCard } from '@/components/campaign-card'
import { campaigns } from '@/lib/data'

export function FeaturedCampaigns() {
  const featured = campaigns.filter((c) => c.featured)

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand">
              Active campaigns
            </span>
            <h2 className="mt-2 text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Where your help is needed most
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
              Every campaign is vetted, tracked, and reported on. Choose a cause
              and follow your impact all the way to the community.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/campaigns">
              View all <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((campaign) => (
            <CampaignCard key={campaign.slug} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  )
}
