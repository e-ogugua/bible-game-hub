/**
 * Accessible Components - WCAG 2.1 AA Compliant
 *
 * This module provides reusable components with comprehensive accessibility
 * features, focus management, and cross-platform compatibility.
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AccessibleCardProps {
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  href?: string
  onClick?: () => void
  variant?: 'default' | 'featured' | 'disabled'
  className?: string
  children?: React.ReactNode
  'aria-describedby'?: string
}

export const AccessibleCard: React.FC<AccessibleCardProps> = ({
  title,
  description,
  icon: Icon,
  href,
  onClick,
  variant = 'default',
  className = '',
  children,
  'aria-describedby': ariaDescribedBy,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const isInteractive = href || onClick
  const isDisabled = variant === 'disabled'

  const baseClasses = `
    bible-card bible-card-hover p-responsive-lg overflow-hidden h-full
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-2xl
    transition-all duration-300 ease-out
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${isInteractive ? 'group' : ''}
  `

  const variantClasses = {
    default: '',
    featured: 'border-bible-accent/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20',
    disabled: 'pointer-events-none',
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isDisabled) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (href) {
        window.location.href = href
      } else if (onClick) {
        onClick()
      }
    }
  }

  const handleClick = () => {
    if (isDisabled) return

    if (href) {
      window.location.href = href
    } else if (onClick) {
      onClick()
    }
  }

  const CardContent = (
    <motion.div
      ref={cardRef}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      whileHover={!isDisabled ? {
        scale: 1.02,
        y: -5,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
      } : {}}
      whileTap={!isDisabled ? {
        scale: 0.98,
        transition: { duration: 0.1 }
      } : {}}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
      tabIndex={isInteractive && !isDisabled ? 0 : -1}
      aria-label={isInteractive ? `${title} - ${description}` : undefined}
      aria-describedby={ariaDescribedBy}
      aria-disabled={isDisabled}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 opacity-0 transition-opacity duration-500`}
      />

      {/* Pulsing border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300" />

      {/* Icon with enhanced styling */}
      {Icon && (
        <motion.div
          className={`inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-responsive-base shadow-lg transition-shadow duration-300`}
          whileHover={!isDisabled ? { rotate: 5, scale: 1.05 } : {}}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" aria-hidden="true" />
        </motion.div>
      )}

      {/* Content with improved typography */}
      <h3 className="text-responsive-xl font-bold mb-3 transition-colors duration-300">
        {title}
      </h3>

      <p className="text-bible-secondary leading-relaxed mb-responsive-base text-responsive-sm lg:text-responsive-base">
        {description}
      </p>

      {children}

      {/* Enhanced call-to-action */}
      {isInteractive && !isDisabled && (
        <div className="flex items-center text-sm font-medium text-purple-300 transition-colors duration-300">
          <span>Start Journey</span>
          <motion.div
            className="ml-2"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            aria-hidden="true"
          >
            →
          </motion.div>
        </div>
      )}
    </motion.div>
  )

  if (href && !isDisabled) {
    return (
      <a href={href} className="block h-full">
        {CardContent}
      </a>
    )
  }

  return CardContent
}

// Accessible progress indicator
interface AccessibleProgressProps {
  value: number
  max: number
  label: string
  description?: string
  variant?: 'default' | 'success' | 'warning'
  showPercentage?: boolean
  className?: string
}

export const AccessibleProgress: React.FC<AccessibleProgressProps> = ({
  value,
  max,
  label,
  description,
  variant = 'default',
  showPercentage = true,
  className = '',
}) => {
  const percentage = Math.round((value / max) * 100)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Announce progress changes to screen readers
    if (progressRef.current) {
      const announcement = `${label}: ${percentage}% complete${description ? `. ${description}` : ''}`
      progressRef.current.setAttribute('aria-valuetext', announcement)
    }
  }, [percentage, label, description])

  const variantClasses = {
    default: 'bg-gradient-to-r from-purple-500 to-blue-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-bible-secondary">{label}</span>
        {showPercentage && (
          <span className="text-sm font-semibold text-bible-accent">
            {percentage}%
          </span>
        )}
      </div>

      <div
        ref={progressRef}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label} progress`}
        className="relative h-2 bg-gray-700 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        tabIndex={0}
      >
        <motion.div
          className={`h-full ${variantClasses[variant]} rounded-full relative`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
            style={{
              animation: 'shimmer 1.5s ease-in-out infinite',
              backgroundSize: '200% 100%'
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {description && (
        <p className="text-xs text-bible-secondary" id={`progress-${label.replace(/\s+/g, '-').toLowerCase()}`}>
          {description}
        </p>
      )}
    </div>
  )
}

// Accessible modal component
interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement

      // Focus the modal
      setTimeout(() => {
        modalRef.current?.focus()
      }, 100)

      // Prevent body scroll
      document.body.style.overflow = 'hidden'

      // Add escape key listener
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleEscape)

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = ''
        // Restore focus to the previous element
        previousFocusRef.current?.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <motion.div
        ref={modalRef}
        className={`relative w-full ${sizeClasses[size]} bible-card rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          aria-label="Close modal"
        >
          <span className="text-xl leading-none" aria-hidden="true">×</span>
        </button>

        {/* Modal header */}
        <div className="p-responsive-lg pb-4">
          <h2
            id="modal-title"
            className="text-responsive-xl font-bold text-bible-primary mb-2"
          >
            {title}
          </h2>
          {description && (
            <p
              id="modal-description"
              className="text-responsive-base text-bible-secondary"
            >
              {description}
            </p>
          )}
        </div>

        {/* Modal body */}
        <div className="px-responsive-lg pb-responsive-lg">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

// Accessible form components
interface AccessibleInputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'number'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: string
  helpText?: string
  className?: string
}

export const AccessibleInput: React.FC<AccessibleInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`
  const errorId = error ? `${inputId}-error` : undefined
  const helpId = helpText ? `${inputId}-help` : undefined

  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-bible-secondary"
      >
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>

      <input
        ref={inputRef}
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-3 py-2 border rounded-lg transition-colors duration-200
          bg-white/10 border-white/20 text-white placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent focus:border-purple-500
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${isFocused ? 'border-purple-500' : ''}
        `}
        aria-invalid={!!error}
        aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
        aria-required={required}
      />

      {error && (
        <p id={errorId} className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {helpText && !error && (
        <p id={helpId} className="text-xs text-bible-secondary">
          {helpText}
        </p>
      )}
    </div>
  )
}

// Accessible loading component
interface AccessibleLoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'pulse' | 'dots'
  className?: string
}

export const AccessibleLoading: React.FC<AccessibleLoadingProps> = ({
  message = 'Loading...',
  size = 'md',
  variant = 'spinner',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const SpinnerIcon = () => (
    <div
      className={`animate-spin rounded-full border-2 border-gray-600 border-t-white ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">{message}</span>
    </div>
  )

  const PulseIcon = () => (
    <div className={`animate-pulse ${className}`} role="status" aria-label="Loading">
      <div className={`bg-white/20 rounded-full ${sizeClasses[size]}`} />
      <span className="sr-only">{message}</span>
    </div>
  )

  const DotsIcon = () => (
    <div className={`flex space-x-1 ${className}`} role="status" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 bg-white rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
      <span className="sr-only">{message}</span>
    </div>
  )

  const LoadingIcon = variant === 'spinner' ? SpinnerIcon : variant === 'pulse' ? PulseIcon : DotsIcon

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <LoadingIcon />
      <p className="text-sm text-bible-secondary">{message}</p>
    </div>
  )
}
