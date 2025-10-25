'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  'aria-label'?: string
  'aria-describedby'?: string
  type?: 'button' | 'submit' | 'reset'
  autoFocus?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  type = 'button',
  autoFocus = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Auto-focus management
  useEffect(() => {
    if (autoFocus && buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [autoFocus])

  const baseClasses =
    'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent'

  const variantClasses = {
    primary:
      'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 active:bg-purple-800',
    secondary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 active:bg-blue-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 active:bg-red-800',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[44px] min-w-[44px]', // WCAG touch target minimum
    md: 'px-6 py-3 text-base min-h-[44px] min-w-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[48px] min-w-[48px]',
  }

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer'

  // Enhanced accessibility attributes
  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-disabled': disabled,
    role: 'button',
    tabIndex: disabled ? -1 : 0,
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...accessibilityProps}
      whileHover={!disabled ? {
        scale: 1.05,
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
      } : {}}
      whileTap={!disabled ? {
        scale: 0.95,
        transition: { duration: 0.1 }
      } : {}}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
    >
      {children}
    </motion.button>
  )
}
