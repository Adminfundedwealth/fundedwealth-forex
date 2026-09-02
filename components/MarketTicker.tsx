'use client'

import { useEffect, useRef, useState } from 'react'
import { getMarketData, formatPrice, formatChangePercent, type MarketInstrument } from '@/lib/market-data'
import { TrendingDown, TrendingUp } from 'lucide-react'

type TickedInstrument = MarketInstrument & { status?: 'up' | 'down' }

export default function MarketTicker({ className = '' }: { className?: string }) {
  const [prices, setPrices] = useState<TickedInstrument[]>(() => getMarketData().instruments)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const tickerRef = useRef<HTMLDivElement>(null)

  // TODO: Connect to WebSocket/REST API (e.g., Polygon.io or Twelve Data) for live market prices before production launch.
  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr')
    const symbols = new Map([
      ['BTCUSDT', ['BTCUSD', 'BTC/USD']],
      ['ETHUSDT', ['ETHUSD', 'ETH/USD']],
      ['BNBUSDT', ['BNBUSD', 'BNB/USD']],
      ['SOLUSDT', ['SOLUSD', 'SOL/USD']],
      ['XRPUSDT', ['XRPUSD', 'XRP/USD']],
    ])

    ws.onmessage = (event) => {
      const updates = JSON.parse(event.data) as Array<{ s: string; c: string; o: string; P?: string }>
      const liveUpdates = updates.filter((update) => symbols.has(update.s))
      if (!liveUpdates.length) return

      setPrices((currentPrices) => {
        const nextPrices = [...currentPrices]
        liveUpdates.forEach((update) => {
          const mapping = symbols.get(update.s)
          if (!mapping) return
          const [symbol, displayName] = mapping
          const price = Number(update.c)
          const openPrice = Number(update.o)
          if (!Number.isFinite(price) || !Number.isFinite(openPrice)) return
          const existingIndex = nextPrices.findIndex((instrument) => instrument.symbol === symbol)
          const previousPrice = existingIndex >= 0 ? nextPrices[existingIndex].price : price
          const change = price - openPrice
          const changePercent = Number.isFinite(Number(update.P)) ? Number(update.P) : (change / openPrice) * 100
          const instrument: TickedInstrument = {
            ...(existingIndex >= 0 ? nextPrices[existingIndex] : {
              symbol,
              displayName,
              change: 0,
              changePercent: 0,
              timestamp: 0,
              marketStatus: 'OPEN' as const,
            }),
            price,
            change,
            changePercent,
            timestamp: Date.now(),
            marketStatus: 'OPEN',
            status: price === previousPrice ? undefined : price > previousPrice ? 'up' : 'down',
          }
          if (existingIndex >= 0) nextPrices[existingIndex] = instrument
          else nextPrices.push(instrument)
        })
        return nextPrices
      })
    }

    return () => ws.close()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPrices((currentPrices) => currentPrices.some((instrument) => instrument.status)
        ? currentPrices.map((instrument) => ({ ...instrument, status: undefined }))
        : currentPrices)
    }, 500)

    return () => clearTimeout(timeout)
  }, [prices])

  // Check for prefers-reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div
      className={`market-ticker absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/10 bg-[#0B0F19] z-30${isPaused ? ' is-paused' : ''}${prefersReducedMotion ? ' prefers-reduced-motion' : ''}${className ? ` ${className}` : ''}`}
      role="region"
      aria-label="Live market ticker"
      aria-live="polite"
      aria-atomic="false"
    >
      <div
        className="market-ticker-wrap overflow-hidden w-full"
        ref={tickerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="market-ticker-track flex w-max animate-ticker">
          {[0, 1].map((copy) => (
            <div key={copy} className="market-instruments-group" aria-hidden={copy === 1 ? true : undefined}>
              {prices.map((instrument) => (
                <MarketInstrumentTile key={`${copy}-${instrument.symbol}`} instrument={instrument} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MarketInstrumentTile({ instrument }: { instrument: TickedInstrument }) {
  const isOpen = instrument.marketStatus === 'OPEN'
  const isPositive = instrument.changePercent >= 0
  const isNeutral = instrument.changePercent === 0

  return (
    <div
      className={`market-tile market-tile-${instrument.symbol.toLowerCase()}${isPositive ? ' is-positive' : ''}${isNeutral ? ' is-neutral' : ' is-negative'}`}
      title={`${instrument.displayName}: ${formatPrice(instrument.price)} (${formatChangePercent(instrument.changePercent)})`}
    >
      <InstrumentIcon instrument={instrument} />

      {/* Symbol and Price */}
      <div className="market-tile-content">
        <div className="market-symbol">{instrument.displayName}</div>
        <div className={`market-price${instrument.status ? ` market-price-tick-${instrument.status}` : ''}`}>{formatPrice(instrument.price)}</div>
      </div>

      {/* Change Indicator */}
      <div className="market-change">
        {isOpen ? (
          <>
            {isPositive ? (
              <TrendingUp className="market-change-icon" />
            ) : (
              <TrendingDown className="market-change-icon" />
            )}
            <span className="market-change-percent">{formatChangePercent(instrument.changePercent)}</span>
          </>
        ) : (
          <>
            <span className="market-closed-indicator">●</span>
            <span className="market-closed-label">Market Closed</span>
          </>
        )}
      </div>

      {/* Separator dot */}
      <div className="market-separator" aria-hidden="true">
        •
      </div>
    </div>
  )
}

function InstrumentIcon({ instrument }: { instrument: MarketInstrument }) {
  if (instrument.symbol === 'BTCUSD') {
    return <div className="market-tile-icon market-asset-icon" aria-label="Bitcoin and US dollar"><BitcoinMark /><CurrencyFlag code="USD" /></div>
  }

  if (instrument.symbol === 'ETHUSD') {
    return <div className="market-tile-icon market-asset-icon" aria-label="Ethereum and US dollar"><EthereumMark /><CurrencyFlag code="USD" /></div>
  }

  if (instrument.symbol === 'GOLD') {
    return <div className="market-tile-icon market-asset-icon" aria-label="Gold commodity"><GoldMark /></div>
  }

  const [base, quote] = instrument.displayName.split('/')

  return (
    <div className="market-tile-icon market-currency-icon" aria-label={`${base} and ${quote} currencies`}>
      <CurrencyFlag code={base} />
      <CurrencyFlag code={quote} />
    </div>
  )
}

function CurrencyFlag({ code }: { code: string }) {
  const flag = {
    EUR: <><rect width="28" height="18" fill="#244aa5" /><path d="m14 2 .7 2.1 2.2-.1-1.7 1.3.7 2.1-1.9-1.2-1.9 1.2.7-2.1-1.7-1.3 2.2.1L14 2Z" fill="#ffd84d" /></>,
    GBP: <><rect width="28" height="18" fill="#173f8a" /><path d="M0 2 2 0l12 7L26 0l2 2-10 7 10 7-2 2-12-7-12 7-2-2 10-7L0 2Z" fill="#fff" /><path d="M0 4v4h28V4H0Zm0 6v4h28v-4H0Z" fill="#c9273f" /><path d="M11 0h6v18h-6z" fill="#fff" /><path d="M12.5 0h3v18h-3z" fill="#c9273f" /></>,
    USD: <><rect width="28" height="18" fill="#fff" /><path d="M0 0h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 4h28v2H0z" fill="#c9364b" /><rect width="12" height="10" fill="#21468b" /><circle cx="3" cy="2.5" r=".7" fill="#fff" /><circle cx="6" cy="2.5" r=".7" fill="#fff" /><circle cx="9" cy="2.5" r=".7" fill="#fff" /><circle cx="4.5" cy="5" r=".7" fill="#fff" /><circle cx="7.5" cy="5" r=".7" fill="#fff" /><circle cx="3" cy="7.5" r=".7" fill="#fff" /><circle cx="6" cy="7.5" r=".7" fill="#fff" /><circle cx="9" cy="7.5" r=".7" fill="#fff" /></>,
    JPY: <><rect width="28" height="18" fill="#fff" /><circle cx="14" cy="9" r="5" fill="#d92d43" /></>,
    AUD: <><rect width="28" height="18" fill="#173f8a" /><path d="M0 0h12v8H0z" fill="#21468b" /><path d="M0 0 12 8M12 0 0 8" stroke="#fff" strokeWidth="2" /><path d="M0 4h12M6 0v8" stroke="#c9273f" strokeWidth="1.2" /><path d="m21 3 .7 2.1 2.2-.1-1.7 1.3.7 2.1-1.9-1.2-1.9 1.2.7-2.1-1.7-1.3 2.2.1L21 3Z" fill="#fff" /></>,
    CAD: <><rect width="28" height="18" fill="#fff" /><path d="M0 0h7v18H0zM21 0h7v18h-7z" fill="#d52b3f" /><path d="m14 3 1.4 3.5 2.4-.8-1.2 2.3 2.1 1.1-2.7.5.5 2.5-2.5-1.4-2.5 1.4.5-2.5-2.7-.5 2.1-1.1-1.2-2.3 2.4.8L14 3Z" fill="#d52b3f" /></>,
  }[code]

  return <svg className="market-flag" viewBox="0 0 28 18" role="img" aria-label={`${code} flag`}>{flag ?? <rect width="28" height="18" fill="#64748b" />}</svg>
}

function BitcoinMark() {
  return <svg className="market-crypto-mark market-bitcoin-mark" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#f7931a" /><path d="M15.5 8.4c-.3-1.3-1.5-1.8-3-1.7l.2-1.5-1-.1-.2 1.5-.8-.1.2-1.5-1-.1-.2 1.5-2-.2-.2 1.1 1 .1-.7 5.7-1-.1-.2 1.1 2 .2-.2 1.5 1 .1.2-1.5.8.1-.2 1.5 1 .1.2-1.5c1.7.1 3-.3 3.2-1.8.1-1.2-.5-1.8-1.4-2.1.8-.3 1.3-1 1.1-2.3Zm-4.1-.4c.8.1 2.2.3 2 1.2-.1.8-1.4.6-2.3.5l.3-1.7Zm-.4 2.8c1 .1 2.7.3 2.6 1.3-.1 1-1.7.7-2.8.6l.2-1.9Z" fill="#fff" /></svg>
}

function EthereumMark() {
  return <svg className="market-crypto-mark market-ethereum-mark" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#627eea" /><path d="m12 3.5-5.1 8.4 5.1 3 5.1-3L12 3.5Zm0 12.5-5.1-3 5.1 7.5 5.1-7.5-5.1 3Z" fill="#fff" opacity=".96" /></svg>
}

function GoldMark() {
  return <svg className="market-commodity-mark" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#d49b2a" /><circle cx="12" cy="12" r="7" fill="none" stroke="#ffe8a3" strokeWidth="1.2" /><path d="m12 6.5 1.5 3h3.3l-2.7 2.1 1 3.3-3.1-1.9-3.1 1.9 1-3.3-2.7-2.1h3.3L12 6.5Z" fill="#fff1b8" /></svg>
}
