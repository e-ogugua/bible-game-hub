'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  RotateCcw,
  Clock,
  Target,
  Volume2,
  VolumeX,
  Star,
  Zap,
  Trophy,
  Flame,
  Sparkles,
  PlayCircle,
  Timer,
  Infinity,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useGameContext } from '@/contexts/GameContext'
import {
  MemoryCard,
  classicCards,
  newTestamentCards,
  psalmsCards,
  wisdomCards,
  shuffleCards,
} from './data'
import { Card } from './Card'

type GameMode = 'classic' | 'time-trial' | 'endless'
type Theme = 'classic' | 'new-testament' | 'psalms' | 'wisdom'

export const MemoryGame: React.FC = () => {
  const { gameState, startGame, updateScore } = useGameContext()
  const router = useRouter()
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<Theme>('classic')
  const [gameMode, setGameMode] = useState<GameMode>('classic')
  const [showModeSelection, setShowModeSelection] = useState(true)
  const [showThemeSelection, setShowThemeSelection] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [streak, setStreak] = useState(0)
  const [combo, setCombo] = useState(0)
  const [score, setScore] = useState(0)
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; color: string }>
  >([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const comboTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (gameState.gameStarted && !gameState.currentGame) {
      startGame('memory')
    }
  }, [gameState.gameStarted, gameState.currentGame, startGame])

  const getCardsForTheme = (theme: Theme): MemoryCard[] => {
    switch (theme) {
      case 'classic':
        return classicCards
      case 'new-testament':
        return newTestamentCards
      case 'psalms':
        return psalmsCards
      case 'wisdom':
        return wisdomCards
    }
  }

  const getGridCols = (theme: Theme): string => {
    const cardCount = getCardsForTheme(theme).length
    if (cardCount <= 8) return 'grid-cols-4' // 2x4 or smaller
    if (cardCount <= 12) return 'grid-cols-4' // 3x4
    return 'grid-cols-4' // 4x4 for larger sets
  }

  const startNewGame = (theme: Theme, mode: GameMode) => {
    const cardsForTheme = getCardsForTheme(theme)
    const shuffledCards = shuffleCards(cardsForTheme)
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs([])
    setMoves(0)
    setTime(0)
    setGameCompleted(false)
    setCurrentTheme(theme)
    setGameMode(mode)
    setScore(0)
    setStreak(0)
    setCombo(0)
    setShowModeSelection(false)
    setShowThemeSelection(false)
    startGame('memory')

    // Start timer for time-trial mode
    if (mode === 'time-trial') {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev >= 120) {
            // 2 minutes for time trial
            setGameCompleted(true)
            if (intervalRef.current) clearInterval(intervalRef.current)
            return prev
          }
          return prev + 1
        })
      }, 1000)
    } else if (mode === 'classic') {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }
    // Endless mode doesn't have a timer
  }

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId)) {
      return
    }

    const card = cards.find((c) => c.id === cardId)
    if (!card || matchedPairs.includes(card.pairId)) {
      return
    }

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)
    setMoves((prev) => prev + 1)

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards.map(
        (id) => cards.find((c) => c.id === id)!
      )

      if (firstCard.pairId === secondCard.pairId) {
        // Match found - increase combo and streak
        setCombo((prev) => prev + 1)
        setStreak((prev) => prev + 1)

        // Clear combo timeout
        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current)

        // Calculate score with combo multiplier
        const baseScore = 100
        const comboMultiplier = Math.min(combo + 1, 5) // Max 5x multiplier
        const newScore = score + baseScore * comboMultiplier
        setScore(newScore)

        // Create celebration particles
        createParticles()

        setTimeout(() => {
          setMatchedPairs((prev) => [...prev, firstCard.pairId])
          setFlippedCards([])
          if (soundEnabled) playSound('correct')
        }, 1000)

        // Reset combo after delay
        comboTimeoutRef.current = setTimeout(() => {
          setCombo(0)
        }, 3000)
      } else {
        // No match - reset combo
        setCombo(0)
        setStreak((prev) => Math.max(0, prev - 1))

        setTimeout(() => {
          setFlippedCards([])
          if (soundEnabled) playSound('wrong')
        }, 1500)
      }
    }
  }

  const createParticles = () => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#fbbf24', '#f59e0b', '#d97706', '#92400e'][
        Math.floor(Math.random() * 4)
      ],
    }))
    setParticles(newParticles)

    setTimeout(() => {
      setParticles([])
    }, 2000)
  }

  const playSound = (type: 'correct' | 'wrong') => {
    if (!soundEnabled) return

    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    const audioContext = new AudioContextClass()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === 'correct') {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1)
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
    } else {
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    }

    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    )

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const calculateFinalScore = useCallback(() => {
    let baseScore = score

    // Time bonus for classic mode
    if (gameMode === 'classic') {
      const timeBonus = Math.max(0, 600 - time) // Bonus for completing quickly
      baseScore += timeBonus
    }

    // Streak bonus
    if (streak >= 5) {
      baseScore += streak * 50
    }

    // Mode multiplier
    if (gameMode === 'time-trial') {
      baseScore *= 1.5
    }

    return Math.max(0, Math.floor(baseScore))
  }, [score, time, streak, gameMode])

  useEffect(() => {
    if (gameMode === 'classic' || gameMode === 'time-trial') {
      const totalPairs = getCardsForTheme(currentTheme).length / 2
      if (matchedPairs.length === totalPairs) {
        setGameCompleted(true)
        if (intervalRef.current) clearInterval(intervalRef.current)
        const finalScore = calculateFinalScore()
        updateScore(finalScore)
      }
    }
  }, [matchedPairs, updateScore, calculateFinalScore, currentTheme, gameMode])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleReplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current)
    startNewGame(currentTheme, gameMode)
  }

  const handleGoHome = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current)
    router.push('/')
  }

  const getThemeInfo = (theme: Theme) => {
    switch (theme) {
      case 'classic':
        return {
          name: 'Classic Mix',
          icon: '📚',
          color: 'from-blue-500 to-purple-600',
        }
      case 'new-testament':
        return {
          name: 'New Testament',
          icon: '✝️',
          color: 'from-green-500 to-teal-600',
        }
      case 'psalms':
        return {
          name: 'Psalms',
          icon: '🎵',
          color: 'from-purple-500 to-pink-600',
        }
      case 'wisdom':
        return {
          name: 'Wisdom',
          icon: '🦉',
          color: 'from-yellow-500 to-orange-600',
        }
    }
  }

  const getModeInfo = (mode: GameMode) => {
    switch (mode) {
      case 'classic':
        return {
          name: 'Classic',
          icon: <Target className="w-5 h-5" />,
          description: 'Find all pairs at your own pace',
        }
      case 'time-trial':
        return {
          name: 'Time Trial',
          icon: <Timer className="w-5 h-5" />,
          description: 'Race against time (2 minutes)',
        }
      case 'endless':
        return {
          name: 'Endless',
          icon: <Infinity className="w-5 h-5" />,
          description: 'Keep playing for high scores',
        }
    }
  }

  if (showModeSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <span className="text-2xl">🧠</span>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">
              Scripture Memory Challenge
            </h2>
            <p className="text-blue-200 text-lg">
              Choose your game mode and dive into Bible verse memorization!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.button
              className="bible-card p-6 rounded-xl font-semibold text-lg border border-blue-400/30 hover:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={() => setShowThemeSelection(true)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Target className="w-8 h-8 mx-auto mb-3 text-blue-300" />
                <div className="font-bold text-white">Classic Mode</div>
                <div className="text-sm text-blue-200 mt-1">
                  Find all pairs at your own pace
                </div>
              </div>
            </motion.button>

            <motion.button
              className="bible-card p-6 rounded-xl font-semibold text-lg border border-green-400/30 hover:border-green-400/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={() => setShowThemeSelection(true)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Timer className="w-8 h-8 mx-auto mb-3 text-green-300" />
                <div className="font-bold text-white">Time Trial</div>
                <div className="text-sm text-green-200 mt-1">
                  Race against time (2 minutes)
                </div>
              </div>
            </motion.button>

            <motion.button
              className="bible-card p-6 rounded-xl font-semibold text-lg border border-yellow-400/30 hover:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={() => setShowThemeSelection(true)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Infinity className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                <div className="font-bold text-white">Endless Mode</div>
                <div className="text-sm text-yellow-200 mt-1">
                  Keep playing for high scores
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (showThemeSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 shadow-lg">
              <span className="text-2xl">📖</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Choose Your Scripture Theme
            </h2>
            <p className="text-blue-200 text-lg">
              Select the Bible verses you want to memorize and match!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {(['classic', 'new-testament', 'psalms', 'wisdom'] as Theme[]).map(
              (theme) => {
                const themeInfo = getThemeInfo(theme)
                return (
                  <motion.button
                    key={theme}
                    className="bible-card p-6 rounded-xl font-semibold text-lg border border-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                    onClick={() => startNewGame(theme, gameMode)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center">
                      <span className="text-3xl mb-3 block">
                        {themeInfo.icon}
                      </span>
                      <div className="font-bold text-white">{themeInfo.name}</div>
                      <div className="text-sm text-blue-200 mt-1">
                        {theme === 'classic'
                          ? 'Mixed verses from different books'
                          : theme === 'new-testament'
                            ? 'Focus on New Testament teachings'
                            : theme === 'psalms'
                              ? 'Beautiful psalms and worship'
                              : 'Wisdom from Proverbs and more'}
                      </div>
                    </div>
                  </motion.button>
                )
              }
            )}
          </div>

          <div className="text-center">
            <motion.button
              className="bible-button bible-button-secondary"
              onClick={() => setShowModeSelection(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Game Modes
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (gameCompleted) {
    const themeInfo = getThemeInfo(currentTheme)
    const modeInfo = getModeInfo(gameMode)
    const finalScore = calculateFinalScore()

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 1, type: 'spring' }}
          >
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          </motion.div>

          <h2 className="text-responsive-3xl font-bold mb-4 text-white">Challenge Complete!</h2>

          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-400/30">
              <p className="text-2xl font-bold text-yellow-300">
                Final Score: {finalScore}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-500/20 rounded-lg p-3">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-4 h-4 mr-1" />
                  <span>Moves</span>
                </div>
                <p className="font-semibold">{moves}</p>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-3">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Time</span>
                </div>
                <p className="font-semibold">{formatTime(time)}</p>
              </div>
            </div>

            <div className="bg-green-500/20 rounded-lg p-3">
              <div className="flex items-center justify-center mb-2">
                <Flame className="w-4 h-4 mr-1" />
                <span>Best Streak</span>
              </div>
              <p className="font-semibold">{streak} matches</p>
            </div>

            <div className="text-xs text-blue-200">
              <p>
                Theme: {themeInfo.name} • Mode: {modeInfo.name}
              </p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <motion.button
              className="bible-button bible-button-secondary"
              onClick={handleReplay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5" />
              <span>Play Again</span>
            </motion.button>

            <motion.button
              className="bible-button"
              onClick={() => {
                setShowModeSelection(true)
                setGameMode('classic')
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayCircle className="w-5 h-5" />
              <span>New Game</span>
            </motion.button>

            <motion.button
              className="bible-button bible-button-secondary"
              onClick={handleGoHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center md:text-left">
            <h1 className="text-responsive-4xl font-bold mb-2 text-white">Scripture Memory</h1>
            <div className="flex items-center space-x-2 text-blue-200">
              <span className="text-lg">
                {getThemeInfo(currentTheme).icon}{' '}
                {getThemeInfo(currentTheme).name}
              </span>
              <span>•</span>
              <span className="text-lg">{getModeInfo(gameMode).name}</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Score Display */}
            <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-400/30">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">{score}</span>
            </div>

            {/* Combo Display */}
            {combo > 0 && (
              <motion.div
                className="flex items-center space-x-2 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-400/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: 9999 }}
              >
                <Zap className="w-5 h-5 text-orange-400" />
                <span className="font-semibold">{combo}x Combo</span>
              </motion.div>
            )}

            {/* Streak Display */}
            {streak > 0 && (
              <div className="flex items-center space-x-2 bg-red-500/20 px-4 py-2 rounded-full border border-red-400/30">
                <Flame className="w-5 h-5 text-red-400" />
                <span className="font-semibold">{streak}</span>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span>Moves: {moves}</span>
            </div>

            {(gameMode === 'classic' || gameMode === 'time-trial') && (
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Time: {formatTime(time)}</span>
              </div>
            )}

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-full border transition-colors ${
                soundEnabled
                  ? 'bg-green-500/20 border-green-400 text-green-300'
                  : 'bg-gray-500/20 border-gray-400 text-gray-300'
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Game Board */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`game-${currentTheme}`}
            className={`grid ${getGridCols(currentTheme)} gap-4 mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 relative`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={`${card.id}-${currentTheme}-${index}`}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 100,
                }}
              >
                <Card
                  card={card}
                  isFlipped={flippedCards.includes(card.id)}
                  isMatched={matchedPairs.includes(card.pairId)}
                  onClick={() => handleCardClick(card.id)}
                  disabled={flippedCards.length === 2}
                />
              </motion.div>
            ))}

            {/* Particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                  y: [0, -50, -100],
                }}
                transition={{ duration: 2 }}
              >
                <Sparkles
                  className="w-4 h-4"
                  style={{ color: particle.color }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-blue-200 mb-4">
            Matched {matchedPairs.length} of{' '}
            {getCardsForTheme(currentTheme).length / 2} pairs
          </p>
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(matchedPairs.length / (getCardsForTheme(currentTheme).length / 2)) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {gameMode === 'time-trial' && (
            <div className="text-yellow-300 font-semibold">
              Time Remaining: {formatTime(Math.max(0, 120 - time))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
