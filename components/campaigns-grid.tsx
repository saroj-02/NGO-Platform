'use client'

import { useState } from 'react'
import { CampaignCard } from '@/components/campaign-card'
import { campaigns, type Campaign } from '@/lib/data'
import { cn } from '@/lib/utils'

const categories: ('All' | Campaign['category'])[] = [
  'All',
  'Water',
  'Education',
  'Food',
  'Healthcare',
]

export function CampaignsGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>('All')

  const filtered =
    active === 'All'
      ? campaigns
      : campaigns.filter((c) => c.category === active)

  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                active === cat
                  ? 'bg-brand text-brand-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-border',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((campaign) => (
            <CampaignCard key={campaign.slug} campaign={campaign} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No campaigns in this category yet. Check back soon.
          </p>
        ) : null}
      </div>
    </section>
  )
}
