'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Brain,
  Target,
  Trophy,
  Users,
  Calendar,
  Star,
  RotateCcw,
  Crown,
  type LucideIcon,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { dailyChallengesService, DailyChallenge } from '@/lib/dailyChallenges'

export default function Home() {
  const { user, resetProgress, loading: authLoading } = useAuth()
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([])
  const [challengesLoading, setChallengesLoading] = useState(false)

  // Update daily challenges when user changes
  useEffect(() => {
    const loadChallenges = async () => {
      console.log('Main page: Starting daily challenges load...')
      setChallengesLoading(true)

      try {
        if (user) {
          console.log('Main page: Loading challenges for user:', user.id)
          const challenges = dailyChallengesService.getDailyChallenges(user.id)
          console.log('Main page: Loaded user challenges:', challenges)
          setDailyChallenges(challenges)
        } else {
          console.log('Main page: Loading default challenges for guest user')
          // Default challenges for non-logged-in users
          setDailyChallenges([
            {
              id: 'daily_verse',
              title: 'Daily Bible Verse',
              description: "Memorize today's featured verse",
              icon: BookOpen as LucideIcon,
              completed: false,
              type: 'daily_verse',
            },
            {
              id: 'quiz_streak',
              title: 'Quiz Streak',
              description: 'Complete 3 quizzes in a row',
              icon: Target as LucideIcon,
              completed: false,
              type: 'quiz_streak',
              target: 3,
              current: 0,
            },
          ])
        }
      } catch (error) {
        console.error('Main page: Error loading daily challenges:', error)
        // Set default challenges on error
        setDailyChallenges([
          {
            id: 'daily_verse',
            title: 'Daily Bible Verse',
            description: "Memorize today's featured verse",
            icon: BookOpen as LucideIcon,
            completed: false,
            type: 'daily_verse',
          },
        ])
      } finally {
        console.log('Main page: Daily challenges loading complete')
        setChallengesLoading(false)
      }
    }

    loadChallenges()
  }, [user])

  const games = [
    {
      id: 'quiz',
      title: 'Bible Quiz Challenge',
      description: 'Test your knowledge of biblical stories and characters',
      icon: BookOpen,
      href: '/quiz',
      color: 'from-blue-500 to-purple-600',
    },
    {
      id: 'memory',
      title: 'Scripture Memory',
      description: 'Memorize and recall famous Bible verses',
      icon: Brain,
      href: '/memory',
      color: 'from-green-500 to-teal-600',
    },
    {
      id: 'story',
      title: 'Character Stories',
      description: 'Walk through the lives of biblical heroes',
      icon: Users,
      href: '/stories/characters',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      id: 'adventure',
      title: 'Bible Adventures',
      description: 'Embark on epic journeys through biblical history',
      icon: Target,
      href: '/adventure',
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 'account',
      title: 'FaithVerse Account',
      description: 'Manage your profile and track your spiritual journey',
      icon: Crown,
      href: '/account',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      description: 'See how you rank among fellow believers',
      icon: Trophy,
      href: '/leaderboard',
      color: 'from-yellow-500 to-orange-600',
    },
  ]

  const handleResetProgress = async () => {
    if (
      typeof window !== 'undefined' &&
      window.confirm(
        'Are you sure you want to reset all your progress? This cannot be undone.'
      )
    ) {
      await resetProgress()
    }
  }

  // Add safety check to prevent infinite loading
  const [loadingTimeout, setLoadingTimeout] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.warn('Main page: Loading timeout reached, forcing render')
      setLoadingTimeout(true)
    }, 3000) // 3 second timeout

    return () => clearTimeout(timeout)
  }, [])

  // Show loading state while auth is loading (with timeout fallback)
  if (authLoading && !loadingTimeout) {
    return (
      <main className="min-h-screen bg-bible-primary text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bible-accent mx-auto mb-4"></div>
          <p className="text-bible-secondary">Loading your faith journey...</p>
        </div>
      </main>
    )
  }

  // Show main content (loading state should be false by now)
  return (
    <main className="min-h-screen bg-bible-primary text-white">
      <div className="container mx-auto p-responsive-lg">
        {/* Header with User Stats */}
        <div className="mb-responsive-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-responsive-lg gap-responsive-base">
            <div className="flex-1">
              <h1 className="text-responsive-5xl font-bold font-serif mb-responsive-base text-bible-primary">
                Bible Game Hub
              </h1>
              <p className="text-responsive-xl text-bible-secondary mb-responsive-base max-w-2xl">
                Interactive Scripture Games & Biblical Knowledge
              </p>
              {user && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-responsive-sm sm:gap-responsive-base">
                  <div className="flex items-center space-x-responsive-sm text-responsive-base">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-bible-accent" aria-hidden="true" />
                      <span>Level {user?.level || 1}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-purple-400" aria-hidden="true" />
                      <span>{user?.xp || 0} XP</span>
                    </div>
                  </div>
                  <button
                    onClick={handleResetProgress}
                    className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors text-sm self-start focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                    aria-label="Reset all progress and achievements"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>Reset Progress</span>
                  </button>
                </div>
              )}
            </div>

            {!user && (
              <div className="mt-responsive-lg lg:mt-0 w-full sm:w-auto">
                <Link
                  href="/auth"
                  className="bible-button w-full sm:w-auto text-center block focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Sign in to track your progress and achievements"
                >
                  Sign In to Track Progress
                </Link>
              </div>
            )}
          </div>

          <p className="text-responsive-base text-bible-secondary max-w-3xl leading-relaxed">
            Learn, play, and grow in your faith through engaging Bible games,
            quizzes, and interactive challenges for all ages
          </p>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-responsive-game-cards gap-responsive-lg mb-responsive-2xl">
          {games.map((game, index) => (
            <Link key={game.id} href={game.href}>
              <div
                className="group relative bible-card bible-card-hover p-responsive-lg overflow-hidden cursor-pointer h-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-2xl transition-all duration-300 opacity-0"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fade-in 0.6s ease-out forwards'
                }}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Pulsing border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-bible-accent/30 transition-all duration-300 group-hover:shadow-lg" />

                {/* Icon with enhanced styling */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${game.color} rounded-2xl mb-responsive-base shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <game.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" aria-hidden="true" />
                </div>

                {/* Content with improved typography */}
                <h3 className="text-responsive-xl font-bold mb-3 group-hover:text-bible-accent transition-colors duration-300">
                  {game.title}
                </h3>

                <p className="text-bible-secondary leading-relaxed mb-responsive-base text-responsive-sm lg:text-responsive-base">
                  {game.description}
                </p>

                {/* Enhanced call-to-action */}
                <div className="flex items-center text-sm font-medium text-purple-300 group-hover:text-bible-accent transition-colors duration-300">
                  <span>Start Journey</span>
                  <div className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Daily Challenges */}
        <div className="mb-responsive-2xl">
          <div className="flex items-center mb-responsive-base">
            <Calendar className="w-6 h-6 text-bible-accent mr-3" aria-hidden="true" />
            <h2 className="text-responsive-3xl font-bold">Daily Challenges</h2>
          </div>

          {challengesLoading ? (
            <div className="grid grid-responsive-2 gap-responsive-base lg:gap-responsive-lg">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bible-card p-responsive-base lg:p-responsive-lg animate-pulse"
                >
                  <div className="flex items-center justify-between mb-responsive-sm">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-6 h-6 bg-gray-600 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-600 rounded mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-responsive-2 gap-responsive-base lg:gap-responsive-lg">
              {dailyChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`bible-card p-responsive-base lg:p-responsive-lg ${
                    challenge.completed ? 'border-green-400 bg-green-900/20' : 'border-white/20'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-2xl`}
                >
                  <div className="flex items-center justify-between mb-responsive-sm">
                    <div className="flex items-center space-x-3 flex-1">
                      {challenge.icon && <challenge.icon className={`w-6 h-6 ${challenge.completed ? 'text-green-400' : 'text-blue-400'}`} aria-hidden="true" />}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-responsive-base text-bible-primary truncate">
                          {challenge.title}
                        </h3>
                        <p className="text-responsive-sm text-bible-secondary truncate">
                          {challenge.description}
                        </p>
                        {challenge.target && (
                          <p className="text-responsive-xs text-bible-accent mt-1 font-medium">
                            {challenge.current || 0} / {challenge.target}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/stories/characters"
                    className="bible-button bible-button-secondary w-full text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    aria-label={`Continue with ${challenge.title} challenge`}
                  >
                    Continue
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced footer section */}
        <div className="text-center bible-card p-responsive-lg lg:p-responsive-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          <div className="flex justify-center items-center space-x-2 mb-responsive-base">
            <Star className="w-6 h-6 text-bible-accent animate-pulse" aria-hidden="true" />
            <Star className="w-5 h-5 text-bible-accent animate-pulse" style={{ animationDelay: '0.5s' }} aria-hidden="true" />
            <Star className="w-6 h-6 text-bible-accent animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true" />
          </div>

          <h2 className="text-responsive-3xl font-bold mb-responsive-sm text-bible-primary">
            Ready to Begin Your Journey?
          </h2>

          <p className="text-responsive-base text-bible-secondary mb-responsive-lg max-w-2xl mx-auto leading-relaxed">
            Choose your path and discover the beauty, wisdom, and power of God&apos;s Word
            through immersive, interactive experiences that will strengthen your faith.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="bible-pill bible-pill-primary">
              3D Visualizations
            </span>
            <span className="bible-pill bible-pill-secondary">
              Immersive Audio
            </span>
            <span className="bible-pill">
              Bible-Based Stories
            </span>
            <span className="bible-pill">
              Interactive Gameplay
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
