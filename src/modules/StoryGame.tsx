'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Heart, Shield, Star } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useGameContext } from '@/contexts/GameContext'
import { characterStories, CharacterStory } from '@/data/characterStories'
import { localStorageService, StoryProgress } from '@/lib/localStorage'
import { audioManager } from '@/lib/audioManager'
import { StoryScene } from '@/components/StoryScene'

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

const StoryGameContent: React.FC = () => {
  const { user } = useAuth()
  const { gameState, startGame, updateScore } = useGameContext()

  const [storyState, setStoryState] = useState<StoryGameState>({
    currentCharacter: null,
    currentChapter: 1,
    completedChapters: [],
    totalScore: 0,
    faith: 0,
    courage: 0,
    obedience: 0,
    gameCompleted: false,
  })

  const [currentStory, setCurrentStory] = useState<CharacterStory | null>(null)
  const [showCharacterSelect, setShowCharacterSelect] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (gameState.gameStarted && !gameState.currentGame) {
      startGame('story')
    }
  }, [gameState.gameStarted, gameState.currentGame, startGame])

  // Auto-select first character (Moses) when component mounts to show story immediately
  useEffect(() => {
    if (showCharacterSelect && !currentStory && !storyState.currentCharacter) {
      // Auto-select Moses as the default character to show the story immediately
      const autoSelectCharacter = () => {
        const story = characterStories['moses']

        // Start ambient music for the character
        audioManager.playAmbientMusic('moses')

        // Load existing progress if user is logged in
        let existingProgress: StoryProgress | null = null
        if (user) {
          existingProgress = localStorageService.getStoryProgress(
            user.id,
            'moses'
          )
        }

        if (existingProgress) {
          // Resume from saved progress
          setStoryState({
            currentCharacter: 'moses',
            currentChapter: existingProgress.currentChapter,
            completedChapters: existingProgress.completedChapters,
            totalScore: existingProgress.totalScore,
            faith: existingProgress.faith,
            courage: existingProgress.courage,
            obedience: existingProgress.obedience,
            gameCompleted: existingProgress.completed,
          })
        } else {
          // Start fresh
          setStoryState({
            currentCharacter: 'moses',
            currentChapter: 1,
            completedChapters: [],
            totalScore: 0,
            faith: 0,
            courage: 0,
            obedience: 0,
            gameCompleted: false,
          })
        }

        setCurrentStory(story)
        setShowCharacterSelect(false)
      }

      setTimeout(autoSelectCharacter, 100) // Small delay to ensure proper initialization
    }
  }, [showCharacterSelect, currentStory, storyState.currentCharacter, user])

  const selectCharacter = (characterId: string) => {
    const story = characterStories[characterId as keyof typeof characterStories]

    // Start ambient music for the character
    audioManager.playAmbientMusic(characterId)

    // Load existing progress if user is logged in
    let existingProgress: StoryProgress | null = null
    if (user) {
      existingProgress = localStorageService.getStoryProgress(
        user.id,
        characterId
      )
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
        gameCompleted: existingProgress.completed,
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
        gameCompleted: false,
      })
    }

    setCurrentStory(story)
    setShowCharacterSelect(false)
  }

  const handleChoice = async (choice: {
    id: string
    score?: number
    faith?: number
    courage?: number
    obedience?: number
    nextChapter?: number | null
  }) => {
    // Play choice selection sound
    audioManager.playSoundEffect('choice')

    const newScore = storyState.totalScore + (choice.score || 0)
    const newFaith = storyState.faith + (choice.faith || 0)
    const newCourage = storyState.courage + (choice.courage || 0)
    const newObedience = storyState.obedience + (choice.obedience || 0)

    setStoryState((prev) => ({
      ...prev,
      totalScore: newScore,
      faith: newFaith,
      courage: newCourage,
      obedience: newObedience,
      completedChapters: [...prev.completedChapters, prev.currentChapter],
      currentChapter: choice.nextChapter || prev.currentChapter + 1,
      gameCompleted: choice.nextChapter === null,
    }))

    // Play victory sound if game is completed
    if (choice.nextChapter === null) {
      setTimeout(() => {
        audioManager.playSoundEffect('victory')
      }, 500)
    }

    // Save progress to localStorage if user is logged in
    if (user && storyState.currentCharacter) {
      const progress: Omit<StoryProgress, 'id' | 'lastPlayed'> = {
        userId: user.id,
        character: storyState.currentCharacter as 'moses' | 'david' | 'jesus',
        currentChapter: choice.nextChapter || storyState.currentChapter + 1,
        completedChapters: [
          ...storyState.completedChapters,
          storyState.currentChapter,
        ],
        totalScore: newScore,
        faith: newFaith,
        courage: newCourage,
        obedience: newObedience,
        completed: choice.nextChapter === null,
      }
      localStorageService.saveStoryProgress(progress)
    }

    // Update global game score
    updateScore(newScore)
  }

  const handleRestart = () => {
    setStoryState((prev) => ({
      ...prev,
      currentChapter: 1,
      completedChapters: [],
      totalScore: 0,
      faith: 0,
      courage: 0,
      obedience: 0,
      gameCompleted: false,
    }))
  }

  const handleBackToSelection = () => {
    setCurrentStory(null)
    setStoryState((prev) => ({
      ...prev,
      currentCharacter: null,
      currentChapter: 1,
      completedChapters: [],
      totalScore: 0,
      faith: 0,
      courage: 0,
      obedience: 0,
      gameCompleted: false,
    }))
    setShowCharacterSelect(true)
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
            <h1 className="text-5xl font-bold font-serif mb-6">
              Bible Character Stories
            </h1>
            <p className="text-xl text-blue-100">
              Walk in the footsteps of great biblical figures and learn their
              lessons
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
                    e.preventDefault()
                    selectCharacter(id)
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

                {/* Pulsing border effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-yellow-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-400/20" />

                {/* Character icon with enhanced effects */}
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-lg relative"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {story.name.charAt(0)}
                </motion.div>

                {/* Story title with glow effect */}
                <h3 className="text-2xl font-semibold mb-2 text-center group-hover:text-yellow-300 transition-colors relative">
                  {story.name}
                  <div className="absolute inset-0 text-yellow-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm">
                    {story.name}
                  </div>
                </h3>

                {/* Story description with better typography */}
                <p className="text-blue-100 text-sm mb-4 text-center leading-relaxed">
                  {story.description}
                </p>

                {/* Enhanced virtue preview meters */}
                <div className="flex justify-center space-x-4 mb-4">
                  <div className="text-center">
                    <div className="w-8 h-2 bg-red-900/50 rounded-full overflow-hidden mb-1 relative">
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-sm"
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{
                          delay: parseInt(id) * 0.1 + 0.5,
                          duration: 0.8,
                        }}
                      />
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                    <span className="text-xs text-red-300 font-medium">
                      Faith
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-2 bg-blue-900/50 rounded-full overflow-hidden mb-1 relative">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-sm"
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{
                          delay: parseInt(id) * 0.1 + 0.7,
                          duration: 0.8,
                        }}
                      />
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                    <span className="text-xs text-blue-300 font-medium">
                      Courage
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-2 bg-green-900/50 rounded-full overflow-hidden mb-1 relative">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-sm"
                        initial={{ width: 0 }}
                        animate={{ width: '80%' }}
                        transition={{
                          delay: parseInt(id) * 0.1 + 0.9,
                          duration: 0.8,
                        }}
                      />
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                    <span className="text-xs text-green-300 font-medium">
                      Obedience
                    </span>
                  </div>
                </div>

                {/* Chapter count and Bible reference preview with enhanced styling */}
                <div className="text-center space-y-2">
                  <div className="text-sm text-blue-200 font-medium">
                    {story.chapters.length} Chapters • Interactive Adventure
                  </div>
                  <div className="text-xs text-purple-300 bg-purple-900/30 px-3 py-1 rounded-full inline-block border border-purple-400/30">
                    Based on{' '}
                    {story.chapters[0]?.bibleReference || 'Biblical Stories'}
                  </div>
                </div>

                {/* Floating particles effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${30 + (i % 3) * 20}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (storyState.gameCompleted && currentStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Story Complete!</h2>
            <p className="text-xl mb-6">
              You scored {storyState.totalScore} points in {currentStory.name}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-purple-600/50 rounded-lg p-4">
                <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{storyState.faith}</div>
                <div className="text-sm text-purple-200">Faith</div>
              </div>
              <div className="bg-blue-600/50 rounded-lg p-4">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{storyState.courage}</div>
                <div className="text-sm text-blue-200">Courage</div>
              </div>
              <div className="bg-green-600/50 rounded-lg p-4">
                <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{storyState.obedience}</div>
                <div className="text-sm text-green-200">Obedience</div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
                onClick={handleRestart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Play Again</span>
              </motion.button>
              <motion.button
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
                onClick={handleBackToSelection}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Choose Another</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!currentStory) return null

  const currentChapter = currentStory.chapters.find(
    (c) => c.id === storyState.currentChapter
  )

  if (!currentChapter) return null

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
            onClick={handleBackToSelection}
            className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Choose Character</span>
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold">{currentStory.name}</h1>
            <p className="text-blue-200">
              Chapter {storyState.currentChapter} of{' '}
              {currentStory.chapters.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200">
              Score: {storyState.totalScore}
            </div>
          </div>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StoryScene
            character={storyState.currentCharacter || ''}
            chapter={storyState.currentChapter}
          />
        </motion.div>

        {/* Chapter Content */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-4">{currentChapter.title}</h2>
          <p className="text-lg mb-6 leading-relaxed">
            {currentChapter.description}
          </p>
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
                      <Heart className="w-3 h-3" />
                      <span>+{choice.faith} Faith</span>
                    </div>
                  )}
                  {choice.courage && (
                    <div className="flex items-center space-x-1 text-blue-400">
                      <Shield className="w-3 h-3" />
                      <span>+{choice.courage} Courage</span>
                    </div>
                  )}
                  {choice.obedience && (
                    <div className="flex items-center space-x-1 text-green-400">
                      <BookOpen className="w-3 h-3" />
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

// Main exported component for the story game
export const StoryGame: React.FC = () => {
  return <StoryGameContent />
}
