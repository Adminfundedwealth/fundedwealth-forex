'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, ChevronDown, Menu, ShieldCheck } from 'lucide-react'

const sections = [
  ['aml-policy', 'AML Policy'],
  ['policy-statement', 'Policy Statement'],
  ['objectives', 'Policy Objectives'],
  ['money-laundering', 'Money Laundering, Terrorist Financing & Sanctions'],
  ['identification', 'Customer Identification & Verification'],
  ['risk-based', 'Risk-Based Approach'],
  ['monitoring', 'Transaction and Activity Monitoring'],
  ['reporting', 'Reporting and Cooperation'],
  ['sanctions', 'Sanctions Compliance'],
  ['records', 'Record Keeping'],
  ['prohibited', 'Prohibited Activities'],
  ['controls', 'Internal Controls & Compliance'],
  ['training', 'Staff Training and Awareness'],
  ['enforcement', 'Enforcement and Account Actions'],
  ['changes', 'Changes to This Policy'],
  ['contact', 'Contact Information'],
] as const

const today = 'August 28, 2026'

export default function AmlPolicyPage() {
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
        <h1>AML Policy</h1>
        <p className="legal-lead">FundedWealth Forex maintains this policy to help protect its simulated trading programs, users and payment operations from money laundering, terrorist financing, sanctions risks and related abuse.</p>
        <p className="legal-updated">Last Updated: <strong>{today}</strong></p>
      </section>
      <div className="legal-layout">
        <div className="legal-toc-mobile">
          <button type="button" onClick={() => setTocOpen(!tocOpen)} aria-expanded={tocOpen}><Menu /> Contents <ChevronDown className={tocOpen ? 'is-open' : ''} /></button>
          {tocOpen && <nav>{sections.map(([id, title], index) => <button type="button" className={activeSection === id ? 'is-active' : ''} onClick={() => selectSection(id)} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</nav>}
        </div>
        <aside className="legal-toc" aria-label="AML Policy contents"><div className="legal-toc-title"><ShieldCheck /> AML POLICY</div><nav>{sections.map(([id, title], index) => <button type="button" className={activeSection === id ? 'is-active' : ''} onClick={() => selectSection(id)} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</nav></aside>
        <article className="legal-document">
          <div className="legal-notice"><strong>Compliance notice</strong><p>FundedWealth Forex operates a simulated trading environment. AML and KYC checks may be required before account activation, before a payout or whenever additional verification is reasonably necessary.</p></div>
          <AmlSection id="aml-policy" number="01" title="AML Policy"><p>This Anti-Money Laundering Policy explains the measures FundedWealth Forex may use to identify and reduce money laundering, terrorist financing, sanctions-related risks, payment fraud and other financial abuse connected with its website and services.</p><p>The policy applies to users, customers, account holders, challenge participants, payout recipients and other persons interacting with FundedWealth Forex. It should be read with the Terms &amp; Conditions, Privacy Policy and applicable program Rules.</p></AmlSection>
          <AmlSection id="policy-statement" number="02" title="Policy Statement"><p>FundedWealth Forex is committed to operating its simulated trading programs responsibly and to taking reasonable, risk-based steps to prevent the services from being misused for unlawful activity.</p><p>We may apply proportionate checks, request information, restrict activity or cooperate with competent authorities where required by applicable laws, regulations, sanctions requirements and legal obligations. This policy does not represent that FundedWealth Forex is a bank, broker, investment firm, regulator or financial institution.</p></AmlSection>
          <AmlSection id="objectives" number="03" title="Policy Objectives"><p>Our objectives are to:</p><ul><li>protect users, payment operations and platform infrastructure from financial crime and abuse;</li><li>understand who uses the services and, where appropriate, who receives a payout;</li><li>identify unusual, inconsistent or suspicious payment and account activity;</li><li>support compliance with applicable legal, sanctions and verification obligations; and</li><li>maintain proportionate records and controls that support sound account decisions.</li></ul></AmlSection>
          <AmlSection id="money-laundering" number="04" title="Money Laundering, Terrorist Financing &amp; Sanctions"><p>Money laundering may include disguising the origin, ownership or movement of proceeds connected with unlawful conduct. Terrorist financing may involve providing or collecting funds for terrorist activity. Sanctions risks may arise when a person, organization, location or transaction is subject to applicable restrictions.</p><p>FundedWealth Forex does not knowingly permit its services or payment channels to be used for these purposes. We may act on reasonable concerns without making a public determination about the underlying conduct.</p></AmlSection>
          <AmlSection id="identification" number="05" title="Customer Identification &amp; Verification"><p>AML and KYC checks may be required before account activation, before a payout, when payment ownership is unclear or whenever additional verification is necessary. We may request identity documents, proof of address, payment verification, source-of-funds information or other reasonable documents.</p><p>Information must be accurate, current and related to the user or authorized payment method. Failure to provide requested information, or providing misleading or altered documents, may result in restricted access, delayed processing or other action permitted by the Terms &amp; Conditions and applicable law.</p></AmlSection>
          <AmlSection id="risk-based" number="06" title="Risk-Based Approach"><p>We apply controls proportionate to the circumstances and risks we identify. Relevant factors may include account and payment history, country or region, identity and payment consistency, unusual activity, multiple-account indicators, payout context and attempts to circumvent verification.</p><p>Different users or transactions may receive different levels of review. A request for additional information does not by itself mean that wrongdoing has occurred.</p></AmlSection>
          <AmlSection id="monitoring" number="07" title="Transaction and Activity Monitoring"><p>We may review payments, refunds, account activity and related events for suspicious payments, unusual patterns, multiple-account abuse, identity misuse, payment fraud, sanctions-related risks and attempts to circumvent verification.</p><p>Reviews may be automated, manual or a combination of both, depending on available tools and the circumstances. We may also consider information from payment, identity, technology or support providers where legally permitted.</p></AmlSection>
          <AmlSection id="reporting" number="08" title="Reporting and Cooperation"><p>Where we identify activity that may require action, FundedWealth Forex may document the concern, seek additional information, restrict a transaction or cooperate with competent authorities and service providers as permitted or required by applicable law.</p><p>We may be unable to disclose details of a review, request or report where doing so could interfere with an investigation, compromise security or breach a legal obligation.</p></AmlSection>
          <AmlSection id="sanctions" number="09" title="Sanctions Compliance"><p>We may screen or review users, payments and related activity against applicable sanctions requirements and restrictions. Access or processing may be refused where participation, a payment or a payout presents a sanctions concern or would conflict with a legal obligation.</p><p>We do not adopt a specific sanctions list or jurisdictional standard in this policy beyond requirements applicable to the relevant activity and our legal obligations.</p></AmlSection>
          <AmlSection id="records" number="10" title="Record Keeping"><p>We may retain verification, payment, account-review and decision records for as long as reasonably necessary to provide services, prevent fraud, resolve disputes, enforce agreements, support security and meet applicable legal or business-record obligations.</p><p>Records may be deleted, anonymized or securely archived when no longer required, subject to applicable retention requirements and the Privacy Policy.</p></AmlSection>
          <AmlSection id="prohibited" number="11" title="Prohibited Activities"><p>Users must not use FundedWealth Forex for money laundering, terrorist financing, sanctions evasion, payment fraud, identity misuse, unauthorized payments, unlawful activity or attempts to bypass verification.</p><p>Users must not create or control accounts for another person without authorization, coordinate multiple accounts to evade controls, conceal the source or ownership of funds, submit false information or misuse a payout or refund process.</p></AmlSection>
          <AmlSection id="controls" number="12" title="Internal Controls &amp; Compliance"><p>FundedWealth Forex may maintain internal procedures for onboarding, verification, payment review, account-risk assessment, escalation and record keeping. The specific tools, vendors and procedures used may change as the service develops.</p><p>Controls are designed to be reasonable and proportionate. We do not claim that any particular compliance software, automated monitoring system, regulator reporting channel or banking infrastructure is used unless separately confirmed.</p></AmlSection>
          <AmlSection id="training" number="13" title="Staff Training and Awareness"><p>People involved in account support, payment handling, verification or risk decisions should receive information appropriate to their responsibilities, including awareness of suspicious activity, privacy, security and escalation procedures.</p><p>Training and guidance may be updated as services, risks, technology and applicable obligations change.</p></AmlSection>
          <AmlSection id="enforcement" number="14" title="Enforcement and Account Actions"><p>FundedWealth Forex may suspend an account, delay a transaction or payout, reject a payment, request additional documents, restrict access, terminate participation, remove rewards or profits obtained through prohibited activity, or take other action permitted under the Terms &amp; Conditions and applicable law.</p><p>Actions may be temporary or permanent and may be taken before a review is complete where reasonably necessary to protect users, systems, payment operations or legal interests. We may consider the applicable program Rules and the circumstances of each case.</p></AmlSection>
          <AmlSection id="changes" number="15" title="Changes to This Policy"><p>We may update this AML Policy to reflect changes in services, risks, technology, controls or applicable legal obligations. The Last Updated date will identify the current version, and we may provide additional notice where appropriate.</p><p>Updates do not automatically change the specific trading requirements of a purchased program; those requirements remain governed by the applicable Rules and purchase terms.</p></AmlSection>
          <AmlSection id="contact" number="16" title="Contact Information"><p>Questions about this AML Policy, a verification request or an account review may be directed to FundedWealth Forex Support:</p><p><a className="legal-contact" href="mailto:support@fundedwealth.com">support@fundedwealth.com <ArrowUpRight /></a></p><p>FundedWealth India Pvt. Ltd.<br />Mumbai, Maharashtra, India</p></AmlSection>
          <div className="legal-related"><p className="legal-kicker"><span />RELATED DOCUMENTS</p><div className="legal-related-grid"><Link href="/legal/terms-and-conditions"><strong>Terms &amp; Conditions</strong><span>Review service terms <ArrowUpRight /></span></Link><Link href="/privacy-policy"><strong>Privacy Policy</strong><span>Review data practices <ArrowUpRight /></span></Link><Link href="/rules"><strong>Trading Rules</strong><span>Review program requirements <ArrowUpRight /></span></Link></div></div>
        </article>
      </div>
    </main>
  )
}

function AmlSection({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="legal-section"><div className="legal-section-number">{number}</div><div><h2>{title}</h2>{children}</div></section>
}
