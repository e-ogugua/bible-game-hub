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
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { localStorageService } from '@/lib/localStorage'
import { dailyChallengesService, DailyChallenge } from '@/lib/dailyChallenges'

export default function Home() {
  const { user, resetProgress } = useAuth()
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([])

  // Update daily challenges when user changes
  useEffect(() => {
    if (user) {
      const challenges = dailyChallengesService.getDailyChallenges(user.id)
      setDailyChallenges(challenges)
    } else {
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

  const getBestScores = () => {
    if (!user) return {}

    return {
      quiz: localStorageService.getBestScore('quiz', user.id)?.score || 0,
      memory: localStorageService.getBestScore('memory', user.id)?.score || 0,
      story: localStorageService.getBestScore('story', user.id)?.score || 0,
      adventure:
        localStorageService.getBestScore('adventure', user.id)?.score || 0,
    }
  }

  getBestScores()

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
                      <span>Level {user.level}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-purple-400" aria-hidden="true" />
                      <span>{user.xp} XP</span>
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
              <motion.div
                className="group relative bible-card bible-card-hover p-responsive-lg overflow-hidden cursor-pointer h-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
                aria-label={`Play ${game.title} - ${game.description}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    window.location.href = game.href
                  }
                }}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Pulsing border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-bible-accent/30 transition-all duration-300 group-hover:shadow-lg" />

                {/* Icon with enhanced styling */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${game.color} rounded-2xl mb-responsive-base shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <game.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" aria-hidden="true" />
                </motion.div>

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
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    aria-hidden="true"
                  >
                    →
                  </motion.div>
                </div>

                {/* Floating particles on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-bible-accent rounded-full"
                      style={{
                        left: `${20 + (i * 12)}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Daily Challenges */}
        <div className="mb-responsive-2xl">
          <div className="flex items-center mb-responsive-base">
            <Calendar className="w-6 h-6 text-bible-accent mr-3" aria-hidden="true" />
            <h2 className="text-responsive-3xl font-bold">Daily Challenges</h2>
          </div>

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
                      <h3 className="font-semibold text-responsive-base truncate">
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-bible-secondary truncate">
                        {challenge.description}
                      </p>
                      {challenge.target && (
                        <p className="text-xs text-purple-300 mt-1">
                          {challenge.current || 0} / {challenge.target}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <Link
                  href="/stories/characters"
                  className="bible-button w-full text-center text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label={`Continue with ${challenge.title} challenge`}
                >
                  Continue
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced footer section */}
        <motion.div
          className="text-center bible-card p-responsive-lg lg:p-responsive-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex justify-center items-center space-x-2 mb-responsive-base">
            <Star className="w-6 h-6 text-bible-accent animate-pulse-slow" aria-hidden="true" />
            <Star className="w-5 h-5 text-bible-accent animate-pulse-slow" style={{ animationDelay: '0.5s' }} aria-hidden="true" />
            <Star className="w-6 h-6 text-bible-accent animate-pulse-slow" style={{ animationDelay: '1s' }} aria-hidden="true" />
          </div>

          <h2 className="text-responsive-3xl font-bold mb-responsive-sm text-bible-primary">
            Ready to Begin Your Journey?
          </h2>

          <p className="text-responsive-base text-bible-secondary mb-responsive-lg max-w-2xl mx-auto leading-relaxed">
            Choose your path and discover the beauty, wisdom, and power of God&apos;s Word
            through immersive, interactive experiences that will strengthen your faith.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-bible-secondary">
            <span className="bg-bible-secondary px-4 py-2 rounded-full">
              ✨ 3D Visualizations
            </span>
            <span className="bg-purple-900/30 px-4 py-2 rounded-full">
              🎵 Immersive Audio
            </span>
            <span className="bg-indigo-900/30 px-4 py-2 rounded-full">
              📚 Bible-Based Stories
            </span>
            <span className="bg-cyan-900/30 px-4 py-2 rounded-full">
              🎮 Interactive Gameplay
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
