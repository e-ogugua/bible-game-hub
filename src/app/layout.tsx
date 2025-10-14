import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GameProvider } from '@/contexts/GameContext'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bible Game Hub',
  description: 'Interactive Scripture Games & Biblical Knowledge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <GameProvider>
            {children}
          </GameProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
