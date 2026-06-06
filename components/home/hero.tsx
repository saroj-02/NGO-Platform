import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
        <div className="flex flex-col">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
            <ShieldCheck className="size-4" />
            94% of every dollar reaches the field
          </span>
          <h1 className="mt-6 text-balance font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Building bridges of hope for communities worldwide
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            HopeBridge connects compassionate donors and volunteers with people
            in need. Fund clean water, education, food, and healthcare with full
            transparency from gift to impact.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <Link href="/campaigns">
                Donate now <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/volunteer">Become a volunteer</Link>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div>
              <p className="font-heading text-2xl font-bold text-foreground">
                2.4M+
              </p>
              <p>Lives impacted</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-heading text-2xl font-bold text-foreground">
                46
              </p>
              <p>Countries reached</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-heading text-2xl font-bold text-foreground">
                100K+
              </p>
              <p>Active donors</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-border">
            <Image
              src="/images/hero-children.png"
              alt="Children and a volunteer smiling together in a rural community"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-card p-4 shadow-lg ring-1 ring-border sm:block">
            <p className="text-xs font-medium text-muted-foreground">
              This month together
            </p>
            <p className="font-heading text-xl font-bold text-brand">
              $2.1M raised
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
