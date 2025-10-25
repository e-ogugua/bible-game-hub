'use client'

import React from 'react'
import { MemoryGame } from '@/modules/memory/MemoryGame'
import { HelpCircle } from 'lucide-react'

export default function MemoryGamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent">
            Scripture Memory Game
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Challenge your memory and deepen your biblical knowledge! Choose
            from multiple game modes and themes to match Bible verses with their
            references. Features combo systems, streak tracking, and beautiful
            3D animations for an engaging learning experience.
          </p>
        </div>

        <MemoryGame />

        {/* Coming Soon Features */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
            🚀 Coming Soon Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-400/20">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-semibold mb-2">
                Advanced Difficulty Levels
              </h3>
              <p className="text-sm text-blue-200 opacity-75">
                More challenging verse pairs and longer passages
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl p-6 border border-green-400/20">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">
                Daily Scripture Challenges
              </h3>
              <p className="text-sm text-blue-200 opacity-75">
                New verses to memorize every day with progress tracking
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-400/20">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-lg font-semibold mb-2">Achievement System</h3>
              <p className="text-sm text-blue-200 opacity-75">
                Unlock badges and rewards for memorizing Scripture
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border border-yellow-400/20">
              <div className="text-3xl mb-3">📖</div>
              <h3 className="text-lg font-semibold mb-2">
                Bible Book Categories
              </h3>
              <p className="text-sm text-blue-200 opacity-75">
                Practice verses organized by Bible books and themes
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/30 to-cyan-900/30 rounded-xl p-6 border border-indigo-400/20">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <HelpCircle className="w-6 h-6 mr-2 text-yellow-400" />
                  How to Play
                </h3>
                <div className="space-y-3 text-blue-100">
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500/20 text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </span>
                    <p>
                      Click on cards to flip them and reveal Bible verses or
                      references
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500/20 text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </span>
                    <p>
                      Find matching pairs - each verse matches with its Bible
                      reference
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500/20 text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </span>
                    <p>
                      Match all pairs to complete the level and earn points!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-xl p-6 border border-red-400/20">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Speed Challenges</h3>
              <p className="text-sm text-blue-200 opacity-75">
                Race against time to match verses before they disappear
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-blue-200">
              ✨ These features are in development and will be available in
              future updates.
              <br />
              <span className="text-yellow-400 font-semibold">
                Stay tuned for more ways to grow in your faith!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
