import Image from 'next/image'
import { Quote } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { CtaBanner } from '@/components/home/cta-banner'
import { stories } from '@/lib/data'

export const metadata = {
  title: 'Impact Stories — HopeBridge',
  description:
    'Real stories of lasting change from the communities you support around the world.',
}

const testimonials = [
  {
    quote:
      'HopeBridge shows me exactly where my monthly gift goes. I have watched a whole village transform over two years.',
    name: 'Daniel R.',
    role: 'Monthly donor since 2021',
  },
  {
    quote:
      'Volunteering on a build trip was life-changing. The teams are organized, safe, and deeply connected to the community.',
    name: 'Priya S.',
    role: 'Field volunteer',
  },
  {
    quote:
      'As a partner organization, their transparency and reporting set the standard for the entire sector.',
    name: 'Grace M.',
    role: 'Local program partner',
  },
]

export default function StoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <PageHeader
          eyebrow="Impact stories"
          title="The change you make, in their words"
          description="Behind every statistic is a person whose life changed because someone chose to help. These are a few of their stories."
        />

        <section className="py-16">
          <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
            {stories.map((story, i) => (
              <div
                key={story.slug}
                className="grid items-center gap-8 lg:grid-cols-2"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-border ${
                    i % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={story.image || '/placeholder.svg'}
                    alt={story.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="text-sm font-semibold uppercase tracking-wider text-brand">
                    {story.category}
                  </span>
                  <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {story.name}
                    <span className="ml-2 text-base font-normal text-muted-foreground">
                      {story.role}
                    </span>
                  </h2>
                  <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                    {story.excerpt}
                  </p>
                  <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                    With continued support, this progress is becoming
                    permanent—new wells maintained by local teams, classrooms
                    staffed year-round, and families building toward a stable
                    future on their own terms.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-foreground">
              What our community says
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.name} className="p-6">
                  <Quote className="size-7 text-brand" />
                  <p className="mt-4 text-pretty leading-relaxed text-foreground">
                    {t.quote}
                  </p>
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="font-heading font-bold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </Card>
              ))}
            </div>
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
