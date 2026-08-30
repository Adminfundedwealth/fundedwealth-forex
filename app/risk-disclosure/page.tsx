'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, ChevronDown, Menu, ShieldCheck } from 'lucide-react'

const sections = [
  ['general-risk', 'General Risk Warning'],
  ['nature-services', 'Nature of FundedWealth Forex Services'],
  ['simulated-environment', 'Simulated Trading Environment'],
  ['leverage-margin', 'Leverage and Margin Risk'],
  ['market-volatility', 'Market Volatility and Execution Risk'],
  ['no-guarantee', 'No Guarantee of Profits'],
  ['program-rules', 'Program Rules and Risk Limits'],
  ['payouts', 'Payouts and Performance-Based Rewards'],
  ['technology-risks', 'Technology and System Risks'],
  ['third-party', 'Third-Party Services'],
  ['no-advice', 'No Financial or Investment Advice'],
  ['jurisdiction', 'Jurisdiction and Availability'],
  ['independent-decision', 'Independent Decision'],
  ['acknowledgement', 'Acknowledgement'],
] as const

export default function RiskDisclosurePage() {
  const [activeSection, setActiveSection] = useState(sections[0][0])
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, .1] })
    sections.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [])

  const selectSection = (id: string) => { setTocOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

  return (
    <main className="legal-page">
      <div className="legal-ambient" aria-hidden="true"><span /><span /><i /><i /></div>
      <header className="legal-header">
        <Link href="/" className="legal-brand"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex" /><span>FUNDEDWEALTH <em>FOREX</em></span></Link>
        <Link href="/" className="legal-home-link"><ArrowLeft /> Back to Home</Link>
      </header>
      <section className="legal-hero">
        <p className="legal-kicker"><span />LEGAL</p>
        <h1>Risk Disclosure</h1>
        <p className="legal-lead">Understand the risks associated with trading, simulated trading environments, leverage, technology and participation in FundedWealth Forex programs.</p>
        <p className="legal-updated">Last Updated: <strong>August 28, 2026</strong></p>
      </section>
      <div className="legal-layout">
        <div className="legal-toc-mobile">
          <button type="button" onClick={() => setTocOpen(!tocOpen)} aria-expanded={tocOpen}><Menu /> Contents <ChevronDown className={tocOpen ? 'is-open' : ''} /></button>
          {tocOpen && <nav>{sections.map(([id, title], index) => <button type="button" className={activeSection === id ? 'is-active' : ''} onClick={() => selectSection(id)} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</nav>}
        </div>
        <aside className="legal-toc" aria-label="Risk Disclosure contents"><div className="legal-toc-title"><ShieldCheck /> RISK DISCLOSURE</div><nav>{sections.map(([id, title], index) => <button type="button" className={activeSection === id ? 'is-active' : ''} onClick={() => selectSection(id)} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</nav></aside>
        <article className="legal-document">
          <div className="legal-notice"><strong>Important risk notice</strong><p>Trading involves substantial risk. FundedWealth Forex provides simulated trading programs and does not provide investment management, brokerage, custody or financial advisory services.</p></div>
          <RiskSection id="general-risk" number="01" title="General Risk Warning"><p>Trading foreign exchange (Forex), contracts for difference (CFDs), and other financial instruments involves substantial risk and may not be suitable for everyone. You should carefully consider whether participating in trading activities is appropriate for you based on your experience, knowledge, financial circumstances, and risk tolerance.</p><p>Trading in leveraged markets can result in rapid gains or losses. You should never risk money that you cannot afford to lose.</p></RiskSection>
          <RiskSection id="nature-services" number="02" title="Nature of FundedWealth Forex Services"><p>FundedWealth Forex provides skill-based trading evaluation and simulated trading programs designed to assess a trader's performance, risk management, consistency, and adherence to applicable program rules.</p><p>FundedWealth Forex is not a broker, investment advisor, asset manager, custodian, or financial institution. We do not provide investment, financial, legal, or tax advice.</p><p>Our programs are designed to provide access to simulated trading environments and performance-based evaluation services.</p></RiskSection>
          <RiskSection id="simulated-environment" number="03" title="Simulated Trading Environment"><p>Trading activity provided through FundedWealth Forex programs may take place in a simulated or demo trading environment. No representation should be made that simulated trading results will be identical to results that could be achieved in live market conditions.</p><p>Simulated trading may differ from live trading conditions, including differences relating to:</p><RiskList items={['Liquidity', 'Slippage', 'Spreads', 'Order execution', 'Market impact', 'Latency', 'Platform or technology limitations', 'Other market conditions']} /><p>Simulated performance is hypothetical and does not guarantee future trading performance or profitability.</p></RiskSection>
          <RiskSection id="leverage-margin" number="04" title="Leverage and Margin Risk"><p>Leveraged trading allows a trader to control positions larger than the capital represented by the account. While leverage may increase potential gains, it can also significantly increase potential losses.</p><p>Even relatively small market movements may have a substantial impact on account equity or performance.</p><p>Traders are responsible for understanding leverage, margin requirements, position sizing, and the risks associated with the instruments they trade.</p></RiskSection>
          <RiskSection id="market-volatility" number="05" title="Market Volatility and Execution Risk"><p>Financial markets may experience sudden and significant price movements due to economic data releases, central bank decisions, geopolitical events, market conditions, or other unexpected events.</p><p>During periods of increased volatility, execution conditions may differ from normal market conditions. This may include price gaps, spread changes, slippage, delayed execution, or other execution-related effects.</p><p>FundedWealth Forex does not guarantee that trading conditions within a simulated environment will replicate live market conditions.</p></RiskSection>
          <RiskSection id="no-guarantee" number="06" title="No Guarantee of Profits"><p>Past performance is not indicative of future results.</p><p>Nothing displayed on the FundedWealth Forex website, platform, social media channels, marketing materials, testimonials, educational content, or other communications should be interpreted as a guarantee of future profits or trading success.</p><p>Individual results may vary based on factors including:</p><RiskList items={['Trading skill', 'Experience', 'Risk management', 'Market conditions', 'Strategy', 'Compliance with program rules']} /><p>No representation is made that any participant will achieve profits or receive payouts.</p></RiskSection>
          <RiskSection id="program-rules" number="07" title="Program Rules and Risk Limits"><p>Each FundedWealth Forex program is subject to its own applicable trading rules, risk limits, payout requirements, account restrictions, and eligibility conditions.</p><p>Participants are responsible for reviewing and complying with the rules applicable to their selected program.</p><p>A violation of applicable program rules may result in actions including account suspension, account termination, removal of simulated profits, rejection of a payout request, or other actions permitted under the applicable Terms &amp; Conditions and Trading Rules.</p></RiskSection>
          <RiskSection id="payouts" number="08" title="Payouts and Performance-Based Rewards"><p>Any payout or performance-based reward offered through FundedWealth Forex is subject to the applicable program rules, eligibility requirements, verification procedures, compliance reviews, and Terms &amp; Conditions.</p><p>FundedWealth Forex reserves the right to review trading activity and account behavior before approving a payout request.</p><p>Participation in a program or the achievement of a particular level of simulated performance does not automatically guarantee a payout.</p></RiskSection>
          <RiskSection id="technology-risks" number="09" title="Technology and System Risks"><p>Access to electronic trading platforms and online services involves technology-related risks.</p><p>These may include:</p><RiskList items={['Internet connectivity failures', 'Platform interruptions', 'Server downtime', 'Software errors', 'Hardware failures', 'Data delays', 'Third-party service interruptions', 'Cybersecurity incidents']} /><p>While FundedWealth Forex aims to maintain reliable technology and infrastructure, uninterrupted or error-free access cannot be guaranteed at all times.</p></RiskSection>
          <RiskSection id="third-party" number="10" title="Third-Party Services"><p>FundedWealth Forex may rely on third-party providers for services including payment processing, identity verification, trading technology, infrastructure, analytics, communications, and other operational services.</p><p>The availability and performance of third-party services may be outside our direct control.</p></RiskSection>
          <RiskSection id="no-advice" number="11" title="No Financial or Investment Advice"><p>All information provided through the FundedWealth Forex website, platform, educational materials, marketing content, social media channels, or customer communications is provided for general informational purposes.</p><p>Nothing provided by FundedWealth Forex constitutes:</p><RiskList items={['Investment advice', 'Financial advice', 'Trading recommendations', 'Legal advice', 'Tax advice', 'A recommendation to buy or sell any financial instrument']} /><p>You are solely responsible for your own trading and financial decisions.</p><p>Where appropriate, you should seek advice from qualified professionals authorized in your jurisdiction.</p></RiskSection>
          <RiskSection id="jurisdiction" number="12" title="Jurisdiction and Availability"><p>FundedWealth Forex services may not be available in all countries or jurisdictions.</p><p>It is the responsibility of each participant to determine whether accessing or using our services is permitted under the laws and regulations applicable to their country or jurisdiction.</p><p>FundedWealth Forex may restrict, suspend, or refuse services in jurisdictions where participation is prohibited, restricted, or otherwise unsuitable due to legal, regulatory, compliance, sanctions, or operational requirements.</p></RiskSection>
          <RiskSection id="independent-decision" number="13" title="Independent Decision"><p>Participation in any FundedWealth Forex program is voluntary.</p><p>By purchasing or participating in a FundedWealth Forex program, you acknowledge that you are making an independent decision and have not relied upon FundedWealth Forex for investment, financial, legal, or tax advice.</p><p>You acknowledge that you understand the risks associated with leveraged trading and simulated trading environments.</p></RiskSection>
          <RiskSection id="acknowledgement" number="14" title="Acknowledgement"><p>By accessing or using the FundedWealth Forex website, platform, or services, you acknowledge that you have read, understood, and accepted this Risk Disclosure.</p><p>You further acknowledge that trading involves substantial risk and that past, hypothetical, or simulated performance does not guarantee future results.</p><p><strong>Last Updated: August 28, 2026</strong></p></RiskSection>
          <div className="legal-related"><p className="legal-kicker"><span />RELATED DOCUMENTS</p><div className="legal-related-grid"><Link href="/legal/terms-and-conditions"><strong>Terms &amp; Conditions</strong><span>Review service terms <ArrowUpRight /></span></Link><Link href="/privacy-policy"><strong>Privacy Policy</strong><span>Review data practices <ArrowUpRight /></span></Link><Link href="/aml-policy"><strong>AML Policy</strong><span>Review compliance controls <ArrowUpRight /></span></Link></div></div>
        </article>
      </div>
    </main>
  )
}

function RiskSection({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="legal-section"><div className="legal-section-number">{number}</div><div><h2>{title}</h2>{children}</div></section>
}

function RiskList({ items }: { items: string[] }) {
  return <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
}
