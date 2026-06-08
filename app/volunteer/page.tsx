import Image from 'next/image'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VolunteerForm } from '@/components/volunteer-form'
import { events, volunteerRoles } from '@/lib/data'

export const metadata = {
  title: 'Volunteer & Events — HFS',
  description:
    'Give your time and skills. Explore volunteer roles and upcoming events with HFS (Help For Smile).',
}

const eventTypeStyles: Record<string, string> = {
  Volunteer: 'bg-brand/10 text-brand',
  Fundraiser: 'bg-accent text-accent-blue-foreground',
  Community: 'bg-chart-4/15 text-chart-4',
}

export default function VolunteerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <PageHeader
          eyebrow="Get involved"
          title="Give your time, change a life"
          description="Whether you have an hour or a month, there is a meaningful way to contribute. Join thousands of volunteers making hope tangible."
        />

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[21/9] overflow-hidden rounded-3xl ring-1 ring-border">
              <Image
                src="/images/volunteers-group.png"
                alt="A diverse group of volunteers working together outdoors"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <h2 className="mt-14 font-heading text-3xl font-bold tracking-tight text-foreground">
              Ways to get involved
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {volunteerRoles.map((role) => (
                <Card key={role.title} className="flex flex-col p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {role.title}
                  </h3>
                  <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {role.description}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                    <Clock className="size-4" /> {role.commitment}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
              Upcoming events
            </h2>
            <div className="mt-8 grid gap-4">
              {events.map((event) => (
                <Card
                  key={event.title}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <CalendarDays className="size-6" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`border-0 ${eventTypeStyles[event.type]}`}
                        >
                          {event.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {event.date}
                        </span>
                      </div>
                      <h3 className="mt-1.5 font-heading text-lg font-bold text-foreground">
                        {event.title}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-3.5" /> {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <span className="text-sm font-medium text-foreground">
                      {event.spots}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground">
                Ready to make a difference?
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                Volunteering with HFS is flexible and rewarding. Our
                coordinators will match you with opportunities that fit your
                schedule, skills, and passions—from a single afternoon to a
                dedicated field project.
              </p>
              <ul className="mt-6 space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-brand" /> Full training
                  and support provided
                </li>
                <li className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-brand" /> Local and
                  international opportunities
                </li>
                <li className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-brand" /> Flexible
                  commitments for any schedule
                </li>
              </ul>
            </div>
            <VolunteerForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
