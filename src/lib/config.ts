/**
 * Environment Configuration - Studio-Grade Deployment Setup
 *
 * This module provides centralized environment variable management
 * and feature flags for different deployment environments.
 */

// Environment types
export type Environment = 'development' | 'staging' | 'production'

// Feature flags for conditional functionality
export interface FeatureFlags {
  // Analytics and monitoring
  enableAnalytics: boolean
  enableErrorTracking: boolean
  enablePerformanceMonitoring: boolean

  // Game features
  enableMultiplayer: boolean
  enableSocialFeatures: boolean
  enableAchievements: boolean

  // Advanced features
  enablePWA: boolean
  enableOfflineMode: boolean
  enableCloudSync: boolean

  // Development features
  enableDevTools: boolean
  enableBundleAnalyzer: boolean
  enableHotReload: boolean
}

// Environment configuration
export interface AppConfig {
  environment: Environment
  version: string
  apiUrl: string
  cdnUrl: string
  features: FeatureFlags

  // Performance settings
  enableCompression: boolean
  enableCaching: boolean
  cacheTTL: number

  // Asset optimization
  imageOptimization: boolean
  audioOptimization: boolean
  videoOptimization: boolean
}

// Default configurations for each environment
const configs: Record<Environment, Partial<AppConfig>> = {
  development: {
    environment: 'development',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0-dev',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    cdnUrl: process.env.NEXT_PUBLIC_CDN_URL || 'http://localhost:3000',
    features: {
      enableAnalytics: false,
      enableErrorTracking: false,
      enablePerformanceMonitoring: true,
      enableMultiplayer: false,
      enableSocialFeatures: true,
      enableAchievements: true,
      enablePWA: true,
      enableOfflineMode: true,
      enableCloudSync: false,
      enableDevTools: true,
      enableBundleAnalyzer: false,
      enableHotReload: true,
    },
    enableCompression: false,
    enableCaching: false,
    cacheTTL: 0,
    imageOptimization: true,
    audioOptimization: true,
    videoOptimization: false,
  },

  staging: {
    environment: 'staging',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0-staging',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api-staging.biblegamehub.com',
    cdnUrl: process.env.NEXT_PUBLIC_CDN_URL || 'https://cdn-staging.biblegamehub.com',
    features: {
      enableAnalytics: true,
      enableErrorTracking: true,
      enablePerformanceMonitoring: true,
      enableMultiplayer: false,
      enableSocialFeatures: true,
      enableAchievements: true,
      enablePWA: true,
      enableOfflineMode: true,
      enableCloudSync: true,
      enableDevTools: false,
      enableBundleAnalyzer: false,
      enableHotReload: false,
    },
    enableCompression: true,
    enableCaching: true,
    cacheTTL: 3600, // 1 hour
    imageOptimization: true,
    audioOptimization: true,
    videoOptimization: true,
  },

  production: {
    environment: 'production',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.biblegamehub.com',
    cdnUrl: process.env.NEXT_PUBLIC_CDN_URL || 'https://cdn.biblegamehub.com',
    features: {
      enableAnalytics: true,
      enableErrorTracking: true,
      enablePerformanceMonitoring: true,
      enableMultiplayer: true,
      enableSocialFeatures: true,
      enableAchievements: true,
      enablePWA: true,
      enableOfflineMode: true,
      enableCloudSync: true,
      enableDevTools: false,
      enableBundleAnalyzer: false,
      enableHotReload: false,
    },
    enableCompression: true,
    enableCaching: true,
    cacheTTL: 86400, // 24 hours
    imageOptimization: true,
    audioOptimization: true,
    videoOptimization: true,
  },
}

// Current environment detection
const getCurrentEnvironment = (): Environment => {
  if (typeof window === 'undefined') {
    // Server-side
    return (process.env.NODE_ENV as Environment) || 'development'
  }

  // Client-side
  const hostname = window.location.hostname

  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return 'development'
  }

  if (hostname.includes('staging')) {
    return 'staging'
  }

  return 'production'
}

// Get current configuration
export const getAppConfig = (): AppConfig => {
  const environment = getCurrentEnvironment()
  const baseConfig = configs[environment]

  return {
    environment,
    version: baseConfig.version!,
    apiUrl: baseConfig.apiUrl!,
    cdnUrl: baseConfig.cdnUrl!,
    features: baseConfig.features!,
    enableCompression: baseConfig.enableCompression!,
    enableCaching: baseConfig.enableCaching!,
    cacheTTL: baseConfig.cacheTTL!,
    imageOptimization: baseConfig.imageOptimization!,
    audioOptimization: baseConfig.audioOptimization!,
    videoOptimization: baseConfig.videoOptimization!,
  }
}

// Feature flag checker
export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
  const config = getAppConfig()
  return config.features[feature]
}

// Environment utilities
export const isDevelopment = (): boolean => getAppConfig().environment === 'development'
export const isStaging = (): boolean => getAppConfig().environment === 'staging'
export const isProduction = (): boolean => getAppConfig().environment === 'production'

// Asset URL builder with CDN support
export const getAssetUrl = (assetPath: string): string => {
  const config = getAppConfig()

  // Remove leading slash if present
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath

  // Use CDN in production, local assets in development
  if (isProduction() && config.cdnUrl) {
    return `${config.cdnUrl}/${cleanPath}`
  }

  return `/${cleanPath}`
}

// API URL builder
export const getApiUrl = (endpoint: string): string => {
  const config = getAppConfig()
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${config.apiUrl}${cleanEndpoint}`
}

// Cache configuration
export const getCacheConfig = () => {
  const config = getAppConfig()

  return {
    maxAge: config.cacheTTL,
    staleWhileRevalidate: config.cacheTTL * 2,
    cacheControl: `public, max-age=${config.cacheTTL}, stale-while-revalidate=${config.cacheTTL * 2}`,
  }
}

/**
 * Cloud Deployment Features:
 *
 * 1. Environment-based configuration
 * 2. CDN asset serving for global performance
 * 3. Progressive feature rollouts via feature flags
 * 4. Performance monitoring and error tracking
 * 5. Offline-first PWA capabilities
 * 6. Multi-region deployment support
 *
 * Usage in components:
 * ```tsx
 * import { isFeatureEnabled, getAssetUrl } from '@/lib/config'
 *
 * if (isFeatureEnabled('enableMultiplayer')) {
 *   // Show multiplayer features
 * }
 *
 * const imageUrl = getAssetUrl('/images/hero.jpg')
 * ```
 */
