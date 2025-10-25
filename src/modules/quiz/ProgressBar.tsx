// src/modules/quiz/ProgressBar.tsx
'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  total: number
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  className = '',
}) => {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white/20 rounded-full h-3 overflow-hidden mb-2">
        <motion.div
          className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between text-sm text-blue-200">
        <span>
          Question {current} of {total}
        </span>
        <span>{percentage}% Complete</span>
      </div>
    </div>
  )
}
