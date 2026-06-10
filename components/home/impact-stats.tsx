import { getCampaigns } from '@/lib/db'

export function ImpactStats() {
  const campaigns = getCampaigns()
  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0)
  const totalDeliveredCr = 920 + totalRaised / 10000000 // Convert total raised INR to Crore, add to baseline 920 Cr

  const dynamicStats = [
    { value: '798K', label: 'Lives impacted' },
    { value: '28', label: 'States reached' },
    { value: `₹${totalDeliveredCr.toFixed(2)}Cr`, label: 'Funds delivered' },
    { value: '96%', label: 'Goes to programs' },
  ]

  return (
    <section className="border-y border-border bg-brand text-brand-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {dynamicStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-3xl font-extrabold sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-brand-foreground/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
