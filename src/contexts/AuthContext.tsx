'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { UserProfile } from '@/lib/localStorage'

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  signUp: (username: string, email?: string) => Promise<{ success: boolean; error?: string }>
  signIn: (username: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  updateProfile: (updates: { username?: string; avatar?: string }) => Promise<{ success: boolean; error?: string }>
  resetProgress: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only run on client side to avoid SSR issues
    if (typeof window === 'undefined') return

    // Load user profile on mount
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('bible_game_user_profile')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('Failed to load user profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const signUp = async (username: string, email?: string) => {
    // Ensure we're on client side
    if (typeof window === 'undefined') {
      return { success: false, error: 'Cannot sign up during server-side rendering' }
    }

    try {
      // Check if username already exists
      const existingUsers = JSON.parse(localStorage.getItem('bible_game_user_profiles') || '[]')
      if (existingUsers.some((u: UserProfile) => u.username.toLowerCase() === username.toLowerCase())) {
        return { success: false, error: 'Username already taken' }
      }

      // Create new user
      const newUser: UserProfile = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        username,
        email,
        xp: 0,
        level: 1,
        badges: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }

      // Save user profile
      localStorage.setItem('bible_game_user_profile', JSON.stringify(newUser))

      // Add to users list
      const updatedUsers = [...existingUsers, newUser]
      localStorage.setItem('bible_game_user_profiles', JSON.stringify(updatedUsers))

      setUser(newUser)
      return { success: true }
    } catch {
      return { success: false, error: 'Failed to create account' }
    }
  }

  const signIn = async (username: string) => {
    // Ensure we're on client side
    if (typeof window === 'undefined') {
      return { success: false, error: 'Cannot sign in during server-side rendering' }
    }

    try {
      // Find user by username
      const users = JSON.parse(localStorage.getItem('bible_game_user_profiles') || '[]')
      const foundUser = users.find((u: UserProfile) =>
        u.username.toLowerCase() === username.toLowerCase()
      )

      if (!foundUser) {
        return { success: false, error: 'User not found' }
      }

      // Update last login
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toISOString()
      }

      localStorage.setItem('bible_game_user_profile', JSON.stringify(updatedUser))

      // Update in users list
      const updatedUsers = users.map((u: UserProfile) =>
        u.id === foundUser.id ? updatedUser : u
      )
      localStorage.setItem('bible_game_user_profiles', JSON.stringify(updatedUsers))

      setUser(updatedUser)
      return { success: true }
    } catch {
      return { success: false, error: 'Failed to sign in' }
    }
  }

  const signOut = async () => {
    // Ensure we're on client side
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem('bible_game_user_profile')
      setUser(null)
    } catch (error) {
      console.error('Failed to sign out:', error)
    }
  }

  const updateProfile = async (updates: { username?: string; avatar?: string }) => {
    if (!user) return { success: false, error: 'No user logged in' }

    // Ensure we're on client side
    if (typeof window === 'undefined') {
      return { success: false, error: 'Cannot update profile during server-side rendering' }
    }

    try {
      const updatedUser = {
        ...user,
        ...updates,
        lastLogin: new Date().toISOString()
      }

      localStorage.setItem('bible_game_user_profile', JSON.stringify(updatedUser))

      // Update in users list
      const users = JSON.parse(localStorage.getItem('bible_game_user_profiles') || '[]')
      const updatedUsers = users.map((u: UserProfile) =>
        u.id === user.id ? updatedUser : u
      )
      localStorage.setItem('bible_game_user_profiles', JSON.stringify(updatedUsers))

      setUser(updatedUser)
      return { success: true }
    } catch {
      return { success: false, error: 'Failed to update profile' }
    }
  }

  const resetProgress = async () => {
    if (!user) return

    // Ensure we're on client side
    if (typeof window === 'undefined') return

    try {
      // Clear all user data except profile
      const keysToRemove = [
        'bible_game_scores',
        'bible_game_story_progress',
        'bible_game_daily_challenges'
      ]

      keysToRemove.forEach(key => {
        const data = localStorage.getItem(key)
        if (data) {
          const parsed = JSON.parse(data)
          const filtered = Array.isArray(parsed)
            ? parsed.filter((item: { userId: string }) => item.userId !== user.id)
            : parsed
          localStorage.setItem(key, JSON.stringify(filtered))
        }
      })

      // Reset user XP and level
      const resetUser = {
        ...user,
        xp: 0,
        level: 1,
        badges: [],
        lastLogin: new Date().toISOString()
      }

      localStorage.setItem('bible_game_user_profile', JSON.stringify(resetUser))

      // Update in users list
      const users = JSON.parse(localStorage.getItem('bible_game_user_profiles') || '[]')
      const updatedUsers = users.map((u: UserProfile) =>
        u.id === user.id ? resetUser : u
      )
      localStorage.setItem('bible_game_user_profiles', JSON.stringify(updatedUsers))

      setUser(resetUser)
    } catch (error) {
      console.error('Failed to reset progress:', error)
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetProgress,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
