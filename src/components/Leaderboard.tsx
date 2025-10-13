'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Star, Crown, TrendingUp } from 'lucide-react'
import { ProfileService } from '@/lib/profileService'
import { LeaderboardEntry, FaithVerseProfile } from '@/types/faithverse'

export const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [currentUser, setCurrentUser] = React.useState<FaithVerseProfile | null>(null)
  const [sortBy, setSortBy] = useState<'xp' | 'score' | 'level'>('xp')

  useEffect(() => {
    const profile = ProfileService.getCurrentProfile()
    const board = ProfileService.getLeaderboard()

    setCurrentUser(profile)
    setLeaderboard(board)
  }, [])

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.totalScore - a.totalScore
      case 'level':
        return b.level - a.level
      default:
        return b.xp - a.xp
    }
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-blue-400">#{rank}</span>
    }
  }

  const getRankGradient = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-orange-500'
      case 2:
        return 'from-gray-300 to-gray-500'
      case 3:
        return 'from-amber-400 to-amber-600'
      default:
        return 'from-blue-400 to-purple-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-white to-purple-400 bg-clip-text text-transparent">
            FaithVerse Leaderboard
          </h1>
          <p className="text-xl text-blue-100">
            See how you rank among fellow believers in your spiritual journey
          </p>
        </motion.div>

        {/* Sort Controls */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            <div className="flex space-x-1">
              {[
                { key: 'xp', label: 'XP', icon: Star },
                { key: 'score', label: 'Score', icon: Trophy },
                { key: 'level', label: 'Level', icon: TrendingUp }
              ].map(({ key, label, icon: Icon }) => (
                <motion.button
                  key={key}
                  onClick={() => setSortBy(key as 'xp' | 'score' | 'level')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    sortBy === key
                      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/50'
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4 inline mr-2" />
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 px-6 py-4 border-b border-white/20">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-blue-200">
                <div className="col-span-1">Rank</div>
                <div className="col-span-5">Player</div>
                <div className="col-span-2">Level</div>
                <div className="col-span-2">XP</div>
                <div className="col-span-2">Score</div>
              </div>
            </div>

            {/* Leaderboard Entries */}
            <div className="divide-y divide-white/10">
              {sortedLeaderboard.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className={`px-6 py-4 transition-all duration-300 ${
                    entry.isCurrentUser ? 'bg-yellow-500/10 border-l-4 border-yellow-400' : 'hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 flex items-center justify-center">
                      {getRankIcon(entry.rank)}
                    </div>

                    <div className="col-span-5">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankGradient(entry.rank)} flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">
                            {entry.displayName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{entry.displayName}</div>
                          <div className="text-sm text-blue-300">@{entry.username}</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="text-lg font-bold text-purple-400">{entry.level}</div>
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="text-lg font-bold text-blue-400">{entry.xp.toLocaleString()}</div>
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="text-lg font-bold text-green-400">{entry.totalScore.toLocaleString()}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Current User Section (if not in top ranks) */}
            {currentUser && !sortedLeaderboard.some(entry => entry.isCurrentUser) && (
              <motion.div
                className="px-6 py-4 bg-yellow-500/10 border-t border-yellow-400/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 flex items-center justify-center">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-black">★</span>
                    </div>
                  </div>

                  <div className="col-span-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {currentUser.displayName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{currentUser.displayName} (You)</div>
                        <div className="text-sm text-blue-300">@{currentUser.username}</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 text-center">
                    <div className="text-lg font-bold text-purple-400">{currentUser.level}</div>
                  </div>

                  <div className="col-span-2 text-center">
                    <div className="text-lg font-bold text-blue-400">{currentUser.xp.toLocaleString()}</div>
                  </div>

                  <div className="col-span-2 text-center">
                    <div className="text-lg font-bold text-green-400">{currentUser.totalScore.toLocaleString()}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Message */}
          <motion.div
            className="text-center mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="text-blue-100">
              🌟 <strong>Global Leaderboard Coming Soon!</strong><br />
              Connect with believers worldwide and compete in faith challenges across the FaithVerse.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
