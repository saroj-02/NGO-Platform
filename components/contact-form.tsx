'use client'

import { useState, useEffect } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/components/auth-context'

export function ContactForm() {
  const { user, addContactMessage, saveFormDraft, clearFormDraft, getFormDraft } = useAuth()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  // Form input states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [draftLoaded, setDraftLoaded] = useState(false)

  // Load draft or autofill details
  useEffect(() => {
    const draft = getFormDraft('contact')
    if (draft) {
      setName(draft.name || '')
      setEmail(draft.email || '')
      setSubject(draft.subject || '')
      setMessage(draft.message || '')
    } else if (user) {
      setName(user.name)
      setEmail(user.email)
    }
    setDraftLoaded(true)
  }, [user])

  // Save draft dynamically when fields change
  useEffect(() => {
    if (draftLoaded && status === 'idle') {
      saveFormDraft('contact', {
        name,
        email,
        subject,
        message,
      })
    }
  }, [name, email, subject, message, draftLoaded, status])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    
    setTimeout(() => {
      if (user) {
        addContactMessage({
          name,
          email,
          subject,
          message,
        })
      } else {
        // Save to guest inquiries in localStorage
        try {
          const guestInquiriesStr = localStorage.getItem('ngo_guest_contact')
          const guestInquiries = guestInquiriesStr ? JSON.parse(guestInquiriesStr) : []
          const newInquiry = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            subject,
            message,
            date: new Date().toISOString(),
          }
          localStorage.setItem('ngo_guest_contact', JSON.stringify([...guestInquiries, newInquiry]))
        } catch (err) {
          console.error('Failed to save guest inquiry', err)
        }
      }

      clearFormDraft('contact')
      setStatus('sent')
    }, 1400)
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border animate-in fade-in duration-300">
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
        {!user && (
          <p className="mt-4 text-xs text-muted-foreground bg-secondary/50 rounded-xl p-3 text-left border border-border">
            <span className="font-semibold text-foreground">Tip:</span> If you sign up using <span className="font-semibold">{email}</span> later, this inquiry history will be logged to your account dashboard.
          </p>
        )}
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
          <Input
            id="c-name"
            required
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="c-email">Email</Label>
          <Input
            id="c-email"
            type="email"
            required
            placeholder="jane@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-background"
        />
      </div>

      <Button
        type="submit"
        disabled={status === 'sending'}
        size="lg"
        className="mt-6 w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
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
