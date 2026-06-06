import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const metadata = {
  title: 'Sign in — HopeBridge',
  description: 'Sign in to your HopeBridge donor account.',
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary/40 px-4 py-12">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-lg bg-brand text-brand-foreground">
          <Heart className="size-5" fill="currentColor" />
        </span>
        <span className="font-heading text-lg font-extrabold tracking-tight text-foreground">
          HopeBridge
        </span>
      </Link>

      <div className="mt-8 w-full max-w-md rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to manage your giving and track your impact.
        </p>

        <form className="mt-6 space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="you@email.com"
              className="bg-background"
            />
          </div>
          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm text-brand hover:underline">
                Forgot?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="bg-background"
            />
          </div>
          <Button className="w-full bg-brand text-brand-foreground hover:bg-brand/90">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{' '}
          <Link href="/campaigns" className="font-medium text-brand hover:underline">
            Start by donating
          </Link>
        </p>
      </div>
    </main>
  )
}
