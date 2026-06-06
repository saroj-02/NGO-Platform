'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
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
          Message sent
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out. Our team will get back to you within one
          business day.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="c-name">Name</Label>
          <Input id="c-name" required placeholder="Jane Doe" className="bg-background" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="c-email">Email</Label>
          <Input
            id="c-email"
            type="email"
            required
            placeholder="jane@email.com"
            className="bg-background"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-1.5">
        <Label htmlFor="c-subject">Subject</Label>
        <Input
          id="c-subject"
          required
          placeholder="How can we help?"
          className="bg-background"
        />
      </div>

      <div className="mt-4 grid gap-1.5">
        <Label htmlFor="c-message">Message</Label>
        <Textarea
          id="c-message"
          required
          rows={5}
          placeholder="Tell us more…"
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
            <Loader2 className="mr-1 size-4 animate-spin" /> Sending…
          </>
        ) : (
          'Send message'
        )}
      </Button>
    </form>
  )
}
