'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getBrowserLanguage, getLanguage, getTranslations, languages, type LanguageCode } from '@/lib/i18n'
import { ChevronDown, Globe2 } from 'lucide-react'

type Translations = ReturnType<typeof getTranslations>
type LanguageContextValue = { language: LanguageCode; setLanguage: (language: LanguageCode) => void; t: Translations }
const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = 'fundedwealth-language'
const flagAsset = (countryCode: string) => `/flags/${countryCode.toLowerCase()}.svg`

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en-US')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null
    const supported = stored && languages.some((option) => option.code === stored) ? stored : getBrowserLanguage()
    setLanguageState(supported)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    const selected = getLanguage(language)
    document.documentElement.lang = selected.locale
    document.documentElement.dir = selected.locale === 'ar' ? 'rtl' : 'ltr'
  }, [language, ready])

  const setLanguage = (next: LanguageCode) => {
    setLanguageState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t: getTranslations(language) }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const selected = getLanguage(language)

  useEffect(() => {
    const close = (event: MouseEvent) => { if (!(event.target as HTMLElement).closest('.language-switcher')) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return <div className="language-switcher">
    <button className="language-trigger" type="button" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((value) => !value)}>
      <Globe2 aria-hidden="true" /><img src={flagAsset(selected.flag)} alt="" /><span>{selected.name}</span><ChevronDown className={open ? 'is-open' : ''} aria-hidden="true" />
    </button>
    {open && <div className="language-menu" role="listbox" aria-label="Select language">
      {languages.map((option) => <button key={option.code} type="button" role="option" aria-selected={language === option.code} className={language === option.code ? 'is-selected' : ''} onClick={() => { setLanguage(option.code); setOpen(false) }}>
        <span className="language-flag"><img src={flagAsset(option.flag)} alt="" /></span><span>{option.name}</span><small>{option.region}</small>
      </button>)}
    </div>}
  </div>
}
