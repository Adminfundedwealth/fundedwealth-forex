'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleDollarSign,
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

const challengeModels = ['FLASH', 'INSTANT', '1 STEP', '2 STEP']

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

function formatMoney(value: number) {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
  const [benefitActive, setBenefitActive] = useState(0)
  const [rulesInView, setRulesInView] = useState(false)
  const journeyRef = useRef<HTMLElement>(null)
  const rulesRef = useRef<HTMLElement>(null)
  const benefitIndexRef = useRef(0)
  const benefitPauseRef = useRef(0)
  const modelIndexRef = useRef(0)
  const modelPauseRef = useRef(0)
  const ruleIndexRef = useRef(0)
  const rulePauseRef = useRef(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
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

  useEffect(() => {
    let cancelled = false
    let timer = 0
    const tick = () => {
      if (cancelled) return
      const pauseLeft = benefitPauseRef.current - Date.now()
      if (pauseLeft > 0) {
        timer = window.setTimeout(tick, pauseLeft)
        return
      }
      const next = (benefitIndexRef.current + 1) % 6
      benefitIndexRef.current = next
      setBenefitActive(next)
      timer = window.setTimeout(tick, 2200)
    }
    timer = window.setTimeout(tick, 2200)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    let timer = 0
    const tick = () => {
      if (cancelled) return
      const pauseLeft = modelPauseRef.current - Date.now()
      if (pauseLeft > 0) {
        timer = window.setTimeout(tick, pauseLeft)
        return
      }
      const next = (modelIndexRef.current + 1) % challengeModels.length
      modelIndexRef.current = next
      setActiveModel(next)
      setActiveProgram(next)
      timer = window.setTimeout(tick, 3000)
    }
    timer = window.setTimeout(tick, 3000)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  const selectBenefit = (index: number) => {
    benefitPauseRef.current = Date.now() + 2800
    benefitIndexRef.current = index
    setBenefitActive(index)
  }

  const selectModel = (index: number) => {
    modelPauseRef.current = Date.now() + 3200
    modelIndexRef.current = index
    setActiveModel(index)
    setActiveProgram(index)
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

  const selected = challenges[activeChallenge]

  return (
    <main className="site-shell">
      <div className="product-switcher" role="navigation" aria-label="FundedWealth products">
        <a className="product-tab is-active" href="#top">FUNDEDWEALTH <b>FOREX</b></a>
        <a className="product-tab" href="#ind-market">FUNDEDWEALTH <b>IND MARKET</b></a>
      </div>
      <nav className={`site-nav ${scrolled ? 'nav-scrolled' : ''}`}>
<a href="#top" className="brand brand-with-mark"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex mark" /><span>FUNDEDWEALTH <i>FOREX</i></span></a>
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#challenges" onClick={() => setMenuOpen(false)}>CHALLENGES</a><a href="#how-it-works" onClick={() => setMenuOpen(false)}>HOW IT WORKS</a><a href="#rules" onClick={() => setMenuOpen(false)}>RULES</a><a href="#platforms" onClick={() => setMenuOpen(false)}>PLATFORMS</a><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </div>
        <div className="nav-actions"><a className="nav-community" href="#community">COMMUNITY</a><a className="portal-link" href="#dashboard">TRADER PORTAL</a><a className="nav-login" href="#footer">LOGIN / REGISTER</a><a className="button button-small" href="#challenges">START CHALLENGE <ArrowRight data-icon="inline-end" /></a></div>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-art" aria-hidden="true">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BcbzDf3Lrqy1m4pKNZ26IjBS8SMEFI.png" alt="" />
          <div className="planet-atmosphere" aria-hidden="true" />
        </div>
        <div className="hero-copy"><div className="hero-trust-badge">YOUR TRUSTED TRADING PARTNER</div><h1>Trade Bigger. <span>Prove Your Edge.</span><br />Build Your Capital.</h1><p className="hero-text">Prove your trading edge through a transparent evaluation and access a professional simulated trading environment built around disciplined risk management.</p><div className="hero-buttons"><a className="button primary-liquid" href="#challenges">START CHALLENGE <ArrowRight data-icon="inline-end" /></a><a className="watch-demo" href="#how-it-works"><span className="play-icon" aria-hidden="true" />WATCH DEMO</a><a className="trading-rules-button" href="#rules"><FileText data-icon="inline-start" />TRADING RULES <ArrowRight data-icon="inline-end" /></a><a className="free-trial-button" href="#challenges"><UsersRound data-icon="inline-start" />FREE TRIAL ACCOUNT <ArrowRight data-icon="inline-end" /></a></div><div className="hero-stats"><div><strong>UP TO 90%</strong><span>PROFIT SHARE</span></div><div><strong>UP TO $100K</strong><span>SIMULATED CAPITAL</span></div><div><strong>24/7</strong><span>TRADER SUPPORT</span></div></div></div>
      </section>

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

      <section id="challenges" className="section challenges-section"><div className="section-heading"><div><SectionLabel>THE RIGHT FIT FOR YOUR EDGE</SectionLabel><h2>Choose Your <em>Challenge.</em></h2></div><p>Select the account size and evaluation model that fits your trading style.</p></div><div className="model-tabs-wrap"><div className="model-tabs" role="tablist" aria-label="Challenge models">{challengeModels.map((model, index) => <button type="button" role="tab" aria-selected={activeModel === index} className={activeModel === index ? 'is-active' : ''} onClick={() => selectModel(index)} key={model}><i>{index + 1}</i><span>{model}</span><em className="model-tab-glow" aria-hidden="true" /><em className="model-tab-orbit" aria-hidden="true" /></button>)}</div></div><div className="challenge-layout"><div className="challenge-tabs">{challenges.map((challenge, index) => <button className={activeChallenge === index ? 'selected' : ''} onClick={() => setActiveChallenge(index)} key={challenge.size}><span>ACCOUNT SIZE</span><strong>{challenge.size}</strong><small>{challenge.price} <i>ONE-TIME</i></small>{activeChallenge === index && <Check />}</button>)}</div><div className="challenge-detail"><div className="detail-top"><div><small>SELECTED ACCOUNT</small><h3>{selected.size} <span>{challengeModels[activeModel]}</span></h3></div><div className="price"><small>ONE-TIME FEE</small><strong>{selected.price}</strong></div></div><div className="detail-metrics">{[['PROFIT TARGET', selected.target],['DAILY DRAWDOWN', selected.daily],['MAX DRAWDOWN', selected.max],['MINIMUM DAYS', selected.days],['PROFIT SHARE', selected.share],['LEVERAGE', selected.leverage]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="detail-bottom"><span><ShieldCheck /> Transparent parameters. No hidden rules.</span><a className="button" href="#footer">START CHALLENGE <ArrowRight data-icon="inline-end" /></a></div></div></div></section>

      <section className="section programs-section"><div className="program-copy"><SectionLabel>PROGRAM ARCHITECTURE</SectionLabel><h2>Trade on your <em>terms.</em></h2><p>Clear paths for different trading styles. Start with the structure that makes sense for your edge.</p></div><div className="program-grid">{programCards.map((program, index) => { const Icon = program.Icon; return <article className={`program-card ${program.tone}${activeProgram === index ? ' is-active' : ''}`} key={program.title} onClick={() => selectModel(index)}><div className="program-top"><span>{program.number}</span><Icon /></div><small>{program.category}</small><h3>{program.title}</h3><p>{program.text}</p><div className="program-metrics">{program.metrics.map(([value, label]) => <span key={label}>{value} <i>{label}</i></span>)}</div><a href="#challenges">VIEW DETAILS <ArrowRight data-icon="inline-end" /></a></article> })}</div></section>

      <section id="how-it-works" className="journey-section" ref={journeyRef}><div className="journey-inner"><SectionLabel>THE JOURNEY</SectionLabel><h2>From conviction to <em>capital.</em></h2><div className="journey-grid" data-journey-step={String(journeyStep)} data-journey-progress={journeyProgress.toFixed(3)} data-journey-success={journeySuccess ? '1' : '0'} style={{ '--journey-progress': String(journeyProgress) } as { '--journey-progress': string }}><div className={`journey-rail${journeyRewind ? ' is-rewinding' : ''}`} aria-hidden="true"><span className="journey-rail-fill" /><span className="journey-rail-head" /></div>{journeySteps.map(([number, title, text], index) => { const isActive = !journeySuccess && journeyStep === index; const isComplete = journeySuccess || index < journeyStep; const isSuccess = journeySuccess && index === 3; return <div className={`journey-step${isActive ? ' is-active' : ''}${isComplete ? ' is-complete' : ''}${isSuccess ? ' is-success' : ''}`} key={number}><div className="step-number"><span className="step-index">{number}</span><span className="step-check" aria-hidden="true" /></div><div><h3>{title}</h3><p>{text}</p>{index === 3 && <b className="journey-funded">FUNDED</b>}</div>{index < 3 && <span className="journey-arrow"><ArrowRight /></span>}</div> })}</div></div></section>

      <section className="section benefits-section"><div className="section-heading"><div><SectionLabel>THE FW DIFFERENCE</SectionLabel><h2>Built around your <em>process.</em></h2></div><p>Less noise. Better parameters. A trading environment designed to let your edge do the talking.</p></div><div className="benefit-stage"><div className="benefit-aura" aria-hidden="true" style={{ '--benefit-col': String(benefitActive % 3), '--benefit-row': String(Math.floor(benefitActive / 3)), '--benefit-slot': String(benefitActive) } as { '--benefit-col': string; '--benefit-row': string; '--benefit-slot': string }} /><div className="benefit-grid">{[['TRANSPARENT RULES','Know exactly where you stand before your first trade.','rule',ShieldCheck],['FLEXIBLE TRADING','Trade your strategy across a professional simulated environment.','flex',Crosshair],['CLEAR DRAWDOWN','Risk parameters are visible, measurable and built for discipline.','risk',Gauge],['PROFESSIONAL ENVIRONMENT','A focused console that keeps your attention on the market.','pro',BarChart3],['STRUCTURED PAYOUTS','A clear route from consistent performance to eligible payouts.','pay',CircleDollarSign],['SCALING OPPORTUNITIES','Your process can grow with your confidence and track record.','scale',TrendingUp]].map(([title, text, kind, Icon], index) => <article className={`benefit-card ${kind}${benefitActive === index ? ' is-active' : ''}`} key={title as string} onClick={() => selectBenefit(index)}><div className="benefit-icon"><Icon /></div><h3>{title as string}</h3><p>{text as string}</p><span className="benefit-art" /></article>)}</div></div></section>

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
        <div className="faq-fx" aria-hidden="true">
          <span className="faq-glow faq-glow-a faq-motion" />
          <span className="faq-glow faq-glow-b faq-motion" />
          <span className="faq-sweep faq-motion" />
          <i className="faq-spark faq-motion s1" />
          <i className="faq-spark faq-motion s2" />
          <i className="faq-spark faq-motion s3" />
          <i className="faq-spark faq-motion s4" />
          <i className="faq-spark faq-motion s5" />
        </div>
        <div className="faq-copy">
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

      <section className="final-cta"><div className="cta-grid" /><div className="cta-copy"><SectionLabel>YOUR NEXT MOVE</SectionLabel><h2>Your edge<br />deserves <em>more capital.</em></h2><p>Choose your challenge and start proving your trading edge.</p><div className="hero-buttons"><a className="button" href="#challenges">START CHALLENGE <ArrowRight data-icon="inline-end" /></a><a className="text-link" href="#rules">VIEW RULES <ArrowRight data-icon="inline-end" /></a></div></div><div className="cta-orbit" /></section>

      <footer id="footer" className="site-footer"><div className="footer-top"><a href="#top" className="brand brand-with-mark"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex mark" /><span>FUNDEDWEALTH <i>FOREX</i></span></a><p>Professional simulated trading<br />built around your edge.</p><a className="footer-mail" href="mailto:hello@fundedwealthforex.com">hello@fundedwealthforex.com <ArrowRight /></a></div><div className="footer-links"><div><small>EXPLORE</small><a href="#challenges">Challenges</a><a href="#how-it-works">How it works</a><a href="#rules">Rules</a></div><div><small>PLATFORM</small><a href="#platforms">Platforms</a><a href="#community">Community</a><a href="#faq">FAQ</a></div><div><small>LEGAL</small><a href="#footer">Terms</a><a href="#footer">Privacy</a><a href="#footer">Refund policy</a><a href="#footer">Risk disclosure</a></div></div><div className="footer-bottom"><span>© 2026 FUNDEDWEALTH FOREX. ALL RIGHTS RESERVED.</span><span>SIMULATED PERFORMANCE DISCLOSURE: ALL ACCOUNTS AND RESULTS SHOWN ARE SIMULATED OR HYPOTHETICAL.</span></div></footer>
    </main>
  )
}
