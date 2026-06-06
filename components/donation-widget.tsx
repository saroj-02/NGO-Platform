'use client'

import { useState } from 'react'
import { Check, CreditCard, Heart, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { formatCurrency, type Campaign } from '@/lib/data'

const presetAmounts = [25, 50, 100, 250]

export function DonationWidget({ campaign }: { campaign: Campaign }) {
  const [amount, setAmount] = useState<number>(50)
  const [custom, setCustom] = useState('')
  const [recurring, setRecurring] = useState(false)
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle')

  const activeAmount = custom ? Number(custom) || 0 : amount

  function handleDonate(e: React.FormEvent) {
    e.preventDefault()
    setStatus('processing')
    setTimeout(() => setStatus('done'), 1500)
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl bg-card p-7 text-center shadow-sm ring-1 ring-border">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Check className="size-7" />
        </span>
        <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
          Thank you for your gift!
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          Your {recurring ? 'monthly ' : ''}donation of{' '}
          <span className="font-semibold text-foreground">
            {formatCurrency(activeAmount)}
          </span>{' '}
          to {campaign.title} is being processed. A receipt is on its way to
          your inbox.
        </p>
        <Button
          className="mt-5 w-full bg-brand text-brand-foreground hover:bg-brand/90"
          onClick={() => {
            setStatus('idle')
            setCustom('')
          }}
        >
          Make another donation
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleDonate}
      className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border"
    >
      <h3 className="font-heading text-lg font-bold text-foreground">
        Make a donation
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {presetAmounts.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => {
              setAmount(amt)
              setCustom('')
            }}
            className={cn(
              'rounded-lg border py-3 text-sm font-semibold transition-colors',
              !custom && amount === amt
                ? 'border-brand bg-brand/10 text-brand'
                : 'border-border bg-background text-foreground hover:border-brand/50',
            )}
          >
            {formatCurrency(amt)}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <Label htmlFor="custom-amount" className="sr-only">
          Custom amount
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <Input
            id="custom-amount"
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="Other amount"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="bg-background pl-7"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setRecurring((v) => !v)}
        className={cn(
          'mt-4 flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors',
          recurring
            ? 'border-brand bg-brand/10 text-brand'
            : 'border-border bg-background text-foreground',
        )}
      >
        <span className="flex items-center gap-2 font-medium">
          <Heart className={cn('size-4', recurring && 'fill-current')} />
          Make this monthly
        </span>
        <span
          className={cn(
            'flex size-5 items-center justify-center rounded-full border',
            recurring
              ? 'border-brand bg-brand text-brand-foreground'
              : 'border-border',
          )}
        >
          {recurring ? <Check className="size-3.5" /> : null}
        </span>
      </button>

      <Button
        type="submit"
        disabled={status === 'processing' || activeAmount <= 0}
        className="mt-5 w-full bg-brand text-brand-foreground hover:bg-brand/90"
        size="lg"
      >
        {status === 'processing' ? (
          <>
            <Loader2 className="mr-1 size-4 animate-spin" /> Processing…
          </>
        ) : (
          <>
            <CreditCard className="mr-1 size-4" /> Donate{' '}
            {activeAmount > 0 ? formatCurrency(activeAmount) : ''}
            {recurring ? '/mo' : ''}
          </>
        )}
      </Button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Secure payment. 94% goes directly to programs. Tax-deductible.
      </p>
    </form>
  )
}
