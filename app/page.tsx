'use client'

import { useEffect, useRef, useState } from 'react'
import MarketTicker from '@/components/MarketTicker'
import { LanguageSwitcher, useLanguage } from '@/components/LanguageProvider'
import { CurrencySwitcher, useCurrency } from '@/components/CurrencyProvider'
import { getPricing, type CalculatedPricing } from '@/lib/flash-pricing'
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Clock3,
  Crosshair,
  Gauge,
  Headphones,
  FileText,
  Layers3,
  LineChart,
  Menu,
  ShieldCheck,
  Target,
  TrendingUp,
  UsersRound,
  X,
  Zap,
} from 'lucide-react'

const challenges = [
  { size: '$10K', price: '$89', target: '10%', daily: '5%', max: '10%', days: '5', share: '90%', leverage: '1:100' },
  { size: '$50K', price: '$299', target: '10%', daily: '5%', max: '10%', days: '5', share: '90%', leverage: '1:100' },
  { size: '$100K', price: '$499', target: '10%', daily: '5%', max: '10%', days: '5', share: '90%', leverage: '1:100' },
  { size: '$200K', price: '$899', target: '10%', daily: '5%', max: '10%', days: '5', share: '90%', leverage: '1:100' },
]

const flashChallenges = [
  { size: '$1,000' }, { size: '$5,000' }, { size: '$10,000' }, { size: '$25,000' },
] as const

const flashRules = [
  ['MAX LOSS PER TRADE', '2%'],
  ['MAX DRAWDOWN', '4%'],
  ['PROFIT SHARE', '90%'],
  ['CONSISTENCY RULE', '15% BEST TRADE'],
  ['PAYOUT THRESHOLD', '3%'],
  ['PROFIT TARGET', '—'],
] as const

const instantChallenges = [
  { size: '$1,000' }, { size: '$5,000' }, { size: '$10,000' }, { size: '$25,000' }, { size: '$50,000' },
] as const

function StartChallengeLink({ href, className = 'button', onActivate, children }: { href: string; className?: string; onActivate?: () => void; children: React.ReactNode }) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleClick = () => {
    setIsProcessing(true)
    onActivate?.()
    window.setTimeout(() => setIsProcessing(false), 900)
  }

  return <a className={`${className}${isProcessing ? ' is-processing' : ''}`} href={href} onClick={handleClick} aria-busy={isProcessing}>{children}</a>
}

function PriceDisplay({ pricing, compact = false }: { pricing?: CalculatedPricing; compact?: boolean }) {
  const { formatCurrency, usdReference, currency } = useCurrency()
  if (!pricing) return null

  return (
    <div className={`price-display${compact ? ' price-display-compact' : ''}`}>
        <span className="price-base-label">BASE PRICE</span>
      <div className="price-values">
        <span className="price-base">{formatCurrency(pricing.basePrice)}</span>
        {pricing.discountPercent > 0 && <span className="discount-badge">{pricing.discountPercent}% OFF · {pricing.discountCode}</span>}
        <span className="limited-offer-badge">LIMITED TIME OFFER</span>
        <strong>{formatCurrency(pricing.finalPrice)}</strong>
      </div>
      <span className="price-final-label">TOTAL PRICE</span>
      {currency !== 'USD' && <small className="price-usd-context">≈ {usdReference(pricing.finalPrice)} USD</small>}
    </div>
  )
}

const instantRules = [
  ['PROFIT TARGET', 'N/A'],
  ['DAILY DRAWDOWN', '3%'],
  ['MAX DRAWDOWN', '5%'],
  ['PROFIT SPLIT', '70% — FIRST 3 PAYOUTS / 80% — AFTER 3 PAYOUTS'],
  ['TRADING DAYS', '7 DAYS'],
  ['CONSISTENCY ON REWARDS', '15%'],
  ['LEVERAGE', '1:30'],
] as const

const oneStepChallenges = [
  { size: '$1,000', price: '$25', bonus: 'From $5' },
  { size: '$5,000', price: '$85', bonus: 'From $10' },
  { size: '$10,000', price: '$145', bonus: 'From $20' },
  { size: '$25,000', price: '$295', bonus: 'From $50' },
  { size: '$50,000', price: '$555', bonus: 'From $80' },
  { size: '$75,000', price: '$795', bonus: 'From $100' },
] as const

const oneStepEvaluationRules = [
  ['MAX DRAWDOWN', '6%'],
  ['DAILY DRAWDOWN', '3%'],
  ['PROFIT TARGET', '10%'],
  ['MAX RISK/TRADE', '1.5%'],
  ['MIN DAYS', '5 DAYS'],
  ['CONSISTENCY', '40%'],
  ['PROFIT SPLIT', '—'],
  ['LEVERAGE', '1:30'],
  ['TIME LIMIT', 'UNLIMITED'],
] as const

const oneStepFundedRules = [
  ['MAX DRAWDOWN', '6%'],
  ['DAILY DRAWDOWN', '3%'],
  ['PROFIT TARGET', '—'],
  ['MAX RISK/TRADE', '1.5%'],
  ['MIN DAYS', '3 DAYS'],
  ['CONSISTENCY', '—'],
  ['PROFIT SPLIT', '80%–90%'],
  ['LEVERAGE', '1:30'],
] as const

const twoStepChallenges = [
  { size: '$5,000', price: '$65', bonus: 'From $15' },
  { size: '$10,000', price: '$95', bonus: 'From $25' },
  { size: '$25,000', price: '$295', bonus: 'From $50' },
  { size: '$50,000', price: '$555', bonus: 'From $80' },
  { size: '$100,000', price: '$795', bonus: 'From $150' },
] as const

const twoStepEvaluationRules = [
  ['MAX DRAWDOWN', '8%'],
  ['DAILY DRAWDOWN', '3%'],
  ['PROFIT TARGET', '8% / 5%'],
  ['CONSISTENCY', 'None'],
  ['MAX RISK/TRADE', '1.5%'],
  ['MIN DAYS', '5 days / phase'],
  ['PROFIT SPLIT', '—'],
  ['LEVERAGE', '1:30'],
  ['TIME LIMIT', 'Unlimited'],
] as const

const twoStepFundedRules = [
  ['MAX DRAWDOWN', '6%'],
  ['DAILY DRAWDOWN', '3%'],
  ['PROFIT TARGET', '—'],
  ['CONSISTENCY', '—'],
  ['MAX RISK/TRADE', '1.5%'],
  ['MIN DAYS', '3 days / phase'],
  ['PROFIT SPLIT', '80% — First 3 Payouts / 90% — After 3 Payouts'],
  ['LEVERAGE', '1:30'],
] as const

const challengeModels = ['FLASH', 'INSTANT', '1 STEP', '2 STEP']

const comparisonRows = [
  ['MT5 Trading Platform', 'Available', 'Not specified'],
  ['Fast Payouts', 'Eligible payouts', 'Not specified'],
  ['News Trading', 'Permitted by rules', 'Not specified'],
  ['Transparent Rules', 'Published parameters', 'Not specified'],
  ['Trader Support', '24/7 support', 'Not specified'],
  ['Flexible Challenge Options', 'FLASH / INSTANT / 1 STEP / 2 STEP', 'Not specified'],
  ['Clear Risk Parameters', 'Daily + maximum drawdown', 'Not specified'],
  ['Profit Share', 'Up to 90%', 'Not specified'],
  ['Simulated Trading Environment', 'Core model', 'Varies by firm'],
] as const

const journeySteps = [
  ['01', 'CHOOSE YOUR CHALLENGE', 'Find the account and evaluation model that matches your trading plan.'],
  ['02', 'TRADE WITHIN THE RULES', 'Put your edge to work while keeping every risk parameter in view.'],
  ['03', 'PASS VERIFICATION', 'Build a consistent record that demonstrates your process, not a lucky trade.'],
  ['04', 'RECEIVE YOUR FUNDED ACCOUNT', 'Move forward with more simulated capital and a clear path to payouts.'],
] as const

const programCards = [
  { number: '01', category: 'THE FLASH PATH', title: 'FLASH', text: 'A compressed evaluation structure for traders who want a shorter challenge path.', metrics: [['FLASH', 'PATH'], ['90%', 'SHARE']], tone: 'program-cyan', Icon: Zap },
  { number: '02', category: 'THE FAST TRACK', title: 'INSTANT', text: 'Skip the evaluation and access a simulated account with risk parameters from day one.', metrics: [['0', 'PHASES'], ['CONFIG', 'SHARE']], tone: 'program-orange', Icon: Gauge },
  { number: '03', category: 'THE CLASSIC PATH', title: '1 STEP', text: 'One clear evaluation. One focused objective. For traders who prefer directness.', metrics: [['1', 'PHASE'], ['90%', 'SHARE']], tone: 'program-purple', Icon: Layers3 },
  { number: '04', category: 'THE PROVEN PATH', title: '2 STEP', text: 'Two measured phases designed to reward consistency and protect your downside.', metrics: [['2', 'PHASES'], ['90%', 'SHARE']], tone: 'program-blue', Icon: LineChart },
]

const rules = [
  ['Profit target', '10%', 'Reach the target without breaking your risk parameters.'],
  ['Daily drawdown', '5%', 'Your equity and balance must remain above the daily limit.'],
  ['Maximum drawdown', '10%', 'The account stays active while maximum loss remains controlled.'],
  ['Minimum trading days', '5', 'Build a consistent record across the required trading sessions.'],
  ['Leverage', '1:100', 'Trade major FX pairs with a clear, configurable risk framework.'],
  ['Payouts', '90%', 'Eligible traders keep the majority of their simulated profits.'],
]

const faqs = [
  ['What is FundedWealth Forex?', 'FundedWealth Forex provides a structured evaluation environment where traders can prove their edge using simulated capital and transparent risk parameters.'],
  ['How does the challenge work?', 'Choose an account, trade within the published parameters, and complete the evaluation targets. Passing traders move into the next stage of the program.'],
  ['What account sizes are available?', 'Select from the configurable account sizes above. Program availability and pricing are always shown directly in the challenge selector.'],
  ['What are the drawdown rules?', 'Each challenge publishes both daily and maximum drawdown thresholds. Your dashboard keeps these risk limits visible while you trade.'],
  ['What happens after passing?', 'Your results are reviewed against the program rules. Eligible traders receive access to the next account stage and its applicable payout terms.'],
  ['Are accounts simulated?', 'Yes. All accounts and performance shown on this site are simulated or hypothetical and should not be interpreted as a guarantee of future results.'],
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span />{children}</p>
}

function IconDiscord() {
  return (
    <svg viewBox="0 0 127.14 96.36" aria-hidden="true">
      <path fill="#5865F2" d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-28.11 0A72.06 72.06 0 0 0 45.64 0 105.69 105.69 0 0 0 19.39 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53 48.84 65.69 42.45 65.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53 91.08 65.69 84.69 65.69Z" />
    </svg>
  )
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.59l-5.16-6.74L5.2 22H1.93l8.03-9.17L1.5 2h6.76l4.66 6.18L18.244 2Zm-1.16 18.12h1.81L6.99 3.78H5.05l12.03 16.34Z" /></svg>
  )
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.5 3c.4 2.4 1.8 4.1 4.1 4.4v2.6c-1.4 0-2.7-.5-3.8-1.3v6.6c0 3.3-2.6 5.7-5.9 5.7S3 18.6 3 15.3s2.6-5.7 5.9-5.7c.3 0 .6 0 .9.1v2.8c-.3-.1-.6-.2-.9-.2-1.7 0-3.1 1.4-3.1 3.1S8.2 18.5 10 18.5s3.1-1.4 3.1-3.1V3h1.4Z" /></svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm9.2 1.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2Z" /></svg>
  )
}

function IconTelegram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.5 4.4 18.7 20c-.2.9-.8 1.1-1.6.7l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2l-10.6 6.7-4.6-1.4c-1-.3-1-.9.2-1.4L20 3.7c.8-.3 1.5.2 1.5.7Z" /></svg>
  )
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.5 9.5V7.8c0-.6.4-.7.7-.7h2.1V4h-2.9C11.7 4 10 5.8 10 8.4v1.1H8v3.2h2V20h3.5v-7.3h2.5l.5-3.2h-3Z" /></svg>
  )
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#25D366" d="M20.52 3.48A11.84 11.84 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.89c0 2.1.55 4.15 1.6 5.96L.1 23.9l6.2-1.62a11.9 11.9 0 0 0 5.77 1.48h.01c6.55 0 11.88-5.33 11.88-11.89 0-3.18-1.24-6.17-3.44-8.39ZM12.08 21.7h-.01a9.84 9.84 0 0 1-5.02-1.38l-.36-.21-3.68.96.98-3.59-.23-.37a9.86 9.86 0 0 1-1.51-5.22C2.25 6.44 6.66 2.03 12.08 2.03c2.63 0 5.1 1.03 6.96 2.9a9.8 9.8 0 0 1 2.88 6.97c0 5.42-4.41 9.82-9.84 9.8Zm5.39-7.36c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.23-.66.08-.3-.15-1.24-.46-2.36-1.46a8.85 8.85 0 0 1-1.63-2.03c-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.69-1.66-.94-2.27-.25-.59-.5-.51-.69-.52h-.59c-.2 0-.53.08-.81.38-.28.3-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.14 3.27 5.19 4.59.73.32 1.3.51 1.74.65.73.23 1.4.2 1.93.12.59-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.59-.35Z" /></svg>
  )
}

function IconFundedWealthAI() {
  return <img src="/fundedwealth-mark.png" alt="" aria-hidden="true" />
}

const whatsappSupportUrl = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT_URL?.trim() || ''
const aiSupportUrl = process.env.NEXT_PUBLIC_AI_SUPPORT_URL?.trim() || ''

function SupportControls() {
  const openAiSupport = () => {
    if (aiSupportUrl) window.open(aiSupportUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="support-controls">
      <a
        className={`support-control support-whatsapp${whatsappSupportUrl ? '' : ' is-unconfigured'}`}
        href={whatsappSupportUrl || undefined}
        target={whatsappSupportUrl ? '_blank' : undefined}
        rel={whatsappSupportUrl ? 'noreferrer' : undefined}
        aria-label="WhatsApp support"
        title={whatsappSupportUrl ? 'WhatsApp support' : 'WhatsApp support destination not configured'}
        onClick={(event) => { if (!whatsappSupportUrl) event.preventDefault() }}
      ><IconWhatsApp /></a>
      <button className="support-control support-ai" type="button" aria-label="Open FundedWealth AI support" title={aiSupportUrl ? 'FundedWealth AI support' : 'FundedWealth AI support destination not configured'} onClick={openAiSupport}><IconFundedWealthAI /></button>
    </div>
  )
}

const COMMUNITY_SPARKS = [
  { x: '12%', y: '22%', d: '0s', t: '16s' },
  { x: '28%', y: '68%', d: '2s', t: '19s' },
  { x: '46%', y: '18%', d: '4s', t: '14s' },
  { x: '63%', y: '54%', d: '1s', t: '18s' },
  { x: '78%', y: '30%', d: '3s', t: '21s' },
  { x: '88%', y: '72%', d: '5s', t: '17s' },
  { x: '8%', y: '80%', d: '1.6s', t: '20s' },
  { x: '70%', y: '12%', d: '2.8s', t: '15s' },
] as const

const DASH_TABS = ['Overview', 'Positions', 'Analytics', 'Rules'] as const
const DASH_METRICS = ['balance', 'equity', 'drawdown', 'risk'] as const
const DASH_FLOATERS = [
  { label: '+0.42%', x: '2%', y: '12%', delay: '0s', duration: '19s' },
  { label: 'BUY', x: '92%', y: '18%', delay: '1.4s', duration: '22s' },
  { label: '+1.18%', x: '8%', y: '78%', delay: '2.2s', duration: '17s' },
  { label: 'SELL', x: '88%', y: '72%', delay: '0.6s', duration: '21s' },
  { label: '$100K', x: '4%', y: '46%', delay: '3s', duration: '24s' },
  { label: 'UP', x: '94%', y: '44%', delay: '1.8s', duration: '18s' },
  { label: 'NIFTY', x: '14%', y: '8%', delay: '2.8s', duration: '20s' },
  { label: '₹', x: '82%', y: '8%', delay: '0.4s', duration: '16s' },
]

const PROGRAM_PRESETS = [
  { balance: 105410, equity: 105188.2, drawdown: 1.06 },
  { balance: 108220, equity: 107964.5, drawdown: 0.84 },
  { balance: 106842, equity: 106517.4, drawdown: 1.24 },
  { balance: 104960, equity: 104712.8, drawdown: 1.42 },
]

function formatDashDate(date: Date) {
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

function dashGreeting(date: Date) {
  const hour = date.getHours()
  if (hour >= 5 && hour < 12) return 'Good morning, trader.'
  if (hour >= 12 && hour < 18) return 'Good afternoon, trader.'
  return 'Good evening, trader.'
}

function ComparisonSection() {
  const comparisonRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const node = comparisonRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.16 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={comparisonRef} className={`comparison-section${inView ? ' is-visible' : ''}`} style={{ '--comparison-x': `${pointer.x}px`, '--comparison-y': `${pointer.y}px` } as React.CSSProperties} onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setPointer({ x: (event.clientX - rect.left - rect.width / 2) * 0.018, y: (event.clientY - rect.top - rect.height / 2) * 0.018 }) }} onPointerLeave={() => setPointer({ x: 0, y: 0 })}>
      <div className="comparison-atmosphere" aria-hidden="true"><span className="comparison-orbit comparison-orbit-one" /><span className="comparison-orbit comparison-orbit-two" /><i className="comparison-particle comparison-particle-one" /><i className="comparison-particle comparison-particle-two" /><i className="comparison-particle comparison-particle-three" /></div>
      <div className="comparison-heading"><SectionLabel>THE FUNDEDWEALTH — FOREX DIFFERENCE</SectionLabel><h2>Built for traders.<br /><em>Designed for your edge.</em></h2><p>See what makes the FundedWealth Forex experience different.</p></div>
      <div className="comparison-stage">
        <div className="comparison-column comparison-features"><div className="comparison-column-head">FEATURES</div>{comparisonRows.map(([feature]) => <div className="comparison-row comparison-feature-row" key={feature}><span>{feature}</span></div>)}</div>
        <div className="comparison-column comparison-firm"><div className="comparison-card"><span className="comparison-card-kicker">FW / TRADING ENVIRONMENT</span><img src="/fundedwealth-mark.png" alt="" /><strong>FUNDEDWEALTH <em>FOREX</em></strong><small>PROVE YOUR EDGE</small><i className="comparison-card-sweep" /></div><div className="comparison-values">{comparisonRows.map(([feature, value]) => <div className="comparison-row" key={feature}><span className="comparison-positive">&#10003;</span><span>{value}</span></div>)}</div></div>
        <div className="comparison-column comparison-others"><div className="comparison-column-head">OTHER FIRMS</div>{comparisonRows.map(([feature, , value]) => <div className="comparison-row" key={feature}><span className="comparison-neutral">—</span><span>{value}</span></div>)}</div>
        <div className="comparison-tab comparison-tab-platform"><small>01 / PLATFORM</small><strong>MT5 Trading</strong></div><div className="comparison-tab comparison-tab-payouts"><small>02 / PAYOUTS</small><strong>Fast &amp; transparent</strong></div><div className="comparison-tab comparison-tab-rules"><small>03 / RULES</small><strong>Clear parameters</strong></div><div className="comparison-tab comparison-tab-support"><small>04 / SUPPORT</small><strong>Trader-focused</strong></div><div className="comparison-tab comparison-tab-program"><small>05 / PROGRAM</small><strong>Choose your challenge</strong></div>
      </div>
    </section>
  )
}

function buildDashChart(phase: number) {
  const width = 700
  const count = 52
  const points: string[] = []
  for (let i = 0; i < count; i += 1) {
    const x = (i / (count - 1)) * width
    const t = phase + i * 0.12
    const y = 102 - Math.sin(t * 0.31) * 26 - Math.sin(t * 1.05) * 11 - Math.sin(t * 2.15) * 7 - Math.cos(t * 0.14) * 18
    points.push(`${x.toFixed(1)},${Math.min(152, Math.max(16, y)).toFixed(1)}`)
  }
  const line = `M${points.join(' L')}`
  return { line, area: `${line} L700,170 L0,170 Z` }
}

function DashboardPreview({ programIndex }: { programIndex: number }) {
  const { formatCurrency } = useCurrency()
  const formatMoney = (value: number) => formatCurrency(value)
  const preset = PROGRAM_PRESETS[programIndex] ?? PROGRAM_PRESETS[0]
  const [now, setNow] = useState<Date | null>(null)
  const [tab, setTab] = useState(0)
  const [metric, setMetric] = useState(0)
  const [phase, setPhase] = useState(programIndex * 4)
  const [balance, setBalance] = useState(preset.balance)
  const [equity, setEquity] = useState(preset.equity)
  const [drawdown, setDrawdown] = useState(preset.drawdown)
  const tabRef = useRef(0)
  const metricRef = useRef(0)
  const tabPauseRef = useRef(0)
  const metricPauseRef = useRef(0)
  const reducedRef = useRef(false)

  useEffect(() => {
    const tickClock = () => setNow(new Date())
    tickClock()
    const clock = window.setInterval(tickClock, 30000)
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return () => window.clearInterval(clock)
  }, [])

  useEffect(() => {
    const next = PROGRAM_PRESETS[programIndex] ?? PROGRAM_PRESETS[2]
    setBalance(next.balance)
    setEquity(next.equity)
    setDrawdown(next.drawdown)
    setPhase(programIndex * 4)
  }, [programIndex])

  useEffect(() => {
    if (reducedRef.current) return
    let frame = 0
    let last = 0
    let raf = 0
    const loop = (time: number) => {
      if (time - last > 48) {
        last = time
        setPhase((value) => value + 0.045)
        frame += 1
        if (frame % 5 === 0) {
          const base = PROGRAM_PRESETS[programIndex] ?? PROGRAM_PRESETS[0]
          setBalance((value) => Math.min(base.balance + 160, Math.max(base.balance - 140, value + Math.sin(time / 900) * 1.1 + (Math.random() - 0.48) * 2.4)))
          setEquity((value) => Math.min(base.equity + 140, Math.max(base.equity - 130, value + Math.sin(time / 1100) * 0.9 + (Math.random() - 0.5) * 2.1)))
          setDrawdown((value) => Math.min(base.drawdown + 0.18, Math.max(base.drawdown - 0.16, value + (Math.random() - 0.5) * 0.02)))
        }
      }
      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)
    return () => window.cancelAnimationFrame(raf)
  }, [programIndex])

  useEffect(() => {
    if (reducedRef.current) return
    let timer = 0
    let cancelled = false
    const tick = () => {
      if (cancelled) return
      const wait = tabPauseRef.current - Date.now()
      if (wait > 0) {
        timer = window.setTimeout(tick, wait)
        return
      }
      const next = (tabRef.current + 1) % DASH_TABS.length
      tabRef.current = next
      setTab(next)
      timer = window.setTimeout(tick, 3200)
    }
    timer = window.setTimeout(tick, 3200)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (reducedRef.current) return
    let timer = 0
    let cancelled = false
    const tick = () => {
      if (cancelled) return
      const wait = metricPauseRef.current - Date.now()
      if (wait > 0) {
        timer = window.setTimeout(tick, wait)
        return
      }
      const next = (metricRef.current + 1) % DASH_METRICS.length
      metricRef.current = next
      setMetric(next)
      timer = window.setTimeout(tick, 2600)
    }
    timer = window.setTimeout(tick, 2600)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  const selectTab = (index: number) => {
    tabPauseRef.current = Date.now() + 2800
    tabRef.current = index
    setTab(index)
  }

  const selectMetric = (index: number) => {
    metricPauseRef.current = Date.now() + 2800
    metricRef.current = index
    setMetric(index)
  }

  const chart = buildDashChart(phase)
  const gain = ((balance - 100000) / 100000) * 100
  const equityGain = ((equity - 100000) / 100000) * 100
  const remaining = Math.max(0, 5 - drawdown)
  const notes = [
    `Today +${(gain - 6.6).toFixed(2)}%`,
    `Available ${formatMoney(equity)}`,
    `Remaining ${remaining.toFixed(2)}%`,
    'Healthy — Low Risk',
  ]

  return (
    <div className="dashboard-stage">
      <div className="dash-floaters" aria-hidden="true">
        {DASH_FLOATERS.map((item) => (
          <span key={item.label} style={{ left: item.x, top: item.y, animationDelay: item.delay, animationDuration: item.duration }}>{item.label}</span>
        ))}
      </div>
      <div className="dashboard-preview">
        <div className="dash-bar">
          <img className="dash-logo" src="/fundedwealth-mark.png" alt="" />
          <span>TRADER CONSOLE</span>
          <b>SIMULATED ACCOUNT</b>
        </div>
        <div className="dash-body">
          <aside>
            <small>ACCOUNT</small>
            <strong>$100K</strong>
            <em className="dash-program-tag">{challengeModels[programIndex]}</em>
            {DASH_TABS.map((label, index) => (
              <button type="button" className={tab === index ? 'side-active' : ''} key={label} onClick={() => selectTab(index)}>{label}</button>
            ))}
          </aside>
          <div className="dash-main">
            <div className="dash-heading">
              <div>
                <small>{now ? formatDashDate(now) : '\u00a0'}</small>
                <h3>{now ? dashGreeting(now) : '\u00a0'}</h3>
              </div>
              <div className="status-pill"><i />Account active</div>
            </div>
            {tab === 0 && (
              <>
                <div className="dash-stats">
                  {[
                    ['BALANCE', formatMoney(balance), `+${gain.toFixed(2)}%`, null],
                    ['EQUITY', formatMoney(equity), `+${equityGain.toFixed(2)}%`, null],
                    ['DRAWDOWN', `${drawdown.toFixed(2)}%`, null, `of 5.00%`],
                    ['RISK SCORE', 'LOW', null, 'Healthy'],
                  ].map(([label, value, change, hint], index) => (
                    <button type="button" className={metric === index ? 'is-active' : ''} key={label as string} onClick={() => selectMetric(index)}>
                      <small>{label}</small>
                      <strong>{value}</strong>
                      {change && <b>{change}</b>}
                      {hint && <span>{hint}</span>}
                      {metric === index && <em>{notes[index]}</em>}
                    </button>
                  ))}
                </div>
                <div className="dash-chart">
                  <div className="dash-chart-head"><span>BALANCE VS TARGET</span><small>{now ? `${String(now.getDate()).padStart(2, '0')} ${['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][now.getMonth()]} — LIVE` : 'LIVE'}</small></div>
                  <svg viewBox="0 0 700 170" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="fw-dash-line" x1="0" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="55%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                    <path className="dash-area" d={chart.area} />
                    <path className="dash-line" d={chart.line} />
                  </svg>
                </div>
              </>
            )}
            {tab === 1 && (
              <div className="dash-panel">
                {[['EURUSD', 'BUY', '0.40', '+$128.40'], ['GBPUSD', 'SELL', '0.20', '−$42.10'], ['USDJPY', 'BUY', '0.15', '+$67.80']].map(([pair, side, lots, pnl]) => (
                  <div key={pair}><span>{pair}</span><b className={side === 'BUY' ? 'buy' : 'sell'}>{side}</b><span>{lots}</span><strong>{pnl}</strong></div>
                ))}
              </div>
            )}
            {tab === 2 && (
              <div className="dash-panel dash-analytics">
                {[['WIN RATE', '62%'], ['AVG R', '1.4'], ['BEST DAY', '+2.1%']].map(([label, value]) => (
                  <div key={label}><small>{label}</small><strong>{value}</strong></div>
                ))}
              </div>
            )}
            {tab === 3 && (
              <div className="dash-panel dash-rules">
                {[['Daily drawdown', '5%'], ['Maximum drawdown', '10%'], ['Profit target', '10%']].map(([label, value]) => (
                  <div key={label}><span>{label}</span><strong>{value}</strong></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
    const { t } = useLanguage()
  const { currency } = useCurrency()
  const [activeChallenge, setActiveChallenge] = useState(2)
  const [activeModel, setActiveModel] = useState(0)
  const [activeProgram, setActiveProgram] = useState(0)
  const [openRule, setOpenRule] = useState<number | null>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [journeyStep, setJourneyStep] = useState(0)
  const [journeyProgress, setJourneyProgress] = useState(0)
  const [journeySuccess, setJourneySuccess] = useState(false)
  const [journeyRewind, setJourneyRewind] = useState(false)
  const [rulesInView, setRulesInView] = useState(false)
  const journeyRef = useRef<HTMLElement>(null)
  const rulesRef = useRef<HTMLElement>(null)
  const ruleIndexRef = useRef(0)
  const rulePauseRef = useRef(0)
  const challengeCountForModel = (modelIndex: number) => modelIndex === 0
    ? flashChallenges.length
    : modelIndex === 1
      ? instantChallenges.length
      : modelIndex === 2
        ? oneStepChallenges.length
          : modelIndex === 3
            ? twoStepChallenges.length
        : challenges.length

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLAnchorElement>('a.button[href="#footer"]'))
    const activate = (event: Event) => {
      const button = event.currentTarget as HTMLAnchorElement
      button.classList.add('is-processing')
      window.setTimeout(() => button.classList.remove('is-processing'), 900)
    }
    buttons.forEach((button) => button.addEventListener('click', activate))
    return () => buttons.forEach((button) => button.removeEventListener('click', activate))
  }, [])

  useEffect(() => {
    let cancelled = false
    let timer = 0
    let index = 0

    const timeline: Array<{ hold: number; apply: () => void }> = [
      { hold: 1400, apply: () => { setJourneyRewind(false); setJourneySuccess(false); setJourneyStep(0); setJourneyProgress(0) } },
      { hold: 800, apply: () => { setJourneyProgress(1 / 3) } },
      { hold: 1400, apply: () => { setJourneyStep(1) } },
      { hold: 800, apply: () => { setJourneyProgress(2 / 3) } },
      { hold: 1400, apply: () => { setJourneyStep(2) } },
      { hold: 800, apply: () => { setJourneyProgress(1) } },
      { hold: 1400, apply: () => { setJourneyStep(3) } },
      { hold: 1600, apply: () => { setJourneySuccess(true) } },
      { hold: 400, apply: () => { setJourneySuccess(false); setJourneyStep(-1); setJourneyRewind(true); setJourneyProgress(0) } },
      { hold: 1150, apply: () => {} },
    ]

    const play = () => {
      if (cancelled) return
      timeline[index].apply()
      const hold = timeline[index].hold
      index = (index + 1) % timeline.length
      timer = window.setTimeout(play, hold)
    }

    play()

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  const selectModel = (index: number) => {
    setActiveModel(index)
    setActiveProgram(index)
    setActiveChallenge((current) => Math.min(current, challengeCountForModel(index) - 1))
  }

  useEffect(() => {
    const node = rulesRef.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setRulesInView(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      setRulesInView(entry.isIntersecting)
    }, { threshold: 0.28 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!rulesInView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cancelled = false
    let timer = 0
    const tick = () => {
      if (cancelled) return
      const pauseLeft = rulePauseRef.current - Date.now()
      if (pauseLeft > 0) {
        timer = window.setTimeout(tick, pauseLeft)
        return
      }
      const next = (ruleIndexRef.current + 1) % rules.length
      ruleIndexRef.current = next
      setOpenRule(next)
      timer = window.setTimeout(tick, 2800)
    }
    timer = window.setTimeout(tick, 2800)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [rulesInView])

  const selectRule = (index: number) => {
    rulePauseRef.current = Date.now() + 5200
    const next = openRule === index ? null : index
    ruleIndexRef.current = next ?? index
    setOpenRule(next)
  }

  const selectedChallengeIndex = Math.min(activeChallenge, challengeCountForModel(activeModel) - 1)
  const selected = activeModel === 0
    ? flashChallenges[selectedChallengeIndex]
    : activeModel === 1
      ? instantChallenges[selectedChallengeIndex]
      : activeModel === 2
        ? oneStepChallenges[selectedChallengeIndex]
        : activeModel === 3
          ? twoStepChallenges[selectedChallengeIndex]
          : challenges[selectedChallengeIndex]
  const selectedPricing = activeModel === 0
    ? getPricing('FLASH', selected.size)
    : activeModel === 1
      ? getPricing('INSTANT', selected.size)
      : activeModel === 2
        ? getPricing('1 STEP', selected.size)
        : activeModel === 3
          ? getPricing('2 STEP', selected.size)
          : undefined
  const checkoutHref = `/checkout?type=${encodeURIComponent(challengeModels[activeModel])}&size=${encodeURIComponent(selected.size)}&currency=${currency}`

  useEffect(() => {
    const selectedAction = document.querySelector<HTMLAnchorElement>('.detail-bottom a.button')
    if (selectedAction) selectedAction.href = checkoutHref
  }, [checkoutHref])
  const detailMetrics = activeModel === 0
    ? flashRules
    : activeModel === 1
      ? instantRules
      : [['PROFIT TARGET', selected.target], ['DAILY DRAWDOWN', selected.daily], ['MAX DRAWDOWN', selected.max], ['MINIMUM DAYS', selected.days], ['PROFIT SHARE', selected.share], ['LEVERAGE', selected.leverage]] as const

  return (
    <main className="site-shell">
      <div className="product-switcher" role="navigation" aria-label="FundedWealth products">
        <a className="product-tab is-active" href="#top">FUNDEDWEALTH <b>FOREX</b></a>
        <a className="product-tab product-tab-ind" href="https://www.fundedwealth.com/"><img src="/fundedwealth-mark.png" alt="FundedWealth" /><span>FUNDEDWEALTH <b>IND MARKET</b></span></a>
      </div>
      <nav className={`site-nav ${scrolled ? 'nav-scrolled' : ''}`}>
<a href="#top" className="brand brand-with-mark"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex mark" /><span>FUNDEDWEALTH <i>FOREX</i></span></a>
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#challenges" onClick={() => setMenuOpen(false)}>{t.nav.challenges}</a><a href="#how-it-works" onClick={() => setMenuOpen(false)}>{t.nav.howItWorks}</a><a href="/rules" onClick={() => setMenuOpen(false)}>{t.nav.rules}</a><a href="#platforms" onClick={() => setMenuOpen(false)}>{t.nav.platforms}</a><a href="#faq" onClick={() => setMenuOpen(false)}>{t.nav.faq}</a>
        </div>
        <div className="nav-actions"><a className="nav-community" href="#community">{t.nav.community}</a><a className="portal-link" href="#dashboard">{t.nav.portal}</a><a className="nav-login" href="#footer">{t.nav.login}</a><LanguageSwitcher /></div>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-art" aria-hidden="true">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BcbzDf3Lrqy1m4pKNZ26IjBS8SMEFI.png" alt="" />
          <div className="planet-atmosphere" aria-hidden="true" />
        </div>
        <div className="hero-copy"><div className="hero-trust-badge">{t.hero.badge}</div><div className="hero-container"><h1 className="saas-heading"><span className="line line-1">Trade Bigger.</span><span className="line line-2">Prove Your Edge.</span><span className="line line-3">Build Your Capital.</span></h1></div><p className="hero-text">{t.hero.text}</p><div className="hero-buttons"><StartChallengeLink className="button primary-liquid" href={checkoutHref}>{t.hero.start} <ArrowRight data-icon="inline-end" /></StartChallengeLink><a className="watch-demo" href="#how-it-works"><span className="play-icon" aria-hidden="true" />{t.hero.demo}</a><a className="trading-rules-button" href="#rules"><FileText data-icon="inline-start" />{t.hero.rules} <ArrowRight data-icon="inline-end" /></a><a className="free-trial-button" href="#challenges"><UsersRound data-icon="inline-start" />{t.hero.trial} <ArrowRight data-icon="inline-end" /></a></div><div className="hero-stats"><div><strong>UP TO 90%</strong><span>PROFIT SHARE</span></div><div><strong>UP TO $100K</strong><span>SIMULATED CAPITAL</span></div><div><strong>24/7</strong><span>TRADER SUPPORT</span></div></div></div>

      </section>

      <MarketTicker />

      <ComparisonSection />

      <section className="trust-strip">
        <div className="trust-marquee">
          <div className="trust-track">
            {[0, 1].map((copy) => (
              <div className="trust-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                <span>BUILT FOR DISCIPLINED TRADERS</span>
                {([['shield', 'SIMULATED CAPITAL'], ['target', 'TRANSPARENT RULES'], ['chart', 'PROFESSIONAL PLATFORM'], ['gauge', 'CLEAR RISK PARAMETERS'], ['head', 'TRADER SUPPORT']] as const).map(([icon, label]) => (
                  <div className={`trust-item${label === 'SIMULATED CAPITAL' ? ' trust-glow' : ''}`} key={`${copy}-${label}`}>
                    <span className={`trust-icon ${icon}`} />{label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="challenges" className="section challenges-section"><div className="section-heading"><div><SectionLabel>THE RIGHT FIT FOR YOUR EDGE</SectionLabel><h2>Choose Your <em>Challenge.</em></h2></div><p>Select the account size and evaluation model that fits your trading style.</p></div><div className="model-tabs-wrap"><div className="model-tabs" role="tablist" aria-label="Challenge models"><CurrencySwitcher />{challengeModels.map((model, index) => <button type="button" role="tab" aria-selected={activeModel === index} className={activeModel === index ? 'is-active' : ''} onClick={() => selectModel(index)} key={model}><i>{index + 1}</i><span>{model}</span><em className="model-tab-glow" aria-hidden="true" /><em className="model-tab-orbit" aria-hidden="true" /></button>)}</div></div><div className="challenge-layout"><div className="challenge-tabs">{(activeModel === 0 ? flashChallenges : activeModel === 1 ? instantChallenges : activeModel === 2 ? oneStepChallenges : activeModel === 3 ? twoStepChallenges : challenges).map((challenge, index) => <button className={selectedChallengeIndex === index ? 'selected' : ''} onClick={() => setActiveChallenge(index)} key={challenge.size}><span>ACCOUNT SIZE</span><strong>{challenge.size}</strong>{activeModel === 0 || activeModel === 1 || activeModel === 2 || activeModel === 3 ? <PriceDisplay pricing={getPricing(activeModel === 0 ? 'FLASH' : activeModel === 1 ? 'INSTANT' : activeModel === 2 ? '1 STEP' : '2 STEP', challenge.size)} compact /> : <small>{challenge.price}</small>}{selectedChallengeIndex === index && <Check />}</button>)}</div><div className="challenge-detail"><div className="detail-top"><div><small>SELECTED ACCOUNT</small><h3>{selected.size} <span>{challengeModels[activeModel]}</span></h3></div><div className="price"><small>ONE-TIME FEE</small>{activeModel === 0 || activeModel === 1 || activeModel === 2 || activeModel === 3 ? <PriceDisplay pricing={selectedPricing} /> : <strong>{selected.price}</strong>}</div></div>{activeModel === 2 || activeModel === 3 ? <div className="one-step-rules"><div className="one-step-rule-column"><h4>{activeModel === 2 ? '1-STEP EVALUATION' : '2-STEP EVALUATION'}</h4>{(activeModel === 2 ? oneStepEvaluationRules : twoStepEvaluationRules).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="one-step-rule-column"><h4>FUNDED TRADER</h4>{(activeModel === 2 ? oneStepFundedRules : twoStepFundedRules).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="one-step-bonus"><strong>FIRST PAYOUT BONUS</strong><span>Applicable after the first payout</span><em>{selected.bonus}</em></div></div> : <div className="detail-metrics">{detailMetrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>}<div className="detail-bottom"><span><ShieldCheck /> Transparent parameters. No hidden rules.</span><a className="button" href="#footer">START CHALLENGE <ArrowRight data-icon="inline-end" /></a></div></div></div></section>

      <div className="payment-strip" aria-label="Secure payment methods"><p><span />SECURE PAYMENT METHODS<span /></p><div className="payment-methods"><div className="payment-tile payment-upi"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" /></div><div className="payment-tile"><img src="https://cdn.simpleicons.org/googlepay/ffffff" alt="Google Pay" /></div><div className="payment-tile payment-applepay"><img src="https://cdn.simpleicons.org/applepay/ffffff" alt="Apple Pay" /></div><div className="payment-tile payment-visa"><img src="https://cdn.simpleicons.org/visa/ffffff" alt="Visa" /></div><div className="payment-tile payment-mastercard"><img src="https://cdn.simpleicons.org/mastercard/ffffff" alt="Mastercard" /></div><div className="payment-tile payment-razorpay"><img src="https://cdn.simpleicons.org/razorpay/ffffff" alt="Razorpay" /></div><div className="payment-tile payment-bitcoin"><img src="https://cdn.simpleicons.org/bitcoin/f7931a" alt="Bitcoin" /></div><div className="payment-tile payment-ethereum"><img src="https://cdn.simpleicons.org/ethereum/8c9eff" alt="Ethereum" /></div></div></div>

      <section className="section programs-section"><div className="program-feature-image"><img src="/102924.png" alt="Why traders choose FundedWealth Forex" /></div><div className="program-copy"><h2>Trade on your <em>terms.</em></h2><p>Clear paths for different trading styles. Start with the structure that makes sense for your edge.</p></div><div className="program-grid">{programCards.map((program, index) => { const Icon = program.Icon; return <article className={`program-card ${program.tone}${activeProgram === index ? ' is-active' : ''}`} key={program.title} onClick={() => selectModel(index)}><div className="program-top"><span>{program.number}</span><Icon /></div><small>{program.category}</small><h3>{program.title}</h3><p>{program.text}</p><div className="program-metrics">{program.metrics.map(([value, label]) => <span key={label}>{value} <i>{label}</i></span>)}</div><a href="#challenges">VIEW DETAILS <ArrowRight data-icon="inline-end" /></a></article> })}</div></section>

      <section id="how-it-works" className="journey-section" ref={journeyRef}><div className="journey-inner"><SectionLabel>THE JOURNEY</SectionLabel><h2>From conviction to <em>capital.</em></h2><div className="journey-grid" data-journey-step={String(journeyStep)} data-journey-progress={journeyProgress.toFixed(3)} data-journey-success={journeySuccess ? '1' : '0'} style={{ '--journey-progress': String(journeyProgress) } as { '--journey-progress': string }}><div className={`journey-rail${journeyRewind ? ' is-rewinding' : ''}`} aria-hidden="true"><span className="journey-rail-fill" /><span className="journey-rail-head" /></div>{journeySteps.map(([number, title, text], index) => { const isActive = !journeySuccess && journeyStep === index; const isComplete = journeySuccess || index < journeyStep; const isSuccess = journeySuccess && index === 3; return <div className={`journey-step${isActive ? ' is-active' : ''}${isComplete ? ' is-complete' : ''}${isSuccess ? ' is-success' : ''}`} key={number}><div className="step-number"><span className="step-index">{number}</span><span className="step-check" aria-hidden="true" /></div><div><h3>{title}</h3><p>{text}</p>{index === 3 && <b className="journey-funded">FUNDED</b>}</div>{index < 3 && <span className="journey-arrow"><ArrowRight /></span>}</div> })}</div></div></section>

      <section className="section fw-edge-section"><div className="fw-edge-heading" /><div className="fw-edge-bento"><article className="fw-bento-card fw-bento-platform"><div className="fw-bento-copy"><small>01 / TRADING PLATFORM</small><h3>Professional Trading Platform</h3><p>Trade through a professional environment built for speed, clarity and disciplined execution.</p></div><div className="fw-terminal-visual" aria-hidden="true"><div className="fw-terminal-top"><img src="/fundedwealth-mark.png" alt="" /><span>TRADING CONSOLE</span><i /></div><div className="fw-terminal-chart"><i /><i /><i /><i /><i /><b /></div><div className="fw-terminal-footer"><span>EUR/USD</span><strong>+1.24%</strong></div></div></article><article className="fw-bento-card fw-bento-payout"><div className="fw-bento-copy"><small>02 / FAST PAYOUTS</small><h3>Fast &amp; Transparent Payouts</h3><p>Clear payout rules with transparent eligibility and no unnecessary complexity.</p></div><div className="fw-payout-visual" aria-hidden="true"><strong>90%</strong><span>ELIGIBLE SHARE</span><i /></div></article><article className="fw-bento-card fw-bento-capital"><div className="fw-bento-copy"><small>03 / SIMULATED CAPITAL</small><h3>Up to $100,000 Capital</h3><p>Access simulated trading capital and prove your risk-management skills.</p></div><div className="fw-capital-visual" aria-hidden="true"><img src="/fundedwealth-mark.png" alt="" /><strong>$100,000</strong><span>SIMULATED CAPITAL</span></div></article><article className="fw-bento-card fw-bento-markets"><div className="fw-bento-copy"><small>04 / GLOBAL MARKET ACCESS</small><h3>Global Market Access</h3><p>Trade a broad range of supported instruments across global markets.</p></div><div className="fw-market-visual" aria-hidden="true"><span>GOLD</span><span>EUR/USD</span><span>GBP/USD</span><span>USD/JPY</span><span>BTC/USD</span><span>ETH/USD</span></div></article><article className="fw-bento-card fw-bento-risk"><div className="fw-bento-copy"><small>05 / CLEAR RISK PARAMETERS</small><h3>Transparent Risk Rules</h3><p>Know your drawdown, daily loss, risk and payout parameters before you trade.</p></div><div className="fw-risk-visual" aria-hidden="true"><div><span>DAILY LIMIT</span><b>3.0%</b><i style={{ '--risk-width': '34%' } as React.CSSProperties} /></div><div><span>MAX DRAWDOWN</span><b>5.0%</b><i style={{ '--risk-width': '58%' } as React.CSSProperties} /></div><div><span>RISK SCORE</span><b>LOW</b><i style={{ '--risk-width': '22%' } as React.CSSProperties} /></div></div></article><article className="fw-bento-card fw-bento-community"><div className="fw-bento-copy"><small>06 / TRADER COMMUNITY</small><h3>Built Around Traders</h3><p>Trader support, community resources and an environment designed to help traders stay disciplined.</p></div><div className="fw-community-visual" aria-hidden="true"><img src="/fundedwealth-mark.png" alt="" /><span>THE COLLECTIVE EDGE</span><b>24/7 TRADER SUPPORT</b></div></article></div></section>

      <section id="dashboard" className="section dashboard-section"><div className="section-heading centered"><div><SectionLabel>YOUR EDGE, VISUALIZED</SectionLabel><h2>A console built for <em>clarity.</em></h2></div><p>Every number that matters, visible at a glance. This is a visual preview of the simulated trader experience.</p></div><DashboardPreview programIndex={activeModel} /></section>

      <section id="rules" className={`section rules-section${rulesInView ? ' is-inview' : ''}`} ref={rulesRef}>
        <div className="rules-copy">
          <p className="section-label"><span className="rules-pulse-line" />THE PARAMETERS</p>
          <h2 className="rules-headline">Clear rules.<br /><em>Sharper decisions.</em></h2>
          <p className="rules-lead">Your trading plan deserves a framework that is easy to understand and impossible to misread.</p>
          <a className="button button-outline" href="#challenges">VIEW CHALLENGES <ArrowRight data-icon="inline-end" /></a>
        </div>
        <div className="rules-list">
          {rules.map(([title, value, text], index) => (
            <div className={`rule-row${openRule === index ? ' rule-open' : ''}`} key={title}>
              <em className="rule-row-sweep" aria-hidden="true" />
              <button type="button" onClick={() => selectRule(index)} aria-expanded={openRule === index}>
                <span className="rule-index">0{index + 1}</span>
                <strong>{title}</strong>
                <b>{value}</b>
                <ChevronDown />
              </button>
              <div className="rule-body">
                <div className="rule-body-inner">
                  <p>{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="platforms" className="platform-section">
        <div className="platform-energy" aria-hidden="true">
          <span className="platform-orb platform-orb-a" />
          <span className="platform-orb platform-orb-b" />
          <span className="platform-orb platform-orb-c" />
        </div>
        <div className="section-heading centered">
          <div>
            <SectionLabel>YOUR MARKET, YOUR WAY</SectionLabel>
            <h2>Trade <em>your way.</em></h2>
          </div>
          <p>Connect with the platform experience configured for your program and keep your workflow familiar.</p>
        </div>
        <div className="platform-grid">
          <article className="platform-card is-live">
            <em className="platform-card-glow" aria-hidden="true" />
            <em className="platform-card-sweep" aria-hidden="true" />
            <em className="platform-card-orbit" aria-hidden="true" />
            <span className="platform-logo mt5">
              <img src="/assets/platforms/metatrader-5-icon.png" alt="MetaTrader 5 logo" width={96} height={96} />
            </span>
            <h3>MetaTrader 5</h3>
            <div className="platform-meta">
              <p>Available</p>
              <Check />
            </div>
          </article>
          <article className="platform-card platform-muted">
            <em className="platform-card-glow" aria-hidden="true" />
            <em className="platform-card-sweep" aria-hidden="true" />
            <span className="platform-logo ctrader">
              <img src="/assets/platforms/ctrader.svg" alt="cTrader logo" width={96} height={96} />
            </span>
            <h3>cTrader</h3>
            <div className="platform-meta">
              <p>Coming soon</p>
              <Clock3 />
            </div>
          </article>
          <article className="platform-card platform-muted">
            <em className="platform-card-glow" aria-hidden="true" />
            <em className="platform-card-sweep" aria-hidden="true" />
            <span className="platform-logo dx">
              <img src="/assets/platforms/dxtrade-icon.png" alt="DXtrade logo" width={96} height={96} />
            </span>
            <h3>DXtrade</h3>
            <div className="platform-meta">
              <p>Coming soon</p>
              <Clock3 />
            </div>
          </article>
        </div>
      </section>

      <section id="community" className="community-section">
        <div className="community-fx" aria-hidden="true">
          <span className="community-cloud community-cloud-a comm-motion" />
          <span className="community-cloud community-cloud-b comm-motion" />
          <span className="community-cloud community-cloud-c comm-motion" />
          <span className="community-beam community-beam-a comm-motion" />
          <span className="community-beam community-beam-b comm-motion" />
          <span className="community-beam community-beam-c comm-motion" />
          {COMMUNITY_SPARKS.map((spark) => (
            <i className="community-spark comm-motion" key={`${spark.x}-${spark.y}`} style={{ left: spark.x, top: spark.y, animationDelay: spark.d, animationDuration: spark.t }} />
          ))}
        </div>
        <div className="community-layout">
          <div className="community-copy">
            <SectionLabel>THE COLLECTIVE EDGE</SectionLabel>
            <h2>Trade alone.<br /><em>Grow together.</em></h2>
            <p>Join a focused community for market discussion, trader education and the signals that matter.</p>
            <a className="button community-cta" href="#footer">JOIN THE COMMUNITY <ArrowRight data-icon="inline-end" /></a>
            <form className="community-news" onSubmit={(event) => event.preventDefault()}>
              <em className="community-news-flow comm-motion" aria-hidden="true" />
              <small>MARKET NOTES</small>
              <h3>Stay close to the desk.</h3>
              <input type="text" name="name" placeholder="Your name*" aria-label="Your name" />
              <input type="email" name="email" placeholder="Your email*" aria-label="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className="community-stage">
            <div className="community-world" aria-hidden="true">
              <div className="community-floor comm-motion" />
              <span className="community-world-glow comm-motion" />
              <span className="community-floater comm-motion f1"><IconDiscord /></span>
              <span className="community-floater comm-motion f2"><IconInstagram /></span>
              <span className="community-floater comm-motion f3"><IconTelegram /></span>
              <span className="community-floater comm-motion f4"><IconX /></span>
              <span className="community-floater comm-motion f5"><IconTikTok /></span>
              <span className="community-floater comm-motion f6"><IconWhatsApp /></span>
            </div>
            <div className="community-cards">
              <article className="community-discord">
                <em className="community-card-sweep comm-motion" aria-hidden="true" />
                <div className="community-discord-copy">
                  <small>JOIN OUR</small>
                  <h3>Discord</h3>
                  <a className="community-connect" href="#footer">Connect</a>
                </div>
                <div className="community-discord-visual">
                  <span className="community-discord-rays comm-motion" />
                  <span className="community-discord-slab" />
                  <span className="community-discord-mark comm-motion"><IconDiscord /></span>
                </div>
              </article>
              <article className="community-social">
                <em className="community-card-sweep comm-motion" aria-hidden="true" />
                <small>FOLLOW US</small>
                <div className="community-social-row">
                  {([['X', IconX, '#footer'], ['TikTok', IconTikTok, '#footer'], ['Instagram', IconInstagram, '#footer'], ['Telegram', IconTelegram, '#footer'], ['Facebook', IconFacebook, '#footer'], ['Discord', IconDiscord, '#footer']] as const).map(([label, Icon, href]) => (
                    <a className="community-social-icon" href={href} aria-label={label} key={label}><Icon /></a>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section faq-section">
        <div className="faq-copy">
          <div className="faq-eyebrow">FAQ</div>
          <SectionLabel>NO NOISE, JUST ANSWERS</SectionLabel>
          <h2 className="faq-headline faq-motion">Frequently<br /><em>asked.</em></h2>
          <p>Everything you need to make a confident decision about your next challenge.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className={`faq-row${openFaq === index ? ' faq-open' : ''}`} key={question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                <span>{question}</span>
                <i className="faq-plus" aria-hidden="true">+</i>
              </button>
              <div className="faq-body">
                <div className="faq-body-inner">
                  <p>{answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <footer id="footer" className="site-footer">
        <div className="footer-atmosphere" aria-hidden="true"><span className="footer-orbit footer-orbit-one" /><span className="footer-orbit footer-orbit-two" /><span className="footer-grid" /><span className="footer-sweep" /><i className="footer-particle footer-particle-one" /><i className="footer-particle footer-particle-two" /><i className="footer-particle footer-particle-three" /></div>
        <div className="footer-main">
          <div className="footer-brand-block"><a href="#top" className="brand brand-with-mark"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex mark" /><span>FUNDEDWEALTH <i>FOREX</i></span></a><p>Professional simulated trading<br />built around your edge.</p><div className="footer-company"><strong>FundedWealth India Pvt. Ltd.</strong><span>Mumbai, Maharashtra, India</span><a className="footer-mail" href="mailto:support@fundedwealth.com">support@fundedwealth.com <ArrowRight /></a><span>CIN: U74999MH2024PTC000000</span><span>GSTIN: 27AABCF0000A1Z5</span></div><div className="footer-socials" aria-label="FundedWealth Forex community links">{([['X', IconX], ['TikTok', IconTikTok], ['Instagram', IconInstagram], ['Telegram', IconTelegram], ['Facebook', IconFacebook], ['Discord', IconDiscord]] as const).map(([label, Icon]) => <a href="#community" aria-label={`${label} community`} key={label}><Icon /></a>)}</div></div>
          <nav className="footer-navigation" aria-label="Footer navigation"><div><small>EXPLORE</small><a href="#challenges">Challenges</a><a href="#how-it-works">How It Works</a><a href="#rules">Rules</a><a href="#faq">FAQ</a></div><div><small>PLATFORM</small><a href="#platforms">Platforms</a><a href="#dashboard">Trader Portal</a><a href="#community">Community</a><a href="#footer">Support</a></div><div><small>PROGRAMS</small><a href="#challenges">FLASH</a><a href="#challenges">INSTANT</a><a href="#challenges">1 STEP</a><a href="#challenges">2 STEP</a></div><div><small>LEGAL</small><a href="/legal/terms-and-conditions">Terms</a><a href="/privacy-policy">Privacy</a><a href="/aml-policy">AML Policy</a><a href="/cookie-policy">Cookie Policy</a><a href="/refund-policy">Refund Policy</a><a href="/risk-disclosure">Risk Disclosure</a></div></nav>
        </div>
        <div className="footer-ticker" aria-label="FundedWealth Forex concepts"><div className="footer-ticker-track"><span>FLASH</span><b /> <span>INSTANT</span><b /> <span>1 STEP</span><b /> <span>2 STEP</span><b /> <span>90% PROFIT SHARE</span><b /> <span>SIMULATED CAPITAL</span><b /> <span>CLEAR RISK PARAMETERS</span><b /> <span>FLASH</span><b /> <span>INSTANT</span><b /> <span>1 STEP</span><b /> <span>2 STEP</span><b /> <span>90% PROFIT SHARE</span><b /> <span>SIMULATED CAPITAL</span><b /> <span>CLEAR RISK PARAMETERS</span><b /></div></div>
        <section className="footer-legal-disclosure" aria-labelledby="footer-legal-title"><div className="footer-legal-heading"><span /> <h2 id="footer-legal-title">LEGAL &amp; RISK DISCLOSURE</h2></div><div className="footer-legal-grid"><article><small>01&nbsp;&nbsp; SIMULATED TRADING</small><p>All accounts and performance shown on this website are simulated or hypothetical. FundedWealth Forex provides an educational and informational simulated-trading environment and does not provide investment advice, recommendations, or guarantees of future results.</p></article><article><small>02&nbsp;&nbsp; RISK DISCLOSURE</small><p>Trading involves risk. Review the applicable rules and risk parameters before participating. Past performance does not guarantee future results. Funding and payouts are subject to the applicable program rules and compliance requirements.</p></article><article><small>03&nbsp;&nbsp; ELIGIBILITY &amp; AGE</small><p>Services are intended for users aged 18 and older. Users are responsible for ensuring that participation is permitted under the laws and regulations applicable to their location.</p></article><article><small>04&nbsp;&nbsp; RESTRICTED JURISDICTIONS</small><p>FundedWealth Forex does not provide services where participation would be prohibited by applicable law or regulation. Access may be restricted for certain countries, territories, jurisdictions, or persons subject to applicable legal or regulatory restrictions.</p></article></div></section>
        <div className="footer-disclosure"><p className="footer-copyright">© 2026 FUNDEDWEALTH FOREX. ALL RIGHTS RESERVED.</p></div>
      </footer>
      <SupportControls />
    </main>
  )
}
