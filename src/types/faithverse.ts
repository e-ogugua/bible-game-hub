export interface FaithVerseProfile {
  id: string
  username: string
  displayName: string
  avatar?: string
  email?: string
  joinedAt: string
  lastActive: string
  level: number
  xp: number
  totalScore: number
  gamesPlayed: {
    quiz: number
    memory: number
    story: number
    adventure: number
  }
  achievements: string[]
  badges: Badge[]
  preferences: {
    theme: 'light' | 'dark' | 'divine'
    soundEnabled: boolean
    musicVolume: number
    sfxVolume: number
  }
  stats: {
    versesMemorized: number
    quizzesCompleted: number
    storiesFinished: number
    perfectScores: number
    streakDays: number
  }
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt: string
}

export interface LeaderboardEntry {
  id: string
  username: string
  displayName: string
  avatar?: string
  xp: number
  level: number
  totalScore: number
  rank: number
  joinedAt: string
  isCurrentUser?: boolean
}

export interface GameSave {
  userId: string
  gameType: 'quiz' | 'memory' | 'story' | 'adventure'
  progress: Record<string, unknown>
  score: number
  completed: boolean
  lastPlayed: string
}

export interface SyncResult {
  success: boolean
  message: string
  data?: Record<string, unknown>
}
