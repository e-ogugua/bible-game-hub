'use client'

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-bible-primary flex items-center justify-center p-4">
          <motion.div
            className="bible-card p-8 max-w-md w-full text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h2>

            <p className="text-bible-secondary mb-6 leading-relaxed">
              We encountered an unexpected error. Please try refreshing the page
              or return to the home page.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="bible-button w-full flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 text-xs text-red-300 bg-black/20 p-3 rounded overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

// Loading Spinner Component
export const LoadingSpinner: React.FC<{
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}> = ({ size = 'md', text, className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div
        className={`${sizeClasses[size]} border-4 border-purple-600/30 border-t-bible-accent rounded-full animate-spin`}
      />
      {text && (
        <p className="text-bible-secondary text-sm animate-pulse">{text}</p>
      )}
    </div>
  )
}

// Loading Card Component
export const LoadingCard: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div className={`bible-card p-6 animate-pulse ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-purple-600/30 rounded-lg" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-purple-600/30 rounded w-3/4" />
        <div className="h-3 bg-purple-600/30 rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-purple-600/30 rounded" />
      <div className="h-3 bg-purple-600/30 rounded w-5/6" />
    </div>
  </div>
)

// Full Page Loading Component
export const PageLoading: React.FC<{ message?: string }> = ({
  message = 'Loading...',
}) => (
  <div className="min-h-screen bg-bible-primary flex items-center justify-center">
    <LoadingSpinner size="lg" text={message} />
  </div>
)
