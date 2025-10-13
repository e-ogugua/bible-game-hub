// Game Context Types
export interface GameState {
  currentGame: string | null
  score: number
  currentQuestion: number
  gameStarted: boolean
  totalQuestions: number
}

export interface GameContextType {
  gameState: GameState
  startGame: (gameId: string) => void
  resetGame: () => void
  updateScore: (newScore: number) => void
  nextQuestion: () => void
}

// Quiz Game Types
export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

export interface QuizGameState {
  currentQuestionIndex: number
  score: number
  selectedAnswer: number | null
  showResult: boolean
  isCorrect: boolean
  questions: QuizQuestion[]
  gameCompleted: boolean
}

// Memory Game Types
export interface MemoryCard {
  id: string
  content: string
  isFlipped: boolean
  isMatched: boolean
}

export interface MemoryGameState {
  cards: MemoryCard[]
  flippedCards: string[]
  matchedPairs: number
  moves: number
  gameCompleted: boolean
  difficulty: 'easy' | 'medium' | 'hard'
}

// Adventure Game Types
export interface AdventureStep {
  id: string
  title: string
  description: string
  choices: AdventureChoice[]
  backgroundImage?: string
}

export interface AdventureChoice {
  id: string
  text: string
  consequence: string
  nextStepId?: string
  isEnding?: boolean
  score?: number
}

export interface AdventureGameState {
  currentStepId: string
  completedSteps: string[]
  totalScore: number
  gameCompleted: boolean
  choices: string[]
}

// Leaderboard Types
export interface LeaderboardEntry {
  id: string
  name: string
  score: number
  gameType: string
  timestamp: Date
}

export interface LeaderboardData {
  quiz: LeaderboardEntry[]
  memory: LeaderboardEntry[]
  adventure: LeaderboardEntry[]
  overall: LeaderboardEntry[]
}

// UI Component Types
export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

// Common Types
export type Difficulty = 'easy' | 'medium' | 'hard'
export type GameType = 'quiz' | 'memory' | 'adventure' | 'leaderboard'
