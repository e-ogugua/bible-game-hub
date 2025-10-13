'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20'

  const hoverClasses = hover ? 'cursor-pointer hover:bg-white/20 transition-all duration-300' : ''

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      whileHover={hover ? { scale: 1.05, y: -5 } : {}}
      whileTap={hover ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
