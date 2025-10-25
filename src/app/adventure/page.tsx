'use client'

import React, { Suspense } from 'react'

// Dynamically import adventure module only when user navigates to /adventure
// This reduces initial bundle size by ~60KB
const AdventureGame = React.lazy(() =>
  import('@/modules/adventure/AdventureGame').then(module => ({ default: module.AdventureGame }))
)

// Loading component for adventure module
const AdventureLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
      <p className="text-lg">Loading Bible Adventures...</p>
      <p className="text-sm text-gray-300 mt-2">Preparing epic journeys and challenges</p>
    </div>
  </div>
)

export default function AdventurePage() {
  return (
    <Suspense fallback={<AdventureLoading />}>
      <AdventureGame />
    </Suspense>
  )
}
