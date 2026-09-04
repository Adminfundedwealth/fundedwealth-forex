'use client'

import { useEffect, useState } from 'react'
import { Activity, ArrowDown, ArrowRight, ArrowUp, AtSign, Award, BarChart3, Bell, BookOpen, Calculator, CalendarDays, Camera, Check, ChevronDown, ChevronRight, CircleDollarSign, Clock3, CreditCard, Download, ExternalLink, FileCheck2, Globe2, HelpCircle, LayoutDashboard, LineChart, LockKeyhole, LogOut, Mail, Menu, Monitor, Percent, Play, Receipt, Rocket, Share2, Settings, ShieldCheck, Smartphone, Target, TrendingUp, UsersRound, Wallet, Wrench, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { clearAuthSession, getAuthSession, type AuthSession } from '@/lib/auth-session'

const navGroups = [
  { label: 'MAIN', items: [['Dashboard', LayoutDashboard], ['My Accounts', Wallet], ['Trading Platform', Activity], ['Analytics', LineChart], ['Payouts', CircleDollarSign], ['Affiliate', UsersIcon]] },
  { label: 'ACCOUNT', items: [['KYC Verification', ShieldCheck], ['Calendar', CalendarDays], ['Billing', Receipt], ['Certificates', FileCheck2], ['Coupons', CreditCard]] },
  { label: 'SUPPORT', items: [['Help & Support', HelpCircle], ['Tools', Wrench], ['Rules', BookOpen], ['Settings', Settings]] },
] as const

function UsersIcon() { return <span className="dashboard-users-icon" aria-hidden="true" /> }

type TradingAccount = {
  name: string
  type: string
  balance: string
  equity: string
  profit: string
  status: string
}

function AccountsView({ account, onStartChallenge }: { account: TradingAccount | null; onStartChallenge: () => void }) {
  if (!account) return (
    <section className="accounts-view accounts-empty-view">
      <div className="accounts-empty-orbit" aria-hidden="true"><span><Wallet /></span><i /><i /><i /></div>
      <p className="accounts-eyebrow">MY ACCOUNTS / PORTFOLIO</p>
      <h1>No active accounts</h1>
      <p className="accounts-empty-copy">Start your first challenge and your trading accounts will show up here with their live stats.</p>
      <div className="accounts-empty-cta"><span>Don't have an account yet?</span><small>Trade up to $100,000 in simulated capital.</small><button type="button" onClick={onStartChallenge}><Rocket /> Buy Challenge</button></div>
    </section>
  )

  return (
    <section className="accounts-view accounts-detail-view">
      <div className="accounts-view-heading"><div><p className="accounts-eyebrow">MY ACCOUNTS / PORTFOLIO</p><h1>Your trading account</h1><span>Monitor your funded account performance from one place.</span></div><button type="button" onClick={onStartChallenge}><Rocket /> New Challenge</button></div>
      <article className="account-detail-card"><div className="account-detail-top"><div><small>ACCOUNT</small><h2>{account.name}</h2><span>{account.type}</span></div><b>{account.status}</b></div><div className="account-detail-metrics"><div><small>BALANCE</small><strong>{account.balance}</strong></div><div><small>EQUITY</small><strong>{account.equity}</strong></div><div><small>PROFIT</small><strong>{account.profit}</strong></div><div><small>PERFORMANCE</small><strong><TrendingUp /> On track</strong></div></div><div className="account-progress"><span><small>CHALLENGE PROGRESS</small><b>62%</b></span><i><em /></i></div></article>
    </section>
  )
}

const platformCards = [
  { name: 'MetaTrader 5 Desktop', description: 'Advanced charting, automated strategies and real-time quotes on Windows and Mac.', asset: '/assets/platforms/metatrader-5.png', Icon: Monitor, action: 'Download for Desktop', href: 'https://www.metatrader5.com/en/download', tone: 'available' },
  { name: 'MetaTrader 5 Mobile', description: 'Watch the markets, place orders and manage positions from your phone.', asset: '/assets/platforms/metatrader-5-icon.png', Icon: Smartphone, action: 'Download Mobile App', href: '/assets/platforms/metatrader-5-icon.png', tone: 'soon' },
  { name: 'MetaTrader 5 Web', description: 'Trade straight from the browser - nothing to download or install.', asset: '/assets/platforms/metatrader-5-wordmark.png', Icon: Globe2, action: 'Launch Web Terminal', href: 'https://web.metatrader.app/', tone: 'available' },
  { name: 'cTrader', description: 'A clean, fast trading workspace with advanced charts and professional order tools.', asset: '/assets/platforms/ctrader.svg', Icon: Monitor, action: 'Coming Soon', href: '#', tone: 'soon' },
  { name: 'DXtrade', description: 'A flexible multi-asset platform designed for clear execution and account control.', asset: '/assets/platforms/dxtrade.svg', Icon: Monitor, action: 'Coming Soon', href: '#', tone: 'soon' },
]

function TradingPlatformView() {
  return (
    <section className="platform-view">
      <div className="platform-view-heading"><div><p className="platform-view-eyebrow">TRADING PLATFORM / WORKSPACE</p><h1>Choose your trading platform.</h1><span>Connect with the platform experience configured for your program and keep your workflow familiar.</span></div><span className="platform-view-status"><i /> MT5 available</span></div>
      <div className="platform-view-grid">{platformCards.map(({ name, description, asset, Icon, action, href, tone }) => <article className={`platform-view-card is-${tone}`} key={name}><div className="platform-view-image"><img src={asset} alt={name} /></div><div className="platform-view-card-copy"><h2>{name}</h2><p>{description}</p></div><div className="platform-view-card-footer"><span><Icon /> {tone === 'soon' ? 'Coming soon' : 'Available'}</span>{tone === 'soon' ? <button type="button" disabled>Coming Soon</button> : <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{action}{href.startsWith('http') ? <ExternalLink /> : <Download />}</a>}</div></article>)}</div>
    </section>
  )
}

function AnalyticsView({ account, onStartChallenge }: { account: TradingAccount | null; onStartChallenge: () => void }) {
  if (!account) return (
    <section className="analytics-view analytics-empty-view">
      <div className="analytics-empty-icon"><LineChart /></div>
      <p className="analytics-eyebrow">ANALYTICS / PERFORMANCE</p>
      <h1>No performance data yet</h1>
      <p>Trading analytics will appear here once you activate an account and start building your trading record.</p>
      <button type="button" onClick={onStartChallenge}><Rocket /> Start a Challenge</button>
    </section>
  )

  return (
    <section className="analytics-view">
      <div className="analytics-view-heading"><div><p className="analytics-eyebrow">ANALYTICS / PERFORMANCE</p><h1>Performance overview</h1><span>Track your account results and trading progress.</span></div><b>{account.status}</b></div>
      <div className="analytics-metric-grid"><article><small>ACCOUNT BALANCE</small><strong>{account.balance}</strong><span>Current balance</span></article><article><small>EQUITY</small><strong>{account.equity}</strong><span>Available equity</span></article><article><small>PROFIT</small><strong>{account.profit}</strong><span>Account performance</span></article><article><small>WIN RATE</small><strong>0%</strong><span>More trades needed</span></article></div>
      <div className="analytics-chart-placeholder"><LineChart /><div><h2>Your performance chart</h2><p>Detailed equity and trading activity will appear as your account records trades.</p></div></div>
    </section>
  )
}

function PayoutsView() {
  return (
    <section className="payouts-view">
      <div className="payout-steps"><div className="payout-step is-active"><span><Wallet /></span><small>STEP 1</small><strong>Select Payout</strong></div><i /><div className="payout-step"><span><ArrowRight /></span><small>STEP 2</small><strong>Withdraw Amount</strong></div><i /><div className="payout-step"><span><Check /></span><small>STEP 3</small><strong>Success</strong></div></div>
      <div className="payout-wallet-grid"><article className="payout-wallet-card is-main"><div><small>MAIN WALLET</small><b>WLT-AXZ9SUK6</b><strong>0.00 USD</strong></div><div className="payout-wallet-actions"><button type="button"><CircleDollarSign /> Withdraw</button><button type="button"><span>+</span> Create Payout Request</button></div></article><article className="payout-wallet-card"><div><small>AFFILIATE WALLET</small><b>WLT-URSJ99B0</b><strong>0.00 USD</strong></div><div className="payout-wallet-actions"><button type="button"><CircleDollarSign /> Withdraw</button></div></article></div>
      <article className="payout-requests"><div className="payout-requests-heading"><h2>Payout Requests</h2><span>Total Approved Payouts <b>0.00 USD</b></span></div><div className="payout-empty"><span><Wallet /></span><h3>No payout requests yet</h3><p>Once a funded account is in profit you can request a payout, and every request will be listed here.</p></div></article>
    </section>
  )
}

function AffiliateView() {
  return (
    <section className="affiliate-view">
      <div className="affiliate-referral-banner"><div><small>Your Referral Link</small><strong>https://fundedwealth.com/ref/FW0000</strong><p>Share your unique referral link with other traders. Every successful sign-up helps you earn commission on funded plans.</p></div><div className="affiliate-share-actions"><button type="button"><Share2 /> Copy link</button><button type="button">WhatsApp</button><button type="button">Twitter</button><button type="button">Telegram</button></div></div>
      <div className="affiliate-stat-grid"><article><span><UsersRound /></span><small>Total Referrals</small><strong>0</strong></article><article><span><TrendingUp /></span><small>Active Traders</small><strong>0</strong></article><article><span><CircleDollarSign /></span><small>Total Earned</small><strong>$0</strong></article><article><span><Activity /></span><small>Pending Commission</small><strong>$0</strong></article><article><span><Zap /></span><small>Leaderboard Rank</small><strong>Top 100+</strong></article></div>
      <div className="affiliate-console-grid"><div><article className="affiliate-commission-card"><h2>Commission Structure</h2><div><section><small>LEVEL 1</small><strong>10%</strong><span>Direct plan fee commission</span></section><section><small>LEVEL 2</small><strong>5%</strong><span>Second-tier plan fee commission</span></section></div></article><article className="affiliate-traffic-card"><div><small>TOTAL CLICKS</small><strong>0</strong></div><div><small>UNIQUE VISITORS</small><strong>0</strong></div><div><small>CONVERSION RATE</small><strong>0%</strong></div></article><article className="affiliate-history-card"><div className="affiliate-card-heading"><div><h2>Referral History</h2><p>Date, plan, commission and status for your referred traders.</p></div><div className="affiliate-filter-tabs"><button className="is-active" type="button">All</button><button type="button">Pending</button><button type="button">Paid</button></div></div><div className="affiliate-table-heading"><span>DATE</span><span>NAME</span><span>PLAN</span><span>COMMISSION</span><span>STATUS</span></div><p className="affiliate-table-empty">No referrals found yet.</p></article><article className="affiliate-history-card affiliate-payout-history"><div className="affiliate-card-heading"><div><h2>Payout History</h2><p>Recent commission withdrawal requests and payout status.</p></div></div><div className="affiliate-table-heading"><span>DATE</span><span>AMOUNT</span><span>METHOD</span><span>STATUS</span></div><p className="affiliate-table-empty">No payout history available.</p></article></div><aside className="affiliate-qr-card"><h2>Referral QR Code</h2><img className="affiliate-qr-image" src="https://quickchart.io/qr?size=280&amp;margin=2&amp;text=https%3A%2F%2Ffundedwealth.com%2Fref%2FFW0000" alt="QR code for the FundedWealth referral link" /><p>Scan this QR code to open your referral link instantly.</p></aside></div>
    </section>
  )
}

function SupportView() {
  const quickLinks = ['How do payouts work?', 'Drawdown & rules explained', 'Scaling plan', 'KYC step-by-step', 'Refund policy', 'Affiliate programme']
  return (
    <section className="support-view">
      <div className="support-view-heading"><p className="support-eyebrow">HELP & SUPPORT / CONTACT</p><h1>Help & Support</h1><span>Our support team is online 7 days a week. Most replies arrive within 12 hours.</span></div>
      <div className="support-contact-grid"><article><span><HelpCircle /></span><h2>Live Chat</h2><p>Quick questions, instant answers and help with your account.</p><a href="#chat">Open chat <ArrowRight /></a></article><article><span><Mail /></span><h2>Email</h2><p>support@fundedwealth.com for KYC, payouts, billing, or attachments.</p><a href="mailto:support@fundedwealth.com">Email us <ArrowRight /></a></article><article><span><UsersRound /></span><h2>WhatsApp</h2><p>Trading-hour priority support for the fastest response.</p><a href="https://wa.me/" target="_blank" rel="noreferrer">Open WhatsApp <ArrowRight /></a></article></div>
      <article className="support-links-card"><h2>Quick links</h2><p>Most-asked answers from across the platform.</p><div>{quickLinks.map((link) => <button type="button" key={link}>{link}<ChevronRight /></button>)}</div></article>
      <article className="support-premium"><div><ShieldCheck /><div><small>PREMIUM SUPPORT</small><h2>Premium one-on-one support</h2><p>Funded traders unlock dedicated support and a named account manager.</p></div></div><a href="mailto:support@fundedwealth.com">Contact support <ArrowRight /></a></article>
      <article className="support-tickets"><div><h2>Support Tickets</h2><button type="button"><span>+</span> New Ticket</button></div><div className="support-ticket-empty"><HelpCircle /><h3>No tickets yet</h3><p>Open a ticket and the support team will pick it up from here.</p><button type="button">Open your first ticket</button></div></article>
    </section>
  )
}

function CertificatesView() {
  return (
    <section className="certificates-view">
      <h1>Certificates</h1>
      <article className="certificate-steps"><h2><Award /> How to Earn Certificates</h2><div><section><span><Target /></span><div><small>Step 1</small><strong>Pass a Challenge</strong><p>Complete a funded challenge and meet all trading objectives.</p></div></section><section><span><TrendingUp /></span><div><small>Step 2</small><strong>Hit Your Profit Target</strong><p>Reach the required profit target while staying within drawdown limits.</p></div></section><section><span><Award /></span><div><small>Step 3</small><strong>Receive Your Certificate</strong><p>Your achievement certificate will be issued and available to download here.</p></div></section></div></article>
      <h2 className="certificates-locked-heading"><LockKeyhole /> Locked</h2>
      <article className="certificate-locked-card"><div className="certificate-preview"><span><LockKeyhole /></span><b>Locked</b></div><div><h2><Award /> Passed Evaluation</h2><p>Awarded when a trader successfully passes the evaluation phase.</p></div></article>
    </section>
  )
}

function BillingView({ account, onBrowseChallenges }: { account: TradingAccount | null; onBrowseChallenges: () => void }) {
  const [activeTab, setActiveTab] = useState('All')
  const payment = account ? { id: 'FW-' + account.name.replace(/\s+/g, '-').toUpperCase(), plan: account.type, package: account.name, method: 'Card / Online payment', price: account.balance, fee: '$0.00', status: 'Paid' } : null
  return (
    <section className="billing-view">
      <div className="billing-view-heading"><div><p className="billing-eyebrow">ACCOUNT / PAYMENTS</p><h1>Billing</h1><span>Review your challenge purchases, payment status, and invoices.</span></div><button type="button"><Receipt /> Payment methods</button></div>
      <div className="billing-tabs">{['All', 'Pending', 'Paid'].map((tab) => <button className={activeTab === tab ? 'is-active' : ''} type="button" onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}</div>
      <article className="billing-table-card"><div className="billing-table-header"><h2>Payment history</h2><span>{activeTab} payments</span></div>{payment ? <div className="billing-table"><div className="billing-table-row billing-table-labels"><span>PAYMENT ID</span><span>PLAN</span><span>PACKAGE</span><span>METHOD</span><span>PRICE</span><span>FEE</span><span>STATUS</span><span /></div><div className="billing-table-row"><span>{payment.id}</span><strong>{payment.plan}</strong><span>{payment.package}</span><span>{payment.method}</span><span>{payment.price}</span><span>{payment.fee}</span><b>{payment.status}</b><button type="button">Invoice</button></div></div> : <div className="billing-empty"><span><Receipt /></span><h3>No billing records yet</h3><p>Your challenge payments and invoices will appear here after you complete a purchase.</p><button type="button" onClick={onBrowseChallenges}>Browse Challenges <ArrowRight /></button></div>}</article>
    </section>
  )
}

function KycView({ account, onBrowseChallenges }: { account: TradingAccount | null; onBrowseChallenges: () => void }) {
  return (
    <section className="kyc-view">
      <div className="kyc-view-heading"><p className="kyc-eyebrow">ACCOUNT / VERIFICATION</p><h1>KYC Verification</h1><span>Complete your identity verification to unlock payouts and higher account limits.</span></div>
      <article className="kyc-status-card"><div><span><Clock3 /></span><div><strong>{account ? 'Ready to Start' : 'Not Started'}</strong><p>{account ? 'Complete the form below to start your verification.' : 'KYC verification becomes available after your first challenge or funded account is activated.'}</p></div></div><b>{account ? 'Available' : 'Locked'}</b></article>
      <article className={`kyc-empty-card${account ? ' is-ready' : ''}`}><span><LockKeyhole /></span><h2>{account ? 'Verification Available' : 'KYC Not Available Yet'}</h2><p>{account ? 'Verify your identity to unlock payouts and higher account limits.' : 'KYC verification becomes available after your first Challenge or Instant Funding account is activated.'}</p><button type="button" onClick={onBrowseChallenges}>{account ? 'Start Verification' : 'Browse Challenges'} <ArrowRight /></button></article>
    </section>
  )
}

function SecuritySettingsView() {
  return <article className="settings-extra-card"><div className="settings-extra-heading"><ShieldCheck /><div><h2>Change Password</h2><p>Choose a strong password with at least 8 characters.</p></div></div><div className="settings-extra-fields"><label>CURRENT PASSWORD<input type="password" placeholder="Enter current password" /></label><label>NEW PASSWORD<input type="password" placeholder="At least 8 characters" /></label><label>CONFIRM NEW PASSWORD<input type="password" placeholder="Repeat new password" /></label></div><button className="settings-extra-button" type="button">Update Password</button></article>
}

function FeatureSuggestionsView() {
  return <article className="settings-extra-card suggestion-card"><div className="settings-extra-heading"><Zap /><div><h2>Feature Suggestion</h2><p>Tell us what would make your trading workspace better.</p></div></div><div className="settings-extra-fields"><label>FEATURE TITLE<input placeholder="Brief title for your suggestion" /></label><label>CATEGORY<select defaultValue=""><option value="">Select a category</option><option>Dashboard</option><option>Trading tools</option><option>Payments</option><option>Community</option></select></label><label className="suggestion-wide">DETAILED DESCRIPTION<textarea rows={3} placeholder="Describe your idea in detail. What problem does it solve?" /></label><label className="suggestion-wide">PRIORITY<select defaultValue=""><option value="">Select priority</option><option>Low</option><option>Medium</option><option>High</option></select></label></div><button className="settings-extra-button" type="button">Submit Suggestion</button></article>
}

function CommunitySettingsView() {
  const communities = [['Discord', 'FundedWealth community', 'Trade ideas, payout announcements and direct support from the team.', UsersRound], ['X', '@fundedwealthfx', 'Market notes, platform updates and payout milestones.', AtSign], ['YouTube', '@fundedwealth', 'Walkthroughs, trader interviews and challenge breakdowns.', Play], ['Instagram', '@fundedwealth', 'Payout proof, behind the scenes and community highlights.', Camera]] as const
  return <section className="community-settings-view"><div className="community-settings-heading"><p className="settings-eyebrow">COMMUNITY / STAY CONNECTED</p><h2>Join the community</h2><p>Follow along wherever you already spend your time.</p></div><div className="community-settings-grid">{communities.map(([name, handle, description, Icon]) => <article key={name}><span className={`community-icon community-icon-${name.toLowerCase()}`}><Icon /></span><div><h3>{name}</h3><small>{handle}</small></div><p>{description}</p><a href="#community">Open {name} <ArrowRight /></a></article>)}</div></section>
}

function SettingsVerificationView() {
  return <div className="verification-settings-view"><article className="verification-card"><div><Mail /><div><h2>Email Verification</h2><p>Your email address has been verified.</p></div></div><b>Verified</b></article><article className="verification-card"><div><ShieldCheck /><div><h2>KYC Verification</h2><p>Submit your documents to verify your identity and unlock full platform access.</p><button type="button"><ShieldCheck /> Verify Now</button></div></div><b className="is-pending">Not Verified</b></article><aside className="verification-progress-card"><h2>Verification Progress</h2><div><span className="is-complete"><Check /></span><div><strong>Email Verification</strong><small>Your email is verified</small></div></div><div><span><ShieldCheck /></span><div><strong>KYC Verification</strong><small>Not started</small></div></div></aside></div>
}

function SettingsProfileView({ session }: { session: AuthSession }) {
  const [firstName, setFirstName] = useState(session.firstName)
  const [lastName, setLastName] = useState('Singh')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('United States')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [saved, setSaved] = useState(false)
  return <div className="settings-layout"><article className="settings-form-card"><div className="settings-card-heading"><div><h2>Personal Information</h2><p>Update your personal details shown on your account.</p></div><span><Settings /></span></div><div className="settings-fields"><label>FIRST NAME<input value={firstName} onChange={(event) => setFirstName(event.target.value)} /></label><label>LAST NAME<input value={lastName} onChange={(event) => setLastName(event.target.value)} /></label><label>GENDER<select value={gender} onChange={(event) => setGender(event.target.value)}><option value="">Select gender</option><option>Male</option><option>Female</option><option>Prefer not to say</option></select></label><label>DATE OF BIRTH<input type="date" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} /></label><label>PHONE NUMBER<input value={phone} placeholder="Enter your phone number" onChange={(event) => setPhone(event.target.value)} /></label><label>ADDRESS<input value={address} placeholder="Enter your address" onChange={(event) => setAddress(event.target.value)} /></label><label>COUNTRY<select value={country} onChange={(event) => setCountry(event.target.value)}><option>United States</option><option>India</option><option>United Kingdom</option><option>Canada</option></select></label><label>CITY<input value={city} placeholder="Enter your city" onChange={(event) => setCity(event.target.value)} /></label><label>ZIP / POSTAL CODE<input value={postalCode} placeholder="Enter postal code" onChange={(event) => setPostalCode(event.target.value)} /></label></div><div className="settings-form-footer"><span>{saved ? 'Changes saved' : 'Keep your profile information up to date.'}</span><button type="button" onClick={() => setSaved(true)}>Save Changes</button></div></article><aside className="settings-side-card"><div className="settings-avatar">{firstName.charAt(0).toUpperCase()}</div><h2>{firstName || 'Trader'} {lastName}</h2><p>{session.email}</p><span>Profile account</span><div><small>ACCOUNT STATUS</small><strong>Active</strong></div><div><small>MEMBER SINCE</small><strong>2026</strong></div></aside></div>
}

function SettingsWorkspace({ session }: { session: AuthSession }) {
  const [tab, setTab] = useState<'profile' | 'verification' | 'security' | 'suggestions' | 'community'>('profile')
  const tabs = [['profile', 'Profile', Settings], ['verification', 'Verification', ShieldCheck], ['security', 'Security', LockKeyhole], ['suggestions', 'Feature Suggestions', Zap], ['community', 'Join Community', UsersRound]] as const
  return <section className="settings-view"><div className="settings-hero"><div><p className="settings-eyebrow">ACCOUNT / PERSONAL SETTINGS</p><h1>Settings</h1><span>Manage your complete profile details and account preferences.</span></div><div className="settings-profile-badge"><span>{session.firstName.charAt(0).toUpperCase()}</span><div><strong>{session.firstName || 'Trader'} Singh</strong><small>{session.email}</small></div></div></div><nav className="settings-tabs" aria-label="Settings sections">{tabs.map(([id, label, Icon]) => <button className={tab === id ? 'is-active' : ''} type="button" onClick={() => setTab(id)} key={id}><Icon /> {label}</button>)}</nav>{tab === 'profile' ? <SettingsProfileView session={session} /> : tab === 'verification' ? <SettingsVerificationView /> : tab === 'security' ? <SecuritySettingsView /> : tab === 'suggestions' ? <FeatureSuggestionsView /> : <CommunitySettingsView />}</section>
}

function ToolsView() {
  const [balance, setBalance] = useState(10000)
  const [risk, setRisk] = useState(1)
  const [entry, setEntry] = useState(1.085)
  const [stopLoss, setStopLoss] = useState(1.07957)
  const riskAmount = balance * risk / 100
  const stopDistance = Math.abs(entry - stopLoss)
  const lotSize = stopDistance > 0 ? riskAmount / (stopDistance * 100000) : 0
  return (
    <section className="tools-view"><div className="tools-view-heading"><p className="tools-eyebrow">TOOLS / RISK MANAGEMENT</p><h1>Position Calculator <small>BETA</small></h1><span>Work out your position size from the risk you are willing to take.</span></div><div className="tools-layout"><article className="tools-form-card"><label>INSTRUMENT<select><option>EUR/USD - Forex</option><option>GBP/USD - Forex</option><option>USD/JPY - Forex</option><option>XAU/USD - Metals</option></select></label><div className="tools-direction"><span>DIRECTION</span><div><button className="is-buy" type="button"><ArrowUp /> Buy</button><button type="button"><ArrowDown /> Sell</button></div></div><div className="tools-field-grid"><label>BALANCE<input type="number" value={balance} onChange={(event) => setBalance(Number(event.target.value))} /></label><label>RISK %<input type="number" min="0" step="0.1" value={risk} onChange={(event) => setRisk(Number(event.target.value))} /></label></div><div className="tools-quick-row"><span>QUICK BALANCE</span><button type="button" onClick={() => setBalance(5000)}>$5k</button><button className="is-selected" type="button" onClick={() => setBalance(10000)}>$10k</button><button type="button" onClick={() => setBalance(25000)}>$25k</button><button type="button" onClick={() => setBalance(50000)}>$50k</button></div><div className="tools-leverage"><span>LEVERAGE</span><div><button className="is-selected" type="button">1:100</button><button type="button">1:50</button><button type="button">1:30</button><button type="button">1:10</button></div></div><label>ENTRY<input type="number" step="0.00001" value={entry} onChange={(event) => setEntry(Number(event.target.value))} /></label><label className="tools-stop-label">STOP LOSS<input type="number" step="0.00001" value={stopLoss} onChange={(event) => setStopLoss(Number(event.target.value))} /></label><label>TAKE PROFIT <small>(optional)</small><input type="number" step="0.00001" defaultValue="1.09585" /></label></article><article className="tools-result-card"><div className="tools-result-icon"><Calculator /></div><p className="tools-eyebrow">CALCULATED POSITION</p><h2>{lotSize.toFixed(2)} lots</h2><p>Enter your trade details to size your position with a controlled risk plan.</p><div className="tools-result-metrics"><div><small>RISK AMOUNT</small><strong>${riskAmount.toFixed(2)}</strong></div><div><small>STOP DISTANCE</small><strong>{(stopDistance * 10000).toFixed(1)} pips</strong></div><div><small>RISK / REWARD</small><strong>Set take profit</strong></div></div></article></div></section>
  )
}

function SettingsView({ session }: { session: AuthSession }) {
  const [firstName, setFirstName] = useState(session.firstName)
  const [lastName, setLastName] = useState('Singh')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('United States')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [saved, setSaved] = useState(false)
  const [settingsTab, setSettingsTab] = useState<'profile' | 'verification' | 'security' | 'suggestions' | 'community'>('profile')
  return (
    <section className="settings-view"><div className="settings-hero"><div><p className="settings-eyebrow">ACCOUNT / PERSONAL SETTINGS</p><h1>Settings</h1><span>Manage your complete profile details and account preferences.</span></div><div className="settings-profile-badge"><span>{firstName.charAt(0).toUpperCase()}</span><div><strong>{firstName || 'Trader'} {lastName}</strong><small>{session.email}</small></div></div></div><div className="settings-tabs"><button className={settingsTab === 'profile' ? 'is-active' : ''} type="button" onClick={() => setSettingsTab('profile')}><Settings /> Profile</button><button className={settingsTab === 'verification' ? 'is-active' : ''} type="button" onClick={() => setSettingsTab('verification')}><ShieldCheck /> Verification</button></div>{settingsTab === 'profile' ? <div className="settings-layout"><article className="settings-form-card"><div className="settings-card-heading"><div><h2>Personal Information</h2><p>Update your personal details shown on your account.</p></div><span><Settings /></span></div><div className="settings-fields"><label>FIRST NAME<input value={firstName} onChange={(event) => setFirstName(event.target.value)} /></label><label>LAST NAME<input value={lastName} onChange={(event) => setLastName(event.target.value)} /></label><label>GENDER<select value={gender} onChange={(event) => setGender(event.target.value)}><option value="">Select gender</option><option>Male</option><option>Female</option><option>Prefer not to say</option></select></label><label>DATE OF BIRTH<input type="date" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} /></label><label>PHONE NUMBER<input value={phone} placeholder="Enter your phone number" onChange={(event) => setPhone(event.target.value)} /></label><label>ADDRESS<input value={address} placeholder="Enter your address" onChange={(event) => setAddress(event.target.value)} /></label><label>COUNTRY<select value={country} onChange={(event) => setCountry(event.target.value)}><option>United States</option><option>India</option><option>United Kingdom</option><option>Canada</option></select></label><label>CITY<input value={city} placeholder="Enter your city" onChange={(event) => setCity(event.target.value)} /></label><label>ZIP / POSTAL CODE<input value={postalCode} placeholder="Enter postal code" onChange={(event) => setPostalCode(event.target.value)} /></label></div><div className="settings-form-footer"><span>{saved ? 'Changes saved' : 'Keep your profile information up to date.'}</span><button type="button" onClick={() => setSaved(true)}>Save Changes</button></div></article><aside className="settings-side-card"><div className="settings-avatar">{firstName.charAt(0).toUpperCase()}</div><h2>{firstName || 'Trader'} {lastName}</h2><p>{session.email}</p><span>Profile account</span><div><small>ACCOUNT STATUS</small><strong>Active</strong></div><div><small>MEMBER SINCE</small><strong>2026</strong></div></aside></div> : <div className="verification-settings-view"><article className="verification-card"><div><Mail /><div><h2>Email Verification</h2><p>Your email address has been verified.</p></div></div><b>Verified</b></article><article className="verification-card"><div><ShieldCheck /><div><h2>KYC Verification</h2><p>Submit your documents to verify your identity and unlock full platform access.</p><button type="button"><ShieldCheck /> Verify Now</button></div></div><b className="is-pending">Not Verified</b></article><aside className="verification-progress-card"><h2>Verification Progress</h2><div><span className="is-complete"><Check /></span><div><strong>Email Verification</strong><small>Your email is verified</small></div></div><div><span><ShieldCheck /></span><div><strong>KYC Verification</strong><small>Not started</small></div></div></aside></div>}</section>
  )
}

export default function ForexDashboard() {
  const router = useRouter()
  const [session, setSession] = useState<AuthSession | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState<'dashboard' | 'accounts' | 'platform' | 'analytics' | 'payouts' | 'affiliate' | 'support' | 'certificates' | 'billing' | 'kyc' | 'tools' | 'settings'>('dashboard')
  const [account, setAccount] = useState<TradingAccount | null>(null)

  useEffect(() => {
    document.body.classList.add('dashboard-route')
    const current = getAuthSession()
    if (!current) router.replace('/login')
    setSession(current)
    const storedAccounts = window.localStorage.getItem('fundedwealth-accounts')
    if (storedAccounts) {
      try { setAccount(JSON.parse(storedAccounts) as TradingAccount) } catch { window.localStorage.removeItem('fundedwealth-accounts') }
    }
    return () => {
      document.body.classList.remove('dashboard-route')
    }
  }, [router])

  const logout = () => {
    clearAuthSession()
    router.replace('/login')
  }

  if (!session) return <main className="forex-dashboard dashboard-loading"><span>Loading dashboard...</span></main>

  const firstName = session.firstName || 'Trader'
  return (
    <main className="forex-dashboard">
      <div className={`dashboard-sidebar-shell${sidebarOpen ? ' is-open' : ''}`}>
        <aside className="dashboard-sidebar">
          <div className="dashboard-logo"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex" /><span>FUNDEDWEALTH <i>FOREX</i></span></div>
          <a className="dashboard-start-button" href="/#challenges"><Zap /> <span>Start Challenge</span></a>
          <nav className="dashboard-nav" aria-label="Dashboard navigation">
            {navGroups.map(({ label: group, items }) => <div className="dashboard-nav-group" key={group}><small>{group}</small>{items.map(([label, Icon]) => <a className={(label === 'Dashboard' && activePage === 'dashboard') || (label === 'My Accounts' && activePage === 'accounts') || (label === 'Trading Platform' && activePage === 'platform') || (label === 'Analytics' && activePage === 'analytics') || (label === 'Payouts' && activePage === 'payouts') || (label === 'Affiliate' && activePage === 'affiliate') || (label === 'Help & Support' && activePage === 'support') || (label === 'Certificates' && activePage === 'certificates') || (label === 'Billing' && activePage === 'billing') || (label === 'KYC Verification' && activePage === 'kyc') || (label === 'Tools' && activePage === 'tools') || (label === 'Settings' && activePage === 'settings') ? 'is-active' : ''} href={label === 'Rules' ? '/rules' : '#'} key={label as string} onClick={(event) => { if (label === 'Dashboard' || label === 'My Accounts' || label === 'Trading Platform' || label === 'Analytics' || label === 'Payouts' || label === 'Affiliate' || label === 'Help & Support' || label === 'Certificates' || label === 'Billing' || label === 'KYC Verification' || label === 'Tools' || label === 'Settings') { event.preventDefault(); setActivePage(label === 'My Accounts' ? 'accounts' : label === 'Trading Platform' ? 'platform' : label === 'Analytics' ? 'analytics' : label === 'Payouts' ? 'payouts' : label === 'Affiliate' ? 'affiliate' : label === 'Help & Support' ? 'support' : label === 'Certificates' ? 'certificates' : label === 'Billing' ? 'billing' : label === 'KYC Verification' ? 'kyc' : label === 'Tools' ? 'tools' : label === 'Settings' ? 'settings' : 'dashboard') }; setSidebarOpen(false) }}>{typeof Icon === 'function' && Icon.name === 'UsersIcon' ? <UsersIcon /> : <Icon />}<span>{label}</span></a>)}</div>)}
          </nav>
          <div className="dashboard-sidebar-bottom"><button type="button" onClick={logout}><LogOut /><span>Log out</span></button></div>
        </aside>
      </div>
      {sidebarOpen && <button className="dashboard-overlay" aria-label="Close dashboard navigation" onClick={() => setSidebarOpen(false)} />}
      <div className="dashboard-content">
        <header className="dashboard-topbar"><button className="dashboard-menu-button" aria-label="Open dashboard navigation" onClick={() => setSidebarOpen(true)}><Menu /></button><div className="dashboard-page-title"><span>Workspace</span><strong>Dashboard</strong></div><div className="dashboard-top-actions"><button aria-label="Language selector">EN <ChevronDown /></button><button aria-label="Notifications"><Bell /></button><div className="dashboard-user"><span className="dashboard-avatar">{firstName.charAt(0).toUpperCase()}</span><span><strong>{firstName} Singh</strong><small>{session.email}</small></span><ChevronRight /></div></div></header>
        {activePage === 'accounts' ? <section className="dashboard-main-content"><AccountsView account={account} onStartChallenge={() => router.push('/#challenges')} /></section> : activePage === 'platform' ? <section className="dashboard-main-content"><TradingPlatformView /></section> : activePage === 'analytics' ? <section className="dashboard-main-content"><AnalyticsView account={account} onStartChallenge={() => router.push('/#challenges')} /></section> : activePage === 'payouts' ? <section className="dashboard-main-content"><PayoutsView /></section> : activePage === 'affiliate' ? <section className="dashboard-main-content"><AffiliateView /></section> : activePage === 'support' ? <section className="dashboard-main-content"><SupportView /></section> : activePage === 'certificates' ? <section className="dashboard-main-content"><CertificatesView /></section> : activePage === 'billing' ? <section className="dashboard-main-content"><BillingView account={account} onBrowseChallenges={() => router.push('/#challenges')} /></section> : activePage === 'kyc' ? <section className="dashboard-main-content"><KycView account={account} onBrowseChallenges={() => router.push('/#challenges')} /></section> : activePage === 'tools' ? <section className="dashboard-main-content"><ToolsView /></section> : activePage === 'settings' ? <section className="dashboard-main-content"><SettingsWorkspace session={session} /></section> : <section className="dashboard-main-content">
          <div className="dashboard-welcome"><div className="dashboard-welcome-copy"><p>FUNDEDWEALTH FOREX / TRADER CONSOLE</p><h1>Welcome back, {firstName}.</h1><span>Track your trading performance, manage your funded accounts, and stay in control of your trading journey.</span><div><a className="dashboard-light-button" href="#accounts">View Accounts <ChevronRight /></a><a className="dashboard-ghost-button" href="/#challenges"><Zap /> Start Challenge</a></div></div><div className="dashboard-welcome-art" aria-hidden="true"><span className="dashboard-pair pair-one">EUR/USD <b>+0.42%</b></span><span className="dashboard-pair pair-two">XAU/USD <b>+1.18%</b></span><span className="dashboard-pair pair-three">GBP/USD <b>-0.18%</b></span></div></div>
          <div className="dashboard-stat-grid" id="accounts"><article><span className="dashboard-stat-icon stat-cyan"><Activity /></span><div><small>Total P&amp;L</small><strong>$0.00</strong><em>No trading activity yet</em></div></article><article><span className="dashboard-stat-icon stat-orange"><CircleDollarSign /></span><div><small>Total Payouts</small><strong>$0.00</strong><em>No payouts yet</em></div></article><article><span className="dashboard-stat-icon stat-blue"><BarChart3 /></span><div><small>Active Accounts</small><strong>0</strong><em>Start your first challenge</em></div></article><article><span className="dashboard-stat-icon stat-purple"><Percent /></span><div><small>Win Rate</small><strong>0%</strong><em>Build your record</em></div></article></div>
          <div className="dashboard-quick-grid">{[['Trading Rules', 'Review account rules', BookOpen, '/rules'], ['Trading Platform', 'Launch your trading terminal', Activity, '#platform'], ['Payouts', 'Track your rewards', Wallet, '#payouts'], ['Affiliate', 'Earn commissions', UsersIcon, '/affiliate'], ['Help Center', 'Get support anytime', HelpCircle, '/#footer']].map(([label, subtitle, Icon, href]) => <a className="dashboard-quick-card" href={href as string} key={label as string}>{typeof Icon === 'function' && Icon.name === 'UsersIcon' ? <UsersIcon /> : <Icon />}<span><strong>{label}</strong><small>{subtitle}</small></span><ChevronRight /></a>)}</div>
          <section className="dashboard-support"><div><ShieldCheck /><div><small>NEED A HAND?</small><h2>Help Center</h2><p>Get support for your account, rules, and trading journey.</p></div></div><a href="/#footer">Contact Support <ChevronRight /></a></section>
        </section>}
      </div>
    </main>
  )
}
