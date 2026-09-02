import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { LanguageProvider } from '@/components/LanguageProvider'
import { CurrencyProvider } from '@/components/CurrencyProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'FundedWealth Forex — Prove Your Edge',
  description: 'A transparent simulated trading environment built around disciplined risk management.',
  generator: 'FundedWealth Forex',
  icons: {
    icon: '/fundedwealth-mark.png',
    shortcut: '/fundedwealth-mark.png',
    apple: '/fundedwealth-mark.png',
  },
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
        <LanguageProvider><CurrencyProvider>{children}</CurrencyProvider></LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
