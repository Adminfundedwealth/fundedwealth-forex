'use client'

import { useState } from 'react'
import { ArrowRight, Calculator, ChevronDown, CircleAlert, FileText, ShieldCheck, Zap } from 'lucide-react'
import { LanguageSwitcher } from '@/components/LanguageProvider'

type FlashSection = { title: string; content: 'basics' | 'risk' | 'daily' | 'drawdown' | 'lots' | 'trade' | 'payouts' | 'prohibited' | 'news' | 'holding' | 'commissions' | 'limits' | 'scaling' }

const sections = [
  { title: 'The Basics', content: 'basics' }, { title: 'Risk Limits', content: 'risk' }, { title: 'Daily Loss', content: 'daily' }, { title: 'Static Drawdown', content: 'drawdown' }, { title: 'Max Lot Rule', content: 'lots' }, { title: 'Risk Per Trade Idea', content: 'trade' }, { title: 'Payouts', content: 'payouts' }, { title: 'Prohibited Practices and Strategies', content: 'prohibited' }, { title: 'News Trading', content: 'news' }, { title: 'Holding Rules', content: 'holding' }, { title: 'Instrument Commissions', content: 'commissions' }, { title: 'Account Limits', content: 'limits' }, { title: 'Scaling', content: 'scaling' },
] satisfies FlashSection[]

const lotRows = [['$1,000', '0.', '40.06', '0.4', '0.2'], ['$5,000', '2', '0.15', '1', '0.5'], ['$10,000', '4', '0.3', '2', '1'], ['$25,000', '8', '0.6', '4', '2'], ['$50,000', '20', '1.5', '10', '5']]
const commissionRows = [['FX', '$5'], ['Metals', '$5'], ['Commodities', '$2'], ['Crypto', '$1'], ['Indices', 'USD-based: $2 per lot'], ['Other indices', 'Approximately $2 per lot depending on base currency']]

export default function FlashRulesPage() {
  const [bestTrade, setBestTrade] = useState('')
  const [accountSize, setAccountSize] = useState('')
  const [openSection, setOpenSection] = useState('The Basics')
  const requiredProfit = bestTrade && Number(bestTrade) > 0 ? Number(bestTrade) / 0.15 : 0
  const minimumPayout = accountSize && Number(accountSize) > 0 ? Number(accountSize) * 0.02 : 0

  const renderSectionContent = (content: FlashSection['content']) => {
    if (content === 'basics') return <div className="flash-content-table"><div><span>Parameter</span><strong>Specification</strong></div>{[['Trading time', '24 hours from the first trade'], ['Open trades limit', 'One open trade at a time'], ['Profit split', '90%'], ['Payout cycle', 'Eligible after 24 hours'], ['Profit threshold for payout', '2%'], ['Consistency rule', '15% best trade rule'], ['Scaling', 'Not available']].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
    if (content === 'risk') return <p>Flash risk limits include a daily loss limit of 2% and a maximum static drawdown of 4% of starting balance.</p>
    if (content === 'daily') return <div><p>You may not lose more than 2% of your account value per day.</p><p>At 17:00 EST market rollover, the Daily Loss Limit is recalculated using the higher of:</p><ul><li>Balance excluding open trades</li><li>Equity including open trades</li></ul><div className="flash-example-inline"><strong>Example</strong><span>Balance = $10,000</span><span>Equity = $10,500</span><span>Daily Loss = 2% of $10,500 = $210</span></div></div>
    if (content === 'drawdown') return <div><p>Maximum loss = 4% of starting balance.</p><div className="flash-example-inline"><strong>Example</strong><span>$10,000 starting balance</span><span>Account cannot drop below $9,600.</span></div></div>
    if (content === 'lots') return <div><p>Maximum lot limits apply by asset class. Multiple positions in the same category are counted together. Violating the Maximum Lot Rule results in a full account reset if the account is eligible for payout.</p><div className="flash-table-wrap"><table><thead><tr><th>Flash Account</th><th>FX</th><th>Commodities / Metals</th><th>Indices</th><th>Crypto</th></tr></thead><tbody>{lotRows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></div>
    if (content === 'trade') return <div><p>Maximum risk/loss = 1% of starting account balance per trade idea.</p><p>A trade idea includes all open positions on the same instrument in the same direction (Buy or Sell). Closing and reopening the same instrument in the same direction within 10 minutes is treated as the same trade idea.</p><p className="flash-hard-breach">Exceeding the 1% limit is a hard breach.</p></div>
    if (content === 'payouts') return <div><p>You can request one payout after the 24-hour account period ends when both conditions apply:</p><ul><li>Your best trade does not exceed 15% of your total profit.</li><li>Your net profit is at least 2% of your starting balance.</li></ul><p>Submit the withdrawal request through the account withdrawal process after the account period ends and the conditions above are met.</p><div className="flash-example-inline"><strong>Consistency example</strong><span>Total profit = $1,000</span><span>Maximum best trade = $150</span><span>$10,000 account: 2% payout threshold = $200</span></div></div>
    if (content === 'prohibited') return <ul className="flash-prohibited-list">{['Opening multiple small trades of the same trade idea to bypass consistency', 'One-sided bets', 'Grid trading', 'High-frequency trading', 'Copy trading between unrelated accounts', 'Usage of public third-party expert advisors', 'Reverse trading and group hedging', 'Group copying / account management', 'Account churning / Rolling', 'Exploiting system glitches', 'Exploiting inefficiencies of trading platforms'].map((item) => <li key={item}>{item}</li>)}</ul>
    if (content === 'news') return <p>News trading is enabled by default. Traders may open and close trades around major economic events. News straddling or execution designed to gain an unfair advantage is not permitted.</p>
    if (content === 'holding') return <ul><li>Overnight holding allowed.</li><li>Weekend holding technically allowed.</li><li>Positions may close automatically if the market shuts before the 24-hour account period ends.</li><li>Crypto positions can remain open for the full 24 hours.</li></ul>
    if (content === 'commissions') return <div className="flash-table-wrap"><table><thead><tr><th>Instrument</th><th>Commission per lot</th></tr></thead><tbody>{commissionRows.map(([instrument, commission]) => <tr key={instrument}><td>{instrument}</td><td>{commission}</td></tr>)}</tbody></table></div>
    if (content === 'limits') return <p>Traders can hold up to <strong>THREE Flash accounts</strong> of any size.</p>
    return <p>Scaling is not available because Flash accounts close after their 24-hour trading period.</p>
  }

  return (
    <main className="rules-page flash-rules-page">
      <div className="rules-page-atmosphere" aria-hidden="true"><span /><span /><i /><i /></div>
      <header className="rules-header">
        <a href="/" className="brand brand-with-mark"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex mark" /><span>FUNDEDWEALTH <i>FOREX</i></span></a>
        <nav className="rules-nav" aria-label="Primary navigation"><a href="/#challenges">CHALLENGES</a><a href="/#how-it-works">HOW IT WORKS</a><a className="is-active" href="/rules" aria-current="page">RULES</a><a href="/#platforms">PLATFORMS</a><a href="/#faq">FAQ</a></nav>
        <div className="rules-header-actions"><a href="/#community">COMMUNITY</a><a href="/#dashboard">TRADER PORTAL</a><a className="rules-login" href="/#footer">LOGIN / REGISTER</a><LanguageSwitcher /></div>
      </header>

      <section className="rules-hero flash-rules-hero">
        <h1>Flash Trading <em>Rules</em></h1>
        <p className="rules-lead">Everything you need to know about the FundedWealth Forex Flash account, including trading limits, risk management, payouts and account conditions.</p>
        <div className="rules-hero-actions"><a className="button primary-liquid" href="/#challenges">START FLASH CHALLENGE <ArrowRight /></a><a className="rules-outline-button" href="/rules">BACK TO ALL RULES</a></div>
      </section>

      <section className="rules-workspace flash-rules-workspace" aria-label="Flash trading rules">
        <div className="rules-notice"><CircleAlert /><p><strong>Important:</strong> Breaking a critical rule can disqualify your evaluation immediately. Flash limits and conditions are governed by these rules.</p></div>

        <section className="flash-overview glass-rule-panel"><div><p className="rules-kicker"><span />FLASH ACCOUNT OVERVIEW</p><h2>One day. Clear limits.</h2><p>Flash is built for traders who want a compressed evaluation path with transparent risk parameters.</p></div><div className="flash-metric-grid"><div><strong>24H</strong><span>MAXIMUM TRADING PERIOD</span></div><div><strong>4%</strong><span>MAX DRAWDOWN</span></div><div><strong>90%</strong><span>PROFIT SHARE</span></div><div><strong>15%</strong><span>BEST TRADE RULE</span></div></div></section>

        <div className="flash-rule-grid">{sections.map((section, index) => <article className={`flash-rule-card${openSection === section.title ? ' is-open' : ''}`} key={section.title}><button type="button" onClick={() => setOpenSection(openSection === section.title ? '' : section.title)} aria-expanded={openSection === section.title}><span className="flash-rule-number">{String(index + 1).padStart(2, '0')}</span><strong>{section.title}</strong><ChevronDown /></button>{openSection === section.title && <div className="flash-rule-content">{renderSectionContent(section.content)}</div>}</article>)}</div>

        <section className="flash-calculator glass-rule-panel">
          <div className="flash-calculator-copy">
            <p className="rules-kicker"><span />FLASH PROFIT / CONSISTENCY CALCULATOR</p>
            <h2>Check the 15% Rule</h2>
            <p>Your best trade must represent no more than 15% of your total profit.</p>
            <div className="flash-formula" aria-label="Best Trade Profit divided by 15 percent equals Minimum Total Profit Required"><strong>Best Trade Profit</strong><span>÷</span><strong>15%</strong><span>=</span><strong>Minimum Total Profit Required</strong></div>
          </div>
          <div className="flash-calculator-form">
            <label htmlFor="account-size">ACCOUNT SIZE</label>
            <div className="flash-input-wrap"><span>$</span><input id="account-size" type="number" min="0" step="0.01" value={accountSize} onChange={(event) => setAccountSize(event.target.value)} placeholder="10,000.00" /></div>
            <label htmlFor="best-trade">BEST TRADE PROFIT</label>
            <div className="flash-input-wrap"><span>$</span><input id="best-trade" type="number" min="0" step="0.01" value={bestTrade} onChange={(event) => setBestTrade(event.target.value)} placeholder="0.00" /></div>
            <div className="flash-calculator-flow" aria-hidden="true">↓</div>
            <div className="flash-calculator-result" aria-live="polite"><Calculator /><span>MINIMUM TOTAL PROFIT REQUIRED</span><strong>{requiredProfit ? `$${requiredProfit.toFixed(2)}` : '$0.00'}</strong></div>
            <div className="flash-payout-result"><span>MINIMUM PAYOUT PROFIT</span><strong>{minimumPayout ? `$${minimumPayout.toFixed(2)}` : '$0.00'}</strong></div>
          </div>
          <div className="flash-example-card"><span>EXAMPLE</span><p>Account Size: <strong>$10,000</strong></p><p>Best Trade: <strong>$150</strong></p><strong className="flash-example-equation">$150 ÷ 15% = $1,000</strong><p>Minimum Total Profit Required: <strong>$1,000</strong></p><p>Minimum Payout Profit: <strong>$200</strong></p></div>
        </section>

        <section className="flash-faq glass-rule-panel"><div><p className="rules-kicker"><span />FLASH FAQ</p><h2>Quick answers</h2></div><div className="flash-faq-list"><details><summary>What is the Flash account?</summary><p>Flash is a 24-hour account with a 90% profit split, a 2% payout threshold, and a 15% best trade consistency rule.</p></details><details><summary>How long is the Flash account active?</summary><p>The account is active for 24 hours from the first trade.</p></details><details><summary>What is the profit split?</summary><p>The profit split is 90%.</p></details><details><summary>What is the daily loss limit?</summary><p>You may not lose more than 2% of your account value per day.</p></details><details><summary>What is the maximum drawdown?</summary><p>Maximum loss is 4% of starting balance.</p></details><details><summary>What is the consistency rule?</summary><p>Your best trade must not exceed 15% of your total profit.</p></details><details><summary>What is the payout threshold?</summary><p>Net profit must be at least 2% of starting balance, and one payout is available after the 24-hour period ends.</p></details><details><summary>How does the Max Lot Rule work?</summary><p>Lot limits apply by asset class, and positions in the same category are counted together.</p></details><details><summary>How many Flash accounts can I have?</summary><p>You can hold up to three Flash accounts of any size.</p></details><details><summary>Is scaling available?</summary><p>No. Flash accounts close after their 24-hour trading period.</p></details></div></section>
        <section className="flash-ready-cta" aria-label="Start Flash challenge"><div><p className="flash-ready-kicker">FLASH ACCOUNT</p><h2>Ready to trade Flash?</h2><p>24-hour funded account. No profit target. Start now.</p><a className="flash-ready-button" href="/#challenges"><Zap />Get Flash account</a></div></section>
        <div className="rules-footnote"><ShieldCheck /><span><FileText /> Flash rules are presented for clarity and are applied as described in the account conditions.</span></div>
      </section>
    </main>
  )
}