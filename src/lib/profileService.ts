import { FaithVerseProfile, LeaderboardEntry, GameSave, SyncResult } from '@/types/faithverse'

export class ProfileService {
  private static readonly STORAGE_KEYS = {
    CURRENT_PROFILE: 'faithverse_current_profile',
    PROFILES: 'faithverse_profiles',
    GAME_SAVES: 'faithverse_game_saves',
    LEADERBOARD: 'faithverse_leaderboard'
  }

  // Profile Management
  static createProfile(profileData: Omit<FaithVerseProfile, 'id' | 'joinedAt' | 'lastActive'>): FaithVerseProfile {
    const profile: FaithVerseProfile = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      ...profileData
    }

    const profiles = this.getAllProfiles()
    profiles.push(profile)
    localStorage.setItem(this.STORAGE_KEYS.PROFILES, JSON.stringify(profiles))

    // Set as current profile
    localStorage.setItem(this.STORAGE_KEYS.CURRENT_PROFILE, profile.id)

    return profile
  }

  static getCurrentProfile(): FaithVerseProfile | null {
    const currentId = localStorage.getItem(this.STORAGE_KEYS.CURRENT_PROFILE)
    if (!currentId) return null

    const profiles = this.getAllProfiles()
    return profiles.find(p => p.id === currentId) || null
  }

  static getAllProfiles(): FaithVerseProfile[] {
    const stored = localStorage.getItem(this.STORAGE_KEYS.PROFILES)
    return stored ? JSON.parse(stored) : []
  }

  static updateProfile(profileId: string, updates: Partial<FaithVerseProfile>): FaithVerseProfile | null {
    const profiles = this.getAllProfiles()
    const index = profiles.findIndex(p => p.id === profileId)

    if (index === -1) return null

    profiles[index] = {
      ...profiles[index],
      ...updates,
      lastActive: new Date().toISOString()
    }

    localStorage.setItem(this.STORAGE_KEYS.PROFILES, JSON.stringify(profiles))
    return profiles[index]
  }

  static switchProfile(profileId: string): boolean {
    const profile = this.getAllProfiles().find(p => p.id === profileId)
    if (profile) {
      localStorage.setItem(this.STORAGE_KEYS.CURRENT_PROFILE, profileId)
      return true
    }
    return false
  }

  static deleteProfile(profileId: string): boolean {
    const profiles = this.getAllProfiles()
    const filtered = profiles.filter(p => p.id !== profileId)

    if (filtered.length === profiles.length) return false

    localStorage.setItem(this.STORAGE_KEYS.PROFILES, JSON.stringify(filtered))

    // If this was the current profile, clear it
    if (localStorage.getItem(this.STORAGE_KEYS.CURRENT_PROFILE) === profileId) {
      localStorage.removeItem(this.STORAGE_KEYS.CURRENT_PROFILE)
    }

    return true
  }

  // Game Save Management
  static saveGameProgress(save: GameSave): void {
    const saves = this.getGameSaves()
    const existingIndex = saves.findIndex(s => s.userId === save.userId && s.gameType === save.gameType)

    if (existingIndex >= 0) {
      saves[existingIndex] = save
    } else {
      saves.push(save)
    }

    localStorage.setItem(this.STORAGE_KEYS.GAME_SAVES, JSON.stringify(saves))
  }

  static getGameSaves(userId?: string): GameSave[] {
    const stored = localStorage.getItem(this.STORAGE_KEYS.GAME_SAVES)
    const saves: GameSave[] = stored ? JSON.parse(stored) : []

    return userId ? saves.filter(s => s.userId === userId) : saves
  }

  static getGameSave(userId: string, gameType: GameSave['gameType']): GameSave | null {
    const saves = this.getGameSaves(userId)
    return saves.find(s => s.gameType === gameType) || null
  }

  // Leaderboard Management
  static getLeaderboard(): LeaderboardEntry[] {
    const stored = localStorage.getItem(this.STORAGE_KEYS.LEADERBOARD)
    if (stored) {
      return JSON.parse(stored)
    }

    // Generate mock leaderboard data
    return this.generateMockLeaderboard()
  }

  static updateLeaderboardScore(userId: string, score: number): void {
    const currentProfile = this.getCurrentProfile()
    if (!currentProfile) return

    // Update user's total score
    const updatedProfile = {
      ...currentProfile,
      totalScore: Math.max(currentProfile.totalScore, score),
      xp: Math.max(currentProfile.xp, score),
      lastActive: new Date().toISOString()
    }

    this.updateProfile(userId, updatedProfile)

    // Update leaderboard
    this.refreshLeaderboard()
  }

  private static generateMockLeaderboard(): LeaderboardEntry[] {
    const mockUsers = [
      { username: 'FaithSeeker', displayName: 'Sarah Johnson', xp: 15420, level: 23 },
      { username: 'BibleScholar', displayName: 'Michael Chen', xp: 12890, level: 19 },
      { username: 'PrayerWarrior', displayName: 'Emma Davis', xp: 11200, level: 17 },
      { username: 'ScriptureSage', displayName: 'David Wilson', xp: 9870, level: 15 },
      { username: 'GospelGuide', displayName: 'Lisa Rodriguez', xp: 8340, level: 13 }
    ]

    return mockUsers.map((user, index) => ({
      id: `mock_${index + 1}`,
      username: user.username,
      displayName: user.displayName,
      xp: user.xp,
      level: user.level,
      totalScore: user.xp,
      rank: index + 1,
      joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    }))
  }

  private static refreshLeaderboard(): void {
    const profiles = this.getAllProfiles()
    const leaderboard = profiles
      .map((profile, index) => ({
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        avatar: profile.avatar,
        xp: profile.xp,
        level: profile.level,
        totalScore: profile.totalScore,
        rank: index + 1,
        joinedAt: profile.joinedAt
      }))
      .sort((a, b) => b.xp - a.xp)
      .map((entry, index) => ({ ...entry, rank: index + 1 }))

    localStorage.setItem(this.STORAGE_KEYS.LEADERBOARD, JSON.stringify(leaderboard))
  }

  // Cloud Sync Placeholders (for future backend integration)
  static async syncWithCloud(): Promise<SyncResult> {
    // Placeholder for cloud sync
    // In Phase 6, this would connect to Supabase/Firebase
    return {
      success: true,
      message: 'Local sync completed. Cloud integration coming in Phase 6!'
    }
  }

  static async backupToCloud(): Promise<SyncResult> {
    // Placeholder for cloud backup
    return {
      success: true,
      message: 'Profile backed up locally. Cloud backup coming in Phase 6!'
    }
  }

  // Export/Import for sharing
  static exportProfileData(): string {
    const profile = this.getCurrentProfile()
    const saves = this.getGameSaves(profile?.id)

    return JSON.stringify({
      profile,
      saves,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    }, null, 2)
  }

  static importProfileData(jsonData: string): SyncResult {
    try {
      const data = JSON.parse(jsonData)

      if (data.profile) {
        const profiles = this.getAllProfiles()
        profiles.push(data.profile)
        localStorage.setItem(this.STORAGE_KEYS.PROFILES, JSON.stringify(profiles))
      }

      if (data.saves) {
        const saves = this.getGameSaves()
        saves.push(...data.saves)
        localStorage.setItem(this.STORAGE_KEYS.GAME_SAVES, JSON.stringify(saves))
      }

      return {
        success: true,
        message: 'Profile data imported successfully!'
      }
    } catch {
      return {
        success: false,
        message: 'Failed to import profile data. Please check the file format.'
      }
    }
  }
}
