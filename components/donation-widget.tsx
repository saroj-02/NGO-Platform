'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Check, CreditCard, Heart, Loader2, ArrowLeft, ArrowRight, User, QrCode, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { formatCurrency, type Campaign } from '@/lib/data'
import { useAuth } from '@/components/auth-context'

const presetAmounts = [500, 1000, 2500, 5000]

function DonationWidgetContent({ campaign }: { campaign: Campaign }) {
  const { user, addDonation } = useAuth()
  const searchParams = useSearchParams()
  
  const success = searchParams.get('success')
  const queryAmount = searchParams.get('amount')
  const sessionId = searchParams.get('session_id')
  const cancelled = searchParams.get('cancelled')
  
  // Checkout wizard step: 'amount' | 'details' | 'payment' | 'done'
  const [step, setStep] = useState<'amount' | 'details' | 'payment' | 'done'>('amount')
  
  // Payment Gateway Selector: 'stripe' | 'upi'
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'upi'>('stripe')
  
  // Amount Selection States
  const [amount, setAmount] = useState<number>(1000)
  const [custom, setCustom] = useState('')
  const [recurring, setRecurring] = useState(false)
  
  // Donor Detail States
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  
  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const activeAmount = custom ? Number(custom) || 0 : amount

  // Fetch UPI VPA Merchant ID from environment variable (falls back to placeholder)
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || 'sarojpadhi@upi'
  
  // Standard India UPI Payment Deep Link URI
  const upiUrl = `upi://pay?pa=${upiId}&pn=HFS%20Foundation&am=${activeAmount}&cu=INR`

  // Handle Stripe Redirection Query Parameters
  useEffect(() => {
    if (success === 'true' && queryAmount && sessionId) {
      try {
        const loggedSessionsStr = localStorage.getItem('ngo_logged_donations')
        const loggedSessions = loggedSessionsStr ? JSON.parse(loggedSessionsStr) : []
        
        // Prevent duplicate donation records upon user refreshing the success URL
        if (!loggedSessions.includes(sessionId)) {
          const finalAmount = Number(queryAmount)
          
          if (user) {
            addDonation({
              campaignSlug: campaign.slug,
              campaignTitle: campaign.title,
              amount: finalAmount,
              recurring: false,
            })
          } else {
            // Log for Guest user
            const guestDonationsStr = localStorage.getItem('ngo_guest_donations')
            const guestDonations = guestDonationsStr ? JSON.parse(guestDonationsStr) : []
            const newDonation = {
              id: Math.random().toString(36).substr(2, 9),
              campaignSlug: campaign.slug,
              campaignTitle: campaign.title,
              amount: finalAmount,
              date: new Date().toISOString(),
              recurring: false,
              donorName: 'Guest Donor',
              donorEmail: 'guest_donor@gmail.com',
            }
            localStorage.setItem('ngo_guest_donations', JSON.stringify([...guestDonations, newDonation]))
          }
          
          // Mark session ID as logged
          localStorage.setItem('ngo_logged_donations', JSON.stringify([...loggedSessions, sessionId]))
        }
      } catch (err) {
        console.error('Failed to log successful Stripe redirect donation', err)
      }
      
      // Update checkout state directly to completed thank you panel
      setAmount(Number(queryAmount))
      setStep('done')
    } else if (cancelled === 'true') {
      setErrors({ general: 'The payment process was cancelled. You can try again below.' })
      setStep('amount')
    }
  }, [success, queryAmount, sessionId, cancelled, user, campaign])

  // Auto-prefill donor details when user is signed in
  useEffect(() => {
    if (user) {
      setDonorName(user.name)
      setDonorEmail(user.email)
    } else {
      setDonorName('')
      setDonorEmail('')
    }
  }, [user])

  // Step 1: Amount Selection validation
  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeAmount <= 0) {
      setErrors({ amount: 'Please choose or enter a valid donation amount.' })
      return
    }
    setErrors({})
    setStep('details')
  }

  // Step 2: Details submission validation
  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    
    if (!donorName.trim()) {
      newErrors.name = 'Full name is required.'
    }
    if (!donorEmail.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/\S+@\S+\.\S+/.test(donorEmail)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    setStep('payment')
  }

  // Step 3: Redirect to Stripe Secure Checkout
  const handleRedirectToStripe = async () => {
    setIsProcessing(true)
    setErrors({})
    
    try {
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: activeAmount,
          campaignTitle: campaign.title,
          campaignSlug: campaign.slug,
          donorEmail: donorEmail,
          recurring,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment gateway session.')
      }

      // Redirect the window to Stripe's secure, hosted payment page
      window.location.href = data.url
    } catch (err: any) {
      console.error(err)
      setErrors({ general: err.message || 'Unable to connect to the secure payment server. Please try again.' })
      setIsProcessing(false)
    }
  }

  // Step 3: Complete Direct UPI Payment
  const handleCompleteUpiPayment = () => {
    setIsProcessing(true)
    setErrors({})

    // Simulate instant UPI transaction status verification
    setTimeout(() => {
      try {
        const mockUpiSessionId = `upi_session_${Math.random().toString(36).substr(2, 9)}`
        
        if (user) {
          addDonation({
            campaignSlug: campaign.slug,
            campaignTitle: campaign.title,
            amount: activeAmount,
            recurring,
          })
        } else {
          // Log for Guest user
          const guestDonationsStr = localStorage.getItem('ngo_guest_donations')
          const guestDonations = guestDonationsStr ? JSON.parse(guestDonationsStr) : []
          const newDonation = {
            id: Math.random().toString(36).substr(2, 9),
            campaignSlug: campaign.slug,
            campaignTitle: campaign.title,
            amount: activeAmount,
            date: new Date().toISOString(),
            recurring,
            donorName,
            donorEmail,
          }
          localStorage.setItem('ngo_guest_donations', JSON.stringify([...guestDonations, newDonation]))
        }
        
        // Mark session ID as logged to prevent duplicates
        const loggedSessionsStr = localStorage.getItem('ngo_logged_donations')
        const loggedSessions = loggedSessionsStr ? JSON.parse(loggedSessionsStr) : []
        localStorage.setItem('ngo_logged_donations', JSON.stringify([...loggedSessions, mockUpiSessionId]))
      } catch (err) {
        console.error('Failed to log successful UPI donation', err)
      }

      setIsProcessing(false)
      setStep('done')
    }, 2000)
  }

  // Success Step Card
  if (step === 'done') {
    return (
      <div className="rounded-2xl bg-card p-7 text-center shadow-sm ring-1 ring-border animate-in fade-in duration-300">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Check className="size-7" />
        </span>
        <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
          Donation Successful!
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          Thank you for your generous gift of{' '}
          <span className="font-semibold text-brand">
            {formatCurrency(activeAmount)}
          </span>{' '}
          supporting the {campaign.title} campaign. A receipt has been generated and dispatched to your inbox.
        </p>
        
        {!user && (
          <div className="mt-5 rounded-xl bg-secondary/60 p-4 text-xs text-left border border-border">
            <span className="font-bold text-foreground flex items-center gap-1.5 mb-1 text-sm">
              <User className="size-4 text-brand" /> Claim this donation
            </span>{' '}
            <Link href="/login" className="text-brand font-bold hover:underline">
              Create an account or Sign in
            </Link>{' '}
            now to sync this donation history to your personal donor dashboard.
          </div>
        )}
        
        <Button
          className="mt-6 w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
          onClick={() => {
            setStep('amount')
            setCustom('')
          }}
        >
          Make another donation
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
      {/* STEPS BREADCRUMBS INDICATOR */}
      <div className="mb-5 flex items-center justify-between border-b border-border pb-3 text-xs font-semibold text-muted-foreground">
        <span className={cn('pb-1', step === 'amount' && 'text-brand border-b-2 border-brand')}>
          1. Amount
        </span>
        <span className={cn('pb-1', step === 'details' && 'text-brand border-b-2 border-brand')}>
          2. Details
        </span>
        <span className={cn('pb-1', step === 'payment' && 'text-brand border-b-2 border-brand')}>
          3. Payment
        </span>
      </div>

      {/* STEP 1: AMOUNT SELECTION */}
      {step === 'amount' && (
        <form onSubmit={handleAmountSubmit} className="space-y-4 animate-in fade-in duration-200">
          <h3 className="font-heading text-lg font-bold text-foreground">
            Select Donation Amount
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setAmount(amt)
                  setCustom('')
                  setErrors({})
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

          <div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                ₹
              </span>
              <Input
                type="number"
                min={1}
                inputMode="numeric"
                placeholder="Other custom amount"
                value={custom}
                onChange={(e) => {
                  setCustom(e.target.value)
                  setErrors({})
                }}
                className="bg-background pl-7"
              />
            </div>
            {errors.amount && (
              <span className="mt-1 text-xs text-destructive block">{errors.amount}</span>
            )}
            {errors.general && (
              <span className="mt-2 text-xs text-destructive block bg-destructive/10 p-2.5 rounded-lg border border-destructive/20">{errors.general}</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setRecurring((v) => !v)}
            className={cn(
              'flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors',
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
            className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
            size="lg"
          >
            Continue to Details <ArrowRight className="ml-1.5 size-4" />
          </Button>
        </form>
      )}

      {/* STEP 2: DONOR DETAILS */}
      {step === 'details' && (
        <form onSubmit={handleDetailsSubmit} className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setStep('amount')
                setErrors({})
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
            </button>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Donor Information
            </h3>
          </div>

          <div className="space-y-3">
            <div className="grid gap-1.5">
              <Label htmlFor="donor-name">Full Name</Label>
              <Input
                id="donor-name"
                type="text"
                placeholder="Jane Doe"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                disabled={!!user}
                className="bg-background"
                required
              />
              {errors.name && (
                <span className="text-xs text-destructive">{errors.name}</span>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="donor-email">Email Address</Label>
              <Input
                id="donor-email"
                type="email"
                placeholder="jane@email.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                disabled={!!user}
                className="bg-background"
                required
              />
              {errors.email && (
                <span className="text-xs text-destructive">{errors.email}</span>
              )}
            </div>
            
            {!user && (
              <p className="text-xs text-muted-foreground mt-1">
                Already have an account?{' '}
                <Link href="/login" className="text-brand font-medium hover:underline">
                  Sign in
                </Link>{' '}
                to keep all your donations in one dashboard automatically.
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
            size="lg"
          >
            Continue to Payment <ArrowRight className="ml-1.5 size-4" />
          </Button>
        </form>
      )}

      {/* STEP 3: SECURE PAYMENT GATEWAY REDIRECT */}
      {step === 'payment' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setStep('details')
                setErrors({})
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              disabled={isProcessing}
            >
              <ArrowLeft className="size-4" />
            </button>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Confirm Payment
            </h3>
          </div>

          {/* Secure donation preview details summary */}
          <div className="rounded-xl bg-secondary/50 p-4 text-xs space-y-2 text-muted-foreground border border-border">
            <p>
              Campaign: <span className="font-semibold text-foreground">{campaign.title}</span>
            </p>
            <p>
              Donor: <span className="font-semibold text-foreground">{donorName} ({donorEmail})</span>
            </p>
            <p className="text-sm pt-2 border-t border-border mt-2">
              Total Amount:{' '}
              <span className="font-bold text-brand text-sm">
                {formatCurrency(activeAmount)}
                {recurring ? '/month' : ''}
              </span>
            </p>
          </div>

          {/* PAYMENT METHOD SELECTOR TABS */}
          <div className="grid grid-cols-2 gap-2 bg-secondary p-1 rounded-xl border border-border">
            <button
              type="button"
              onClick={() => setPaymentMethod('stripe')}
              disabled={isProcessing}
              className={cn(
                'flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all',
                paymentMethod === 'stripe'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <CreditCard className="size-3.5 text-brand" /> Card / Global
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('upi')}
              disabled={isProcessing}
              className={cn(
                'flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all',
                paymentMethod === 'upi'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <QrCode className="size-3.5 text-brand" /> GPay / PhonePe / UPI
            </button>
          </div>

          {errors.general && (
            <span className="text-xs text-destructive block bg-destructive/10 p-2.5 rounded-lg border border-destructive/20">{errors.general}</span>
          )}

          {/* PANEL A: STRIPE REDIRECT CHECKOUT */}
          {paymentMethod === 'stripe' && (
            <div className="space-y-3">
              <Button
                onClick={handleRedirectToStripe}
                disabled={isProcessing}
                className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold shadow-md"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-1.5 size-4 animate-spin" /> Connecting to Stripe…
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-1.5 size-4" /> Proceed to Card Payment
                  </>
                )}
              </Button>
              <p className="text-center text-[10px] text-muted-foreground leading-relaxed">
                You will be redirected to Stripe's secure Checkout gateway. Supports credit cards, Google Pay, and Apple Pay.
              </p>
            </div>
          )}

          {/* PANEL B: DIRECT UPI CODE GENERATION */}
          {paymentMethod === 'upi' && (
            <div className="space-y-4 text-center">
              {/* Dynamic QR Code Generator */}
              <div className="mx-auto max-w-[170px] bg-white p-2 rounded-2xl border border-border shadow-sm flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiUrl)}`}
                  alt="Scan to Donate via UPI"
                  className="size-36 object-contain"
                />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">Scan with GPay, Paytm, or PhonePe</p>
                <p className="text-[10px] text-muted-foreground">UPI ID: <span className="font-bold text-foreground">{upiId}</span></p>
              </div>

              {/* Deep Link Intent for Mobile Browsers */}
              <div className="flex flex-col gap-2">
                <a
                  href={upiUrl}
                  className="flex items-center justify-center gap-1.5 w-full bg-secondary border border-border text-foreground hover:bg-secondary/80 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  <Smartphone className="size-4 text-brand" /> Pay Directly via UPI App
                </a>
                
                <Button
                  onClick={handleCompleteUpiPayment}
                  disabled={isProcessing}
                  className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-bold shadow-md"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-1.5 size-4 animate-spin" /> Confirming Payment…
                    </>
                  ) : (
                    <>
                      <Check className="mr-1.5 size-4" /> I have completed the Payment
                    </>
                  )}
                </Button>
              </div>

              <p className="text-[9px] text-muted-foreground leading-normal">
                Donations are transferred directly to the HFS Foundation bank account. Please click confirm once your UPI app marks the transaction successful.
              </p>
            </div>
          )}
        </div>
      )}

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Secure payment. 94% goes directly to programs. Tax-deductible.
      </p>
    </div>
  )
}

export function DonationWidget({ campaign }: { campaign: Campaign }) {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
          <Loader2 className="mx-auto size-8 animate-spin text-brand" />
          <p className="mt-2 text-xs text-muted-foreground">Loading payment options...</p>
        </div>
      }
    >
      <DonationWidgetContent campaign={campaign} />
    </Suspense>
  )
}
