'use client'

import { useEffect, useState } from 'react'
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
  Sparkles,
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

function DashboardPreview() {
  return <div className="dashboard-preview"><div className="dash-bar"><span className="fw-dot">FW</span><span>TRADER CONSOLE</span><b>SIMULATED ACCOUNT</b></div><div className="dash-body"><aside><small>ACCOUNT</small><strong>$100K</strong><span className="side-active">Overview</span><span>Positions</span><span>Analytics</span><span>Rules</span></aside><div className="dash-main"><div className="dash-heading"><div><small>MONDAY, 21 AUGUST 2026</small><h3>Good morning, trader.</h3></div><div className="status-pill"><i />Account active</div></div><div className="dash-stats"><div><small>BALANCE</small><strong>$106,842.00</strong><b>+6.84%</b></div><div><small>EQUITY</small><strong>$106,517.40</strong><b>+6.52%</b></div><div><small>DRAWDOWN</small><strong>1.24%</strong><span>of 5.00%</span></div><div><small>RISK SCORE</small><strong>LOW</strong><span>Healthy</span></div></div><div className="dash-chart"><div className="dash-chart-head"><span>BALANCE VS TARGET</span><small>01 AUG — 21 AUG</small></div><svg viewBox="0 0 700 170" preserveAspectRatio="none" aria-hidden="true"><path className="target-line" d="M0 145 L700 25" /><path className="dash-area" d="M0 150 C80 138 100 130 160 135 S240 95 300 106 S370 78 440 75 S540 42 700 32 V170 H0Z" /><path className="dash-line" d="M0 150 C80 138 100 130 160 135 S240 95 300 106 S370 78 440 75 S540 42 700 32" /></svg></div></div></div></div>
}

export default function Page() {
  const [activeChallenge, setActiveChallenge] = useState(2)
  const [openRule, setOpenRule] = useState<number | null>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const selected = challenges[activeChallenge]

  return (
    <main className="site-shell">
      <nav className={`site-nav ${scrolled ? 'nav-scrolled' : ''}`}>
<a href="#top" className="brand brand-with-mark"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex mark" /><span>FUNDEDWEALTH <i>FOREX</i></span></a>
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#challenges" onClick={() => setMenuOpen(false)}>CHALLENGES</a><a href="#how-it-works" onClick={() => setMenuOpen(false)}>HOW IT WORKS</a><a href="#rules" onClick={() => setMenuOpen(false)}>RULES</a><a href="#platforms" onClick={() => setMenuOpen(false)}>PLATFORMS</a><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </div>
        <div className="nav-actions"><a className="nav-community" href="#community">COMMUNITY</a><a className="portal-link" href="#dashboard">TRADER PORTAL</a><a className="button button-small" href="#challenges">START CHALLENGE <ArrowRight data-icon="inline-end" /></a></div>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-art" aria-hidden="true">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BcbzDf3Lrqy1m4pKNZ26IjBS8SMEFI.png" alt="" />
          <div className="space-dust" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
          </div>
        </div>
        <div className="hero-copy"><h1>Trade Bigger. <span>Prove Your Edge.</span><br />Build Your Capital.</h1><p className="hero-text">Prove your trading edge through a transparent evaluation and access a professional simulated trading environment built around disciplined risk management.</p><div className="hero-buttons"><a className="button" href="#challenges">START CHALLENGE <ArrowRight data-icon="inline-end" /></a><a className="watch-demo" href="#how-it-works"><span className="play-icon" aria-hidden="true" />WATCH DEMO</a><a className="trading-rules-button" href="#rules"><FileText data-icon="inline-start" />TRADING RULES <ArrowRight data-icon="inline-end" /></a><a className="free-trial-button" href="#challenges"><UsersRound data-icon="inline-start" />FREE TRIAL ACCOUNT <ArrowRight data-icon="inline-end" /></a></div><div className="hero-stats"><div><strong>UP TO 90%</strong><span>PROFIT SHARE</span></div><div><strong>UP TO $100K</strong><span>SIMULATED CAPITAL</span></div><div><strong>24/7</strong><span>TRADER SUPPORT</span></div></div></div>
      </section>

      <section className="trust-strip"><span>BUILT FOR DISCIPLINED TRADERS</span>{[['shield','SIMULATED CAPITAL'],['target','TRANSPARENT RULES'],['chart','PROFESSIONAL PLATFORM'],['gauge','CLEAR RISK PARAMETERS'],['head','TRADER SUPPORT']].map(([icon, label]) => <div key={label}><span className={`trust-icon ${icon}`} />{label}</div>)}</section>

      <section id="challenges" className="section challenges-section"><div className="section-heading"><div><SectionLabel>THE RIGHT FIT FOR YOUR EDGE</SectionLabel><h2>Choose Your <em>Challenge.</em></h2></div><p>Select the account size and evaluation model that fits your trading style.</p></div><div className="challenge-layout"><div className="challenge-tabs">{challenges.map((challenge, index) => <button className={activeChallenge === index ? 'selected' : ''} onClick={() => setActiveChallenge(index)} key={challenge.size}><span>ACCOUNT SIZE</span><strong>{challenge.size}</strong><small>{challenge.price} <i>ONE-TIME</i></small>{activeChallenge === index && <Check />}</button>)}</div><div className="challenge-detail"><div className="detail-top"><div><small>SELECTED ACCOUNT</small><h3>{selected.size} <span>CHALLENGE</span></h3></div><div className="price"><small>ONE-TIME FEE</small><strong>{selected.price}</strong></div></div><div className="detail-metrics">{[['PROFIT TARGET', selected.target],['DAILY DRAWDOWN', selected.daily],['MAX DRAWDOWN', selected.max],['MINIMUM DAYS', selected.days],['PROFIT SHARE', selected.share],['LEVERAGE', selected.leverage]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="detail-bottom"><span><ShieldCheck /> Transparent parameters. No hidden rules.</span><a className="button" href="#footer">START CHALLENGE <ArrowRight data-icon="inline-end" /></a></div></div></div></section>

      <section className="section programs-section"><div className="section-heading centered"><div><SectionLabel>PROGRAM ARCHITECTURE</SectionLabel><h2>Trade on your <em>terms.</em></h2></div><p>Clear paths for different trading styles. Start with the structure that makes sense for your edge.</p></div><div className="program-grid"><article className="program-card program-purple"><div className="program-top"><span>01</span><Layers3 /></div><small>THE CLASSIC PATH</small><h3>One Step</h3><p>One clear evaluation. One focused objective. For traders who prefer directness.</p><div className="program-metrics"><span>1 <i>PHASE</i></span><span>90% <i>SHARE</i></span></div><a href="#challenges">VIEW DETAILS <ArrowRight data-icon="inline-end" /></a></article><article className="program-card program-blue"><div className="program-top"><span>02</span><LineChart /></div><small>THE PROVEN PATH</small><h3>Two Step</h3><p>Two measured phases designed to reward consistency and protect your downside.</p><div className="program-metrics"><span>2 <i>PHASES</i></span><span>90% <i>SHARE</i></span></div><a href="#challenges">VIEW DETAILS <ArrowRight data-icon="inline-end" /></a></article><article className="program-card program-orange"><div className="program-top"><span>03</span><Zap /></div><small>THE FAST TRACK</small><h3>Instant Funding</h3><p>Skip the evaluation and access a simulated account with risk parameters from day one.</p><div className="program-metrics"><span>0 <i>PHASES</i></span><span>CONFIG <i>SHARE</i></span></div><a href="#challenges">VIEW DETAILS <ArrowRight data-icon="inline-end" /></a></article></div></section>

      <section id="how-it-works" className="journey-section"><div className="journey-inner"><SectionLabel>THE JOURNEY</SectionLabel><h2>From conviction to <em>capital.</em></h2><div className="journey-grid">{[['01','CHOOSE YOUR CHALLENGE','Find the account and evaluation model that matches your trading plan.'],['02','TRADE WITHIN THE RULES','Put your edge to work while keeping every risk parameter in view.'],['03','PASS VERIFICATION','Build a consistent record that demonstrates your process, not a lucky trade.'],['04','RECEIVE YOUR FUNDED ACCOUNT','Move forward with more simulated capital and a clear path to payouts.']].map(([number, title, text], index) => <div className="journey-step" key={number}><div className="step-number">{number}</div><div><h3>{title}</h3><p>{text}</p></div>{index < 3 && <span className="journey-arrow"><ArrowRight /></span>}</div>)}</div></div></section>

      <section className="section benefits-section"><div className="section-heading"><div><SectionLabel>THE FW DIFFERENCE</SectionLabel><h2>Built around your <em>process.</em></h2></div><p>Less noise. Better parameters. A trading environment designed to let your edge do the talking.</p></div><div className="benefit-grid">{[['TRANSPARENT RULES','Know exactly where you stand before your first trade.','rule',ShieldCheck],['FLEXIBLE TRADING','Trade your strategy across a professional simulated environment.','flex',Crosshair],['CLEAR DRAWDOWN','Risk parameters are visible, measurable and built for discipline.','risk',Gauge],['PROFESSIONAL ENVIRONMENT','A focused console that keeps your attention on the market.','pro',BarChart3],['STRUCTURED PAYOUTS','A clear route from consistent performance to eligible payouts.','pay',CircleDollarSign],['SCALING OPPORTUNITIES','Your process can grow with your confidence and track record.','scale',TrendingUp]].map(([title, text, kind, Icon]) => <article className={`benefit-card ${kind}`} key={title as string}><div className="benefit-icon"><Icon /></div><h3>{title as string}</h3><p>{text as string}</p><span className="benefit-art" /></article>)}</div></section>

      <section className="interstitial"><div className="interstitial-grid" /><div className="interstitial-copy"><SectionLabel>THE INSTITUTIONAL LAYER</SectionLabel><h2>See the market<br /><em>in motion.</em></h2><p>A cinematic view into the focused environment behind every FundedWealth account.</p><a className="text-link" href="#dashboard">EXPLORE THE CONSOLE <ArrowRight data-icon="inline-end" /></a></div><div className="floating-fw">FW<span>CAPITAL<br />IN MOTION</span></div><div className="float-candle candle-a" /><div className="float-candle candle-b" /><div className="float-candle candle-c" /></section>

      <section id="dashboard" className="section dashboard-section"><div className="section-heading centered"><div><SectionLabel>YOUR EDGE, VISUALIZED</SectionLabel><h2>A console built for <em>clarity.</em></h2></div><p>Every number that matters, visible at a glance. This is a visual preview of the simulated trader experience.</p></div><DashboardPreview /></section>

      <section id="rules" className="section rules-section"><div className="rules-copy"><SectionLabel>THE PARAMETERS</SectionLabel><h2>Clear rules.<br /><em>Sharper decisions.</em></h2><p>Your trading plan deserves a framework that is easy to understand and impossible to misread.</p><a className="button button-outline" href="#challenges">VIEW CHALLENGES <ArrowRight data-icon="inline-end" /></a></div><div className="rules-list">{rules.map(([title, value, text], index) => <div className={`rule-row ${openRule === index ? 'rule-open' : ''}`} key={title}><button onClick={() => setOpenRule(openRule === index ? null : index)}><span className="rule-index">0{index + 1}</span><strong>{title}</strong><b>{value}</b><ChevronDown /></button>{openRule === index && <p>{text}</p>}</div>)}</div></section>

      <section id="platforms" className="platform-section"><div className="section-heading centered"><div><SectionLabel>YOUR MARKET, YOUR WAY</SectionLabel><h2>Trade <em>your way.</em></h2></div><p>Connect with the platform experience configured for your program and keep your workflow familiar.</p></div><div className="platform-grid"><div className="platform-card"><span className="platform-logo">MT<span>5</span></span><div><h3>MetaTrader 5</h3><p>Available</p></div><Check /></div><div className="platform-card platform-muted"><span className="platform-logo ctrader">cT</span><div><h3>cTrader</h3><p>Coming soon</p></div><Clock3 /></div><div className="platform-card platform-muted"><span className="platform-logo dx">DX</span><div><h3>DXtrade</h3><p>Coming soon</p></div><Clock3 /></div></div></section>

      <section id="community" className="community-section"><div className="community-orb" /><div className="community-copy"><SectionLabel>THE COLLECTIVE EDGE</SectionLabel><h2>Trade alone.<br /><em>Grow together.</em></h2><p>Join a focused community for market discussion, trader education and the signals that matter.</p><a className="button" href="#footer">JOIN THE COMMUNITY <ArrowRight data-icon="inline-end" /></a></div><div className="community-panel"><div><span className="community-icon"><Sparkles /></span><h3>FundedWealth<br />Community</h3><p>Market discussions<br />Trader education<br />Announcements</p></div><div className="community-rail"><span>DISCORD</span><span>COMMUNITY</span><span>MARKET NOTES</span></div></div></section>

      <section id="faq" className="section faq-section"><div className="section-heading"><div><SectionLabel>NO NOISE, JUST ANSWERS</SectionLabel><h2>Frequently <em>asked.</em></h2></div><p>Everything you need to make a confident decision about your next challenge.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-row ${openFaq === index ? 'faq-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><span className="faq-plus">{openFaq === index ? '−' : '+'}</span></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

      <section className="final-cta"><div className="cta-grid" /><div className="cta-copy"><SectionLabel>YOUR NEXT MOVE</SectionLabel><h2>Your edge<br />deserves <em>more capital.</em></h2><p>Choose your challenge and start proving your trading edge.</p><div className="hero-buttons"><a className="button" href="#challenges">START CHALLENGE <ArrowRight data-icon="inline-end" /></a><a className="text-link" href="#rules">VIEW RULES <ArrowRight data-icon="inline-end" /></a></div></div><div className="cta-orbit" /></section>

      <footer id="footer" className="site-footer"><div className="footer-top"><a href="#top" className="brand brand-with-mark"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex mark" /><span>FUNDEDWEALTH <i>FOREX</i></span></a><p>Professional simulated trading<br />built around your edge.</p><a className="footer-mail" href="mailto:hello@fundedwealthforex.com">hello@fundedwealthforex.com <ArrowRight /></a></div><div className="footer-links"><div><small>EXPLORE</small><a href="#challenges">Challenges</a><a href="#how-it-works">How it works</a><a href="#rules">Rules</a></div><div><small>PLATFORM</small><a href="#platforms">Platforms</a><a href="#community">Community</a><a href="#faq">FAQ</a></div><div><small>LEGAL</small><a href="#footer">Terms</a><a href="#footer">Privacy</a><a href="#footer">Refund policy</a><a href="#footer">Risk disclosure</a></div></div><div className="footer-bottom"><span>© 2026 FUNDEDWEALTH FOREX. ALL RIGHTS RESERVED.</span><span>SIMULATED PERFORMANCE DISCLOSURE: ALL ACCOUNTS AND RESULTS SHOWN ARE SIMULATED OR HYPOTHETICAL.</span></div></footer>
    </main>
  )
}
