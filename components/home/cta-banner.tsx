import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaBanner() {
  return (
    <section className="bg-background pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-accent-blue px-6 py-14 text-accent-blue-foreground sm:px-12 lg:px-16">
          <Heart
            className="pointer-events-none absolute -right-8 -top-8 size-48 text-accent-blue-foreground/10"
            fill="currentColor"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Your generosity can change a life today
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-accent-blue-foreground/90">
              Join over 100,000 monthly donors building a more hopeful world.
              Give once or set up a recurring gift in under a minute.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link href="/campaigns">
                  Donate now <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-accent-blue-foreground/40 bg-transparent text-accent-blue-foreground hover:bg-accent-blue-foreground/10"
              >
                <Link href="/volunteer">Give your time</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
