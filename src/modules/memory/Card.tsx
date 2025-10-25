// src/modules/memory/Card.tsx
'use client'

import { motion } from 'framer-motion'
import { MemoryCard as MemoryCardType } from './data'

interface CardProps {
  card: MemoryCardType
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
  disabled: boolean
}

export const Card: React.FC<CardProps> = ({
  card,
  isFlipped,
  isMatched,
  onClick,
  disabled,
}) => {
  return (
    <motion.div
      className={`relative w-full aspect-square cursor-pointer ${disabled ? 'cursor-not-allowed' : ''}`}
      onClick={!disabled ? onClick : undefined}
      whileHover={!disabled ? { scale: 1.05, rotateY: 5 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{
          duration: 0.8,
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Card Back */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <motion.div
            className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-xl border-2 border-purple-400 flex items-center justify-center shadow-2xl"
            animate={{
              boxShadow: isFlipped
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                : '0 10px 25px -3px rgba(0, 0, 0, 0.3)',
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-white text-5xl font-bold drop-shadow-lg"
              animate={{
                scale: isFlipped ? [1, 1.2, 1] : 1,
                rotateZ: isFlipped ? [0, 10, 0] : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              ?
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Card Front */}
        <motion.div
          className={`absolute inset-0 w-full h-full rounded-xl border-2 flex items-center justify-center p-3 shadow-2xl ${isMatched ? 'bg-green-500/20 border-green-500' : 'bg-white/10 border-white/20'}`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          animate={{
            backgroundColor: isMatched
              ? 'rgba(34, 197, 94, 0.2)'
              : 'rgba(255, 255, 255, 0.1)',
            borderColor: isMatched ? '#10b981' : 'rgba(255, 255, 255, 0.2)',
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`text-center text-white leading-tight ${card.type === 'verse' ? 'text-sm' : 'text-xs'}`}
            animate={{
              opacity: isFlipped ? 1 : 0,
              y: isFlipped ? 0 : 10,
            }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {card.content}
          </motion.div>

          {/* Match indicator */}
          {isMatched && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Glow effect for flipped cards */}
      {(isFlipped || isMatched) && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: isMatched
              ? '0 0 30px rgba(34, 197, 94, 0.5)'
              : '0 0 20px rgba(147, 51, 234, 0.3)',
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}
