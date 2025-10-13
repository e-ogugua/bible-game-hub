'use client'

import React, { Suspense } from 'react'

// Force this page to be completely dynamic (no static generation)
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function StoryGameWithErrorBoundary() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading story experience...</p>
        </div>
      </div>
    }>
      <StoryGameComponent />
    </Suspense>
  )
}

function StoryGameComponent() {
  const [StoryGame, setStoryGame] = React.useState<React.ComponentType | null>(null)

  React.useEffect(() => {
    import('@/modules/StoryGame').then(mod => {
      setStoryGame(() => mod.StoryGame)
    })
  }, [])

  if (!StoryGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return <StoryGame />
}

export default function StoriesPage() {
  return <StoryGameWithErrorBoundary />
}
