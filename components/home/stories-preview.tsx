import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { stories } from '@/lib/data'

export function StoriesPreview() {
  const [featured, ...rest] = stories

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-accent-blue">
              Impact stories
            </span>
            <h2 className="mt-2 text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Real people, lasting change
            </h2>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/stories">
              Read all stories <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Link
            href={`/stories`}
            className="group relative overflow-hidden rounded-3xl ring-1 ring-border"
          >
            <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full">
              <Image
                src={featured.image || '/placeholder.svg'}
                alt={featured.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7 text-background">
              <Quote className="size-7 text-background/80" />
              <p className="mt-3 text-pretty font-heading text-xl font-bold leading-snug">
                {featured.excerpt}
              </p>
              <p className="mt-3 text-sm text-background/80">
                {featured.name} · {featured.role}
              </p>
            </div>
          </Link>

          <div className="grid gap-6">
            {rest.map((story) => (
              <Link
                key={story.slug}
                href="/stories"
                className="group flex gap-5 rounded-2xl bg-card p-4 ring-1 ring-border transition-shadow hover:shadow-md"
              >
                <div className="relative size-28 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={story.image || '/placeholder.svg'}
                    alt={story.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="112px"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {story.category}
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-bold leading-snug text-foreground">
                    {story.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {story.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
