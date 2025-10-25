'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { GameState, GameContextType } from '@/types'

const GameContext = createContext<GameContextType | undefined>(undefined)

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider')
  }
  return context
}

interface GameProviderProps {
  children: ReactNode
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentGame: null,
    score: 0,
    currentQuestion: 0,
    gameStarted: false,
    totalQuestions: 0,
  })

  const startGame = (gameId: string) => {
    setGameState({
      currentGame: gameId,
      score: 0,
      currentQuestion: 0,
      gameStarted: true,
      totalQuestions: getTotalQuestions(),
    })
  }

  const resetGame = () => {
    setGameState({
      currentGame: null,
      score: 0,
      currentQuestion: 0,
      gameStarted: false,
      totalQuestions: 0,
    })
  }

  const updateScore = (newScore: number) => {
    setGameState((prev: GameState) => ({ ...prev, score: newScore }))
  }

  const nextQuestion = () => {
    setGameState((prev: GameState) => ({
      ...prev,
      currentQuestion: Math.min(
        prev.currentQuestion + 1,
        prev.totalQuestions - 1
      ),
    }))
  }

  const getTotalQuestions = (): number => {
    // This will be populated based on the specific game module
    return 5 // Default value
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        resetGame,
        updateScore,
        nextQuestion,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
