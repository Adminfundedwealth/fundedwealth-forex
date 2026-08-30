export const languages = [
  { code: 'en-US', locale: 'en', name: 'English', region: 'United States', flag: 'US' },
  { code: 'hi-IN', locale: 'hi', name: 'हिन्दी', region: 'India', flag: 'IN' },
  { code: 'id-ID', locale: 'id', name: 'Bahasa Indonesia', region: 'Indonesia', flag: 'ID' },
  { code: 'en-GB', locale: 'en-GB', name: 'English', region: 'United Kingdom', flag: 'GB' },
  { code: 'en-NG', locale: 'en-NG', name: 'English', region: 'Nigeria', flag: 'NG' },
  { code: 'it-IT', locale: 'it', name: 'Italiano', region: 'Italy', flag: 'IT' },
  { code: 'en-ZA', locale: 'en-ZA', name: 'English', region: 'South Africa', flag: 'ZA' },
  { code: 'ms-MY', locale: 'ms', name: 'Bahasa Melayu', region: 'Malaysia', flag: 'MY' },
  { code: 'en-CA', locale: 'en-CA', name: 'English / Français', region: 'Canada', flag: 'CA' },
  { code: 'de-DE', locale: 'de', name: 'Deutsch', region: 'Germany', flag: 'DE' },
  { code: 'en-AU', locale: 'en-AU', name: 'English', region: 'Australia', flag: 'AU' },
  { code: 'ur-PK', locale: 'ur', name: 'اردو', region: 'Pakistan', flag: 'PK' },
  { code: 'ar-AE', locale: 'ar', name: 'العربية', region: 'UAE', flag: 'AE' },
  { code: 'en-SG', locale: 'en-SG', name: 'English', region: 'Singapore', flag: 'SG' },
  { code: 'fil-PH', locale: 'fil', name: 'Filipino', region: 'Philippines', flag: 'PH' },
  { code: 'en-KE', locale: 'en-KE', name: 'English / Kiswahili', region: 'Kenya', flag: 'KE' },
  { code: 'pt-BR', locale: 'pt', name: 'Português', region: 'Brazil', flag: 'BR' },
  { code: 'bn-BD', locale: 'bn', name: 'বাংলা', region: 'Bangladesh', flag: 'BD' },
  { code: 'ja-JP', locale: 'ja', name: '日本語', region: 'Japan', flag: 'JP' },
  { code: 'vi-VN', locale: 'vi', name: 'Tiếng Việt', region: 'Vietnam', flag: 'VN' },
] as const

export type LanguageCode = typeof languages[number]['code']
export type TranslationKey = keyof typeof english

const english = {
  nav: { challenges: 'CHALLENGES', howItWorks: 'HOW IT WORKS', rules: 'RULES', platforms: 'PLATFORMS', faq: 'FAQ', community: 'COMMUNITY', portal: 'TRADER PORTAL', login: 'LOGIN / REGISTER', start: 'START CHALLENGE' },
  hero: { badge: 'YOUR TRUSTED TRADING PARTNER', title: 'Trade Bigger. Prove Your Edge. Build Your Capital.', text: 'Prove your trading edge through a transparent evaluation and access a professional simulated trading environment built around disciplined risk management.', start: 'START CHALLENGE', demo: 'WATCH DEMO', rules: 'TRADING RULES', trial: 'FREE TRIAL ACCOUNT' },
  challenges: { label: 'THE RIGHT FIT FOR YOUR EDGE', title: 'Choose Your Challenge.', text: 'Select the account size and evaluation model that fits your trading style.', account: 'ACCOUNT SIZE', selected: 'SELECTED ACCOUNT', fee: 'ONE-TIME FEE', base: 'BASE PRICE', total: 'TOTAL PRICE', offer: 'LIMITED TIME OFFER' },
  checkout: { back: 'Back to challenges', configure: 'Configure', verify: 'Verify', pay: 'Pay', kicker: 'SECURE CHALLENGE CONFIGURATION', title: 'Choose your account.', lead: 'Configure your FundedWealth Forex challenge before payment.', challengeType: 'Challenge type', accountSize: 'Account size', available: 'available', platform: 'Select your trading platform', preference: 'Select your preference', choose: 'Choose one', addons: 'Select add-ons', optional: 'Optional', transparent: 'Transparent pricing', transparentText: 'Your total is calculated from the same FundedWealth pricing configuration used on the challenge page.', summary: 'ORDER SUMMARY', secure: 'SECURE', selectedChallenge: 'SELECTED CHALLENGE', challengeDetails: 'Challenge details', pricingStatus: 'Pricing status', active: 'Active', payment: 'Payment', oneTime: 'One-time fee', notSelected: 'Not selected', unavailable: 'This account is currently unavailable.', continueVerify: 'CONTINUE TO VERIFY', billing: 'Billing Details', titleField: 'Title', firstName: 'First Name', lastName: 'Last Name', street: 'Street', city: 'City', postalCode: 'Postal Code', country: 'Country', phone: 'Phone Number', email: 'Email', billingHelp: 'A secure link to set your dashboard password will be emailed after payment.', proceed: 'Proceed To Pay', beforeProceed: 'Before you proceed', agreeRules: 'Please agree to the trading rules', agree: 'I Agree', paymentMethod: 'Select Payment Method', ready: 'READY TO PAY', readyText: 'Your verified challenge configuration is ready for secure payment.', addonsLabel: 'Add-ons', securePayment: 'Secure Payment', encrypted: '256-bit SSL Encrypted', verification: 'Instant Verification', confirmation: 'Auto-confirmation', continuePayment: 'Continue To Payment', compliance: 'Compliance Disclosure' },
  faq: { label: 'NO NOISE, JUST ANSWERS', title: 'Frequently asked.', intro: 'Everything you need to make a confident decision about your next challenge.' },
} as const

const overrides: Partial<Record<LanguageCode, Partial<typeof english>>> = {
  'hi-IN': { nav: { ...english.nav, challenges: 'चुनौतियां', rules: 'नियम', start: 'चुनौती शुरू करें' }, hero: { ...english.hero, badge: 'आपका विश्वसनीय ट्रेडिंग पार्टनर', title: 'बड़ा ट्रेड करें। अपनी क्षमता साबित करें।', text: 'पारदर्शी मूल्यांकन के माध्यम से अपनी ट्रेडिंग क्षमता साबित करें।', start: 'चुनौती शुरू करें' }, checkout: { ...english.checkout, title: 'अपना अकाउंट चुनें।', lead: 'भुगतान से पहले अपनी चुनौती कॉन्फ़िगर करें।', billing: 'बिलिंग विवरण', proceed: 'भुगतान पर जाएं' } },
  'de-DE': { nav: { ...english.nav, challenges: 'HERAUSFORDERUNGEN', rules: 'REGELN', start: 'CHALLENGE STARTEN' }, hero: { ...english.hero, badge: 'IHR VERTRAUENSWÜRDIGER TRADING-PARTNER', title: 'Größer handeln. Ihre Stärke beweisen.', start: 'CHALLENGE STARTEN' }, checkout: { ...english.checkout, title: 'Wählen Sie Ihr Konto.', billing: 'Rechnungsdaten', paymentMethod: 'Zahlungsmethode wählen', proceed: 'Weiter zur Zahlung' } },
  'pt-BR': { nav: { ...english.nav, challenges: 'DESAFIOS', rules: 'REGRAS', start: 'INICIAR DESAFIO' }, hero: { ...english.hero, badge: 'SEU PARCEIRO DE TRADING', title: 'Opere maior. Prove sua vantagem.', start: 'INICIAR DESAFIO' }, checkout: { ...english.checkout, title: 'Escolha sua conta.', billing: 'Dados de cobrança', proceed: 'Prosseguir para pagamento' } },
  'ar-AE': { nav: { ...english.nav, challenges: 'التحديات', rules: 'القواعد', start: 'ابدأ التحدي' }, hero: { ...english.hero, badge: 'شريك التداول الموثوق', title: 'تداول بشكل أكبر. أثبت قوتك.', start: 'ابدأ التحدي' }, checkout: { ...english.checkout, title: 'اختر حسابك.', lead: 'قم بإعداد تحدي FundedWealth Forex قبل الدفع.', billing: 'تفاصيل الفوترة', proceed: 'المتابعة إلى الدفع', agree: 'أوافق' } },
  'ja-JP': { nav: { ...english.nav, challenges: 'チャレンジ', rules: 'ルール', start: 'チャレンジを開始' }, hero: { ...english.hero, badge: '信頼できるトレーディングパートナー', title: 'より大きく取引し、実力を証明する。', start: 'チャレンジを開始' }, checkout: { ...english.checkout, title: '口座を選択してください。', billing: '請求先情報', proceed: '支払いへ進む' } },
  'id-ID': { nav: { ...english.nav, challenges: 'TANTANGAN', rules: 'ATURAN', start: 'MULAI TANTANGAN' }, hero: { ...english.hero, badge: 'MITRA TRADING TERPERCAYA', title: 'Trading lebih besar. Buktikan keunggulan Anda.', start: 'MULAI TANTANGAN' }, checkout: { ...english.checkout, title: 'Pilih akun Anda.', billing: 'Detail Penagihan', proceed: 'Lanjutkan ke Pembayaran' } },
  'it-IT': { nav: { ...english.nav, challenges: 'SFIDE', rules: 'REGOLE', start: 'INIZIA SFIDA' }, hero: { ...english.hero, badge: 'IL TUO PARTNER DI TRADING', title: 'Fai trading più grande. Dimostra il tuo vantaggio.', start: 'INIZIA SFIDA' }, checkout: { ...english.checkout, title: 'Scegli il tuo account.', billing: 'Dati di fatturazione', proceed: 'Procedi al pagamento' } },
  'vi-VN': { nav: { ...english.nav, challenges: 'THỬ THÁCH', rules: 'QUY TẮC', start: 'BẮT ĐẦU THỬ THÁCH' }, hero: { ...english.hero, badge: 'ĐỐI TÁC GIAO DỊCH ĐÁNG TIN CẬY', title: 'Giao dịch lớn hơn. Chứng minh lợi thế.', start: 'BẮT ĐẦU THỬ THÁCH' }, checkout: { ...english.checkout, title: 'Chọn tài khoản của bạn.', billing: 'Thông tin thanh toán', proceed: 'Tiếp tục thanh toán' } },
}

export function getLanguage(code: LanguageCode) { return languages.find((language) => language.code === code) ?? languages[0] }
export function getBrowserLanguage(): LanguageCode {
  if (typeof navigator === 'undefined') return 'en-US'
  const browserLanguage = navigator.language.toLowerCase()
  const exact = languages.find((language) => browserLanguage === language.code.toLowerCase())
  const match = exact ?? languages.find((language) => browserLanguage.startsWith(`${language.code.toLowerCase().split('-')[0]}-`))
  return match?.code ?? 'en-US'
}

export function getTranslations(code: LanguageCode) {
  const override = overrides[code] ?? {}
  return { ...english, ...override, nav: { ...english.nav, ...override.nav }, hero: { ...english.hero, ...override.hero }, challenges: { ...english.challenges, ...override.challenges }, checkout: { ...english.checkout, ...override.checkout }, faq: { ...english.faq, ...override.faq } }
}
