'use client'

import { useState } from 'react'
import { ArrowRight, ChevronDown, FileWarning, Search, ShieldCheck, Sparkles, X } from 'lucide-react'
import { LanguageSwitcher, useLanguage } from '@/components/LanguageProvider'

type RuleItem = { label: string; value: string }
type Program = { id: string; icon: string; title: string; subtitle: string; rules: RuleItem[] }

const configure = 'Configure in program terms'

const programs: Program[] = [
  {
    id: 'flash', icon: '⚡', title: 'Flash — 24-Hour Account', subtitle: 'A compressed evaluation structure for a shorter challenge path.', rules: [
      { label: 'Profit target', value: 'Not specified in current program data' }, { label: 'Maximum daily loss', value: 'Not specified in current program data' }, { label: 'Maximum loss / drawdown', value: '4%' }, { label: 'Profit share', value: '90%' }, { label: 'Minimum trading days', value: configure }, { label: 'Maximum trading days', value: '24 hours' }, { label: 'Consistency rule', value: '15% best trade' }, { label: 'Payout rules', value: 'Payout threshold: 3%' }, { label: 'Trading session rules', value: configure }, { label: 'Allowed instruments', value: configure }, { label: 'Position sizing', value: 'Max loss per trade: 2%' }, { label: 'News trading', value: configure }, { label: 'Weekend holding', value: configure }, { label: 'EA / bot rules', value: configure }, { label: 'Prohibited trading practices', value: configure },
    ],
  },
  {
    id: 'instant', icon: '◈', title: 'Instant Funding', subtitle: 'Access a simulated account with risk parameters from day one.', rules: [
      { label: 'Profit target', value: 'N/A' }, { label: 'Maximum daily loss', value: '3%' }, { label: 'Maximum loss / drawdown', value: '5%' }, { label: 'Profit share', value: '70% first 3 payouts / 80% after 3 payouts' }, { label: 'Minimum trading days', value: '7 days' }, { label: 'Maximum trading days', value: 'Unlimited' }, { label: 'Consistency rule', value: '15% on rewards' }, { label: 'Payout rules', value: 'As applicable to program terms' }, { label: 'Trading session rules', value: configure }, { label: 'Allowed instruments', value: configure }, { label: 'Position sizing', value: 'Leverage: 1:30' }, { label: 'News trading', value: configure }, { label: 'Weekend holding', value: configure }, { label: 'EA / bot rules', value: configure }, { label: 'Prohibited trading practices', value: configure },
    ],
  },
  {
    id: 'one-step', icon: '◇', title: '1-Step', subtitle: 'One clear evaluation with a focused objective.', rules: [
      { label: 'Profit target', value: '10%' }, { label: 'Maximum daily loss', value: '3%' }, { label: 'Maximum loss / drawdown', value: '6%' }, { label: 'Profit share', value: 'Not specified in current program data' }, { label: 'Minimum trading days', value: '5 days' }, { label: 'Maximum trading days', value: 'Unlimited' }, { label: 'Consistency rule', value: '40%' }, { label: 'Payout rules', value: configure }, { label: 'Trading session rules', value: configure }, { label: 'Allowed instruments', value: configure }, { label: 'Position sizing', value: 'Max risk per trade: 1.5%; leverage: 1:30' }, { label: 'News trading', value: configure }, { label: 'Weekend holding', value: configure }, { label: 'EA / bot rules', value: configure }, { label: 'Prohibited trading practices', value: configure },
    ],
  },
  {
    id: 'two-step', icon: '◇', title: '2-Step', subtitle: 'Two measured phases designed to reward consistency.', rules: [
      { label: 'Profit target', value: '8% / 5% per phase' }, { label: 'Maximum daily loss', value: '3%' }, { label: 'Maximum loss / drawdown', value: '8% evaluation / 6% funded' }, { label: 'Profit share', value: 'Not specified in current program data' }, { label: 'Minimum trading days', value: '5 days per phase' }, { label: 'Maximum trading days', value: 'Unlimited' }, { label: 'Consistency rule', value: 'None' }, { label: 'Payout rules', value: configure }, { label: 'Trading session rules', value: configure }, { label: 'Allowed instruments', value: configure }, { label: 'Position sizing', value: 'Max risk per trade: 1.5%; leverage: 1:30' }, { label: 'News trading', value: configure }, { label: 'Weekend holding', value: configure }, { label: 'EA / bot rules', value: configure }, { label: 'Prohibited trading practices', value: configure },
    ],
  },
]

export default function RulesPage() {
  const { t } = useLanguage()
  const [activeProgram, setActiveProgram] = useState('flash')
  const [query, setQuery] = useState('')
  const [openCards, setOpenCards] = useState<string[]>(['flash'])
  const active = programs.find((program) => program.id === activeProgram) ?? programs[0]
  const normalizedQuery = query.trim().toLowerCase()
  const visibleRules = active.rules.filter((rule) => `${rule.label} ${rule.value}`.toLowerCase().includes(normalizedQuery))

  const toggleCard = (id: string) => setOpenCards((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])

  return (
    <main className="rules-page">
      <div className="rules-page-atmosphere" aria-hidden="true"><span /><span /><i /><i /></div>
      <header className="rules-header">
        <a href="/" className="brand brand-with-mark"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex mark" /><span>FUNDEDWEALTH <i>FOREX</i></span></a>
        <nav className="rules-nav" aria-label="Primary navigation">
          <a href="/#challenges">CHALLENGES</a><a href="/#how-it-works">HOW IT WORKS</a><a className="is-active" href="/rules" aria-current="page">RULES</a><a href="/#platforms">PLATFORMS</a><a href="/#faq">FAQ</a>
        </nav>
        <div className="rules-header-actions"><a href="/#community">COMMUNITY</a><a href="/#dashboard">TRADER PORTAL</a><a className="rules-login" href="/#footer">LOGIN / REGISTER</a><LanguageSwitcher /></div>
      </header>

      <section className="rules-hero">
        <p className="rules-kicker"><span />EVALUATION &amp; RISK FRAMEWORK</p>
        <h1>Program trading <em>rules</em></h1>
        <p className="rules-lead">Everything that governs your challenge in one place: profit targets, loss limits, session rules, instruments, sizing, and timelines.</p>
        <div className="rules-hero-actions"><a className="button primary-liquid" href="/#challenges">START EVALUATION <ArrowRight /></a><a className="rules-outline-button" href="/#platforms">VIEW INSTRUMENTS</a><a className="rules-text-button" href="/#faq">FAQ <ArrowRight /></a></div>
      </section>

      <section className="rules-workspace" aria-label="Trading rules browser">
        <div className="rules-search-wrap"><Search aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search rules..." aria-label="Search rules" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X /></button>}</div>
        <div className="rules-tabs" role="tablist" aria-label="Rule programs">
          {programs.map((program) => program.id === 'flash' || program.id === 'instant' ? <a key={program.id} href={program.id === 'flash' ? '/rules/flash' : '/rules/instant'} role="tab" aria-selected={false} className="rules-tab-link"><span aria-hidden="true">{program.icon}</span>{program.id === 'flash' ? 'Flash Rules' : 'Instant Funding Rules'}</a> : <button key={program.id} type="button" role="tab" aria-selected={activeProgram === program.id} className={activeProgram === program.id ? 'is-active' : ''} onClick={() => setActiveProgram(program.id)}><span aria-hidden="true">{program.icon}</span>{program.id === 'one-step' ? '1-Step Rules' : '2-Step Rules'}</button>)}
        </div>
        <div className="rules-notice"><FileWarning /><p><strong>Important:</strong> Breaking a Critical rule (e.g. Daily loss limit, Maximum Loss Limit) disqualifies your evaluation immediately. Hitting the 4% Daily profit cap triggers kill-switch: no new trades for that day.</p></div>
        <div className="rules-section-heading"><div><p className="rules-kicker"><span />CURRENT PROGRAM</p><h2>{active.title}</h2></div><p>{active.subtitle}</p></div>
        <div className="rules-cards">
          <article className={`rules-card ${openCards.includes(active.id) ? 'is-open' : ''}`}>
            <button className="rules-card-header" type="button" onClick={() => toggleCard(active.id)} aria-expanded={openCards.includes(active.id)}><span className="rules-card-icon"><Sparkles /></span><span><strong>{active.title}</strong><small>{active.subtitle}</small></span><ChevronDown /></button>
            {openCards.includes(active.id) && <div className="rules-card-body">{visibleRules.length ? visibleRules.map((rule) => <div className="rule-detail" key={rule.label}><span>{rule.label}</span><strong className={rule.value === configure ? 'is-config' : ''}>{rule.value}</strong></div>) : <p className="rules-empty">No matching rules in this program.</p>}</div>}
          </article>
        </div>
        <div className="rules-footnote"><ShieldCheck /> Rules shown here reflect currently available program data. Items marked for configuration must be confirmed in the applicable program terms.</div>
      </section>
      <section className="rules-disclaimer" aria-labelledby="rules-disclaimer-title">
        <div className="rules-disclaimer-inner">
          <p className="rules-kicker"><span />IMPORTANT INFORMATION &amp; DISCLAIMER</p>
          <h2 id="rules-disclaimer-title">Simulated Trading Environment</h2>
          <p>All accounts provided by <strong>FundedWealth Forex</strong> are demo accounts operating exclusively in a simulated trading environment. No actual trades are executed on live financial markets. Our services are designed for educational, training, evaluation, and simulated trading purposes only.</p>
          <h3>No Investment Services</h3>
          <p>The simulated trading services are provided by <strong>FundedWealth Forex</strong> and its related entities (collectively, the <strong>“Company”</strong>). All content published and distributed by the Company is provided for general informational and educational purposes only.</p>
          <p>The Company does <strong>not</strong> provide investment advice.</p>
          <p>The Company does <strong>not</strong> solicit or recommend the purchase or sale of any financial instruments, securities, or funds.</p>
          <p>The Company does <strong>not</strong> act as a broker, custodian, investment adviser, or financial intermediary.</p>
          <p>Participation in any FundedWealth Forex program is entirely voluntary. Any fees paid to the Company are <strong>service/program fees</strong> for access to the applicable simulated trading program and related services.</p>
          <p>Program fees are <strong>not deposits</strong>, do not represent client funds, and should not be considered investments under any circumstances. Unless otherwise required by applicable law or expressly stated in the Company’s applicable terms and conditions, program fees are non-refundable.</p>
          <p>Program fees do not earn interest, investment returns, or guaranteed profits.</p>
          <p>Fees paid to FundedWealth Forex are used toward the Company’s operational and administrative expenses, including technology infrastructure, platform development and maintenance, software licensing, risk-management systems, customer support, administration, and other business-related expenses.</p>
          <p>Payment of a program fee does not create a fiduciary, custodial, brokerage, or investment relationship between the participant and FundedWealth Forex.</p>
          <p>Participants should understand that payment of a program fee provides access to the applicable <strong>simulated trading environment and related services</strong>, subject to the program’s rules and terms.</p>
          <h3>No Offer or Solicitation</h3>
          <p>Nothing on the FundedWealth Forex website, platform, or within any of its programs constitutes an offer, recommendation, solicitation, or invitation to buy or sell futures, options, CFDs, forex, stocks, cryptocurrencies, or any other financial instruments.</p>
          <p>FundedWealth Forex does not execute participants’ simulated trades on live financial markets.</p>
          <p>All trading results, account balances, profits, losses, statistics, and performance figures displayed within a simulated account are based on <strong>simulated trading activity</strong>.</p>
          <p>Past simulated performance is not necessarily indicative of future results or actual market performance.</p>
          <h3>General Risk Warning</h3>
          <p>Trading and financial markets involve substantial risk of loss.</p>
          <p>Although FundedWealth Forex programs operate in a simulated environment, trading strategies tested under leveraged and volatile market conditions may produce results that do not reflect real-world execution.</p>
          <p>Participants should carefully consider their objectives, experience, financial circumstances, and risk tolerance before participating in any FundedWealth Forex program.</p>
          <p><strong>FundedWealth Forex does not guarantee profits, trading success, payouts, or future performance.</strong></p>
        </div>
      </section>
    </main>
  )
}
