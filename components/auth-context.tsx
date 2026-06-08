'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Donation {
  id: string
  campaignSlug: string
  campaignTitle: string
  amount: number
  date: string
  recurring: boolean
}

export interface VolunteerApplication {
  id: string
  firstName: string
  lastName: string
  email: string
  interest: string
  message?: string
  date: string
  status: 'Under Review' | 'Approved' | 'Completed'
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
}

export interface User {
  name: string
  email: string
  password?: string
  provider: 'local' | 'google' | 'github' | 'apple'
  avatarUrl?: string
  createdAt: string
  donations: Donation[]
  volunteerApplications: VolunteerApplication[]
  contactMessages: ContactMessage[]
}

interface AuthContextType {
  user: User | null
  users: User[]
  isLoading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  signInWithProvider: (provider: 'google' | 'github' | 'apple') => Promise<boolean>
  signOut: () => void
  addDonation: (donation: Omit<Donation, 'id' | 'date'>) => void
  addVolunteerApplication: (app: Omit<VolunteerApplication, 'id' | 'date' | 'status'>) => void
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'date'>) => void
  saveFormDraft: (formId: string, data: any) => void
  clearFormDraft: (formId: string) => void
  getFormDraft: (formId: string) => any
  clearError: () => void
  updateProfile: (name: string, password?: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEFAULT_USERS_KEY = 'ngo_users_data'
const ACTIVE_USER_KEY = 'ngo_active_user'
const DRAFTS_KEY = 'ngo_form_drafts'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [drafts, setDrafts] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(DEFAULT_USERS_KEY)
      const storedActiveUser = localStorage.getItem(ACTIVE_USER_KEY)
      const storedDrafts = localStorage.getItem(DRAFTS_KEY)

      const parsedUsers = storedUsers ? JSON.parse(storedUsers) : []
      setUsers(parsedUsers)

      if (storedActiveUser) {
        const parsedActiveUser = JSON.parse(storedActiveUser)
        // Find latest data from users list
        const latestUserData = parsedUsers.find((u: User) => u.email === parsedActiveUser.email)
        setUser(latestUserData || parsedActiveUser)
      }

      if (storedDrafts) {
        setDrafts(JSON.parse(storedDrafts))
      }
    } catch (err) {
      console.error('Failed to load auth states from localStorage', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update localStorage when users list changes
  const updateUsersList = (updatedUsers: User[]) => {
    setUsers(updatedUsers)
    localStorage.setItem(DEFAULT_USERS_KEY, JSON.stringify(updatedUsers))
  }

  // Update active user state and storage
  const updateActiveUser = (updatedUser: User | null) => {
    setUser(updatedUser)
    if (updatedUser) {
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(updatedUser))
    } else {
      localStorage.removeItem(ACTIVE_USER_KEY)
    }
  }

  const clearError = () => setError(null)

  // Helper to merge all guest data upon sign in / sign up
  const mergeGuestData = (userData: User): User => {
    let updatedUser = { ...userData }

    // 1. Merge Guest Donations
    try {
      const guestDonationsStr = localStorage.getItem('ngo_guest_donations')
      if (guestDonationsStr) {
        const guestDonations = JSON.parse(guestDonationsStr)
        if (Array.isArray(guestDonations) && guestDonations.length > 0) {
          updatedUser.donations = [...guestDonations, ...updatedUser.donations]
          localStorage.removeItem('ngo_guest_donations')
        }
      }
    } catch (err) {
      console.error('Failed to merge guest donations', err)
    }

    // 2. Merge Guest Volunteer Applications
    try {
      const guestAppsStr = localStorage.getItem('ngo_guest_volunteer')
      if (guestAppsStr) {
        const guestApps = JSON.parse(guestAppsStr)
        if (Array.isArray(guestApps) && guestApps.length > 0) {
          updatedUser.volunteerApplications = [...guestApps, ...updatedUser.volunteerApplications]
          localStorage.removeItem('ngo_guest_volunteer')
        }
      }
    } catch (err) {
      console.error('Failed to merge guest volunteer applications', err)
    }

    // 3. Merge Guest Contact Messages
    try {
      const guestContactStr = localStorage.getItem('ngo_guest_contact')
      if (guestContactStr) {
        const guestContact = JSON.parse(guestContactStr)
        if (Array.isArray(guestContact) && guestContact.length > 0) {
          updatedUser.contactMessages = [...guestContact, ...updatedUser.contactMessages]
          localStorage.removeItem('ngo_guest_contact')
        }
      }
    } catch (err) {
      console.error('Failed to merge guest contact messages', err)
    }

    return updatedUser
  }

  // Sign Up Flow
  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    setError(null)
    const normalizedEmail = email.toLowerCase().trim()

    // Check if user already exists
    const exists = users.some((u) => u.email === normalizedEmail)
    if (exists) {
      setError('User with this email already exists.')
      return false
    }

    let newUser: User = {
      name,
      email: normalizedEmail,
      password, // In a mock local setup
      provider: 'local',
      createdAt: new Date().toISOString(),
      donations: [],
      volunteerApplications: [],
      contactMessages: [],
    }

    newUser = mergeGuestData(newUser)

    const updatedUsers = [...users, newUser]
    updateUsersList(updatedUsers)
    updateActiveUser(newUser)
    return true
  }

  // Sign In Flow
  const signIn = async (email: string, password: string): Promise<boolean> => {
    setError(null)
    const normalizedEmail = email.toLowerCase().trim()

    const foundUser = users.find((u) => u.email === normalizedEmail)
    if (!foundUser) {
      setError('Invalid email or password.')
      return false
    }

    if (foundUser.provider !== 'local') {
      setError(`This account is registered using ${foundUser.provider}. Please sign in with social login.`)
      return false
    }

    if (foundUser.password !== password) {
      setError('Invalid email or password.')
      return false
    }

    const mergedUser = mergeGuestData(foundUser)
    
    // Update in users database if merged
    const totalDonationsChanged = mergedUser.donations.length !== foundUser.donations.length
    const totalVolChanged = mergedUser.volunteerApplications.length !== foundUser.volunteerApplications.length
    const totalContactChanged = mergedUser.contactMessages.length !== foundUser.contactMessages.length
    
    if (totalDonationsChanged || totalVolChanged || totalContactChanged) {
      const updatedUsers = users.map((u) => (u.email === foundUser.email ? mergedUser : u))
      updateUsersList(updatedUsers)
    }

    updateActiveUser(mergedUser)
    return true
  }

  // Social Sign In Simulation
  const signInWithProvider = async (provider: 'google' | 'github' | 'apple'): Promise<boolean> => {
    setError(null)
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const mockEmail = provider === 'google' 
      ? 'google_user@gmail.com' 
      : provider === 'apple' 
        ? 'apple_user@apple.com' 
        : 'github_user@gmail.com'
        
    const mockName = provider === 'google' 
      ? 'Google Donor' 
      : provider === 'apple' 
        ? 'Apple Donor' 
        : 'GitHub Volunteer'
        
    const mockAvatar = provider === 'google' 
      ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      : provider === 'apple'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

    let existingUser = users.find((u) => u.email === mockEmail)

    if (!existingUser) {
      existingUser = {
        name: mockName,
        email: mockEmail,
        provider,
        avatarUrl: mockAvatar,
        createdAt: new Date().toISOString(),
        donations: [],
        volunteerApplications: [],
        contactMessages: [],
      }
      existingUser = mergeGuestData(existingUser)
      updateUsersList([...users, existingUser])
    } else {
      const mergedUser = mergeGuestData(existingUser)
      const totalDonationsChanged = mergedUser.donations.length !== existingUser.donations.length
      const totalVolChanged = mergedUser.volunteerApplications.length !== existingUser.volunteerApplications.length
      const totalContactChanged = mergedUser.contactMessages.length !== existingUser.contactMessages.length
      
      if (totalDonationsChanged || totalVolChanged || totalContactChanged) {
        const emailToMatch = existingUser.email
        const updatedUsers = users.map((u) => (u.email === emailToMatch ? mergedUser : u))
        updateUsersList(updatedUsers)
        existingUser = mergedUser
      }
    }

    updateActiveUser(existingUser)
    return true
  }

  // Sign Out Flow
  const signOut = () => {
    updateActiveUser(null)
    setError(null)
  }

  // User Actions integration
  const addDonation = (donationData: Omit<Donation, 'id' | 'date'>) => {
    if (!user) return

    const newDonation: Donation = {
      ...donationData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    }

    const updatedUser = {
      ...user,
      donations: [newDonation, ...user.donations],
    }

    // Update session
    updateActiveUser(updatedUser)

    // Update in users database
    const updatedUsers = users.map((u) => (u.email === user.email ? updatedUser : u))
    updateUsersList(updatedUsers)
  }

  const addVolunteerApplication = (appData: Omit<VolunteerApplication, 'id' | 'date' | 'status'>) => {
    if (!user) return

    const newApp: VolunteerApplication = {
      ...appData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'Under Review',
    }

    const updatedUser = {
      ...user,
      volunteerApplications: [newApp, ...user.volunteerApplications],
    }

    updateActiveUser(updatedUser)

    const updatedUsers = users.map((u) => (u.email === user.email ? updatedUser : u))
    updateUsersList(updatedUsers)
  }

  const addContactMessage = (msgData: Omit<ContactMessage, 'id' | 'date'>) => {
    if (!user) return

    const newMsg: ContactMessage = {
      ...msgData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    }

    const updatedUser = {
      ...user,
      contactMessages: [newMsg, ...user.contactMessages],
    }

    updateActiveUser(updatedUser)

    const updatedUsers = users.map((u) => (u.email === user.email ? updatedUser : u))
    updateUsersList(updatedUsers)
  }

  // Form Draft Progress Handlers
  const saveFormDraft = (formId: string, data: any) => {
    const updatedDrafts = {
      ...drafts,
      [formId]: data,
    }
    setDrafts(updatedDrafts)
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(updatedDrafts))
  }

  const clearFormDraft = (formId: string) => {
    const updatedDrafts = { ...drafts }
    delete updatedDrafts[formId]
    setDrafts(updatedDrafts)
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(updatedDrafts))
  }

  const getFormDraft = (formId: string) => {
    return drafts[formId] || null
  }

  const updateProfile = async (name: string, password?: string): Promise<boolean> => {
    if (!user) return false
    const updatedUser = {
      ...user,
      name,
      ...(password ? { password } : {})
    }
    updateActiveUser(updatedUser)
    const updatedUsers = users.map((u) => (u.email === user.email ? updatedUser : u))
    updateUsersList(updatedUsers)
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isLoading,
        error,
        signIn,
        signUp,
        signInWithProvider,
        signOut,
        addDonation,
        addVolunteerApplication,
        addContactMessage,
        saveFormDraft,
        clearFormDraft,
        getFormDraft,
        clearError,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
