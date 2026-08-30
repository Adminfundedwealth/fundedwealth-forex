'use client'

import { Suspense, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CreditCard, Info, QrCode, ShieldCheck } from 'lucide-react'
import { getPricing, pricingConfig, type CalculatedPricing, type PricingAccountType } from '@/lib/flash-pricing'
import { useSearchParams } from 'next/navigation'
import { LanguageSwitcher, useLanguage } from '@/components/LanguageProvider'
import { useCurrency } from '@/components/CurrencyProvider'
import { currencyByCode, type CurrencyCode } from '@/lib/currency'

const challengeTypes: PricingAccountType[] = ['FLASH', 'INSTANT', '1 STEP', '2 STEP']
const platformOptions = [
  { id: 'mt5', name: 'MetaTrader 5', asset: '/assets/platforms/metatrader-5-wordmark.png', alt: 'MetaTrader 5 official logo' },
  { id: 'ctrader', name: 'cTrader', asset: '/assets/platforms/ctrader.svg', alt: 'cTrader official logo' },
  { id: 'dxtrade', name: 'DXtrade', asset: '/assets/platforms/dxtrade.svg', alt: 'DXtrade official logo' },
] as const
const addOnOptions = [
  { id: 'refund', name: '100% Challenge Fee Refund', feePercent: 10 },
  { id: 'minimum-days', name: 'No Minimum Trading Days', feePercent: 15 },
  { id: 'payout-split', name: '90% Payout Split', feePercent: 20 },
] as const
const sovereignCountryCodes = ['AF','AL','DZ','AD','AO','AG','AR','AM','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BT','BO','BA','BW','BR','BN','BG','BF','BI','CV','KH','CM','CA','CF','TD','CL','CN','CO','KM','CG','CD','CR','CI','HR','CU','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','SZ','ET','FJ','FI','FR','GA','GM','GE','DE','GH','GR','GD','GT','GN','GW','GY','HT','HN','HU','IS','IN','ID','IR','IQ','IE','IL','IT','JM','JP','JO','KZ','KE','KI','KP','KR','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MG','MW','MY','MV','ML','MT','MH','MR','MU','MX','FM','MD','MC','MN','ME','MA','MZ','MM','NA','NR','NP','NL','NZ','NI','NE','NG','MK','NO','OM','PK','PW','PA','PG','PY','PE','PH','PL','PT','QA','RO','RU','RW','KN','LC','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SK','SI','SB','SO','ZA','SS','ES','LK','SD','SR','SE','CH','SY','TJ','TZ','TH','TL','TG','TO','TT','TN','TR','TM','TV','UG','UA','AE','GB','US','UY','UZ','VU','VA','VE','VN','YE','ZM','ZW','PS'] as const
const blockedCountryCodes = new Set(['US','ZW','IR','IQ','KP','SO','VN','BI','CF','CI','LR','LY','SD','CU','SY','AF','YE','PS','MM','NI','CG','CD','ER','GN','GW','PG','SS','VU','VE','DZ','RU','BY','KE','GH'])
const blockedCountries = new Set(['United States', 'Zimbabwe', 'Iran', 'Iraq', 'North Korea', 'Somalia', 'Vietnam', 'Burundi', 'Central African Republic', "Cote d'Ivoire", 'Liberia', 'Libya', 'Sudan', 'Cuba', 'Syria', 'Afghanistan', 'Yemen', 'Palestine', 'Myanmar', 'Nicaragua', 'Republic of the Congo', 'Crimea', 'Democratic Republic of the Congo', 'Eritrea', 'Guinea', 'Guinea-Bissau', 'Papua New Guinea', 'South Sudan', 'Vanuatu', 'Venezuela', 'Algeria', 'Russia', 'Belarus', 'Kenya', 'Ghana'])
const countryDisplayNames = new Intl.DisplayNames(['en'], { type: 'region' })
const countryOptions = sovereignCountryCodes.filter((code) => !blockedCountryCodes.has(code)).map((code) => countryDisplayNames.of(code)).filter((name): name is string => typeof name === 'string' && !blockedCountries.has(name) && name !== "Côte d'Ivoire" && name !== 'Congo' && name !== 'Congo, Democratic Republic of the')
const accountSizes = challengeTypes.reduce<Record<PricingAccountType, string[]>>((sizes, challengeType) => {
  sizes[challengeType] = pricingConfig.filter((pricing) => pricing.accountType === challengeType && pricing.active).map((pricing) => pricing.accountSize)
  return sizes
}, {} as Record<PricingAccountType, string[]>)

type CheckoutStep = 'configure' | 'verify' | 'pay'
type BillingDetails = { title: string; firstName: string; lastName: string; street: string; city: string; postalCode: string; country: string; phone: string; email: string }

const emptyBillingDetails: BillingDetails = { title: '', firstName: '', lastName: '', street: '', city: '', postalCode: '', country: 'India', phone: '', email: '' }

function BillingDetailsForm({ details, onChange, onBack, onProceed }: { details: BillingDetails; onChange: (field: keyof BillingDetails, value: string) => void; onBack: () => void; onProceed: () => void }) {
  const { t } = useLanguage()
  const isComplete = Object.values(details).every((value) => value.trim().length > 0)

  return <section className="billing-card" aria-labelledby="billing-title">
    <div className="billing-heading"><button className="billing-back" type="button" onClick={onBack}><ArrowLeft /> {t.checkout.back}</button><h1 id="billing-title">{t.checkout.billing}</h1></div>
    <form className="billing-form" onSubmit={(event) => { event.preventDefault(); onProceed() }}>
      <label className="billing-field billing-field-full"><span>{t.checkout.titleField}</span><select required value={details.title} onChange={(event) => onChange('title', event.target.value)}><option value="" disabled>{t.checkout.titleField}</option><option>Mr</option><option>Ms</option><option>Mrs</option><option>Dr</option></select></label>
      <label className="billing-field"><span>{t.checkout.firstName}</span><input required value={details.firstName} placeholder={t.checkout.firstName} onChange={(event) => onChange('firstName', event.target.value)} /></label>
      <label className="billing-field"><span>{t.checkout.lastName}</span><input required value={details.lastName} placeholder={t.checkout.lastName} onChange={(event) => onChange('lastName', event.target.value)} /></label>
      <label className="billing-field billing-field-full"><span>{t.checkout.street}</span><input required value={details.street} placeholder={t.checkout.street} onChange={(event) => onChange('street', event.target.value)} /></label>
      <label className="billing-field"><span>{t.checkout.city}</span><input required value={details.city} placeholder={t.checkout.city} onChange={(event) => onChange('city', event.target.value)} /></label>
      <label className="billing-field"><span>{t.checkout.postalCode}</span><input required value={details.postalCode} placeholder={t.checkout.postalCode} onChange={(event) => onChange('postalCode', event.target.value)} /></label>
      <label className="billing-field billing-field-full"><span>{t.checkout.country}</span><select required value={details.country} onChange={(event) => onChange('country', event.target.value)}>{countryOptions.map((country) => <option key={country} value={country}>{country}</option>)}</select></label>
      <label className="billing-field"><span>{t.checkout.phone}</span><input required type="tel" value={details.phone} placeholder="+91XXXXXXXXXX" onChange={(event) => onChange('phone', event.target.value)} /></label>
      <label className="billing-field"><span>{t.checkout.email}</span><input required type="email" value={details.email} placeholder="you@example.com" onChange={(event) => onChange('email', event.target.value)} /></label>
      <p className="billing-help">{t.checkout.billingHelp}</p>
      <button className="billing-pay checkout-pay button" type="submit" disabled={!isComplete}><CreditCard /> {t.checkout.proceed} <ArrowRight /></button>
    </form>
  </section>
}

function AgreementModal({ onClose, onAgree }: { onClose: () => void; onAgree: () => void }) {
  const { t } = useLanguage()
  const [agreements, setAgreements] = useState({ tradingRules: false, identity: false, terms: false })
  const allAgreed = Object.values(agreements).every(Boolean)

  const toggleAgreement = (agreement: keyof typeof agreements) => {
    setAgreements((current) => ({ ...current, [agreement]: !current[agreement] }))
  }

  return <div className="agreement-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="agreement-modal" role="dialog" aria-modal="true" aria-labelledby="agreement-title" aria-describedby="agreement-description">
      <div className="agreement-particles" aria-hidden="true"><i /><i /><i /></div>
      <button className="agreement-close" type="button" aria-label="Close confirmation" onClick={onClose}>&times;</button>
      <h2 id="agreement-title">{t.checkout.beforeProceed}</h2>
      <p id="agreement-description">{t.checkout.agreeRules}</p>
      <div className="agreement-list">
        <label className={`agreement-option${agreements.tradingRules ? ' is-checked' : ''}`}><input type="checkbox" checked={agreements.tradingRules} onChange={() => toggleAgreement('tradingRules')} /><span className="agreement-check" aria-hidden="true"><Check /></span><span>I have read and agreed to the <a href="/trading-rules">Trading Rules</a>.</span></label>
        <label className={`agreement-option${agreements.identity ? ' is-checked' : ''}`}><input type="checkbox" checked={agreements.identity} onChange={() => toggleAgreement('identity')} /><span className="agreement-check" aria-hidden="true"><Check /></span><span>I declare that all information filled are correct and corresponds with government issued identification.</span></label>
        <label className={`agreement-option${agreements.terms ? ' is-checked' : ''}`}><input type="checkbox" checked={agreements.terms} onChange={() => toggleAgreement('terms')} /><span className="agreement-check" aria-hidden="true"><Check /></span><span>I declare that I have read and agreed with the <a href="/legal/terms-and-conditions">Terms &amp; Conditions</a>.</span></label>
      </div>
      <button className="agreement-submit checkout-pay button" type="button" disabled={!allAgreed} onClick={onAgree}>{t.checkout.agree}</button>
    </section>
  </div>
}

type PaymentMethod = 'upi' | 'razorpay' | 'crypto'

function PaymentStep({ type, size, pricing, total, currency, formatCurrency, platform, preference, addOnCount, paymentMethod, onPaymentMethodChange, onBack }: { type: PricingAccountType; size: string; pricing: CalculatedPricing; total: number; currency: CurrencyCode; formatCurrency: (value: number) => string; platform: string | null; preference: 'Swap' | 'Swap-Free'; addOnCount: number; paymentMethod: PaymentMethod; onPaymentMethodChange: (method: PaymentMethod) => void; onBack: () => void }) {
  const { t } = useLanguage()
  const formattedTotal = formatCurrency(total)
  const formattedBase = formatCurrency(pricing.basePrice)

  return <div className="payment-layout">
    <aside className="payment-summary-panel" aria-label="Payment summary">
      <div className="payment-summary-brand"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex logo" /><div><strong>FUNDEDWEALTH</strong><span>FOREX</span></div></div>
      <span className="merchant-badge">✓ VERIFIED MERCHANT</span>
      <div className="payment-summary-amount"><span>AMOUNT TO PAY</span><strong>{formattedTotal}</strong><small>{currency}</small><del>{formattedBase}</del></div>
      <div className="payment-trust-list"><div><span>♙</span><p><strong>Secure Payment</strong><small>256-bit SSL Encrypted</small></p></div><div><span>✓</span><p><strong>Instant Verification</strong><small>Auto-confirmation</small></p></div></div>
      <div className="payment-account-chip"><strong>{size} {type} (FundedWealth Forex)</strong><span>{pricing.discountCode} {pricing.discountPercent}% OFF applied</span></div>
      <small className="payment-powered">POWERED BY FW PAYMENTS</small>
    </aside>
    <section className="billing-card payment-card" aria-labelledby="payment-title">
      <div className="billing-heading"><button className="billing-back" type="button" onClick={onBack}><ArrowLeft /> {t.checkout.back}</button><h1 id="payment-title">{t.checkout.paymentMethod}</h1></div>
      <div className="payment-review"><span>READY TO PAY</span><strong>{formattedTotal}</strong><p>Your verified challenge configuration is ready for secure payment.</p></div>
      <div className="payment-details"><div><span>Challenge</span><strong>{type} / {size}</strong></div><div><span>Platform</span><strong>{platform ?? 'Not selected'}</strong></div><div><span>Preference</span><strong>{preference}</strong></div><div><span>Add-ons</span><strong>{addOnCount}</strong></div></div>
      <div className="payment-methods-grid" aria-label="Payment methods">
      <button className={`payment-method-card${paymentMethod === 'upi' ? ' is-selected' : ''}`} type="button" aria-pressed={paymentMethod === 'upi'} onClick={() => onPaymentMethodChange('upi')}><span className="payment-method-icon payment-method-icon-purple"><QrCode /></span><strong>UPI / QR Code</strong><b>{formattedTotal}</b></button>
      <button className={`payment-method-card${paymentMethod === 'razorpay' ? ' is-selected' : ''}`} type="button" aria-pressed={paymentMethod === 'razorpay'} onClick={() => onPaymentMethodChange('razorpay')}><span className="payment-method-brand">Razorpay</span><strong>Card &amp; Netbanking</strong><span className="payment-method-subtitle">UPI / QR Code</span><b>{formattedTotal}</b></button>
      <button className={`payment-method-card payment-method-card-crypto${paymentMethod === 'crypto' ? ' is-selected' : ''}`} type="button" aria-pressed={paymentMethod === 'crypto'} onClick={() => onPaymentMethodChange('crypto')}><strong>Crypto (USDT, BTC, ETH)</strong><b>≈ {formattedTotal}</b><img className="crypto-penguin-image" src="/assets/payments/crypto-penguins.svg.png" alt="Crypto penguins" /></button>
      </div>
      <button className="billing-pay checkout-pay button" type="button"><CreditCard /> Continue To Payment <ArrowRight /></button>
    </section>
  </div>
}

function CheckoutContent() {
  const { t } = useLanguage()
  const { currency, setCurrency, formatCurrency, usdReference } = useCurrency()
  const searchParams = useSearchParams()
  const requestedType = searchParams.get('type') as PricingAccountType | null
  const requestedSize = searchParams.get('size')
  const requestedCurrency = searchParams.get('currency')?.toUpperCase() as CurrencyCode | undefined
  useEffect(() => { if (requestedCurrency && currencyByCode[requestedCurrency]) setCurrency(requestedCurrency) }, [requestedCurrency, setCurrency])
  const [type, setType] = useState<PricingAccountType>(challengeTypes.includes(requestedType ?? 'FLASH') ? requestedType! : 'FLASH')
  const [size, setSize] = useState(requestedSize && accountSizes[type].includes(requestedSize) ? requestedSize : accountSizes[type][0])
  const [platform, setPlatform] = useState<string | null>(null)
  const [preference, setPreference] = useState<'Swap' | 'Swap-Free'>('Swap')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [step, setStep] = useState<CheckoutStep>('configure')
  const [agreementOpen, setAgreementOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay')
  const [billingDetails, setBillingDetails] = useState<BillingDetails>(emptyBillingDetails)
  const pricing = getPricing(type, size)
  const addOnTotal = pricing ? addOnOptions.filter((option) => selectedAddOns.includes(option.id)).reduce((total, option) => total + pricing.finalPrice * option.feePercent / 100, 0) : 0
  const checkoutTotal = pricing ? Math.round((pricing.finalPrice + addOnTotal) * 100) / 100 : 0

  const selectType = (nextType: PricingAccountType) => {
    setType(nextType)
    setSize(accountSizes[nextType][0])
  }

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((current) => current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id])
  }

  const updateBillingDetail = (field: keyof BillingDetails, value: string) => {
    setBillingDetails((current) => ({ ...current, [field]: value }))
  }

  return (
    <main className="checkout-page">
      <div className="checkout-atmosphere" aria-hidden="true"><span /><span /><i /><i /></div>
      <header className="checkout-header">
        <a className="checkout-brand" href="/#challenges"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex mark" /><span>FUNDEDWEALTH <em>FOREX</em></span></a>
        <div className="checkout-progress" aria-label="Checkout progress"><span className={step === 'configure' ? 'is-active' : 'is-complete'}><b>01</b> Configure</span><i /><span className={step === 'verify' ? 'is-active' : ''}><b>02</b> Verify</span><i /><span className={step === 'pay' ? 'is-active' : ''}><b>03</b> Pay</span></div>
        <div className="checkout-header-actions"><LanguageSwitcher /><a className="checkout-back" href="/#challenges"><ArrowLeft /> {t.checkout.back}</a></div>
      </header>

      {step === 'verify' ? <><BillingDetailsForm details={billingDetails} onChange={updateBillingDetail} onBack={() => setStep('configure')} onProceed={() => setAgreementOpen(true)} />{agreementOpen && <AgreementModal onClose={() => setAgreementOpen(false)} onAgree={() => { setAgreementOpen(false); setStep('pay') }} />}</> : step === 'pay' ? <PaymentStep type={type} size={size} pricing={pricing!} total={checkoutTotal} currency={currency} formatCurrency={formatCurrency} platform={platform} preference={preference} addOnCount={selectedAddOns.length} paymentMethod={paymentMethod} onPaymentMethodChange={setPaymentMethod} onBack={() => setStep('verify')} /> : <div className="checkout-layout">
        <section className="checkout-config" aria-labelledby="checkout-title">
          <div className="checkout-kicker">{t.checkout.kicker}</div>
          <h1 id="checkout-title">{t.checkout.title}</h1>
          <p className="checkout-lead">{t.checkout.lead}</p>

          <div className="checkout-block">
            <h2>{t.checkout.challengeType}</h2>
            <div className="checkout-tabs" role="tablist" aria-label="Challenge type">
              {challengeTypes.map((challengeType) => <button key={challengeType} type="button" className={type === challengeType ? 'is-active' : ''} onClick={() => selectType(challengeType)}>{challengeType}</button>)}
            </div>
          </div>

          <div className="checkout-block">
            <div className="checkout-block-heading"><h2>{t.checkout.accountSize}</h2><span>{accountSizes[type].length} {t.checkout.available}</span></div>
            <div className="checkout-sizes">
              {accountSizes[type].map((accountSize) => { const sizePricing = getPricing(type, accountSize); return <button key={accountSize} type="button" className={size === accountSize ? 'is-active' : ''} onClick={() => setSize(accountSize)}><strong>{accountSize}</strong><span>{sizePricing ? formatCurrency(sizePricing.finalPrice) : 'Unavailable'}</span>{size === accountSize && <Check />}</button> })}
            </div>
          </div>

          <div className="checkout-block checkout-platform-block">
            <div className="checkout-block-heading"><h2>{t.checkout.platform}</h2><span>{t.checkout.choose}</span></div>
            <div className="checkout-platforms" role="radiogroup" aria-label="Select your trading platform">
              {platformOptions.map((option) => <label className={`checkout-platform-card${platform === option.name ? ' is-selected' : ''}`} key={option.id}>
                <input type="radio" name="trading-platform" value={option.name} checked={platform === option.name} onChange={() => setPlatform(option.name)} />
                <span className="checkout-platform-radio" aria-hidden="true" />
                <img src={option.asset} alt={option.alt} />
                <strong>{option.name}</strong>
              </label>)}
            </div>
          </div>

          <div className="checkout-block checkout-preference-block">
            <div className="checkout-block-heading"><h2>{t.checkout.preference}</h2><span>{t.checkout.choose}</span></div>
            <div className="checkout-preferences" role="radiogroup" aria-label="Select your preference">
              <label className={`checkout-preference-card${preference === 'Swap' ? ' is-selected' : ''}`}>
                <input type="radio" name="trading-preference" value="Swap" checked={preference === 'Swap'} onChange={() => setPreference('Swap')} />
                <span className="checkout-platform-radio" aria-hidden="true" />
                <span className="checkout-preference-copy"><strong>Swap</strong><Info aria-label="Swap preference information" /></span>
              </label>
              <label className={`checkout-preference-card${preference === 'Swap-Free' ? ' is-selected' : ''}`}>
                <input type="radio" name="trading-preference" value="Swap-Free" checked={preference === 'Swap-Free'} onChange={() => setPreference('Swap-Free')} />
                <span className="checkout-platform-radio" aria-hidden="true" />
                <span className="checkout-preference-copy"><strong>Swap-Free</strong><Info aria-label="Swap-Free preference information" /><em>Best Conditions</em><small>Fee +10%</small></span>
              </label>
            </div>
          </div>

          <div className="checkout-block checkout-addons-block">
            <div className="checkout-block-heading"><h2>{t.checkout.addons}</h2><span>{t.checkout.optional}</span></div>
            <div className="checkout-addons">
              {addOnOptions.map((option) => <label className={`checkout-addon-card${selectedAddOns.includes(option.id) ? ' is-selected' : ''}`} key={option.id}>
                <input type="checkbox" checked={selectedAddOns.includes(option.id)} onChange={() => toggleAddOn(option.id)} />
                <span className="checkout-addon-checkbox" aria-hidden="true" />
                <span className="checkout-addon-copy"><strong>{option.name}</strong><Info aria-label={`${option.name} information`} /></span>
                <span className="checkout-addon-fee">Fee +{option.feePercent}%</span>
              </label>)}
            </div>
          </div>

          <div className="checkout-note"><ShieldCheck /><div><strong>{t.checkout.transparent}</strong><span>{t.checkout.transparentText}</span></div></div>
        </section>

        <aside className="checkout-summary">
          <div className="summary-top"><span>{t.checkout.summary}</span><span className="summary-secure"><ShieldCheck /> {t.checkout.secure}</span></div>
          <div className="summary-account"><small>{t.challenges.selected}</small><h2>{type}</h2><strong>{size}</strong></div>
          {pricing ? <>
            <div className="summary-line"><span>Base price</span><del>{formatCurrency(pricing.basePrice)}</del></div>
            <div className="summary-line summary-offer"><span>Offer {pricing.discountCode}</span><b>{pricing.discountPercent}% OFF</b></div>
            {selectedAddOns.map((id) => { const option = addOnOptions.find((candidate) => candidate.id === id); return option ? <div className="summary-line summary-addon-line" key={id}><span>{option.name}</span><b>+{formatCurrency(pricing.finalPrice * option.feePercent / 100)}</b></div> : null })}
            <div className="summary-total"><span>TOTAL</span><strong>{formatCurrency(checkoutTotal)}</strong></div>
            {currency !== 'USD' && <div className="summary-usd-context">≈ {usdReference(checkoutTotal)} USD. Payment settlement remains in USD.</div>}
            <div className="summary-rule-list"><h3>{t.checkout.challengeDetails}</h3><div><span>{t.checkout.pricingStatus}</span><b>{t.checkout.active}</b></div><div><span>{t.checkout.payment}</span><b>{t.checkout.oneTime}</b></div><div><span>{t.checkout.platform}</span><b>{platform ?? t.checkout.notSelected}</b></div><div><span>{t.checkout.preference}</span><b>{preference}</b></div></div>
            <div className="compliance-disclosure" role="note" aria-label="Compliance Disclosure">
              <h3>{t.checkout.compliance}</h3>
              <p>All Funding accounts are <strong>simulated funded accounts</strong>. No real capital is at risk. Profits are paid from the firm's revenue pool based on your simulated trading performance. <strong>KYC verification and e-Sign are mandatory before account activation.</strong> By purchasing, you agree to the firm's <a href="/legal/terms-and-conditions">Terms of Service</a> and <a href="/trading-rules">Trading Rules</a>.</p>
            </div>
            <button className="checkout-pay button" type="button" data-platform={platform ?? undefined} data-preference={preference} disabled={!platform} onClick={() => setStep('verify')}><CreditCard /> CONTINUE TO VERIFY <ArrowRight /></button>
          </> : <div className="summary-unavailable">This account is currently unavailable.</div>}
          <p className="summary-disclaimer">By continuing, you agree to the applicable challenge terms and risk disclosure.</p>
        </aside>
      </div>}
    </main>
  )
}

export default function CheckoutPage() {
  return <Suspense fallback={<main className="checkout-page checkout-loading" aria-busy="true">Loading checkout...</main>}><CheckoutContent /></Suspense>
}
