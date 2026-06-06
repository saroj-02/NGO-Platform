import { HandHeart, Search, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Choose a cause',
    description:
      'Browse vetted campaigns across water, education, food, and healthcare. Every project is verified by our field teams.',
  },
  {
    icon: HandHeart,
    title: 'Give with confidence',
    description:
      'Donate securely in seconds. 94% of your gift goes directly to programs, and you receive an instant tax receipt.',
  },
  {
    icon: TrendingUp,
    title: 'Track your impact',
    description:
      'Follow real-time progress, photos, and reports from the field so you always know exactly what your gift achieved.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">
            How it works
          </span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Giving that you can see and trust
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            We built HopeBridge to remove the distance between generosity and
            impact. Here is how every contribution turns into change.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl bg-card p-7 shadow-sm ring-1 ring-border"
            >
              <span className="absolute right-6 top-6 font-heading text-4xl font-extrabold text-border">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <step.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
