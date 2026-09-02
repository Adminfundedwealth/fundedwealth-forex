'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LanguageSwitcher, useLanguage } from '@/components/LanguageProvider'

type NavigationItem = { label: 'challenges' | 'howItWorks' | 'rules' | 'affiliate' | 'platforms' | 'faq'; href: string; text?: string }

const navigationItems: NavigationItem[] = [
  { label: 'challenges', href: '/#challenges' },
  { label: 'howItWorks', href: '/#how-it-works' },
  { label: 'rules', href: '/rules' },
  { label: 'affiliate', href: '/affiliate', text: 'Affiliate' },
  { label: 'platforms', href: '/#platforms' },
  { label: 'faq', href: '/#faq' },
] as const

function getActiveItem(pathname: string) {
  if (pathname.startsWith('/affiliate')) return 'affiliate'
  if (pathname.startsWith('/rules')) return 'rules'
  return ''
}

export default function Navbar() {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pathname, setPathname] = useState('')

  useEffect(() => {
    setPathname(window.location.pathname)
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeItem = getActiveItem(pathname)

  return (
    <>
      <div className="product-switcher" role="navigation" aria-label="FundedWealth products">
        <a className="product-tab is-active" href="/">FUNDEDWEALTH <b>FOREX</b></a>
        <a className="product-tab product-tab-ind" href="https://www.fundedwealth.com/"><img src="/fundedwealth-mark.png" alt="FundedWealth" /><span>FUNDEDWEALTH <b>IND MARKET</b></span></a>
      </div>
      <nav className={`site-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <a href="/" className="brand brand-with-mark"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex mark" /><span>FUNDEDWEALTH <i>FOREX</i></span></a>
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {navigationItems.map((item) => <a key={item.href} className={activeItem === item.label ? 'is-active' : ''} href={item.href} aria-current={activeItem === item.label ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{item.text ?? t.nav[item.label as keyof typeof t.nav]}</a>)}
        </div>
        <div className="nav-actions"><a className="nav-community" href="/#community">{t.nav.community}</a><a className="portal-link" href="/#dashboard">{t.nav.portal}</a><a className="nav-login" href="/login">{t.nav.login}</a><LanguageSwitcher /></div>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>
    </>
  )
}
