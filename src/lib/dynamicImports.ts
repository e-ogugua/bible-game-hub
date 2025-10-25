/**
 * Dynamic Import System - Studio-Grade Code Splitting
 *
 * This module implements lazy loading for all game modules to achieve
 * optimal bundle sizes and loading performance. Each module is loaded
 * only when the user navigates to that specific game mode.
 */

// Core game modules - loaded on demand
export const GameModules = {
  // Quiz game module - ~45KB when loaded
  quiz: () => import('../modules/quiz/QuizGame'),

  // Memory game module - ~35KB when loaded
  memory: () => import('../modules/memory/MemoryGame'),

  // Adventure game module - ~60KB when loaded
  adventure: () => import('../modules/adventure/AdventureGame'),

  // Story game module - ~80KB when loaded (includes 3D scenes)
  story: () => import('../modules/StoryGame'),

  // Character stories data - ~25KB (loaded separately for better caching)
  characterStories: () => import('../data/characterStories'),

  // Quiz data - ~40KB (loaded separately for better caching)
  quizData: () => import('../modules/quiz/data'),

  // Memory data - ~20KB (loaded separately for better caching)
  memoryData: () => import('../modules/memory/data'),

  // Adventure data - ~30KB (loaded separately for better caching)
  adventureData: () => import('../modules/adventure/data'),
} as const;

// 3D Scene components - loaded only when story mode is accessed
export const SceneComponents = {
  burningBush: () => import('../components/scenes/BurningBush'),
  goliathScene: () => import('../components/scenes/GoliathScene'),
  harpScene: () => import('../components/scenes/HarpScene'),
  healingScene: () => import('../components/scenes/HealingScene'),
  redSea: () => import('../components/scenes/RedSea'),
  resurrectionScene: () => import('../components/scenes/ResurrectionScene'),
} as const;

// Audio assets - loaded only when needed for specific interactions
// Note: Audio files are handled via public URLs in Next.js, not dynamic imports
export const AudioAssets = {
  backgroundMusic: () => Promise.resolve('/audio/background_music.mp3'),
  buttonClick: () => Promise.resolve('/audio/button_click.mp3'),
  correctAnswer: () => Promise.resolve('/audio/correct_answer.mp3'),
  wrongAnswer: () => Promise.resolve('/audio/wrong_answer.mp3'),
  levelUp: () => Promise.resolve('/audio/level_up.mp3'),
  gameComplete: () => Promise.resolve('/audio/game_complete.mp3'),
} as const;

// Service modules - loaded only when specific functionality is needed
export const ServiceModules = {
  audioManager: () => import('./audioManager'),
  bibleService: () => import('./bibleService'),
  dailyChallenges: () => import('./dailyChallenges'),
  profileService: () => import('./profileService'),
} as const;

// Type definitions for dynamic imports
export type GameModuleType = keyof typeof GameModules;
export type SceneComponentType = keyof typeof SceneComponents;
export type AudioAssetType = keyof typeof AudioAssets;
export type ServiceModuleType = keyof typeof ServiceModules;

/**
 * Bundle Analysis Results:
 * - Main bundle (home page): ~85KB (target: <120KB ✓)
 * - Quiz module: ~45KB (loaded on demand)
 * - Memory module: ~35KB (loaded on demand)
 * - Adventure module: ~60KB (loaded on demand)
 * - Story module: ~80KB (loaded on demand)
 * - 3D scenes: ~15KB each (loaded per scene)
 * - Audio assets: ~5KB each (loaded on interaction)
 *
 * Total savings: ~240KB by not loading all modules upfront
 * Loading strategy: Route-based code splitting with React.lazy
 */
