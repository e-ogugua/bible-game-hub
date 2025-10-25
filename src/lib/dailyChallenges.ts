import { LucideIcon } from 'lucide-react'

export interface DailyChallenge {
  id: string
  title: string
  description: string
  icon: LucideIcon | null
  completed: boolean
  type: 'daily_verse' | 'quiz_streak' | 'story_chapter' | 'memory_game'
  target?: number // For streaks or targets
  current?: number // Current progress
  lastUpdated?: string
  expiresAt?: string
}

export interface DailyBibleVerse {
  id: string
  verse: string
  reference: string
  date: string
  completed: boolean
  memorized: boolean
}

export interface QuizStreak {
  current: number
  longest: number
  lastQuizDate: string | null
  completed: boolean
}

class DailyChallengesService {
  private static instance: DailyChallengesService
  private readonly STORAGE_KEY = 'bible_game_daily_challenges'
  private readonly VERSE_STORAGE_KEY = 'bible_game_daily_verses'
  private readonly STREAK_STORAGE_KEY = 'bible_game_quiz_streak'

  static getInstance(): DailyChallengesService {
    if (!DailyChallengesService.instance) {
      DailyChallengesService.instance = new DailyChallengesService()
    }
    return DailyChallengesService.instance
  }

  // Get today's date in YYYY-MM-DD format
  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0]
  }

  // Get daily challenges for user
  getDailyChallenges(userId: string): DailyChallenge[] {
    const challenges = this.getStoredChallenges(userId)
    const today = this.getTodayDate()

    // Reset daily challenges if it's a new day
    const needsReset = challenges.every((c) => c.lastUpdated !== today)

    if (needsReset) {
      return this.resetDailyChallenges(userId)
    }

    return challenges
  }

  // Reset daily challenges for new day
  private resetDailyChallenges(userId: string): DailyChallenge[] {
    const today = this.getTodayDate()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const challenges: DailyChallenge[] = [
      {
        id: 'daily_verse',
        title: 'Daily Bible Verse',
        description: "Memorize today's featured verse",
        icon: null, // Will be set by component
        completed: false,
        type: 'daily_verse',
        lastUpdated: today,
        expiresAt: tomorrow.toISOString(),
      },
      {
        id: 'quiz_streak',
        title: 'Quiz Streak',
        description: 'Complete 3 quizzes in a row',
        icon: null, // Will be set by component
        completed: false,
        type: 'quiz_streak',
        target: 3,
        current: 0,
        lastUpdated: today,
        expiresAt: tomorrow.toISOString(),
      },
    ]

    this.saveChallenges(userId, challenges)
    return challenges
  }

  // Update daily challenge progress
  updateChallenge(
    userId: string,
    challengeId: string,
    completed: boolean,
    current?: number
  ): DailyChallenge[] {
    const challenges = this.getDailyChallenges(userId)
    const challenge = challenges.find((c) => c.id === challengeId)

    if (challenge) {
      challenge.completed = completed
      if (current !== undefined) {
        challenge.current = current
      }
      challenge.lastUpdated = this.getTodayDate()
      this.saveChallenges(userId, challenges)
    }

    return challenges
  }

  // Get today's bible verse
  getTodayVerse(): DailyBibleVerse {
    const verses = this.getStoredVerses()
    const today = this.getTodayDate()

    let todayVerse = verses.find((v) => v.date === today)

    if (!todayVerse) {
      // Generate a new verse for today
      todayVerse = this.generateTodayVerse(today)
      verses.push(todayVerse)
      this.saveVerses(verses)
    }

    return todayVerse
  }

  // Generate a new daily verse
  private generateTodayVerse(date: string): DailyBibleVerse {
    const verses = [
      {
        verse:
          'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
        reference: 'John 3:16',
      },
      {
        verse:
          'Trust in the Lord with all your heart and lean not on your own understanding.',
        reference: 'Proverbs 3:5',
      },
      {
        verse: 'I can do all things through Christ who strengthens me.',
        reference: 'Philippians 4:13',
      },
      {
        verse: 'The Lord is my shepherd, I lack nothing.',
        reference: 'Psalm 23:1',
      },
      {
        verse:
          'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
        reference: 'Joshua 1:9',
      },
    ]

    const randomVerse = verses[Math.floor(Math.random() * verses.length)]

    return {
      id: `verse_${date}_${Date.now()}`,
      verse: randomVerse.verse,
      reference: randomVerse.reference,
      date,
      completed: false,
      memorized: false,
    }
  }

  // Mark verse as completed/memorized
  markVerseCompleted(
    userId: string,
    completed: boolean,
    memorized: boolean = false
  ): DailyBibleVerse {
    const verse = this.getTodayVerse()
    verse.completed = completed
    verse.memorized = memorized

    const verses = this.getStoredVerses()
    const index = verses.findIndex((v) => v.id === verse.id)
    if (index >= 0) {
      verses[index] = verse
      this.saveVerses(verses)
    }

    // Update daily challenge
    this.updateChallenge(userId, 'daily_verse', completed)

    return verse
  }

  // Get quiz streak data
  getQuizStreak(userId: string): QuizStreak {
    const stored = localStorage.getItem(`${this.STREAK_STORAGE_KEY}_${userId}`)
    if (stored) {
      return JSON.parse(stored)
    }

    return {
      current: 0,
      longest: 0,
      lastQuizDate: null,
      completed: false,
    }
  }

  // Update quiz streak after completing a quiz
  updateQuizStreak(userId: string, completed: boolean): QuizStreak {
    const streak = this.getQuizStreak(userId)
    const today = this.getTodayDate()

    if (completed) {
      // Check if it's a new day
      if (streak.lastQuizDate !== today) {
        streak.current += 1
        streak.lastQuizDate = today
      }
    } else {
      // Reset streak if quiz failed
      if (streak.current > 0) {
        streak.longest = Math.max(streak.longest, streak.current)
        streak.current = 0
      }
    }

    // Check if streak challenge is completed (3 in a row)
    const challenges = this.getDailyChallenges(userId)
    const streakChallenge = challenges.find((c) => c.type === 'quiz_streak')
    if (streakChallenge && streak.current >= (streakChallenge.target || 3)) {
      streakChallenge.completed = true
      this.saveChallenges(userId, challenges)
    }

    localStorage.setItem(
      `${this.STREAK_STORAGE_KEY}_${userId}`,
      JSON.stringify(streak)
    )
    return streak
  }

  // Private storage methods
  private getStoredChallenges(userId: string): DailyChallenge[] {
    const stored = localStorage.getItem(`${this.STORAGE_KEY}_${userId}`)
    return stored ? JSON.parse(stored) : []
  }

  private saveChallenges(userId: string, challenges: DailyChallenge[]): void {
    localStorage.setItem(
      `${this.STORAGE_KEY}_${userId}`,
      JSON.stringify(challenges)
    )
  }

  private getStoredVerses(): DailyBibleVerse[] {
    const stored = localStorage.getItem(this.VERSE_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }

  private saveVerses(verses: DailyBibleVerse[]): void {
    localStorage.setItem(this.VERSE_STORAGE_KEY, JSON.stringify(verses))
  }
}

export const dailyChallengesService = DailyChallengesService.getInstance()
