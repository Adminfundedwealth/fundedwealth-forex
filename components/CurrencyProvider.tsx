'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ChevronDown, Coins } from 'lucide-react'
import { currencyByCode, currencyByRegion, currencyOptions, fallbackRates, formatCurrencyValue, getCurrencyFromLocale, type CurrencyCode, type CurrencyOption } from '@/lib/currency'

type CurrencyContextValue = { currency: CurrencyCode; region: string; setCurrency: (currency: CurrencyCode) => void; setCurrencyOption: (option: CurrencyOption) => void; formatCurrency: (value: number) => string; usdReference: (value: number) => string; ratesReady: boolean }
const CurrencyContext = createContext<CurrencyContextValue | null>(null)
const STORAGE_KEY = 'fundedwealth-currency'
const REGION_KEY = 'fundedwealth-currency-region'
const RATES_KEY = 'fundedwealth-currency-rates'
const RATE_TTL = 15 * 60 * 1000

type StoredRates = { rates: Record<CurrencyCode, number>; savedAt: number }

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD')
  const [region, setRegion] = useState('US')
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(fallbackRates)
  const [ratesReady, setRatesReady] = useState(false)
  const setCurrency = useCallback((next: CurrencyCode) => { const nextRegion = Object.entries(currencyByRegion).find(([, value]) => value === next)?.[0] ?? 'US'; setCurrencyState(next); setRegion(nextRegion); window.localStorage.setItem(STORAGE_KEY, next); window.localStorage.setItem(REGION_KEY, nextRegion) }, [])
  const setCurrencyOption = useCallback((option: CurrencyOption) => { setCurrencyState(option.currency); setRegion(option.region); window.localStorage.setItem(STORAGE_KEY, option.currency); window.localStorage.setItem(REGION_KEY, option.region) }, [])

  useEffect(() => {
    const storedCurrency = window.localStorage.getItem(STORAGE_KEY) as CurrencyCode | null
    const supported = storedCurrency && currencyByCode[storedCurrency] ? storedCurrency : getCurrencyFromLocale(navigator.language)
    setCurrencyState(supported)
    const storedRegion = window.localStorage.getItem(REGION_KEY)
    setRegion(storedRegion && currencyByRegion[storedRegion] === supported ? storedRegion : Object.entries(currencyByRegion).find(([, value]) => value === supported)?.[0] ?? 'US')

    let cached: StoredRates | null = null
    try { cached = JSON.parse(window.localStorage.getItem(RATES_KEY) || 'null') as StoredRates | null } catch { cached = null }
    if (cached?.rates && Number.isFinite(cached.rates.USD)) setRates({ ...fallbackRates, ...cached.rates })
    setRatesReady(true)

    const refresh = async () => {
      try {
        const response = await fetch('https://api.frankfurter.app/latest?from=USD', { cache: 'no-store' })
        if (!response.ok) throw new Error('Exchange rate request failed')
        const data = await response.json() as { rates?: Record<string, number> }
        const nextRates = { ...fallbackRates, ...Object.fromEntries(Object.entries(data.rates || {}).filter(([code, value]) => code in fallbackRates && Number.isFinite(value))) } as Record<CurrencyCode, number>
        setRates(nextRates)
        window.localStorage.setItem(RATES_KEY, JSON.stringify({ rates: nextRates, savedAt: Date.now() } satisfies StoredRates))
      } catch {
        // The cached or bundled rates keep pricing usable when the provider is unavailable.
      }
    }
    if (!cached || Date.now() - cached.savedAt > RATE_TTL) void refresh()
  }, [])

  const value = useMemo<CurrencyContextValue>(() => ({
    currency,
    region,
    setCurrency,
    setCurrencyOption,
    formatCurrency: (amount) => formatCurrencyValue(amount, currency, rates),
    usdReference: (amount) => formatCurrencyValue(amount, 'USD', rates),
    ratesReady,
  }), [currency, region, rates, ratesReady, setCurrency, setCurrencyOption])

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) throw new Error('useCurrency must be used inside CurrencyProvider')
  return context
}

export function CurrencySwitcher() {
  const { currency, region, setCurrencyOption } = useCurrency()
  const [open, setOpen] = useState(false)
  const selected = currencyOptions.find((option) => option.region === region) ?? currencyByCode[currency]
  const flagAsset = (countryCode: string) => `/flags/${countryCode.toLowerCase()}.svg`

  useEffect(() => {
    const close = (event: MouseEvent) => { if (!(event.target as HTMLElement).closest('.currency-switcher')) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return <div className="currency-switcher">
    <button className="currency-trigger" type="button" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((value) => !value)}>
      <Coins aria-hidden="true" /><span className="currency-selected-value"><img src={flagAsset(selected.region)} alt="" /> <strong>{selected.region}</strong> <span>{selected.currency}</span> <b>{selected.symbol}</b></span><ChevronDown className={open ? 'is-open' : ''} aria-hidden="true" />
    </button>
    {open && <div className="currency-menu" role="listbox" aria-label="Select currency">
      <div className="currency-menu-heading"><Coins aria-hidden="true" /><span>Select currency</span></div>
      {currencyOptions.map((option) => <button key={option.region} type="button" role="option" aria-selected={region === option.region} className={region === option.region ? 'is-selected' : ''} onClick={() => { setCurrencyOption(option); setOpen(false) }}>
        <span className="currency-flag"><img src={flagAsset(option.region)} alt="" /></span><strong>{option.region}</strong><span className="currency-code">{option.currency}</span><b>{option.symbol}</b>
      </button>)}
    </div>}
  </div>
}
