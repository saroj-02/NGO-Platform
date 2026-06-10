'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Loader2, CreditCard, Calendar, Lock, AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCurrency, campaigns } from '@/lib/data'

function SimulatorContent() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const slug = params?.slug as string
  const amountStr = searchParams.get('amount') || '1000'
  const donorEmail = searchParams.get('donorEmail') || 'donor@email.com'
  const donorName = searchParams.get('donorName') || 'Guest Donor'
  const recurringStr = searchParams.get('recurring') || 'false'

  const campaign = campaigns.find((c) => c.slug === slug)
  const amount = Number(amountStr)
  const isRecurring = recurringStr === 'true'

  // Input states
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  
  // UI states
  const [isProcessing, setIsProcessing] = useState(false)
  const [statusText, setStatusText] = useState('Verifying secure connection...')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Format Card Number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value
    setCardNumber(formatted.substring(0, 19))
    setErrors((prev: Record<string, string>) => ({ ...prev, card: '' }))
  }

  // Format Expiry MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
    }
    setCardExpiry(value.substring(0, 5))
    setErrors((prev: Record<string, string>) => ({ ...prev, expiry: '' }))
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setCardCvv(value.substring(0, 4))
    setErrors((prev: Record<string, string>) => ({ ...prev, cvv: '' }))
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    const cleanCard = cardNumber.replace(/\s+/g, '')
    if (cleanCard.length < 12 || isNaN(Number(cleanCard))) {
      newErrors.card = 'Please enter a valid credit card number.'
    }
    if (!cardExpiry.includes('/') || cardExpiry.length < 5) {
      newErrors.expiry = 'Use MM/YY format.'
    }
    if (cardCvv.length < 3 || isNaN(Number(cardCvv))) {
      newErrors.cvv = 'Invalid CVV.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsProcessing(true)

    // Stage 1: Connecting
    setTimeout(() => {
      setStatusText('Authorizing transaction amount...')
      
      // Stage 2: Processing
      setTimeout(() => {
        setStatusText('Securing donor receipt tokens...')
        
        // Stage 3: Redirecting back to success page
        setTimeout(() => {
          const mockSessionId = `sim_session_${Math.random().toString(36).substr(2, 9)}`
          router.replace(
            `/campaigns/${slug}?success=true&amount=${amount}&session_id=${mockSessionId}&donorEmail=${encodeURIComponent(donorEmail)}&donorName=${encodeURIComponent(donorName)}`
          )
        }, 800)
      }, 1000)
    }, 1000)
  }

  if (!campaign) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 text-center bg-secondary/35">
        <div className="max-w-md rounded-2xl bg-card p-6 shadow-md ring-1 ring-border">
          <AlertCircle className="mx-auto size-12 text-destructive" />
          <h3 className="mt-4 font-heading text-lg font-bold">Campaign Not Found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The campaign you are attempting to donate to could not be found.
          </p>
          <Button asChild className="mt-5 bg-brand text-brand-foreground hover:bg-brand/90">
            <Link href="/campaigns">Browse Campaigns</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/35 p-4 sm:p-6 lg:p-8">
      {/* Simulation Banner */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-lg px-4">
        <div className="rounded-full bg-brand/10 border border-brand/20 px-4 py-1.5 text-center text-xs font-semibold text-brand flex items-center justify-center gap-1.5">
          <ShieldCheck className="size-4 animate-pulse" /> HFS Secure Sandbox Simulator (Demo Mode)
        </div>
      </div>

      <div className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-8 relative mt-8">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-300">
            <Loader2 className="size-12 animate-spin text-brand" />
            <h3 className="mt-6 font-heading text-lg font-bold text-foreground">
              Processing Secure Payment
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              {statusText}
            </p>
            <div className="mt-8 flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/60 px-3 py-1.5 rounded-full border border-border">
              <Lock className="size-3.5" /> 256-bit encryption active
            </div>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-extrabold text-foreground">
                  HFS Checkout Portal
                </h2>
                <ShieldCheck className="size-6 text-brand" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Secured in partnership with global banking tokens.
              </p>
            </div>

            {/* Campaign Summary */}
            <div className="rounded-2xl bg-secondary/60 p-4 border border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Campaign:</span>
                <span className="font-bold text-foreground truncate max-w-[220px]">
                  {campaign.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Donor Email:</span>
                <span className="font-medium text-foreground">{donorEmail}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="text-muted-foreground font-semibold">Total Donation:</span>
                <span className="font-extrabold text-brand text-base">
                  {formatCurrency(amount)}
                  {isRecurring ? ' / mo' : ''}
                </span>
              </div>
            </div>

            {/* Card Inputs */}
            <div className="space-y-4">
              <div className="grid gap-1.5">
                <Label htmlFor="sim-card-number">Card Number</Label>
                <div className="relative">
                  <Input
                    id="sim-card-number"
                    type="text"
                    required
                    placeholder="4111 1111 1111 1111"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="bg-background pr-10 font-mono tracking-widest text-sm"
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
                {errors.card && (
                  <span className="text-xs text-destructive">{errors.card}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="sim-card-expiry">Expiry Date</Label>
                  <div className="relative">
                    <Input
                      id="sim-card-expiry"
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className="bg-background text-center font-mono"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground hidden sm:block" />
                  </div>
                  {errors.expiry && (
                    <span className="text-xs text-destructive">{errors.expiry}</span>
                  )}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="sim-card-cvv">CVV</Label>
                  <Input
                    id="sim-card-cvv"
                    type="password"
                    required
                    placeholder="•••"
                    value={cardCvv}
                    onChange={handleCvvChange}
                    className="bg-background text-center font-mono"
                  />
                  {errors.cvv && (
                    <span className="text-xs text-destructive">{errors.cvv}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-bold py-6 text-base shadow-md"
              >
                Confirm Donation of {formatCurrency(amount)}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.replace(`/campaigns/${slug}?cancelled=true`)}
                className="w-full text-muted-foreground hover:text-foreground font-semibold"
              >
                <ArrowLeft className="mr-1.5 size-4" /> Cancel and Go Back
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground border-t border-border pt-4">
              <Lock className="size-3" /> PCI-DSS Compliant Encryption Simulation.
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function SimulatorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-secondary/35">
          <Loader2 className="size-8 animate-spin text-brand" />
        </div>
      }
    >
      <SimulatorContent />
    </Suspense>
  )
}
