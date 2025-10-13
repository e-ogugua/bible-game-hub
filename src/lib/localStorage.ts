// Local Storage Service - Replaces Supabase for offline MVP
export interface UserProfile {
  id: string
  username: string
  email?: string
  avatar?: string
  xp: number
  level: number
  badges: string[]
  createdAt: string
  lastLogin: string
}

export interface GameScore {
  id: string
  userId: string
  gameType: 'quiz' | 'memory' | 'adventure' | 'story'
  score: number
  xpGained: number
  completedAt: string
  difficulty?: 'easy' | 'medium' | 'hard'
  character?: string // for story games
  chapter?: number // for story games
}

export interface StoryProgress {
  id: string
  userId: string
  character: 'moses' | 'david' | 'jesus'
  currentChapter: number
  completedChapters: number[]
  totalScore: number
  faith: number
  courage: number
  obedience: number
  lastPlayed: string
  completed: boolean
}

export interface DailyChallenge {
  id: string
  userId: string
  date: string // YYYY-MM-DD format
  challengeType: 'verse' | 'quiz' | 'memory'
  completed: boolean
  completedAt?: string
  rewardClaimed: boolean
}

class LocalStorageService {
  private readonly STORAGE_KEYS = {
    USER_PROFILE: 'bible_game_user_profile',
    GAME_SCORES: 'bible_game_scores',
    STORY_PROGRESS: 'bible_game_story_progress',
    DAILY_CHALLENGES: 'bible_game_daily_challenges',
    SETTINGS: 'bible_game_settings'
  }

  // User Profile Management
  getUserProfile(): UserProfile | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.USER_PROFILE)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  }

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(this.STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
    } catch (error) {
      console.error('Failed to save user profile:', error)
    }
  }

  updateUserProfile(updates: Partial<UserProfile>): UserProfile | null {
    const currentProfile = this.getUserProfile()
    if (!currentProfile) return null

    const updatedProfile = {
      ...currentProfile,
      ...updates,
      lastLogin: new Date().toISOString()
    }

    this.saveUserProfile(updatedProfile)
    return updatedProfile
  }

  createUserProfile(username: string, email?: string): UserProfile {
    const newProfile: UserProfile = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username,
      email,
      xp: 0,
      level: 1,
      badges: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }

    this.saveUserProfile(newProfile)
    return newProfile
  }

  // Game Scores Management
  getGameScores(userId?: string): GameScore[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.GAME_SCORES)
      const allScores: GameScore[] = data ? JSON.parse(data) : []
      return userId ? allScores.filter(score => score.userId === userId) : allScores
    } catch {
      return []
    }
  }

  saveGameScore(score: Omit<GameScore, 'id' | 'completedAt'>): GameScore {
    const newScore: GameScore = {
      ...score,
      id: `score_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      completedAt: new Date().toISOString()
    }

    try {
      const existingScores = this.getGameScores()
      const updatedScores = [...existingScores, newScore]
      localStorage.setItem(this.STORAGE_KEYS.GAME_SCORES, JSON.stringify(updatedScores))

      // Update user XP
      const userProfile = this.getUserProfile()
      if (userProfile && userProfile.id === score.userId) {
        const newXP = userProfile.xp + score.xpGained
        const newLevel = Math.floor(newXP / 100) + 1
        this.updateUserProfile({
          xp: newXP,
          level: newLevel
        })
      }
    } catch (error) {
      console.error('Failed to save game score:', error)
    }

    return newScore
  }

  getBestScore(gameType: string, userId?: string): GameScore | null {
    const scores = this.getGameScores(userId)
    const gameScores = scores.filter(score => score.gameType === gameType)
    return gameScores.length > 0 ? gameScores.reduce((best, current) =>
      current.score > best.score ? current : best
    ) : null
  }

  // Story Progress Management
  getStoryProgress(userId: string, character: string): StoryProgress | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.STORY_PROGRESS)
      const allProgress: StoryProgress[] = data ? JSON.parse(data) : []
      return allProgress.find(p => p.userId === userId && p.character === character) || null
    } catch {
      return null
    }
  }

  saveStoryProgress(progress: Omit<StoryProgress, 'id' | 'lastPlayed'>): StoryProgress {
    const newProgress: StoryProgress = {
      ...progress,
      id: `progress_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      lastPlayed: new Date().toISOString()
    }

    try {
      const existingProgress = this.getStoryProgress(progress.userId, progress.character)
      let updatedProgress: StoryProgress[]

      if (existingProgress) {
        // Update existing progress
        updatedProgress = [
          ...this.getAllStoryProgress(progress.userId).filter(p => p.id !== existingProgress.id),
          newProgress
        ]
      } else {
        // Add new progress
        const allProgress = this.getAllStoryProgress(progress.userId)
        updatedProgress = [...allProgress, newProgress]
      }

      localStorage.setItem(this.STORAGE_KEYS.STORY_PROGRESS, JSON.stringify(updatedProgress))
    } catch (error) {
      console.error('Failed to save story progress:', error)
    }

    return newProgress
  }

  getAllStoryProgress(userId?: string): StoryProgress[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.STORY_PROGRESS)
      const allProgress: StoryProgress[] = data ? JSON.parse(data) : []
      return userId ? allProgress.filter(p => p.userId === userId) : allProgress
    } catch {
      return []
    }
  }

  // Daily Challenges Management
  getDailyChallenges(userId: string): DailyChallenge[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.DAILY_CHALLENGES)
      const allChallenges: DailyChallenge[] = data ? JSON.parse(data) : []
      return allChallenges.filter(c => c.userId === userId)
    } catch {
      return []
    }
  }

  completeDailyChallenge(userId: string, challengeType: 'verse' | 'quiz' | 'memory'): void {
    const today = new Date().toISOString().split('T')[0]
    const challengeId = `${userId}_${challengeType}_${today}`

    try {
      const existingChallenges = this.getDailyChallenges(userId)
      const updatedChallenges = [
        ...existingChallenges.filter(c => c.id !== challengeId),
        {
          id: challengeId,
          userId,
          date: today,
          challengeType,
          completed: true,
          completedAt: new Date().toISOString(),
          rewardClaimed: false
        }
      ]

      localStorage.setItem(this.STORAGE_KEYS.DAILY_CHALLENGES, JSON.stringify(updatedChallenges))
    } catch (error) {
      console.error('Failed to complete daily challenge:', error)
    }
  }

  // Utility Functions
  clearAllData(): void {
    try {
      Object.values(this.STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error('Failed to clear data:', error)
    }
  }

  exportData(): string {
    try {
      const data = {
        userProfile: this.getUserProfile(),
        gameScores: this.getGameScores(),
        storyProgress: this.getAllStoryProgress(),
        dailyChallenges: this.getDailyChallenges(this.getUserProfile()?.id || '')
      }
      return JSON.stringify(data, null, 2)
    } catch (error) {
      console.error('Failed to export data:', error)
      return '{}'
    }
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)

      if (data.userProfile) {
        this.saveUserProfile(data.userProfile)
      }

      if (data.gameScores && Array.isArray(data.gameScores)) {
        localStorage.setItem(this.STORAGE_KEYS.GAME_SCORES, JSON.stringify(data.gameScores))
      }

      if (data.storyProgress && Array.isArray(data.storyProgress)) {
        localStorage.setItem(this.STORAGE_KEYS.STORY_PROGRESS, JSON.stringify(data.storyProgress))
      }

      if (data.dailyChallenges && Array.isArray(data.dailyChallenges)) {
        localStorage.setItem(this.STORAGE_KEYS.DAILY_CHALLENGES, JSON.stringify(data.dailyChallenges))
      }

      return true
    } catch (error) {
      console.error('Failed to import data:', error)
      return false
    }
  }
}

export const localStorageService = new LocalStorageService()
