'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useAuth } from '@/components/auth-context'
import { SmileLogo } from '@/components/smile-logo'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, signIn, signUp, signInWithProvider, error, clearError } = useAuth()

  const callbackUrl = searchParams.get('callback') || '/dashboard'

  // Input states
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  
  const [signUpName, setSignUpName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('')

  // UI state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [socialLoading, setSocialLoading] = useState<{ open: boolean; provider: 'Google' | 'Apple' | null }>({
    open: false,
    provider: null,
  })
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState<string | null>(null)

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace(callbackUrl)
    }
  }, [user, router, callbackUrl])

  // Clear errors on change
  useEffect(() => {
    clearError()
    setFormErrors({})
  }, [signInEmail, signInPassword, signUpName, signUpEmail, signUpPassword, signUpConfirmPassword])

  // Handle Email Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    clearError()

    const success = await signIn(signInEmail, signInPassword)
    setIsSubmitting(false)
    if (success) {
      router.push(callbackUrl)
    }
  }

  // Handle Email Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})
    clearError()

    // Client-side validations
    const errors: Record<string, string> = {}
    if (signUpPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters.'
    }
    if (signUpPassword !== signUpConfirmPassword) {
      errors.confirmPassword = 'Passwords do not match.'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setIsSubmitting(false)
      return
    }

    const success = await signUp(signUpName, signUpEmail, signUpPassword)
    setIsSubmitting(false)
    if (success) {
      router.push(callbackUrl)
    }
  }

  // Handle Simulated Social Login
  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setSocialLoading({
      open: true,
      provider: provider === 'google' ? 'Google' : 'Apple',
    })

    try {
      const success = await signInWithProvider(provider)
      if (success) {
        // Redirect handled by the useEffect watching `user`
      }
    } catch (err) {
      console.error(err)
    } finally {
      // Keep loading open a tiny bit more for visual polish
      setTimeout(() => {
        setSocialLoading({ open: false, provider: null })
      }, 300)
    }
  }

  // Mock Forgot Password
  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!signInEmail) {
      setFormErrors({ email: 'Please enter your email address first.' })
      return
    }
    setForgotPasswordStatus(`Password reset link sent to ${signInEmail}!`)
    setTimeout(() => setForgotPasswordStatus(null), 4000)
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-secondary/40 px-4 py-12">
      {/* Social Loading Backdrop Overlay */}
      {socialLoading.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-card p-8 shadow-xl ring-1 ring-border border max-w-sm text-center">
            {socialLoading.provider === 'Google' ? (
              <span className="flex size-14 items-center justify-center rounded-full bg-red-500/10">
                <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
              </span>
            ) : (
              <span className="flex size-14 items-center justify-center rounded-full bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white">
                <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-1.07 1.65 0 3.14.59 4.17 1.93-3.29 1.93-2.76 6.09 1.1 7.66-.76 1.93-1.7 3.86-3.48 6.26zM15.96 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
                </svg>
              </span>
            )}
            <h3 className="font-heading text-lg font-bold text-foreground">
              Connecting to {socialLoading.provider}
            </h3>
            <p className="text-sm text-muted-foreground">
              Authenticating credentials and retrieving your donor profile securely.
            </p>
            <Loader2 className="size-6 animate-spin text-brand" />
          </div>
        </div>
      )}

      <Link href="/" className="flex items-center gap-2.5">
        <SmileLogo className="size-14" />
        <span className="font-heading text-xl font-extrabold tracking-tight text-foreground">
          HFS
        </span>
      </Link>

      <div className="mt-8 w-full max-w-md rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Error alerts */}
          {error && (
            <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-destructive/10 p-3.5 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success messages */}
          {forgotPasswordStatus && (
            <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-emerald-500/10 p-3.5 text-sm text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="mt-0.5 size-4 shrink-0" />
              <span>{forgotPasswordStatus}</span>
            </div>
          )}

          <TabsContent value="signin">
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in to manage your giving and track your impact.
              </p>

              <form onSubmit={handleSignIn} className="mt-6 space-y-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="bg-background"
                  />
                  {formErrors.email && (
                    <span className="text-xs text-destructive">{formErrors.email}</span>
                  )}
                </div>
                <div className="grid gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      onClick={handleForgotPassword}
                      type="button"
                      className="text-sm font-medium text-brand hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-1 size-4 animate-spin" /> Signing in…
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="signup">
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground">
                Create an account
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Join us to fund campaigns and volunteer for communities in need.
              </p>

              <form onSubmit={handleSignUp} className="mt-6 space-y-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    required
                    placeholder="jane@email.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="bg-background"
                  />
                  {formErrors.password && (
                    <span className="text-xs text-destructive">{formErrors.password}</span>
                  )}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    required
                    placeholder="Repeat password"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    className="bg-background"
                  />
                  {formErrors.confirmPassword && (
                    <span className="text-xs text-destructive">{formErrors.confirmPassword}</span>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-1 size-4 animate-spin" /> Creating account…
                    </>
                  ) : (
                    'Create account'
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background py-2 text-sm font-semibold hover:bg-secondary transition-colors"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('apple')}
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background py-2 text-sm font-semibold hover:bg-secondary transition-colors"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-1.07 1.65 0 3.14.59 4.17 1.93-3.29 1.93-2.76 6.09 1.1 7.66-.76 1.93-1.7 3.86-3.48 6.26zM15.96 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-secondary/40">
          <Loader2 className="size-8 animate-spin text-brand" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}
