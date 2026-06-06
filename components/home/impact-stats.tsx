import { impactStats } from '@/lib/data'

export function ImpactStats() {
  return (
    <section className="border-y border-border bg-brand text-brand-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {impactStats.map((stat) => (
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
