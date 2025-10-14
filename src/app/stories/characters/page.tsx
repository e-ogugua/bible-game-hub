'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useGameContext } from '@/contexts/GameContext'
import { characterStories, CharacterStory } from '@/data/characterStories'
import { localStorageService, StoryProgress } from '@/lib/localStorage'

interface StoryGameState {
  currentCharacter: string | null
  currentChapter: number
  completedChapters: number[]
  totalScore: number
  faith: number
  courage: number
  obedience: number
  gameCompleted: boolean
}

export default function StoriesPage() {
  const { user } = useAuth()
  const { gameState, startGame } = useGameContext()
  const [storyState, setStoryState] = useState<StoryGameState>({
    currentCharacter: null,
    currentChapter: 1,
    completedChapters: [],
    totalScore: 0,
    faith: 0,
    courage: 0,
    obedience: 0,
    gameCompleted: false
  })
  const [currentStory, setCurrentStory] = useState<CharacterStory | null>(null)
  const [showCharacterSelect, setShowCharacterSelect] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (gameState.gameStarted && !gameState.currentGame) {
      startGame('story')
    }
  }, [gameState.gameStarted, gameState.currentGame, startGame])

  const selectCharacter = (characterId: string) => {
    const story = characterStories[characterId as keyof typeof characterStories]

    // Load existing progress if user is logged in
    let existingProgress: StoryProgress | null = null
    if (user) {
      existingProgress = localStorageService.getStoryProgress(user.id, characterId)
    }

    if (existingProgress) {
      // Resume from saved progress
      setStoryState({
        currentCharacter: characterId,
        currentChapter: existingProgress.currentChapter,
        completedChapters: existingProgress.completedChapters,
        totalScore: existingProgress.totalScore,
        faith: existingProgress.faith,
        courage: existingProgress.courage,
        obedience: existingProgress.obedience,
        gameCompleted: existingProgress.completed
      })
    } else {
      // Start fresh
      setStoryState({
        currentCharacter: characterId,
        currentChapter: 1,
        completedChapters: [],
        totalScore: 0,
        faith: 0,
        courage: 0,
        obedience: 0,
        gameCompleted: false
      })
    }

    setCurrentStory(story)
    setShowCharacterSelect(false)
  }

  const handleChoice = async (choice: { id: string; score?: number; faith?: number; courage?: number; obedience?: number; nextChapter?: number | null }) => {
    const newScore = storyState.totalScore + (choice.score || 0)
    const newFaith = storyState.faith + (choice.faith || 0)
    const newCourage = storyState.courage + (choice.courage || 0)
    const newObedience = storyState.obedience + (choice.obedience || 0)

    setStoryState(prev => ({
      ...prev,
      totalScore: newScore,
      faith: newFaith,
      courage: newCourage,
      obedience: newObedience,
      completedChapters: [...prev.completedChapters, prev.currentChapter],
      currentChapter: choice.nextChapter || prev.currentChapter + 1,
      gameCompleted: choice.nextChapter === null
    }))

    // Save progress to localStorage if user is logged in
    if (user && storyState.currentCharacter) {
      const progress: Omit<StoryProgress, 'id' | 'lastPlayed'> = {
        userId: user.id,
        character: storyState.currentCharacter as 'moses' | 'david' | 'jesus',
        currentChapter: choice.nextChapter || storyState.currentChapter + 1,
        completedChapters: [...storyState.completedChapters, storyState.currentChapter],
        totalScore: newScore,
        faith: newFaith,
        courage: newCourage,
        obedience: newObedience,
        completed: choice.nextChapter === null
      }
      localStorageService.saveStoryProgress(progress)
    }
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading story experience...</p>
        </div>
      </div>
    )
  }

  if (showCharacterSelect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold font-serif mb-6">Bible Character Stories</h1>
            <p className="text-xl text-blue-100">
              Walk in the footsteps of great biblical figures and learn their lessons
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(characterStories).map(([id, story], index) => (
              <motion.div
                key={id}
                className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 overflow-hidden group focus-within:ring-2 focus-within:ring-yellow-400 focus-within:ring-offset-2"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectCharacter(id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectCharacter(id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select ${story.name} story. ${story.description}. ${story.chapters.length} chapters available.`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Character icon */}
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-lg relative"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {story.name.charAt(0)}
                </motion.div>

                {/* Story title */}
                <h3 className="text-2xl font-semibold mb-2 text-center group-hover:text-yellow-300 transition-colors">
                  {story.name}
                </h3>

                {/* Story description */}
                <p className="text-blue-100 text-sm mb-4 text-center leading-relaxed">
                  {story.description}
                </p>

                {/* Chapter count */}
                <div className="text-center">
                  <div className="text-sm text-blue-200 font-medium">
                    {story.chapters.length} Chapters • Interactive Adventure
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!currentStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading story...</p>
        </div>
      </div>
    )
  }

  const currentChapter = currentStory.chapters.find(c => c.id === storyState.currentChapter)

  if (!currentChapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p>Chapter not found</p>
          <button
            onClick={() => setShowCharacterSelect(true)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Back to Selection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => setShowCharacterSelect(true)}
            className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Choose Character</span>
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold">{currentStory.name}</h1>
            <p className="text-blue-200">Chapter {storyState.currentChapter} of {currentStory.chapters.length}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200">Score: {storyState.totalScore}</div>
          </div>
        </motion.div>

        {/* Chapter Content */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-4">{currentChapter.title}</h2>
          <p className="text-lg mb-6 leading-relaxed">{currentChapter.description}</p>
          <div className="text-sm text-blue-200 mb-6">
            <BookOpen className="w-4 h-4 inline mr-2" />
            {currentChapter.bibleReference}
          </div>
        </motion.div>

        {/* Choices */}
        <div className="space-y-4">
          {currentChapter.choices.map((choice, index) => (
            <motion.button
              key={choice.id}
              className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-left"
              onClick={() => handleChoice(choice)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-semibold mb-2">{choice.text}</div>
              <div className="text-sm text-blue-200">{choice.consequence}</div>

              {(choice.faith || choice.courage || choice.obedience) && (
                <div className="flex items-center space-x-4 mt-4 text-xs">
                  {choice.faith && (
                    <div className="flex items-center space-x-1 text-red-400">
                      <span>+{choice.faith} Faith</span>
                    </div>
                  )}
                  {choice.courage && (
                    <div className="flex items-center space-x-1 text-blue-400">
                      <span>+{choice.courage} Courage</span>
                    </div>
                  )}
                  {choice.obedience && (
                    <div className="flex items-center space-x-1 text-green-400">
                      <span>+{choice.obedience} Obedience</span>
                    </div>
                  )}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
