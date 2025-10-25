'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Crown, User, Download, Upload, Users } from 'lucide-react'
import { ProfileService } from '@/lib/profileService'
import { FaithVerseProfile } from '@/types/faithverse'

export const FaithVerseAccount: React.FC = () => {
  const [currentProfile, setCurrentProfile] =
    useState<FaithVerseProfile | null>(null)
  const [allProfiles, setAllProfiles] = useState<FaithVerseProfile[]>([])
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [newProfile, setNewProfile] = useState({
    username: '',
    displayName: '',
    avatar: '',
  })

  useEffect(() => {
    const profile = ProfileService.getCurrentProfile()
    const profiles = ProfileService.getAllProfiles()

    if (!profile && profiles.length === 0) {
      setShowOnboarding(true)
    } else {
      setCurrentProfile(profile)
      setAllProfiles(profiles)
    }
  }, [])

  const createNewProfile = () => {
    if (!newProfile.username || !newProfile.displayName) return

    const profile = ProfileService.createProfile({
      username: newProfile.username,
      displayName: newProfile.displayName,
      avatar: newProfile.avatar || undefined,
      level: 1,
      xp: 0,
      totalScore: 0,
      gamesPlayed: { quiz: 0, memory: 0, story: 0, adventure: 0 },
      achievements: [],
      badges: [],
      preferences: {
        theme: 'divine',
        soundEnabled: true,
        musicVolume: 0.5,
        sfxVolume: 0.7,
      },
      stats: {
        versesMemorized: 0,
        quizzesCompleted: 0,
        storiesFinished: 0,
        perfectScores: 0,
        streakDays: 0,
      },
    })

    setCurrentProfile(profile)
    setAllProfiles(ProfileService.getAllProfiles())
    setShowOnboarding(false)
  }

  const switchProfile = (profileId: string) => {
    if (ProfileService.switchProfile(profileId)) {
      setCurrentProfile(ProfileService.getCurrentProfile())
    }
  }

  const exportProfile = () => {
    const data = ProfileService.exportProfileData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `faithverse-profile-${currentProfile?.username || 'backup'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-8 shadow-2xl">
              <Crown className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-white to-purple-400 bg-clip-text text-transparent">
              Welcome to FaithVerse
            </h1>

            <p className="text-xl text-blue-100 mb-8">
              Create your FaithVerse identity to track your spiritual journey,
              earn achievements, and connect with fellow believers.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="space-y-6">
                <div>
                  <label className="block text-left text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={newProfile.username}
                    onChange={(e) =>
                      setNewProfile((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Choose a unique username"
                  />
                </div>

                <div>
                  <label className="block text-left text-sm font-medium mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={newProfile.displayName}
                    onChange={(e) =>
                      setNewProfile((prev) => ({
                        ...prev,
                        displayName: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Your display name"
                  />
                </div>

                <motion.button
                  onClick={createNewProfile}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!newProfile.username || !newProfile.displayName}
                >
                  Create FaithVerse Profile
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your FaithVerse profile...</p>
        </div>
      </div>
    )
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-white to-purple-400 bg-clip-text text-transparent">
            FaithVerse Account
          </h1>
          <p className="text-blue-100">
            Manage your spiritual journey and achievements
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <motion.div
            className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Crown className="w-6 h-6 mr-3 text-yellow-400" />
              Profile Overview
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-blue-200">Display Name</label>
                  <p className="text-xl font-semibold text-white">
                    {currentProfile.displayName}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-blue-200">Username</label>
                  <p className="text-lg text-blue-100">
                    @{currentProfile.username}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-blue-200">Level</label>
                  <p className="text-xl font-semibold text-yellow-400">
                    {currentProfile.level}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-blue-200">Total XP</label>
                  <p className="text-xl font-semibold text-purple-400">
                    {currentProfile.xp.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-blue-200">Best Score</label>
                  <p className="text-xl font-semibold text-green-400">
                    {currentProfile.totalScore.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-blue-200">Member Since</label>
                  <p className="text-sm text-blue-100">
                    {new Date(currentProfile.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Game Stats */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Game Progress</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {currentProfile.gamesPlayed.quiz}
                  </div>
                  <div className="text-sm text-blue-200">Quizzes</div>
                </div>
                <div className="bg-blue-900/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {currentProfile.gamesPlayed.memory}
                  </div>
                  <div className="text-sm text-blue-200">Memory Games</div>
                </div>
                <div className="bg-green-900/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {currentProfile.gamesPlayed.story}
                  </div>
                  <div className="text-sm text-blue-200">Stories</div>
                </div>
                <div className="bg-yellow-900/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {currentProfile.gamesPlayed.adventure}
                  </div>
                  <div className="text-sm text-blue-200">Adventures</div>
                </div>
              </div>
            </div>

            {/* Export/Import */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <h3 className="text-lg font-semibold mb-4">Data Management</h3>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={exportProfile}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  <span>Export Profile</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = '.json'
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (e) => {
                          const result = ProfileService.importProfileData(
                            e.target?.result as string
                          )
                          alert(result.message)
                          if (result.success) {
                            window.location.reload()
                          }
                        }
                        reader.readAsText(file)
                      }
                    }
                    input.click()
                  }}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Upload className="w-4 h-4" />
                  <span>Import Profile</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Profile Switcher */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-400" />
              Switch Profile
            </h3>

            <div className="space-y-3">
              {allProfiles.map((profile) => (
                <motion.button
                  key={profile.id}
                  onClick={() => switchProfile(profile.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                    profile.id === currentProfile.id
                      ? 'bg-yellow-500/20 border-yellow-400 text-white'
                      : 'bg-white/5 border-white/20 text-blue-100 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{profile.displayName}</div>
                      <div className="text-sm text-blue-200">
                        @{profile.username} • Level {profile.level}
                      </div>
                    </div>
                    {profile.id === currentProfile.id && (
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => setShowOnboarding(true)}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + Create New Profile
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
