'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function VolunteerForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1400)
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Check className="size-7" />
        </span>
        <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
          Welcome to the team!
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          Thanks for stepping up. A volunteer coordinator will reach out within
          two business days with next steps and opportunities that match your
          interests.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8"
    >
      <h3 className="font-heading text-xl font-bold text-foreground">
        Sign up to volunteer
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Tell us a little about you and how you would like to help.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="v-first">First name</Label>
          <Input id="v-first" required placeholder="Jane" className="bg-background" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="v-last">Last name</Label>
          <Input id="v-last" required placeholder="Doe" className="bg-background" />
        </div>
      </div>

      <div className="mt-4 grid gap-1.5">
        <Label htmlFor="v-email">Email</Label>
        <Input
          id="v-email"
          type="email"
          required
          placeholder="jane@email.com"
          className="bg-background"
        />
      </div>

      <div className="mt-4 grid gap-1.5">
        <Label htmlFor="v-interest">Area of interest</Label>
        <select
          id="v-interest"
          className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          defaultValue="field"
        >
          <option value="field">Field volunteer</option>
          <option value="skilled">Skilled professional</option>
          <option value="ambassador">Local ambassador</option>
          <option value="events">Events &amp; fundraising</option>
        </select>
      </div>

      <div className="mt-4 grid gap-1.5">
        <Label htmlFor="v-message">Why do you want to join? (optional)</Label>
        <Textarea
          id="v-message"
          rows={3}
          placeholder="Share a little about your motivation or skills…"
          className="bg-background"
        />
      </div>

      <Button
        type="submit"
        disabled={status === 'sending'}
        size="lg"
        className="mt-6 w-full bg-brand text-brand-foreground hover:bg-brand/90"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="mr-1 size-4 animate-spin" /> Submitting…
          </>
        ) : (
          'Join the team'
        )}
      </Button>
    </form>
  )
}
