import { languages } from './i18n'

const currencyDetails = {
  US: { currency: 'USD', symbol: '$', name: 'US Dollar' }, IN: { currency: 'INR', symbol: '₹', name: 'Indian Rupee' }, ID: { currency: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' }, GB: { currency: 'GBP', symbol: '£', name: 'British Pound' }, NG: { currency: 'NGN', symbol: '₦', name: 'Nigerian Naira' }, IT: { currency: 'EUR', symbol: '€', name: 'Euro' }, ZA: { currency: 'ZAR', symbol: 'R', name: 'South African Rand' }, MY: { currency: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' }, CA: { currency: 'CAD', symbol: '$', name: 'Canadian Dollar' }, DE: { currency: 'EUR', symbol: '€', name: 'Euro' }, AU: { currency: 'AUD', symbol: 'A$', name: 'Australian Dollar' }, PK: { currency: 'PKR', symbol: '₨', name: 'Pakistani Rupee' }, AE: { currency: 'AED', symbol: 'د.إ', name: 'UAE Dirham' }, SG: { currency: 'SGD', symbol: 'S$', name: 'Singapore Dollar' }, PH: { currency: 'PHP', symbol: '₱', name: 'Philippine Peso' }, KE: { currency: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' }, BR: { currency: 'BRL', symbol: 'R$', name: 'Brazilian Real' }, BD: { currency: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' }, JP: { currency: 'JPY', symbol: '¥', name: 'Japanese Yen' }, VN: { currency: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
} as const

const countryFlag = (countryCode: string) => String.fromCodePoint(...countryCode.split('').map((character) => 127397 + character.charCodeAt(0)))
export type CurrencyCode = typeof currencyDetails[keyof typeof currencyDetails]['currency']
export type CurrencyOption = { region: string; currency: CurrencyCode; symbol: string; flag: string; name: string }
export const currencyRegions: CurrencyOption[] = languages.map(({ flag }) => ({ region: flag, flag: countryFlag(flag), ...currencyDetails[flag as keyof typeof currencyDetails] }))

export const currencyOptions = currencyRegions
export const currencyByCode = Object.fromEntries(currencyRegions.map((option) => [option.currency, option])) as Record<CurrencyCode, CurrencyOption>
export const currencyByRegion = Object.fromEntries(currencyRegions.map((option) => [option.region, option.currency])) as Record<string, CurrencyCode>

export const fallbackRates: Record<CurrencyCode, number> = {
  USD: 1, INR: 86.5, IDR: 16250, GBP: 0.78, NGN: 1535, EUR: 0.86, ZAR: 17.7, MYR: 4.25,
  CAD: 1.38, AUD: 1.53, PKR: 284, AED: 3.6725, SGD: 1.29, PHP: 57.4, KES: 129, BRL: 5.42,
  BDT: 121, JPY: 148, VND: 26350,
}

export const currencyLocale: Record<CurrencyCode, string> = {
  USD: 'en-US', INR: 'en-IN', IDR: 'id-ID', GBP: 'en-GB', NGN: 'en-NG', EUR: 'de-DE', ZAR: 'en-ZA', MYR: 'ms-MY',
  CAD: 'en-CA', AUD: 'en-AU', PKR: 'ur-PK', AED: 'ar-AE', SGD: 'en-SG', PHP: 'en-PH', KES: 'en-KE', BRL: 'pt-BR',
  BDT: 'bn-BD', JPY: 'ja-JP', VND: 'vi-VN',
}

export function getCurrencyFromLocale(locale: string): CurrencyCode {
  const region = locale.split('-')[1]?.toUpperCase()
  return region && currencyByRegion[region] ? currencyByRegion[region] : 'USD'
}

export function formatCurrencyValue(value: number, currency: CurrencyCode, rates: Record<CurrencyCode, number>): string {
  const converted = value * (rates[currency] || 1)
  if (!Number.isFinite(converted)) return new Intl.NumberFormat(currencyLocale[currency], { style: 'currency', currency }).format(value)
  return new Intl.NumberFormat(currencyLocale[currency], { style: 'currency', currency, minimumFractionDigits: currency === 'JPY' || currency === 'VND' ? 0 : 2, maximumFractionDigits: currency === 'JPY' || currency === 'VND' ? 0 : 2 }).format(converted)
}
