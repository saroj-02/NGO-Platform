import Image from 'next/image'
import { Eye, HandHeart, ShieldCheck, Target } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { CtaBanner } from '@/components/home/cta-banner'
import { impactStats } from '@/lib/data'

export const metadata = {
  title: 'About — HopeBridge',
  description:
    'Learn about HopeBridge: our mission, values, transparency, and the team building bridges of hope worldwide.',
}

const values = [
  {
    icon: ShieldCheck,
    title: 'Radical transparency',
    description:
      'We publish where every dollar goes, with independent audits and real-time campaign reporting.',
  },
  {
    icon: HandHeart,
    title: 'Community-led',
    description:
      'Local leaders define the priorities. We provide the resources, training, and accountability.',
  },
  {
    icon: Target,
    title: 'Lasting impact',
    description:
      'We invest in durable infrastructure and skills so progress continues long after we leave.',
  },
  {
    icon: Eye,
    title: 'Dignity first',
    description:
      'Every person we serve is a partner, not a statistic. We lead with respect in all that we do.',
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <PageHeader
          eyebrow="About us"
          title="Bridging compassion and action since 2009"
          description="HopeBridge began with a simple belief: that generosity, when paired with transparency and local partnership, can transform communities for good."
        />

        <section className="py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-border">
              <Image
                src="/images/campaign-food.png"
                alt="Volunteers distributing food to families"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                Our mission
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                We connect compassionate people with vetted, community-led
                projects that deliver clean water, education, food security, and
                healthcare to those who need it most.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Over fifteen years, our model has remained the same: listen to
                communities, fund what works, measure everything, and report
                honestly. That discipline is why 94 cents of every dollar
                reaches the field and why our partners trust us to deliver.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-brand py-14 text-brand-foreground">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-extrabold sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-brand-foreground/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                The values that guide us
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                These principles shape every decision, partnership, and dollar
                we steward.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card key={value.title} className="p-6">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <value.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
              Accountable to you
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              HopeBridge is a registered 501(c)(3) nonprofit. Our financials are
              independently audited every year and published in full. We hold a
              top rating for transparency and accountability, because the trust
              you place in us is the foundation of everything we do.
            </p>
          </div>
        </section>

        <div className="pt-16">
          <CtaBanner />
        </div>
      </main>
      <Footer />
    </div>
  )
}
