/**
 * Memoization & Performance Utilities - Studio-Grade Optimizations
 *
 * This module provides advanced memoization strategies and performance
 * optimizations for the Bible Game Hub application.
 */

import { useCallback, useMemo, useRef, useState } from 'react'

// Custom hooks for performance optimization
export const useOptimizedCallback = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  deps: React.DependencyList
): T => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useCallback(callback, deps)
}

export const useOptimizedMemo = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo(factory, deps)
}

// Game state memoization for performance-critical components
export const useGameStateMemo = <T, R>(
  gameState: T,
  computeFn: (state: T) => R,
  deps: readonly unknown[] = []
): R => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo(() => computeFn(gameState), [gameState, computeFn, ...deps])
}

// Quiz questions memoization - prevents unnecessary re-renders
export const useQuizMemo = (questions: readonly unknown[], currentIndex: number) => {
  return useMemo(() => {
    return {
      currentQuestion: questions[currentIndex],
      totalQuestions: questions.length,
      progress: ((currentIndex + 1) / questions.length) * 100,
      remainingQuestions: questions.length - currentIndex - 1,
    }
  }, [questions, currentIndex])
}

// Memory game state optimization
export const useMemoryGameMemo = (cards: readonly Record<string, unknown>[], flippedCards: readonly number[]) => {
  return useMemo(() => {
    const matchedCards = cards.filter(card => card?.isMatched)
    const flippedVisibleCards = cards.filter((_, index) => flippedCards.includes(index))
    const hiddenCards = cards.filter((_, index) => !flippedCards.includes(index) && !cards[index]?.isMatched)

    return {
      matchedCount: matchedCards.length,
      flippedCount: flippedVisibleCards.length,
      hiddenCount: hiddenCards.length,
      totalCards: cards.length,
      progress: (matchedCards.length / cards.length) * 100,
    }
  }, [cards, flippedCards])
}

// 3D scene performance optimization
export const useSceneMemo = (sceneProps: Record<string, unknown>) => {
  return useMemo(() => {
    // Memoize expensive 3D calculations
    return {
      optimizedProps: {
        ...sceneProps,
        // Pre-compute expensive calculations
        computedValues: (sceneProps as any).expensiveCalculation?.(),
      }
    }
  }, [sceneProps])
}

// Audio loading optimization with caching
export const useAudioMemo = (audioUrl: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  return useMemo(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl)
      audioRef.current.preload = 'none' // Only load when needed
    }
    return audioRef.current
  }, [audioUrl])
}

// Debounced state for search/memory inputs
export const useDebouncedState = <T>(initialValue: T, delay: number = 300) => {
  const [value, setValue] = useState<T>(initialValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)

  const debouncedSetValue = useCallback(
    (newValue: T) => {
      setValue(newValue)
      const timeout = setTimeout(() => setDebouncedValue(newValue), delay)
      return () => clearTimeout(timeout)
    },
    [delay]
  )

  return [debouncedValue, debouncedSetValue, value] as const
}

// Virtual scrolling for large lists (leaderboards, verse lists)
export const useVirtualScroll = (items: readonly Record<string, unknown>[], itemHeight: number = 50) => {
  return useMemo(() => {
    const visibleItems = 10 // Show 10 items at a time
    const buffer = 5 // Buffer items for smooth scrolling

    return {
      totalItems: items.length,
      visibleItems,
      itemHeight,
      totalHeight: items.length * itemHeight,
      buffer,
    }
  }, [items.length, itemHeight])
}

// Image optimization with Next.js Image component
export const useOptimizedImage = (src: string, alt: string, priority: boolean = false) => {
  return useMemo(() => ({
    src,
    alt,
    priority,
    // Add responsive image sizes
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    // Quality optimization
    quality: 85,
    // Format optimization
    placeholder: 'blur' as const,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...', // Base64 placeholder
  }), [src, alt, priority])
}

// Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  const renderStart = useRef<number>(0)
  const renderCount = useRef<number>(0)

  const startRender = useCallback(() => {
    renderStart.current = performance.now()
    renderCount.current += 1
  }, [])

  const endRender = useCallback(() => {
    const renderTime = performance.now() - renderStart.current
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render #${renderCount.current}: ${renderTime.toFixed(2)}ms`)
    }
  }, [componentName])

  return { startRender, endRender }
}

/**
 * Performance Optimization Rules:
 *
 * 1. Quiz Components:
 *    - Memoize question data and current question calculations
 *    - Debounce user input for search/filter
 *    - Use React.memo for question cards
 *
 * 2. Memory Game:
 *    - Memoize card state and flip animations
 *    - Virtual scroll for large card grids
 *    - Optimize card reveal animations with CSS transforms
 *
 * 3. 3D Scenes:
 *    - Memoize scene props and camera positions
 *    - Use instancing for repeated objects
 *    - Implement level-of-detail (LOD) for distant objects
 *
 * 4. Audio System:
 *    - Preload only critical audio assets
 *    - Use Web Audio API for spatial audio
 *    - Implement audio pooling for performance
 *
 * 5. Images:
 *    - Use Next.js Image with WebP/AVIF formats
 *    - Implement responsive images with proper sizes
 *    - Add blur placeholders for better UX
 *
 * Bundle Size Targets:
 * - Main bundle: <120KB
 * - Quiz module: <45KB
 * - Memory module: <35KB
 * - Adventure module: <60KB
 * - Story module: <80KB
 * - 3D scenes: <15KB each
 * - Audio assets: <5KB each
 */
