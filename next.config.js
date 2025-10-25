/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations for studio-grade builds
  experimental: {
    // Enable modern bundling features
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Turbo mode for faster builds
    turbo: {
      // Tree shaking for better bundle sizes
      treeShaking: true,
    },
  },

  // Bundle analyzer for development
  ...(process.env.ANALYZE === 'true' && {
    bundleAnalyzer: {
      enabled: true,
      openAnalyzer: true,
    },
  }),

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Tree shaking for Three.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }

    // Optimize chunks
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        // Vendor chunk for React/Next.js
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        // Game modules chunk
        games: {
          test: /[\\/]src[\\/]modules[\\/]/,
          name: 'games',
          chunks: 'all',
          priority: 5,
        },
        // 3D components chunk
        scenes: {
          test: /[\\/]src[\\/]components[\\/]scenes[\\/]/,
          name: 'scenes',
          chunks: 'all',
          priority: 5,
        },
        // Audio assets chunk
        audio: {
          test: /[\\/]public[\\/]audio[\\/]/,
          name: 'audio',
          chunks: 'all',
          priority: 3,
        },
      },
    }

    return config
  },

  // Asset optimization (no CDN prefix to avoid CSS loading issues)
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.biblegamehub.com' : '',
}

module.exports = nextConfig
