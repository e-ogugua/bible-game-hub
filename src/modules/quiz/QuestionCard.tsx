// src/modules/quiz/QuestionCard.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import { QuizQuestion } from './data'

interface QuestionCardProps {
  question: QuizQuestion
  onAnswer: (isCorrect: boolean) => void
  disabled?: boolean
  questionKey?: string // Add key to reset state when question changes
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  disabled = false,
  questionKey = '',
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null)
    setShowResult(false)
  }, [questionKey])

  const handleOptionClick = (optionIndex: number) => {
    if (disabled || showResult) return

    setSelectedOption(optionIndex)
    setShowResult(true)
    const isCorrect = optionIndex === question.correct
    onAnswer(isCorrect)
  }

  return (
    <motion.div
      key={questionKey} // Add key to ensure component remounts when question changes
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          {question.question}
        </h3>
        <div className="text-sm text-blue-200 text-center mb-6">
          Reference: {question.reference}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index
          const isCorrect = index === question.correct
          const isWrong = isSelected && !isCorrect

          let optionClasses =
            'p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer relative overflow-hidden'

          if (showResult) {
            if (isCorrect) {
              optionClasses +=
                ' bg-green-500/20 border-green-500 text-green-100 shadow-lg shadow-green-500/30'
            } else if (isWrong) {
              optionClasses +=
                ' bg-red-500/20 border-red-500 text-red-100 shadow-lg shadow-red-500/30'
            } else {
              optionClasses +=
                ' bg-gray-500/20 border-gray-500 text-gray-100 opacity-60'
            }
          } else {
            optionClasses += isSelected
              ? ' bg-blue-500/20 border-blue-500 text-blue-100 shadow-lg shadow-blue-500/30'
              : ' bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'
          }

          return (
            <motion.button
              key={index}
              className={optionClasses}
              onClick={() => handleOptionClick(index)}
              disabled={disabled}
              whileHover={
                !disabled && !showResult ? { scale: 1.02, y: -2 } : {}
              }
              whileTap={!disabled && !showResult ? { scale: 0.98 } : {}}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-sm font-semibold">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1 text-left">{option}</span>
                {showResult && isCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </motion.div>
                )}
                {showResult && isWrong && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                  >
                    <XCircle className="w-5 h-5 text-red-400" />
                  </motion.div>
                )}
              </div>

              {/* Animated background for selected state */}
              {isSelected && !showResult && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {showResult && question.explanation && (
        <motion.div
          className="bg-blue-500/20 border border-blue-500 rounded-lg p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-blue-100">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  )
}
