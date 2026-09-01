'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, ChevronDown, Menu, ShieldCheck } from 'lucide-react'

const sections = [
  ['introduction', 'Introduction'],
  ['what-are-cookies', 'What Are Cookies?'],
  ['types', 'Types of Cookies Used'],
  ['third-party', 'Third-Party Technologies'],
  ['consent', 'Cookie Consent and Management'],
  ['browser-controls', 'Browser Controls'],
  ['rights', 'Data Protection Rights'],
  ['changes', 'Changes to This Cookie Policy'],
  ['contact', 'Contact'],
] as const

const today = 'August 28, 2026'

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState(sections[0][0])
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActiveSection(visible[0].target.id as typeof sections[number][0])
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
        <h1>Cookie Policy</h1>
        <p className="legal-lead">Learn how FundedWealth Forex collects, uses, protects and manages information through cookies and similar technologies when you use our website, platform and services.</p>
        <p className="legal-updated">Last Updated: <strong>{today}</strong></p>
      </section>
      <div className="legal-layout">
        <div className="legal-toc-mobile">
          <button type="button" onClick={() => setTocOpen(!tocOpen)} aria-expanded={tocOpen}><Menu /> Contents <ChevronDown className={tocOpen ? 'is-open' : ''} /></button>
          {tocOpen && <nav>{sections.map(([id, title], index) => <button type="button" className={activeSection === id ? 'is-active' : ''} onClick={() => selectSection(id)} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</nav>}
        </div>
        <aside className="legal-toc" aria-label="Cookie Policy contents"><div className="legal-toc-title"><ShieldCheck /> COOKIE POLICY</div><nav>{sections.map(([id, title], index) => <button type="button" className={activeSection === id ? 'is-active' : ''} onClick={() => selectSection(id)} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</nav></aside>
        <article className="legal-document">
          <div className="legal-notice"><strong>Cookie notice</strong><p>FundedWealth Forex uses essential cookies and similar technologies to operate and secure the website. Where required by applicable law, non-essential cookies should be used only after the appropriate consent or preference has been provided.</p></div>
          <CookieSection id="introduction" number="01" title="Introduction"><p>FundedWealth Forex uses cookies and similar technologies to operate, secure, improve, analyze and personalize the website and services. This Cookie Policy explains what these technologies are, the categories we may use, and the choices available to you.</p><p>It should be read with the FundedWealth Forex Privacy Policy. By using the website or services, you acknowledge this policy; where consent is required, we will request it in the relevant context.</p></CookieSection>
          <CookieSection id="what-are-cookies" number="02" title="What Are Cookies?"><p>Cookies are small text files or similar identifiers placed on your browser or device when you visit a website. They can help a website remember a session, recognize a returning browser, maintain security or understand how features are used.</p><p>Similar technologies may include local storage, pixels, tags or other tools that collect or store information about a browser, device or interaction.</p></CookieSection>
          <CookieSection id="types" number="03" title="Types of Cookies Used"><p>Depending on the website features, platform configuration and applicable consent requirements, FundedWealth Forex may use these categories:</p><h3>Strictly Necessary Cookies</h3><p>Required for website functionality, security, authentication, account access and fraud prevention. These cookies support core services and may not be optional where they are technically necessary.</p><h3>Functional Cookies</h3><p>Used to remember user preferences and improve the user experience, such as language, currency or display choices where those features are available.</p><h3>Analytics Cookies</h3><p>Used to understand website usage, performance and visitor behavior, and to help improve the platform. Analytics may be aggregated or used in a form intended to reduce direct identification where appropriate.</p><h3>Marketing and Advertising Cookies</h3><p>May be used to measure campaign performance, deliver relevant advertising and track marketing interactions where applicable and subject to required consent. We do not state that these cookies are active in every context.</p></CookieSection>
          <CookieSection id="third-party" number="04" title="Third-Party Technologies"><p>FundedWealth Forex may rely on third-party service providers for analytics, payment processing, authentication, infrastructure, security, identity verification, advertising and other platform functionality.</p><p>Third-party technologies may set or access their own identifiers under their applicable terms and privacy policies. We do not name a provider here where the implementation may change, and we do not claim that a particular provider or technology is used unless it is actually integrated into the relevant service.</p></CookieSection>
          <CookieSection id="consent" number="05" title="Cookie Consent and Management"><p>Where required by applicable law, users may manage or withdraw consent for non-essential cookies through the consent or preference controls made available in the relevant website experience. Withdrawing consent does not affect processing that is necessary to provide a requested service or maintain security.</p><p>No separate cookie-preference tool is currently represented in this website implementation. Until such a tool is available, you can manage optional cookies through your browser controls as described below. We will not treat browser controls as a promise that every service feature can be individually configured.</p></CookieSection>
          <CookieSection id="browser-controls" number="06" title="Browser Controls"><p>Most browsers allow you to block, delete or limit cookies through their settings. Browser help pages explain how to manage cookies for your device and browser.</p><p>Disabling or deleting certain cookies may affect website functionality, authentication, preferences, security features or other parts of the user experience.</p></CookieSection>
          <CookieSection id="rights" number="07" title="Data Protection Rights"><p>Depending on relevant law, you may have rights described in the FundedWealth Forex Privacy Policy, including access, correction, deletion, restriction of processing, objection, portability and withdrawal of consent where legally applicable.</p><p>Requests may be submitted through the official support contact below. We may need to verify your identity and may retain information where legal, security, fraud-prevention, accounting or contractual obligations require it.</p><p>For more information about personal information and these rights, review the <Link href="/privacy-policy">Privacy Policy</Link>.</p></CookieSection>
          <CookieSection id="changes" number="08" title="Changes to This Cookie Policy"><p>FundedWealth Forex may update this Cookie Policy from time to time to reflect changes in the website, services, technology, legal obligations or cookie practices.</p><p>The updated version will be posted on this page with a revised Last Updated date. Where appropriate, we may provide additional notice of material changes.</p></CookieSection>
          <CookieSection id="contact" number="09" title="Contact"><p>Questions about this Cookie Policy or cookie-related privacy requests can be sent to FundedWealth Forex Support:</p><p><a className="legal-contact" href="mailto:support@fundedwealth.com">support@fundedwealth.com <ArrowUpRight /></a></p><p>FundedWealth India Pvt. Ltd.<br />Mumbai, Maharashtra, India</p></CookieSection>
          <div className="legal-related"><p className="legal-kicker"><span />RELATED DOCUMENTS</p><div className="legal-related-grid"><Link href="/privacy-policy"><strong>Privacy Policy</strong><span>Review data practices <ArrowUpRight /></span></Link><Link href="/legal/terms-and-conditions"><strong>Terms &amp; Conditions</strong><span>Review service terms <ArrowUpRight /></span></Link><Link href="/aml-policy"><strong>AML Policy</strong><span>Review verification controls <ArrowUpRight /></span></Link><Link href="/risk-disclosure"><strong>Risk Disclosure</strong><span>Review trading risks <ArrowUpRight /></span></Link></div></div>
        </article>
      </div>
    </main>
  )
}

function CookieSection({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="legal-section"><div className="legal-section-number">{number}</div><div><h2>{title}</h2>{children}</div></section>
}
