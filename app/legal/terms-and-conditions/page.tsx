'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, ChevronDown, Menu, ShieldCheck } from 'lucide-react'

const sections = [
  ['introduction', 'Introduction and Acceptance of Terms'],
  ['definitions', 'Definitions'],
  ['eligibility', 'Eligibility'],
  ['simulated-trading', 'Simulated Trading Environment'],
  ['no-investment-services', 'No Investment, Brokerage or Financial Advisory Services'],
  ['programs', 'FundedWealth Forex Programs'],
  ['fees-payments', 'Program Fees, Pricing and Payments'],
  ['refunds', 'Refunds, Cancellations and Chargebacks'],
  ['trading-rules', 'Trading Rules and Program Requirements'],
  ['prohibited-practices', 'Prohibited Trading Practices'],
  ['responsible-trading', 'Responsible Trading and User Conduct'],
  ['verification', 'Identity Verification and Fraud Prevention'],
  ['payouts', 'Payouts and Eligibility'],
  ['account-limits', 'Account Limits and Multiple Accounts'],
  ['inactivity', 'Inactivity'],
  ['platform-availability', 'Platform Availability and Technical Issues'],
  ['third-party-services', 'Third-Party Services and Technology'],
  ['intellectual-property', 'Intellectual Property'],
  ['privacy', 'Privacy and Personal Data'],
  ['risk-warning', 'Disclaimers and Risk Warning'],
  ['liability', 'Limitation of Liability'],
  ['indemnification', 'Indemnification'],
  ['suspension', 'Suspension and Termination'],
  ['changes', 'Changes to Programs, Services and Terms'],
  ['force-majeure', 'Force Majeure'],
  ['severability', 'Severability'],
  ['entire-agreement', 'Entire Agreement'],
  ['governing-law', 'Governing Law and Disputes'],
  ['contact', 'Contact Information'],
] as const

const today = 'August 28, 2026'

export default function TermsAndConditionsPage() {
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

  const selectSection = (id: string) => {
    setTocOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="legal-page">
      <div className="legal-ambient" aria-hidden="true"><span /><span /><i /><i /></div>
      <header className="legal-header">
        <Link href="/" className="legal-brand"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex" /><span>FUNDEDWEALTH <em>FOREX</em></span></Link>
        <Link href="/#footer" className="legal-home-link"><ArrowLeft /> Back to Legal</Link>
      </header>

      <section className="legal-hero">
        <p className="legal-kicker"><span />LEGAL</p>
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-lead">These Terms &amp; Conditions govern your access to and use of FundedWealth Forex, including our simulated trading programs, platform services and related features.</p>
        <p className="legal-updated">Last Updated: <strong>{today}</strong></p>
      </section>

      <div className="legal-layout">
        <div className="legal-toc-mobile">
          <button type="button" onClick={() => setTocOpen(!tocOpen)} aria-expanded={tocOpen}><Menu /> Contents <ChevronDown className={tocOpen ? 'is-open' : ''} /></button>
          {tocOpen && <nav>{sections.map(([id, title], index) => <button type="button" className={activeSection === id ? 'is-active' : ''} onClick={() => selectSection(id)} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</nav>}
        </div>
        <aside className="legal-toc" aria-label="Terms contents">
          <div className="legal-toc-title"><ShieldCheck /> TERMS &amp; CONDITIONS</div>
          <nav>{sections.map(([id, title], index) => <button type="button" className={activeSection === id ? 'is-active' : ''} onClick={() => selectSection(id)} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</nav>
        </aside>

        <article className="legal-document">
          <div className="legal-notice"><strong>Important Notice</strong><p>FundedWealth Forex provides simulated trading programs. Participation does not constitute investment management, brokerage, custody or financial advisory services. Program-specific trading conditions are governed by the applicable FundedWealth Forex Rules.</p></div>
          <LegalSection id="introduction" number="01" title="Introduction and Acceptance of Terms"><p>These Terms &amp; Conditions form an agreement between you and FundedWealth Forex when you access our website, create an account, purchase a program, use a platform connection or use any related service. By accessing or using the services, you confirm that you have read, understood and accepted these Terms and the documents incorporated into them.</p><p>If you do not agree with these Terms, do not access or use the services. Additional terms may apply to a particular program, payment method, platform or feature.</p></LegalSection>
          <LegalSection id="definitions" number="02" title="Definitions"><p><strong>Company</strong> or <strong>FundedWealth Forex</strong> means the FundedWealth Forex service and the legal entity operating it as identified in the applicable purchase or account information.</p><p><strong>Client</strong>, <strong>User</strong> or <strong>Trader</strong> means the person using the services. <strong>Account</strong> means a user profile or simulated trading account issued or made available to that person.</p><p><strong>Program</strong> means a FundedWealth Forex offering, including Flash, Instant Funding, 1-Step or 2-Step. <strong>Challenge</strong> means a program stage with stated objectives and risk parameters. <strong>Simulated Trading</strong> means trading activity recorded in a demo or simulated environment rather than executed with client funds on live markets.</p><p><strong>Platform</strong> means the trading interface or technology made available for a program. <strong>Rules</strong> means the program-specific trading requirements. <strong>Payout</strong> or <strong>Reward</strong> means an amount that may be available where the applicable program rules provide for it.</p></LegalSection>
          <LegalSection id="eligibility" number="03" title="Eligibility"><p>You must meet the minimum age requirement applicable to the service and have legal capacity to enter into this agreement. Unless expressly stated otherwise, services are intended for adults aged 18 or older.</p><p>Services may not be available in every country, territory or jurisdiction. You are responsible for confirming that participation is lawful where you live and for complying with applicable laws. We may refuse or restrict access where required by law, risk controls or compliance procedures.</p></LegalSection>
          <LegalSection id="simulated-trading" number="04" title="Simulated Trading Environment"><p>FundedWealth Forex programs operate in a simulated or demo trading environment. No actual client trades are executed on live financial markets through a FundedWealth Forex program, and program accounts do not represent deposits of client capital.</p><p>Accounts and results are provided for evaluation, simulation, training and program purposes. Displayed performance is based on simulated activity and may differ materially from live-market execution because of liquidity, slippage, spreads, latency, fills and other factors.</p></LegalSection>
          <LegalSection id="no-investment-services" number="05" title="No Investment, Brokerage or Financial Advisory Services"><p>FundedWealth Forex does not provide investment advice, recommendations or personal financial advice. We do not act as a broker, manage client investment funds, provide custodial services or solicit users to buy or sell financial instruments.</p><p>Participation in a program does not create an investment, brokerage, agency, fiduciary or asset-management relationship. You make your own decisions and remain responsible for evaluating whether participation is appropriate for you.</p></LegalSection>
          <LegalSection id="programs" number="06" title="FundedWealth Forex Programs"><p>FundedWealth Forex offers program structures that may include <strong>Flash</strong>, <strong>Instant Funding</strong>, <strong>1-Step</strong> and <strong>2-Step</strong>. Availability may change over time.</p><p>Each program is governed by its applicable Rules, objectives, risk limits, account conditions and payout requirements. The existing program-specific Rules pages are the authoritative source for those requirements. Nothing in these Terms changes or replaces a program rule.</p></LegalSection>
          <LegalSection id="fees-payments" number="07" title="Program Fees, Pricing and Payments"><p>Applicable program fees, account options and pricing are displayed before purchase. The price shown at checkout, including any applicable taxes, currency conversion or payment charges, is the amount presented for your transaction.</p><p>A program fee provides access to the applicable simulated environment and related services. It is not a deposit, investment or purchase of trading capital. You must provide accurate billing and payment information and use a payment method you are authorized to use.</p></LegalSection>
          <LegalSection id="refunds" number="08" title="Refunds, Cancellations and Chargebacks"><p>Cancellation and refund requests are handled according to the applicable purchase terms and mandatory consumer protections. Eligibility may depend on whether a service has been accessed, activated or materially used, and on the circumstances of the request.</p><p>We may investigate suspected fraud, unauthorized payments or misuse. An unauthorized chargeback or payment dispute does not erase your obligations under these Terms and may result in access restrictions while the matter is reviewed. We do not limit rights that cannot lawfully be excluded.</p></LegalSection>
          <LegalSection id="trading-rules" number="09" title="Trading Rules and Program Requirements"><p>You must comply with the Rules for the program and account you selected. Depending on the program, Rules may address loss and drawdown limits, objectives, consistency, lot or risk limits, payout requirements, prohibited practices, inactivity, account limits and scaling.</p><p>Program-specific values and conditions are published on the applicable FundedWealth Forex Rules pages and control if there is a question about a trading requirement. You are responsible for reviewing them before trading and throughout your participation.</p></LegalSection>
          <LegalSection id="prohibited-practices" number="10" title="Prohibited Trading Practices"><p>Where prohibited by applicable program Rules, you must not exploit platform or system errors, manipulate execution, abuse technical inefficiencies, bypass risk controls or engage in fraudulent activity. You must not use abusive high-frequency execution, prohibited grid or one-sided betting strategies, or other conduct intended to defeat the purpose of a program.</p><p>You must not use unauthorized copy trading or account management, group hedging, coordinated account activity, account churning, or accounts created to circumvent program or account limits. The applicable Rules determine whether a particular strategy or practice is permitted.</p></LegalSection>
          <LegalSection id="responsible-trading" number="11" title="Responsible Trading and User Conduct"><p>You agree to trade responsibly, understand the applicable Rules, protect your credentials and provide accurate information. You must not attempt to exploit systems, interfere with the service, impersonate another person or use the platform for unlawful purposes.</p><p>You are responsible for your devices, network connection and activity performed through your Account. Notify us promptly if you suspect unauthorized access or a material technical issue.</p></LegalSection>
          <LegalSection id="verification" number="12" title="Identity Verification and Fraud Prevention"><p>We may request identity, payment or other verification information where necessary for account security, fraud prevention, payout processing or compliance requirements. Information must be complete, accurate and current.</p><p>Failure to provide required verification, or providing misleading information, may result in restricted access, suspension or cancellation where legally permitted. Verification does not change the simulated nature of the programs.</p></LegalSection>
          <LegalSection id="payouts" number="13" title="Payouts and Eligibility"><p>Payouts or rewards, where offered, are subject to the applicable program Rules, successful completion of requirements, compliance checks, identity verification where required, and fraud and risk review.</p><p>We do not promise that a payout will be available, approved or processed unless the applicable requirements have been satisfied. Existing program Rules remain authoritative for percentages, thresholds, timing and other payout conditions.</p></LegalSection>
          <LegalSection id="account-limits" number="14" title="Account Limits and Multiple Accounts"><p>Account and program limits may differ between offerings. The applicable Rules page controls the number, type and use of Accounts permitted for your selected program.</p><p>You must not create or use Accounts to evade limits, restrictions, verification or enforcement. We may review related Accounts where activity suggests circumvention, coordination or misuse.</p></LegalSection>
          <LegalSection id="inactivity" number="15" title="Inactivity"><p>Inactivity conditions, if any, are governed by the applicable program Rules. We do not establish a universal inactivity period through these Terms. Review the Rules for your selected program and keep your Account information current.</p></LegalSection>
          <LegalSection id="platform-availability" number="16" title="Platform Availability and Technical Issues"><p>Platforms and related services may experience maintenance, outages, delays, updates, connectivity failures or other technical issues. Availability is not guaranteed to be uninterrupted or error-free.</p><p>We may perform maintenance or updates and may temporarily limit access to protect users, systems or program integrity. Report material technical issues promptly with sufficient information for investigation.</p></LegalSection>
          <LegalSection id="third-party-services" number="17" title="Third-Party Services and Technology"><p>FundedWealth Forex may depend on third-party technology, payment processors, hosting, platform infrastructure and other service providers. Those providers may have separate terms and privacy notices.</p><p>Third-party outages, changes or failures may affect availability or functionality. We are not responsible for matters outside our reasonable control, subject to rights and obligations that cannot lawfully be excluded.</p></LegalSection>
          <LegalSection id="intellectual-property" number="18" title="Intellectual Property"><p>FundedWealth Forex branding, logos, website, software, platform design, text, graphics and other materials are owned by or licensed to FundedWealth Forex and are protected by applicable intellectual-property laws.</p><p>You may use the service for its intended purpose. You may not reproduce, distribute, modify, reverse engineer, scrape, publish or misuse protected materials without prior written permission.</p></LegalSection>
          <LegalSection id="privacy" number="19" title="Privacy and Personal Data"><p>Our collection and use of personal data is described in the separate Privacy Policy. By using the services, you acknowledge that personal data may be processed as necessary to provide Accounts, support security, process payments, perform verification and meet legal obligations.</p></LegalSection>
          <LegalSection id="risk-warning" number="20" title="Disclaimers and Risk Warning"><p>Financial markets involve substantial risk. Simulated performance does not guarantee future results, and past simulated performance is not indicative of future results. Leveraged strategies may involve significant risk when used in live markets.</p><p>You are responsible for understanding your own risk tolerance, financial circumstances and legal obligations. The services are provided on an as-available basis to the maximum extent permitted by law.</p></LegalSection>
          <LegalSection id="liability" number="21" title="Limitation of Liability"><p>To the maximum extent permitted by applicable law, FundedWealth Forex will not be liable for indirect, incidental, special or consequential losses, lost profits or opportunities, loss of data, technical interruptions, or failures caused by third parties.</p><p>Nothing in these Terms excludes liability that cannot lawfully be excluded or limits rights that cannot be limited. Any applicable liability is limited to the direct loss demonstrably caused by a breach, subject to mandatory law.</p></LegalSection>
          <LegalSection id="indemnification" number="22" title="Indemnification"><p>To the extent permitted by law, you agree to indemnify and hold FundedWealth Forex and its personnel harmless from claims, losses, liabilities, costs and expenses arising from your violation of these Terms, misuse of the platform, unlawful activity, infringement of third-party rights or fraudulent activity.</p></LegalSection>
          <LegalSection id="suspension" number="23" title="Suspension and Termination"><p>We may suspend, restrict or terminate access where appropriate, including for violation of these Terms or Rules, fraud, abuse, prohibited practices, false information, attempted system manipulation or violation of applicable law.</p><p>Consequences may depend on the applicable program, the evidence available and the circumstances. Where appropriate, we may provide notice or an opportunity to resolve an issue, but this is not required where immediate action is reasonably necessary.</p></LegalSection>
          <LegalSection id="changes" number="24" title="Changes to Programs, Services and Terms"><p>We may update website features, programs, Rules, pricing, services and these Terms to reflect changes in operations, technology, law or risk controls. We will provide notice where required by applicable law.</p><p>Changes do not automatically impose arbitrary retroactive requirements on an already purchased Account. Program-specific conditions are governed by the applicable Rules and purchase terms in effect for that Account, subject to mandatory law.</p></LegalSection>
          <LegalSection id="force-majeure" number="25" title="Force Majeure"><p>We are not responsible for delay or failure caused by events outside reasonable control, including infrastructure or internet failures, cyber incidents, government action, natural disasters, extraordinary market events or serious technical disruptions.</p></LegalSection>
          <LegalSection id="severability" number="26" title="Severability"><p>If a provision of these Terms is found invalid, illegal or unenforceable, it will be enforced to the maximum extent permitted and the remaining provisions will remain effective where legally possible.</p></LegalSection>
          <LegalSection id="entire-agreement" number="27" title="Entire Agreement"><p>These Terms, the applicable Program Rules, Privacy Policy, Risk Disclosure and purchase terms form the agreement concerning the services. If documents conflict, the program-specific Rules control for program-specific trading requirements, while mandatory law controls where applicable.</p></LegalSection>
          <LegalSection id="governing-law" number="28" title="Governing Law and Disputes"><p><strong>Legal review placeholder:</strong> The governing law, venue and dispute-resolution process for FundedWealth Forex should be inserted here once confirmed by the Company’s legal and business configuration. No jurisdiction is stated in this document until that review is complete.</p><p>Before commencing a formal dispute where permitted, the parties should attempt in good faith to resolve the matter through written notice to the contact address below.</p></LegalSection>
          <LegalSection id="contact" number="29" title="Contact Information"><p>For questions about these Terms, account matters or a legal notice, contact the official FundedWealth Forex support address:</p><p><a className="legal-contact" href="mailto:support@fundedwealth.com">support@fundedwealth.com <ArrowUpRight /></a></p><p>FundedWealth India Pvt. Ltd.<br />Mumbai, Maharashtra, India</p></LegalSection>

          <div className="legal-related"><p className="legal-kicker"><span />RELATED DOCUMENTS</p><div className="legal-related-grid"><Link href="/rules"><strong>Trading Rules</strong><span>Review current program requirements <ArrowUpRight /></span></Link><Link href="/#footer"><strong>Privacy and Risk Notices</strong><span>Available in the legal footer <ArrowUpRight /></span></Link></div></div>
        </article>
      </div>
    </main>
  )
}

function LegalSection({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="legal-section"><div className="legal-section-number">{number}</div><div><h2>{title}</h2>{children}</div></section>
}
