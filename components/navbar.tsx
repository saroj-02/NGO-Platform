'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, LogOut, LayoutDashboard, Heart, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/auth-context'
import { SmileLogo } from '@/components/smile-logo'

const navLinks = [
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/stories', label: 'Stories' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, signOut } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <SmileLogo className="size-12" />
          <span className="font-heading text-xl font-extrabold tracking-tight text-foreground">
            HFS
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Navigation CTA / User Profile Dropdown */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="size-9 rounded-full object-cover ring-1 ring-border"
                  />
                ) : (
                  <div className="flex size-9 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold text-sm shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-border bg-card p-1 shadow-lg ring-1 ring-black/5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2.5 border-b border-border/60">
                    <p className="text-xs text-muted-foreground font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                      <LayoutDashboard className="size-4 text-muted-foreground" />
                      Dashboard
                    </Link>
                    <Link
                      href="/volunteer"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                      <UserIcon className="size-4 text-muted-foreground" />
                      Volunteer Profile
                    </Link>
                  </div>
                  <div className="border-t border-border/60 p-1">
                    <button
                      onClick={() => {
                        signOut()
                        setDropdownOpen(false)
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-left"
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" className="text-sm font-medium">
                <Link href="/login">Sign in</Link>
              </Button>
            </>
          )}
          <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90 font-semibold shadow-sm">
            <Link href="/campaigns">Donate</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={cn(
          'border-t border-border/60 md:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
          
          {user ? (
            <div className="mt-4 border-t border-border/60 pt-4">
              <div className="flex items-center gap-3 px-3 py-2">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="size-10 rounded-full object-cover ring-1 ring-border"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold text-base shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground text-sm">{user.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-1">
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
                >
                  <LayoutDashboard className="size-5 text-muted-foreground" /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut()
                    setOpen(false)
                  }}
                  className="flex w-full items-center gap-2.5 rounded-md px-3 py-3 text-base font-medium text-destructive hover:bg-destructive/10 text-left"
                >
                  <LogOut className="size-5" /> Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex flex-col gap-2">
              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                onClick={() => setOpen(false)}
              >
                <Link href="/campaigns">Donate</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

