import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GameProvider } from '@/contexts/GameContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Bible Game Hub - Interactive Scripture Games',
    template: '%s | Bible Game Hub',
  },
  description:
    'Interactive faith-based gaming platform featuring Bible quizzes, scripture memory challenges, character stories, and biblical adventures.',
  keywords: [
    'Bible games',
    'scripture quiz',
    'biblical knowledge',
    'faith games',
    'christian games',
    'bible study',
    'scripture memory',
    'biblical stories',
  ],
  authors: [{ name: 'CEO – Chukwuka Emmanuel Ogugua (EmmanuelOS)' }],
  creator: 'CEO – Chukwuka Emmanuel Ogugua (EmmanuelOS)',
  publisher: 'Bible Game Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bible-game-hub.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bible-game-hub.vercel.app',
    siteName: 'Bible Game Hub',
    title: 'Bible Game Hub - Interactive Scripture Games',
    description:
      'Interactive faith-based gaming platform featuring Bible quizzes, scripture memory challenges, character stories, and biblical adventures.',
    images: [
      {
        url: '/icon-512x512.svg',
        width: 512,
        height: 512,
        alt: 'Bible Game Hub Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bible Game Hub - Interactive Scripture Games',
    description:
      'Immerse yourself in faith-based gaming with Bible quizzes, scripture memory challenges, character stories, and biblical adventures.',
    images: ['/icon-512x512.svg'],
    creator: '@biblegamehub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  category: 'Education',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#7c3aed',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <GameProvider>{children}</GameProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
