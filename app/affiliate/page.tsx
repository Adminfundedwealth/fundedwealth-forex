'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleDollarSign,
  Crown,
  Gift,
  Link2,
  Menu,
  MousePointerClick,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import './affiliate.css'

const tiers = [
  { name: 'STARTER', commission: '30%', referrals: '1-20 SALES', bonus: 'Rs5,000 AT 30 SALES', tone: 'starter', Icon: Target },
  { name: 'PRO', commission: '35%', referrals: '21-100 SALES', bonus: 'Rs15,000 AT 75 SALES', tone: 'pro', Icon: TrendingUp },
  { name: 'ELITE', commission: '40%', referrals: '101-300 SALES', bonus: 'IPHONE AT 150 SALES', tone: 'elite', Icon: Crown },
  { name: 'APEX', commission: '50%', referrals: '300+ SALES', bonus: 'PREMIUM CAR AT MILESTONE', tone: 'apex', Icon: Sparkles },
]

const steps = [
  ['01', 'APPLY', 'Submit your affiliate application and tell us how you grow communities.'],
  ['02', 'GET VERIFIED', 'Once approved, receive your unique referral link and partner access.'],
  ['03', 'PROMOTE', 'Share FundedWealth with your audience, network, and trading community.'],
  ['04', 'TRACK', 'Monitor clicks, referrals, conversions, and earnings from one clear dashboard.'],
  ['05', 'GET PAID', 'Request your payout once you reach the required commission threshold.'],
]

const rewards = [
  { sales: '30 SALES', title: 'Rs5,000 CASH', detail: 'Instant bonus credited to your account.', tone: 'cash', Icon: CircleDollarSign },
  { sales: '75 SALES', title: 'Rs15,000 CASH', detail: 'A bigger milestone for consistent growth.', tone: 'cash', Icon: Gift },
  { sales: '150 SALES', title: 'IPHONE', detail: 'A brand-new iPhone delivered to you.', tone: 'phone', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85' },
  { sales: '400 SALES', title: 'MACBOOK', detail: 'MacBook Pro as your next reward.', tone: 'laptop', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85' },
  { sales: '800+ SALES', title: 'PREMIUM CAR', detail: 'Your dream car, fully sponsored.', tone: 'car', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=88' },
]

const heroTabs = [
  { label: 'Transparent Commissions', Icon: ShieldCheck },
  { label: 'Recurring Earnings', Icon: TrendingUp },
  { label: 'Real-Time Tracking', Icon: MousePointerClick },
  { label: 'Up to 50% Commission', Icon: Sparkles },
]

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    }), { threshold: 0.12 })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function Brand({ mobile = false }: { mobile?: boolean }) {
  return <a className={`affiliate-brand${mobile ? ' affiliate-brand-mobile' : ''}`} href="/"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex" /><span>FUNDEDWEALTH <b>FOREX</b></span></a>
}

function Stat({ value, label, Icon }: { value: string; label: string; Icon: typeof TrendingUp }) {
  return <article className="affiliate-stat" data-reveal><Icon aria-hidden="true" /><strong>{value}</strong><span>{label}</span></article>
}

export default function AffiliatePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  useReveal()

  return (
    <main className="affiliate-page">
      <header className="affiliate-header">
        <Brand />
        <nav className={`affiliate-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="/#challenges" onClick={() => setMenuOpen(false)}>Challenges</a>
          <a href="/rules" onClick={() => setMenuOpen(false)}>Rules</a>
          <a className="is-active" href="/affiliate" onClick={() => setMenuOpen(false)}>Affiliate</a>
          <a href="/#platforms" onClick={() => setMenuOpen(false)}>Platforms</a>
          <a href="/#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </nav>
        <div className="affiliate-header-actions"><a className="affiliate-login" href="#affiliate-login">Affiliate login <ArrowRight size={15} /></a><a className="affiliate-header-cta" href="#apply">Become an affiliate <ArrowRight size={15} /></a></div>
        <button className="affiliate-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="affiliate-hero" id="top">
        <div className="affiliate-grid" aria-hidden="true" />
        <div className="affiliate-orb affiliate-orb-one" aria-hidden="true" /><div className="affiliate-orb affiliate-orb-two" aria-hidden="true" />
        <div className="affiliate-hero-content">
          <p className="affiliate-eyebrow"><span /> FUNDEDWEALTH AFFILIATE PROGRAM <span /></p>
          <h1><span>Earn more</span><span>with</span><span><em>every trader</em></span><span>you refer.</span></h1>
          <p className="affiliate-hero-lead">Turn your audience into recurring earnings with a partner program built for people who know how to move communities forward.</p>
          <div className="affiliate-hero-actions" id="apply"><a className="affiliate-primary" href="mailto:partners@fundedwealth.com">Become an affiliate <ArrowRight size={17} /></a><a className="affiliate-secondary" href="#affiliate-login">Affiliate login <ArrowRight size={17} /></a></div>
          <div className="affiliate-hero-tabs" aria-label="Affiliate program highlights">{heroTabs.map(({ label, Icon }, index) => <div className="affiliate-hero-tab" style={{ '--delay': `${index * 90}ms` } as React.CSSProperties} key={label}><Icon size={15} aria-hidden="true" /><span>{label}</span></div>)}</div>
        </div>
        <div className="affiliate-float-card affiliate-float-card-one"><span>MONTHLY COMMISSION</span><strong>+ 50%</strong><small>APEX TIER</small></div>
        <div className="affiliate-float-card affiliate-float-card-two"><Link2 size={15} /><span>YOUR LINK IS LIVE</span><strong>fw/partner/you</strong></div>
      </section>

      <section className="affiliate-stats-wrap" aria-label="Affiliate program benefits">
        <div className="affiliate-stats"><Stat value="UP TO 50%" label="COMMISSION" Icon={CircleDollarSign} /><Stat value="RECURRING" label="EARNINGS" Icon={TrendingUp} /><Stat value="GLOBAL" label="AUDIENCE" Icon={Users} /><Stat value="24/7" label="PARTNER SUPPORT" Icon={ShieldCheck} /></div>
      </section>

      <section className="affiliate-section affiliate-tiers" id="tiers">
        <div className="affiliate-section-heading" data-reveal><p className="affiliate-eyebrow"><span /> EARN MORE AS YOU GROW</p><h2>Make every <em>referral count.</em></h2><p>More qualified referrals unlock higher commission tiers, milestone bonuses, and a partner experience designed around momentum.</p></div>
        <div className="affiliate-tier-grid">{tiers.map(({ name, commission, referrals, bonus, tone, Icon }, index) => <article className={`affiliate-tier affiliate-tier-${tone}`} data-reveal style={{ '--delay': `${index * 90}ms` } as React.CSSProperties} key={name}><div className="affiliate-tier-top"><Icon size={21} /><span>0{index + 1}</span></div><h3>{name}</h3><div className="affiliate-commission"><strong>{commission}</strong><span>COMMISSION</span></div><div className="affiliate-tier-row"><span>MONTHLY REFERRALS</span><b>{referrals}</b></div><div className="affiliate-tier-row"><span>BONUS</span><b>{bonus}</b></div><div className="affiliate-tier-meter"><i style={{ width: `${30 + index * 20}%` }} /></div><p>{index === 0 ? 'Start earning from your first completed referral.' : index === 3 ? 'Reach the summit and unlock our highest partner rate.' : 'Keep building your audience and unlock the next level.'}</p></article>)}</div>
      </section>

      <section className="affiliate-section affiliate-process" id="how-it-works">
        <div className="affiliate-section-heading" data-reveal><p className="affiliate-eyebrow"><span /> THE PARTNER PATH</p><h2>How affiliate <em>works.</em></h2><p>Five clear moves from application to payout, with the signal you need at every step.</p></div>
        <div className="affiliate-step-grid">{steps.map(([number, title, text], index) => <article className="affiliate-step" data-reveal style={{ '--delay': `${index * 80}ms` } as React.CSSProperties} key={number}><div className="affiliate-step-number">{number}</div><div><h3>{title}</h3><p>{text}</p></div>{index < steps.length - 1 && <ChevronRight className="affiliate-step-arrow" size={22} aria-hidden="true" />}</article>)}</div>
      </section>

      <section className="affiliate-rewards" id="rewards">
        <div className="affiliate-section-heading" data-reveal><p className="affiliate-eyebrow"><span /> REWARD THE REACH</p><h2>FundedWealth <em>bonuses.</em></h2><p>Milestones worth sharing. Rewards that make the next referral feel even better.</p></div>
        <div className="affiliate-reward-grid">{rewards.map(({ sales, title, detail, tone, image, Icon }, index) => <article className={`affiliate-reward affiliate-reward-${tone}`} data-reveal style={{ '--delay': `${index * 80}ms` } as React.CSSProperties} key={sales}>{image ? <div className="affiliate-reward-image"><img src={image} alt={title} loading="lazy" /></div> : <div className="affiliate-reward-icon">{Icon && <Icon size={34} />}</div>}<span className="affiliate-sales-badge">{sales}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
      </section>

      <section className="affiliate-section affiliate-dashboard" id="affiliate-login">
        <div className="affiliate-dashboard-copy" data-reveal><p className="affiliate-eyebrow"><span /> YOUR PARTNER CONSOLE</p><h2>Track everything.<br /><em>Grow without guesswork.</em></h2><p>See the numbers that matter, keep your audience moving, and know exactly what your work is earning.</p><a className="affiliate-secondary" href="mailto:partners@fundedwealth.com">Request partner access <ArrowRight size={17} /></a></div>
        <div className="affiliate-console" data-reveal><div className="affiliate-console-top"><span><i /> LIVE PARTNER CONSOLE</span><small>UPDATED JUST NOW</small></div><div className="affiliate-console-total"><span>COMMISSION EARNED</span><strong>Rs28,450.00</strong><b>+18.4% <TrendingUp size={13} /></b></div><div className="affiliate-console-chart"><span style={{ height: '35%' }} /><span style={{ height: '48%' }} /><span style={{ height: '42%' }} /><span style={{ height: '66%' }} /><span style={{ height: '57%' }} /><span style={{ height: '78%' }} /><span style={{ height: '92%' }} /><i /></div><div className="affiliate-console-metrics"><div><small>TOTAL CLICKS</small><strong>18,942</strong></div><div><small>REFERRALS</small><strong>284</strong></div><div><small>CONVERSION</small><strong>14.8%</strong></div><div><small>RANK</small><strong>#08</strong></div></div></div>
      </section>

      <section className="affiliate-final" id="final-cta"><div className="affiliate-final-glow" aria-hidden="true" /><div data-reveal><p className="affiliate-eyebrow"><span /> YOUR NEXT REVENUE STREAM</p><h2>Ready to turn your audience<br /><em>into recurring earnings?</em></h2><p>Join the FundedWealth affiliate program and make your reach work harder.</p><a className="affiliate-primary" href="mailto:partners@fundedwealth.com">Become a FundedWealth affiliate <ArrowRight size={17} /></a></div></section>

      <footer className="affiliate-footer"><Brand mobile /><p>Professional simulated trading, built around your edge.</p><div><a href="/">FundedWealth Forex</a><a href="/rules">Rules</a><a href="/privacy-policy">Privacy</a><a href="/legal/terms-and-conditions">Terms</a></div><small>© 2026 FUNDEDWEALTH FOREX. ALL RIGHTS RESERVED.</small></footer>
    </main>
  )
}
