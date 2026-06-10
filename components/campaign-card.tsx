import Image from 'next/image'
import Link from 'next/link'
import { Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { formatCurrency, type Campaign } from '@/lib/data'

const categoryStyles: Record<Campaign['category'], string> = {
  Water: 'bg-accent text-accent-blue-foreground',
  Education: 'bg-brand/10 text-brand',
  Food: 'bg-chart-4/15 text-chart-4',
  Healthcare: 'bg-chart-5/15 text-chart-5',
}

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const pct = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100))

  return (
    <Card className="group flex flex-col overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={campaign.image || '/placeholder.svg'}
          alt={campaign.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <Badge
          className={`absolute left-3 top-3 border-0 ${categoryStyles[campaign.category]}`}
        >
          {campaign.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold leading-snug text-foreground">
          {campaign.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {campaign.summary}
        </p>

        <div className="mt-4 space-y-2">
          <Progress value={pct} className="h-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-foreground">
              {formatCurrency(campaign.raised)}
            </span>
            <span className="text-muted-foreground">
              of {formatCurrency(campaign.goal)}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="size-3.5" /> {campaign.donors.toLocaleString()} donors
            </span>
            <span>{campaign.daysLeft} days left</span>
          </div>
        </div>

        <Button
          asChild
          className="mt-5 bg-brand text-brand-foreground hover:bg-brand/90"
        >
          <Link href={`/campaigns/${campaign.slug}`}>Donate now</Link>
        </Button>
      </div>
    </Card>
  )
}
