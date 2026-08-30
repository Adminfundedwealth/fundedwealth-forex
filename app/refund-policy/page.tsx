'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export default function RefundPolicyPage() {
  return (
    <main className="legal-page">
      <div className="legal-ambient" aria-hidden="true"><span /><span /><i /><i /></div>
      <header className="legal-header">
        <Link href="/" className="legal-brand"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex" /><span>FUNDEDWEALTH <em>FOREX</em></span></Link>
        <Link href="/" className="legal-home-link"><ArrowLeft /> Back to Home</Link>
      </header>
      <section className="legal-hero">
        <p className="legal-kicker"><span />LEGAL</p>
        <h1>Refund Policy</h1>
        <p className="legal-lead">Information about cancellation requests, challenge fees, service access and payment disputes for FundedWealth Forex programs.</p>
        <p className="legal-updated">Last Updated: <strong>August 28, 2026</strong></p>
      </section>
      <div className="legal-layout legal-layout-single">
        <article className="legal-document">
          <div className="legal-notice"><strong>Before requesting a refund</strong><p>Program fees provide access to a simulated trading environment and related services. Review the applicable purchase terms and program Rules before completing a purchase.</p></div>
          <section className="legal-section" id="refund-eligibility"><div className="legal-section-number">01</div><div><h2>Refund Eligibility</h2><p>Refund requests are reviewed under the purchase terms applicable to the transaction and any rights that cannot be excluded under applicable law. Eligibility may depend on whether the service has been accessed, activated or materially used.</p><p>A request should include the account or order details needed to identify the transaction. We may ask for additional information before completing a review.</p></div></section>
          <section className="legal-section" id="cancellations"><div className="legal-section-number">02</div><div><h2>Cancellations</h2><p>You may contact FundedWealth Forex support to request cancellation. Cancellation does not automatically create a refund where a service has already been accessed or activated, subject to applicable law and the purchase terms.</p></div></section>
          <section className="legal-section" id="payments"><div className="legal-section-number">03</div><div><h2>Payment Review and Chargebacks</h2><p>We may review suspected unauthorized, fraudulent or duplicate payments. An unauthorized chargeback or payment dispute may result in account restrictions while the transaction is investigated and does not replace the available support process.</p><p>We do not limit any mandatory rights or remedies available under applicable law.</p></div></section>
          <section className="legal-section" id="contact"><div className="legal-section-number">04</div><div><h2>Contact Information</h2><p>For a refund or cancellation request, contact FundedWealth Forex Support:</p><p><a className="legal-contact" href="mailto:support@fundedwealth.com">support@fundedwealth.com <ArrowUpRight /></a></p><p>FundedWealth India Pvt. Ltd.<br />Mumbai, Maharashtra, India</p></div></section>
          <div className="legal-related"><p className="legal-kicker"><span />RELATED DOCUMENTS</p><div className="legal-related-grid"><Link href="/legal/terms-and-conditions"><strong>Terms &amp; Conditions</strong><span>Review service terms <ArrowUpRight /></span></Link><Link href="/privacy-policy"><strong>Privacy Policy</strong><span>Review data practices <ArrowUpRight /></span></Link><Link href="/cookie-policy"><strong>Cookie Policy</strong><span>Review cookie practices <ArrowUpRight /></span></Link></div></div>
        </article>
      </div>
    </main>
  )
}
