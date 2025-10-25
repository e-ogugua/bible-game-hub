'use client'

import React, { Suspense } from 'react'

// Dynamically import quiz module only when user navigates to /quiz
// This reduces initial bundle size by ~45KB
const QuizGame = React.lazy(() =>
  import('@/modules/quiz/QuizGame').then(module => ({ default: module.QuizGame }))
)

// Loading component for quiz module
const QuizLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
      <p className="text-lg">Loading Quiz Challenge...</p>
      <p className="text-sm text-gray-300 mt-2">Preparing questions and challenges</p>
    </div>
  </div>
)

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <Suspense fallback={<QuizLoading />}>
        <QuizGame />
      </Suspense>
    </main>
  )
}
