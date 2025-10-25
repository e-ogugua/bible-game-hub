/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contexts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bible: {
          primary: '#7C3AED', // Purple
          secondary: '#3B82F6', // Blue
          accent: '#FBBF24', // Gold
          dark: '#1E1B4B', // Dark Purple
          light: '#F8FAFC', // Light Gray
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'bible-primary':
          'linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #1E40AF 100%)',
        'bible-secondary':
          'linear-gradient(135deg, rgba(124, 58, 237, 0.5) 0%, rgba(59, 130, 246, 0.5) 50%, rgba(30, 64, 175, 0.5) 100%)',
        'bible-card':
          'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' },
          to: {
            textShadow:
              '0 0 30px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.3)',
          },
        },
      },
      boxShadow: {
        bible:
          '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'bible-lg':
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'bible-glow': '0 0 20px rgba(251, 191, 36, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },

      // Enhanced responsive typography system
      fontSize: {
        'responsive-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'responsive-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'responsive-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'responsive-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'responsive-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'responsive-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        'responsive-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)',
        'responsive-4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',
        'responsive-5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4rem)',
      },

      // Responsive spacing system
      padding: {
        'responsive-xs': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'responsive-sm': 'clamp(0.75rem, 0.6rem + 0.75vw, 1rem)',
        'responsive-base': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
        'responsive-lg': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
        'responsive-xl': 'clamp(2rem, 1.6rem + 2vw, 3rem)',
        'responsive-2xl': 'clamp(3rem, 2.4rem + 3vw, 4rem)',
      },

      margin: {
        'responsive-xs': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'responsive-sm': 'clamp(0.75rem, 0.6rem + 0.75vw, 1rem)',
        'responsive-base': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
        'responsive-lg': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
        'responsive-xl': 'clamp(2rem, 1.6rem + 2vw, 3rem)',
        'responsive-2xl': 'clamp(3rem, 2.4rem + 3vw, 4rem)',
      },

      // Responsive grid system
      gridTemplateColumns: {
        'responsive-1': 'repeat(1, minmax(0, 1fr))',
        'responsive-2': 'repeat(auto-fit, minmax(300px, 1fr))',
        'responsive-3': 'repeat(auto-fit, minmax(250px, 1fr))',
        'responsive-4': 'repeat(auto-fit, minmax(200px, 1fr))',
        'responsive-game-cards': 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
      },

      // Responsive breakpoints with mobile-first approach
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',

        // Touch device breakpoints
        'touch': { 'raw': '(pointer: coarse)' },
        'no-touch': { 'raw': '(pointer: fine)' },

        // Orientation breakpoints
        'landscape': { 'raw': '(orientation: landscape)' },
        'portrait': { 'raw': '(orientation: portrait)' },

        // High DPI displays
        'retina': { 'raw': '(min-resolution: 2dppx)' },
      },

      // Touch-friendly sizing
      minHeight: {
        'touch-target': '44px', // WCAG touch target minimum
        'touch-target-lg': '48px',
      },

      minWidth: {
        'touch-target': '44px',
        'touch-target-lg': '48px',
      },

      // AR/VR specific breakpoints
      'ar-mobile': '360px',
      'ar-tablet': '768px',
      'ar-desktop': '1024px',
    },
  },
  plugins: [
    // Tailwind plugins use require() - standard for Tailwind config
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
