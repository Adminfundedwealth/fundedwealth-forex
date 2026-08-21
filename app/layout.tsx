import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FundedWealth Forex — Prove Your Edge',
  description: 'A transparent simulated trading environment built around disciplined risk management.',
  generator: 'FundedWealth Forex',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#03050C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
