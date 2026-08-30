import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | FundedWealth Forex',
  description: 'Learn how FundedWealth Forex uses cookies and similar technologies to operate, secure, analyze and improve its website and services.',
}

export default function CookiePolicyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
