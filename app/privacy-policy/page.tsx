'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, ChevronDown, Menu, ShieldCheck } from 'lucide-react'

const sections = [
  ['introduction', 'Introduction'],
  ['information-collected', 'Information We Collect'],
  ['use-information', 'How We Use Your Information'],
  ['trading-data', 'Trading Data and Risk Monitoring'],
  ['simulated-environment', 'Simulated Trading Environment'],
  ['sharing', 'How We Share Information'],
  ['international-transfers', 'International Data Transfers'],
  ['cookies', 'Cookies and Similar Technologies'],
  ['analytics', 'Analytics and Website Usage'],
  ['marketing', 'Marketing Communications'],
  ['retention', 'Data Retention'],
  ['security', 'Data Security'],
  ['rights', 'Your Privacy Rights'],
  ['account-deletion', 'Account Deletion'],
  ['children', "Children's Privacy"],
  ['third-party', 'Third-Party Links and Services'],
  ['changes', 'Changes to This Privacy Policy'],
  ['contact', 'Contact Us'],
] as const

const today = 'August 28, 2026'

export default function PrivacyPolicyPage() {
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
        <h1>Privacy Policy</h1>
        <p className="legal-lead">Learn how FundedWealth Forex collects, uses, protects and manages your personal information when you use our website, platform and services.</p>
        <p className="legal-updated">Last Updated: <strong>{today}</strong></p>
      </section>
      <div className="legal-layout">
        <div className="legal-toc-mobile">
          <button type="button" onClick={() => setTocOpen(!tocOpen)} aria-expanded={tocOpen}><Menu /> Contents <ChevronDown className={tocOpen ? 'is-open' : ''} /></button>
          {tocOpen && <nav>{sections.map(([id, title], index) => <button type="button" className={activeSection === id ? 'is-active' : ''} onClick={() => selectSection(id)} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</nav>}
        </div>
        <aside className="legal-toc" aria-label="Privacy Policy contents"><div className="legal-toc-title"><ShieldCheck /> PRIVACY POLICY</div><nav>{sections.map(([id, title], index) => <button type="button" className={activeSection === id ? 'is-active' : ''} onClick={() => selectSection(id)} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</nav></aside>
        <article className="legal-document">
          <div className="legal-notice"><strong>Privacy at a glance</strong><p>FundedWealth Forex uses personal information to provide simulated trading programs, process transactions, protect accounts, monitor program integrity and support users. We do not sell or rent personal information as part of the services described in this policy.</p></div>
          <PrivacySection id="introduction" number="01" title="Introduction"><p>FundedWealth Forex respects your privacy and is committed to protecting personal information. This Privacy Policy applies to website visitors, registered users, challenge participants, account participants, customers using the trading platform and people who communicate with our support team.</p><p>By using the website or services, you acknowledge this Privacy Policy. Where consent is required by applicable law, we will request it in the relevant context.</p></PrivacySection>
          <PrivacySection id="information-collected" number="02" title="Information We Collect"><p>We may collect information you provide directly, including your full name, email address, phone number, country or region, residential or billing address where required, date of birth where required, account registration details, identity-verification information, support communications and other information you choose to submit.</p><p>When you purchase a challenge or service, transaction and payment information may be processed. Payment details may be handled by third-party payment processors under their own privacy policies; we do not claim to store raw card details unless expressly stated at the point of collection.</p><p>Use of the platform may generate trading activity, orders, positions, account performance, risk metrics, login activity, device and session details, IP address and platform usage information. We may also automatically collect browser type, device type, operating system, pages visited, referring URLs and access times through cookies and similar technologies.</p></PrivacySection>
          <PrivacySection id="use-information" number="03" title="How We Use Your Information"><p>We may use information to create and manage accounts, provide simulated trading services, process purchases and payments, operate and improve the website and platform, monitor compliance with trading rules, detect fraud or abuse, provide support and communicate service-related information.</p><p>We may also use information for marketing where permitted, personalize the experience, perform analytics and platform improvements, meet legal, regulatory and security obligations, and protect FundedWealth Forex, its users and infrastructure.</p></PrivacySection>
          <PrivacySection id="trading-data" number="04" title="Trading Data and Risk Monitoring"><p>FundedWealth Forex may process and analyze trading and account data to enforce program rules, support risk management, detect prohibited trading practices, identify abusive or fraudulent behavior, maintain platform integrity, review payout eligibility and investigate account breaches or disputes.</p><p>Trading activity and related account events may be monitored automatically and/or manually where necessary. Monitoring supports administration of the simulated programs and does not mean that live-market investment management is being provided.</p></PrivacySection>
          <PrivacySection id="simulated-environment" number="05" title="Simulated Trading Environment"><p>Our programs may operate within a simulated or demo trading environment. Platform activity and performance data may be collected and processed for account administration, program evaluation, risk monitoring, fraud prevention, customer support and service improvement.</p><p>Simulated activity is not a record of client investment activity on live markets. Data generated by the platform helps us operate the program and communicate accurate account information.</p></PrivacySection>
          <PrivacySection id="sharing" number="06" title="How We Share Information"><p>We may share personal information only when reasonably necessary with payment processors, identity-verification providers, cloud hosting and infrastructure providers, trading technology providers, analytics providers, customer-support providers, email and communication providers, and professional advisers.</p><p>We may also disclose information to government, regulatory or law-enforcement authorities where legally required or reasonably necessary to protect rights, safety, security or the integrity of the services. Service providers may process information only as needed for their services and subject to applicable contractual or legal obligations. We do not sell, rent or lease personal information as part of the services described here.</p></PrivacySection>
          <PrivacySection id="international-transfers" number="07" title="International Data Transfers"><p>Because FundedWealth Forex serves users globally, personal information may be processed or stored in countries other than your country of residence. Those countries may have different data-protection rules.</p><p>Where applicable, we will use appropriate safeguards required by relevant data-protection laws for international transfers. You may contact us for more information about safeguards that apply to your request.</p></PrivacySection>
          <PrivacySection id="cookies" number="08" title="Cookies and Similar Technologies"><p>We may use essential cookies to support core functionality, preference cookies to remember choices, analytics cookies to understand usage, and security cookies to protect accounts and detect abuse.</p><p>You can manage cookies through browser settings and, where available, cookie-preference tools. Disabling some cookies may affect website functionality or account experience.</p></PrivacySection>
          <PrivacySection id="analytics" number="09" title="Analytics and Website Usage"><p>We may analyze website and platform usage to understand performance, user interactions, popular features, technical issues and opportunities to improve the services. This may include aggregated or de-identified information.</p><p>Analytics and measurement tools may be provided by third parties. We do not name a provider here where the implementation may change; any provider used should process information under its applicable terms and privacy notice.</p></PrivacySection>
          <PrivacySection id="marketing" number="10" title="Marketing Communications"><p>Where permitted, FundedWealth Forex may send product updates, service announcements, educational content, promotional offers and important account notifications. Marketing messages will include an unsubscribe method or you may contact support to opt out.</p><p>Opting out of marketing does not stop essential account, security, transactional or service communications that are necessary to operate your Account.</p></PrivacySection>
          <PrivacySection id="retention" number="11" title="Data Retention"><p>We retain personal information only for as long as reasonably necessary to provide services, maintain accounts, resolve disputes, enforce agreements, meet legal obligations, prevent fraud, support security and maintain business records.</p><p>When information is no longer required, it may be deleted, anonymized or securely archived according to applicable requirements and our operational needs.</p></PrivacySection>
          <PrivacySection id="security" number="12" title="Data Security"><p>We use reasonable technical and organizational measures designed to protect personal information. These may include encryption where appropriate, secure connections, access controls, authentication systems, monitoring and security procedures.</p><p>No internet transmission or storage system can be guaranteed to be 100% secure. You should use strong credentials, keep them confidential and notify us promptly of suspected unauthorized access.</p></PrivacySection>
          <PrivacySection id="rights" number="13" title="Your Privacy Rights"><p>Depending on applicable law, you may have rights to access personal information, correct inaccurate information, request deletion, request restriction of processing, object to certain processing, withdraw consent where processing is based on consent, request data portability where applicable and opt out of marketing communications.</p><p>Submit requests through the official support contact below. We may need to verify your identity and may retain information where legal, fraud-prevention, accounting, security or contractual obligations require it.</p></PrivacySection>
          <PrivacySection id="account-deletion" number="14" title="Account Deletion"><p>You may request account deletion or closure by contacting FundedWealth Forex support. We will review the request and take appropriate action under applicable law and our operational requirements.</p><p>Some information may need to be retained for legal obligations, fraud prevention, security, dispute resolution, enforcement of agreements or financial and business recordkeeping.</p></PrivacySection>
          <PrivacySection id="children" number="15" title="Children's Privacy"><p>FundedWealth Forex services are not intended for individuals who do not meet the minimum age required to enter into the applicable agreement or use the services. We do not knowingly collect personal information from people who are not legally eligible to use the services.</p><p>If we discover such information, we may take appropriate steps to delete or restrict it.</p></PrivacySection>
          <PrivacySection id="third-party" number="16" title="Third-Party Links and Services"><p>The website or platform may contain links to third-party websites or services. FundedWealth Forex is not responsible for the privacy practices, content or security of third parties.</p><p>Review the privacy policies and terms of third-party services before providing information or using their features.</p></PrivacySection>
          <PrivacySection id="changes" number="17" title="Changes to This Privacy Policy"><p>We may update this Privacy Policy from time to time. When material changes are made, we may update the Last Updated date, post a notice on the website or notify registered users where appropriate.</p><p>Continued use of the services after an updated policy becomes effective may be subject to the updated policy where permitted by applicable law.</p></PrivacySection>
          <PrivacySection id="contact" number="18" title="Contact Us"><p>Questions about this Privacy Policy, a privacy request or a data concern can be sent to FundedWealth Forex Support:</p><p><a className="legal-contact" href="mailto:support@fundedwealth.com">support@fundedwealth.com <ArrowUpRight /></a></p><p>FundedWealth India Pvt. Ltd.<br />Mumbai, Maharashtra, India</p></PrivacySection>
          <div className="legal-related"><p className="legal-kicker"><span />RELATED DOCUMENTS</p><div className="legal-related-grid"><Link href="/legal/terms-and-conditions"><strong>Terms &amp; Conditions</strong><span>Review service terms <ArrowUpRight /></span></Link><Link href="/rules"><strong>Trading Rules</strong><span>Review program requirements <ArrowUpRight /></span></Link></div></div>
        </article>
      </div>
    </main>
  )
}

function PrivacySection({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="legal-section"><div className="legal-section-number">{number}</div><div><h2>{title}</h2>{children}</div></section>
}
