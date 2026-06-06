import Link from 'next/link'
import { Heart, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const footerNav = [
  {
    title: 'Get Involved',
    links: [
      { href: '/campaigns', label: 'Donate' },
      { href: '/volunteer', label: 'Volunteer' },
      { href: '/volunteer', label: 'Fundraise' },
      { href: '/volunteer', label: 'Events' },
    ],
  },
  {
    title: 'Organization',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/stories', label: 'Impact Stories' },
      { href: '/about', label: 'Transparency' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/about', label: 'Annual Report' },
      { href: '/about', label: 'Financials' },
      { href: '/contact', label: 'Press' },
      { href: '/contact', label: 'Careers' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <Heart className="size-5" fill="currentColor" />
              </span>
              <span className="font-heading text-lg font-extrabold tracking-tight text-foreground">
                HopeBridge
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              We connect compassionate people with communities in need, funding
              transparent campaigns for clean water, education, food, and
              healthcare around the world.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-brand" /> 120 Hope Street, New York, NY
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 text-brand" /> hello@hopebridge.org
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 text-brand" /> +1 (800) 555-0142
              </p>
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm font-bold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link, i) => (
                  <li key={`${link.href}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Stay connected to the impact
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Monthly stories from the field. No spam, unsubscribe anytime.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                required
                placeholder="you@email.com"
                aria-label="Email address"
                className="bg-background"
              />
              <Button
                type="submit"
                className="shrink-0 bg-brand text-brand-foreground hover:bg-brand/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} HopeBridge Foundation. A registered
            501(c)(3) nonprofit. EIN 00-0000000.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/about" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/about" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/about" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
