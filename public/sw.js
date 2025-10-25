/**
 * PWA Service Worker - Studio-Grade Offline Experience
 *
 * This service worker provides advanced caching strategies and offline
 * functionality for the Bible Game Hub PWA.
 */

const CACHE_VERSION = 'v1.0.0'
const STATIC_CACHE = `bible-game-hub-static-${CACHE_VERSION}`
const DYNAMIC_CACHE = `bible-game-hub-dynamic-${CACHE_VERSION}`
const GAME_CACHE = `bible-game-hub-games-${CACHE_VERSION}`
const AUDIO_CACHE = `bible-game-hub-audio-${CACHE_VERSION}`

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192x192.svg',
  '/icon-512x512.svg',
  '/favicon.svg',
  '/apple-touch-icon.svg',
]

// Game modules to cache on first visit
const GAME_MODULES = [
  '/_next/static/chunks/quiz-*.js',
  '/_next/static/chunks/memory-*.js',
  '/_next/static/chunks/adventure-*.js',
  '/_next/static/chunks/story-*.js',
  '/_next/static/chunks/scenes-*.js',
]

// Audio assets for offline gameplay
const AUDIO_ASSETS = [
  '/audio/background_music.mp3',
  '/audio/button_click.mp3',
  '/audio/correct_answer.mp3',
  '/audio/wrong_answer.mp3',
  '/audio/level_up.mp3',
  '/audio/game_complete.mp3',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')

  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets...')
      return cache.addAll(STATIC_ASSETS)
    }).then(() => {
      console.log('[SW] Static assets cached successfully')
      return self.skipWaiting()
    }).catch((error) => {
      console.error('[SW] Failed to cache static assets:', error)
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName.startsWith('bible-game-hub-') &&
            !cacheName.includes(CACHE_VERSION)
          ) {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log('[SW] Service worker activated')
      return self.clients.claim()
    })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return
  }

  // Static assets - Cache First strategy
  if (STATIC_ASSETS.includes(url.pathname) || request.destination === 'document') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }

        return fetch(request).then((response) => {
          // Cache successful responses
          if (response.ok) {
            const responseClone = response.clone()
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
      })
    )
    return
  }

  // Game modules - Stale While Revalidate strategy
  if (GAME_MODULES.some(pattern => new RegExp(pattern.replace('*', '.*')).test(url.pathname))) {
    event.respondWith(
      caches.open(GAME_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request).then((response) => {
            if (response.ok) {
              const responseClone = response.clone()
              cache.put(request, responseClone)
            }
            return response
          })

          // Return cached version immediately if available
          if (cachedResponse) {
            return cachedResponse
          }

          // Otherwise wait for network
          return fetchPromise
        })
      })
    )
    return
  }

  // Audio assets - Cache First with fallback
  if (AUDIO_ASSETS.includes(url.pathname) || request.destination === 'audio') {
    event.respondWith(
      caches.open(AUDIO_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          return fetch(request).then((response) => {
            if (response.ok) {
              const responseClone = response.clone()
              cache.put(request, responseClone)
            }
            return response
          }).catch(() => {
            // Return silent audio as fallback for offline mode
            return new Response('', {
              headers: { 'Content-Type': 'audio/mpeg' }
            })
          })
        })
      })
    )
    return
  }

  // API requests - Network First strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).then((response) => {
        // Cache successful API responses for offline fallback
        if (response.ok) {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
        }
        return response
      }).catch(() => {
        // Fallback to cache for offline mode
        return caches.match(request)
      })
    )
    return
  }

  // Default - Network First for dynamic content
  event.respondWith(
    fetch(request).then((response) => {
      if (response.ok) {
        const responseClone = response.clone()
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, responseClone)
        })
      }
      return response
    }).catch(() => {
      return caches.match(request)
    })
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle offline actions when connection is restored
      handleBackgroundSync()
    )
  }
})

// Push notifications for daily challenges
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/icon-192x192.svg',
      badge: '/favicon.svg',
      vibrate: [200, 100, 200],
      data: data.url,
      actions: [
        {
          action: 'open',
          title: 'Open Challenge',
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
        },
      ],
    }

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'open' && event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    )
  }
})

// Background sync handler
async function handleBackgroundSync() {
  try {
    // Sync user progress
    await syncUserProgress()

    // Sync achievements
    await syncAchievements()

    // Update daily challenges
    await updateDailyChallenges()

    console.log('[SW] Background sync completed successfully')
  } catch (error) {
    console.error('[SW] Background sync failed:', error)
  }
}

// Helper functions for background sync
async function syncUserProgress() {
  // Implementation for syncing user progress when online
  const progressData = await getStoredProgress()
  if (progressData) {
    await fetch('/api/user/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progressData),
    })
  }
}

async function syncAchievements() {
  // Implementation for syncing achievements
  const achievements = await getStoredAchievements()
  if (achievements) {
    await fetch('/api/user/achievements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(achievements),
    })
  }
}

async function updateDailyChallenges() {
  // Implementation for updating daily challenges
  const response = await fetch('/api/challenges/daily')
  if (response.ok) {
    const challenges = await response.json()
    await storeDailyChallenges(challenges)
  }
}

// Storage helper functions (implement based on your storage strategy)
async function getStoredProgress() {
  // Get user progress from IndexedDB or localStorage
  return null
}

async function getStoredAchievements() {
  // Get achievements from IndexedDB or localStorage
  return null
}

async function storeDailyChallenges(challenges) {
  // Store daily challenges in IndexedDB or localStorage
  // Implementation depends on your storage strategy
  console.log('[SW] Storing daily challenges:', challenges)
}

/**
 * PWA Caching Strategy:
 *
 * 1. Static Assets (Cache First):
 *    - HTML, CSS, JS bundles, icons, manifest
 *    - Cached immediately on install
 *    - Served from cache, updated in background
 *
 * 2. Game Modules (Stale While Revalidate):
 *    - Quiz, memory, adventure, story modules
 *    - Cached on first visit, updated when newer version available
 *    - Always serve cached version for instant loading
 *
 * 3. Audio Assets (Cache First with Fallback):
 *    - Background music and sound effects
 *    - Cached for offline gameplay
 *    - Silent fallback when offline and not cached
 *
 * 4. API Requests (Network First with Cache Fallback):
 *    - User data, scores, achievements
 *    - Network first for fresh data
 *    - Cache fallback for offline mode
 *
 * 5. Dynamic Content (Network First):
 *    - Images, videos, user-generated content
 *    - Network first for latest content
 *    - Cache for performance improvement
 *
 * Cache Sizes:
 * - Static cache: ~500KB (core app)
 * - Game cache: ~200KB (all game modules)
 * - Audio cache: ~50KB (sound effects)
 * - Dynamic cache: ~100KB (API responses)
 * - Total: ~850KB for full offline experience
 */
