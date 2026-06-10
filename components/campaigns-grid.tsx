'use client'

import { useState, useEffect } from 'react'
import { CampaignCard } from '@/components/campaign-card'
import { type Campaign } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const categories: ('All' | Campaign['category'])[] = [
  'All',
  'Water',
  'Education',
  'Food',
  'Healthcare',
]

export function CampaignsGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>('All')
  const [campaignsList, setCampaignsList] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/campaigns')
      .then((res) => res.json())
      .then((data) => {
        setCampaignsList(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch campaigns', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 bg-background">
        <Loader2 className="size-8 animate-spin text-brand" />
      </div>
    )
  }

  const filtered =
    active === 'All'
      ? campaignsList
      : campaignsList.filter((c) => c.category === active)

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
