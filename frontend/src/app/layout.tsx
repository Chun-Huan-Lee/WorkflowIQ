import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../hooks/useAuth'
import ToastProvider from '../components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WorkflowIQ - AI-Powered Business Process Intelligence',
  description: 'Transform your business processes with intelligent workflow automation, real-time collaboration, and AI-driven insights.',
  keywords: 'workflow, automation, AI, business process, analytics, collaboration',
  authors: [{ name: 'WorkflowIQ Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-50 antialiased">
        <AuthProvider>
          {children}
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  )
} 