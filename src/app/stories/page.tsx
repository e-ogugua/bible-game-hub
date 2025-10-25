'use client'

import React, { Suspense } from 'react'

// Dynamically import story module only when user navigates to /stories
// This reduces initial bundle size by ~80KB (includes 3D scenes)
const StoryGame = React.lazy(() =>
  import('@/modules/StoryGame').then(module => ({ default: module.StoryGame }))
)

// Loading component for story module
const StoryLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
      <p className="text-lg">Loading Character Stories...</p>
      <p className="text-sm text-gray-300 mt-2">Preparing immersive biblical narratives</p>
    </div>
  </div>
)

export default function StoriesPage() {
  return (
    <Suspense fallback={<StoryLoading />}>
      <StoryGame />
    </Suspense>
  )
}
