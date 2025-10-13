'use client'

import { QuizGame } from '@/modules/quiz/QuizGame'

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <QuizGame />
    </main>
  )
}
