'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  IndianRupee,
  Calendar,
  Mail,
  Heart,
  HeartHandshake,
  User as UserIcon,
  LogOut,
  Settings,
  CheckCircle2,
  Trash2,
  Lock,
  ArrowRight,
  ClipboardList,
  MessageSquare,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useAuth } from '@/components/auth-context'
import { formatCurrency } from '@/lib/data'

export default function DashboardPage() {
  const router = useRouter()
  const { user, signOut, isLoading, updateProfile } = useAuth()

  // Form states for settings
  const [profileName, setProfileName] = useState('')
  const [profilePassword, setProfilePassword] = useState('')
  const [profileConfirmPassword, setProfileConfirmPassword] = useState('')
  
  const [settingsError, setSettingsError] = useState<string | null>(null)
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  // Redirect if unauthorized
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login?callback=/dashboard')
    } else if (user) {
      setProfileName(user.name)
    }
  }, [user, isLoading, router])

  // Sync state if user details update
  useEffect(() => {
    if (user) {
      setProfileName(user.name)
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-secondary/20">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="size-8 animate-spin text-brand" />
            <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Calculate stats
  const totalDonated = user.donations.reduce((sum, d) => sum + d.amount, 0)
  const uniqueCauses = new Set(user.donations.map((d) => d.campaignSlug)).size
  const volunteerApplicationsCount = user.volunteerApplications.length

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setSettingsError(null)
    setSettingsSuccess(null)

    if (profilePassword && profilePassword !== profileConfirmPassword) {
      setSettingsError('Passwords do not match.')
      setIsUpdating(false)
      return
    }

    if (profilePassword && profilePassword.length < 6) {
      setSettingsError('Password must be at least 6 characters.')
      setIsUpdating(false)
      return
    }

    try {
      const success = await updateProfile(profileName, profilePassword || undefined)
      if (success) {
        setSettingsSuccess('Profile updated successfully!')
        setProfilePassword('')
        setProfileConfirmPassword('')
        setTimeout(() => setSettingsSuccess(null), 3000)
      } else {
        setSettingsError('Failed to update profile.')
      }
    } catch (err) {
      setSettingsError('An unexpected error occurred.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleResetData = () => {
    if (confirm('Are you sure you want to clear all browser storage and log out? This will delete all mock users and donations.')) {
      localStorage.clear()
      window.location.href = '/'
    }
  }

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-secondary/10">
      <Navbar />
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Greeting */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Namaste, {user.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your profile, track your donation impacts, and review your volunteer applications.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                <Calendar className="size-3.5" />
                Joined {formatDate(user.createdAt)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className="text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                <LogOut className="mr-1.5 size-4" /> Sign out
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Card className="bg-card shadow-sm border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Donated</CardTitle>
                <Heart className="size-5 text-brand" />
              </CardHeader>
              <CardContent>
                <div className="font-heading text-2xl font-extrabold text-foreground">
                  {formatCurrency(totalDonated)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  100% transparent and tracked
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Causes Supported</CardTitle>
                <HeartHandshake className="size-5 text-accent-blue" />
              </CardHeader>
              <CardContent>
                <div className="font-heading text-2xl font-extrabold text-foreground">
                  {uniqueCauses} {uniqueCauses === 1 ? 'Cause' : 'Causes'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Water, Education, Food, Healthcare
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Volunteer Applications</CardTitle>
                <ClipboardList className="size-5 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="font-heading text-2xl font-extrabold text-foreground">
                  {volunteerApplicationsCount} {volunteerApplicationsCount === 1 ? 'Role' : 'Roles'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active applications in review
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="donations" className="space-y-6">
              <TabsList className="flex flex-wrap w-fit gap-1 bg-muted/60 p-1 rounded-xl">
                <TabsTrigger value="donations" className="flex items-center gap-1.5 px-4 py-2">
                  <Heart className="size-4" /> My Donations
                </TabsTrigger>
                <TabsTrigger value="volunteer" className="flex items-center gap-1.5 px-4 py-2">
                  <ClipboardList className="size-4" /> Volunteer Profile
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-1.5 px-4 py-2">
                  <MessageSquare className="size-4" /> Inquiries
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-1.5 px-4 py-2">
                  <Settings className="size-4" /> Settings
                </TabsTrigger>
              </TabsList>

              {/* DONATIONS TAB */}
              <TabsContent value="donations">
                <Card className="shadow-sm border border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Donation History</CardTitle>
                    <CardDescription>
                      Verify and track all your contributions to HFS campaigns.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.donations.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="mx-auto size-12 text-muted-foreground/60 stroke-1" />
                        <h3 className="mt-4 text-base font-bold text-foreground">No donations yet</h3>
                        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                          You haven't made any donations yet. Browse our verified campaigns and help a community today.
                        </p>
                        <Button asChild className="mt-5 bg-brand text-brand-foreground hover:bg-brand/90">
                          <Link href="/campaigns">Browse Campaigns</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
                          <thead>
                            <tr className="border-b border-border text-foreground font-semibold">
                              <th className="py-3 pr-4">Campaign</th>
                              <th className="py-3 px-4">Date</th>
                              <th className="py-3 px-4">Frequency</th>
                              <th className="py-3 px-4">Status</th>
                              <th className="py-3 pl-4 text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60">
                            {user.donations.map((donation) => (
                              <tr key={donation.id} className="hover:bg-muted/30 transition-colors">
                                <td className="py-4 pr-4 font-bold text-foreground">
                                  <Link
                                    href={`/campaigns/${donation.campaignSlug}`}
                                    className="hover:text-brand flex items-center gap-1 hover:underline group"
                                  >
                                    {donation.campaignTitle}
                                    <ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                  </Link>
                                </td>
                                <td className="py-4 px-4">{formatDate(donation.date)}</td>
                                <td className="py-4 px-4">
                                  <Badge variant={donation.recurring ? 'default' : 'secondary'}>
                                    {donation.recurring ? 'Monthly' : 'One-time'}
                                  </Badge>
                                </td>
                                <td className="py-4 px-4">
                                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs">
                                    <CheckCircle2 className="size-3.5" /> Processed
                                  </span>
                                </td>
                                <td className="py-4 pl-4 text-right font-extrabold text-foreground">
                                  {formatCurrency(donation.amount)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* VOLUNTEER TAB */}
              <TabsContent value="volunteer">
                <Card className="shadow-sm border border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Volunteer Applications</CardTitle>
                    <CardDescription>
                      Check the status of your applications to become an HFS volunteer.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.volunteerApplications.length === 0 ? (
                      <div className="text-center py-12">
                        <ClipboardList className="mx-auto size-12 text-muted-foreground/60 stroke-1" />
                        <h3 className="mt-4 text-base font-bold text-foreground">No applications</h3>
                        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                          Ready to make an impact on the ground? Apply for one of our volunteer roles today.
                        </p>
                        <Button asChild className="mt-5 bg-brand text-brand-foreground hover:bg-brand/90">
                          <Link href="/volunteer">Apply as Volunteer</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {user.volunteerApplications.map((app) => (
                          <div
                            key={app.id}
                            className="flex flex-col gap-4 rounded-xl border border-border bg-background p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between"
                          >
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-heading text-base font-bold text-foreground capitalize">
                                  {app.interest === 'field' && 'Field Volunteer'}
                                  {app.interest === 'skilled' && 'Skilled Professional'}
                                  {app.interest === 'ambassador' && 'Local Ambassador'}
                                  {app.interest === 'events' && 'Events & Fundraising'}
                                  {!['field', 'skilled', 'ambassador', 'events'].includes(app.interest) && app.interest}
                                </h4>
                                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-0">
                                  {app.status}
                                </Badge>
                              </div>
                              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                                <span>Applied on {formatDate(app.date)}</span>
                                <span>Applicant: {app.firstName} {app.lastName} ({app.email})</span>
                              </div>
                              {app.message && (
                                <p className="text-sm border-l-2 border-brand/20 pl-3 mt-3 text-muted-foreground italic">
                                  "{app.message}"
                                </p>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground shrink-0 self-end sm:self-start">
                              <span className="font-medium text-foreground">Commitment:</span> Ongoing review
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* MESSAGES TAB */}
              <TabsContent value="messages">
                <Card className="shadow-sm border border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Contact Messages</CardTitle>
                    <CardDescription>
                      Logs of questions or requests you sent to the HFS team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.contactMessages.length === 0 ? (
                      <div className="text-center py-12">
                        <MessageSquare className="mx-auto size-12 text-muted-foreground/60 stroke-1" />
                        <h3 className="mt-4 text-base font-bold text-foreground">No queries sent</h3>
                        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                          Have any questions? Reach out to our support team, and we will get back to you within 24 hours.
                        </p>
                        <Button asChild className="mt-5 bg-brand text-brand-foreground hover:bg-brand/90">
                          <Link href="/contact">Send Inquiry</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {user.contactMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className="rounded-xl border border-border bg-background p-5 shadow-sm space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-heading text-sm font-bold text-foreground">
                                {msg.subject}
                              </h4>
                              <span className="text-xs text-muted-foreground">{formatDate(msg.date)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {msg.message}
                            </p>
                            <div className="text-[10px] text-muted-foreground flex items-center gap-1.5 pt-2 border-t border-border/40">
                              <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
                              <span>Delivered to support desk</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SETTINGS TAB */}
              <TabsContent value="settings">
                <div className="grid gap-6 md:grid-cols-3">
                  
                  {/* Account Edit Form */}
                  <Card className="shadow-sm border border-border bg-card md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">Profile Settings</CardTitle>
                      <CardDescription>
                        Update your account details and credentials.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        {settingsError && (
                          <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                            <AlertCircle className="mt-0.5 size-4 shrink-0" />
                            <span>{settingsError}</span>
                          </div>
                        )}
                        {settingsSuccess && (
                          <div className="flex items-start gap-2 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                            <span>{settingsSuccess}</span>
                          </div>
                        )}

                        <div className="grid gap-1.5">
                          <Label htmlFor="profile-email">Email Address (Cannot change)</Label>
                          <Input
                            id="profile-email"
                            type="email"
                            disabled
                            value={user.email}
                            className="bg-muted text-muted-foreground"
                          />
                        </div>

                        <div className="grid gap-1.5">
                          <Label htmlFor="profile-name">Full Name</Label>
                          <Input
                            id="profile-name"
                            type="text"
                            required
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className="bg-background"
                          />
                        </div>

                        {user.provider === 'local' && (
                          <div className="border-t border-border/60 pt-4 space-y-4">
                            <h4 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5">
                              <Lock className="size-4 text-muted-foreground" /> Change Password
                            </h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="grid gap-1.5">
                                <Label htmlFor="profile-pass">New Password</Label>
                                <Input
                                  id="profile-pass"
                                  type="password"
                                  placeholder="Leave blank to keep current"
                                  value={profilePassword}
                                  onChange={(e) => setProfilePassword(e.target.value)}
                                  className="bg-background"
                                />
                              </div>
                              <div className="grid gap-1.5">
                                <Label htmlFor="profile-confirm-pass">Confirm Password</Label>
                                <Input
                                  id="profile-confirm-pass"
                                  type="password"
                                  placeholder="Confirm new password"
                                  value={profileConfirmPassword}
                                  onChange={(e) => setProfileConfirmPassword(e.target.value)}
                                  className="bg-background"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <Button
                          type="submit"
                          disabled={isUpdating}
                          className="bg-brand text-brand-foreground hover:bg-brand/90"
                        >
                          {isUpdating ? (
                            <>
                              <Loader2 className="mr-1.5 size-4 animate-spin" /> Saving changes…
                            </>
                          ) : (
                            'Save Settings'
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Danger Zone */}
                  <Card className="shadow-sm border border-destructive/20 bg-card md:col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-destructive">Danger Zone</CardTitle>
                      <CardDescription>
                        Perform developer testing options or reset state configurations.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-xs text-muted-foreground">
                        Clearing browser local storage will log you out, delete all registered local user profiles, delete donation lists, and reset forms back to clean states.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleResetData}
                        className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
                      >
                        <Trash2 className="mr-1.5 size-4" /> Reset App Workspace Data
                      </Button>
                    </CardContent>
                  </Card>

                </div>
              </TabsContent>
            </Tabs>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
