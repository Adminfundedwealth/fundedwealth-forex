// Market data types and utilities

export interface MarketInstrument {
  symbol: string
  displayName: string
  price: number
  change: number
  changePercent: number
  timestamp: number
  marketStatus: 'OPEN' | 'CLOSED'
  lastSessionChange?: number
  lastSessionChangePercent?: number
  icon?: string
}

export interface MarketDataSnapshot {
  instruments: MarketInstrument[]
  timestamp: number
}

// Instrument shape shared with the market-data adapter.
const SAMPLE_INSTRUMENTS: MarketInstrument[] = [
  {
    symbol: 'GOLD',
    displayName: 'Gold',
    price: 4127.00,
    change: 21.80,
    changePercent: 0.5324,
    timestamp: Date.now(),
    marketStatus: 'OPEN',
  },
  {
    symbol: 'EURUSD',
    displayName: 'EUR/USD',
    price: 1.14157,
    change: 0.00037,
    changePercent: 0.0324,
    timestamp: Date.now(),
    marketStatus: 'OPEN',
  },
  {
    symbol: 'GBPUSD',
    displayName: 'GBP/USD',
    price: 1.32485,
    change: -0.00142,
    changePercent: -0.1071,
    timestamp: Date.now(),
    marketStatus: 'OPEN',
  },
  {
    symbol: 'USDJPY',
    displayName: 'USD/JPY',
    price: 162.358,
    change: 0.257,
    changePercent: 0.1579,
    timestamp: Date.now(),
    marketStatus: 'OPEN',
  },
  {
    symbol: 'EURJPY',
    displayName: 'EUR/JPY',
    price: 185.341,
    change: 0.339,
    changePercent: 0.1827,
    timestamp: Date.now(),
    marketStatus: 'OPEN',
  },
  {
    symbol: 'AUDCAD',
    displayName: 'AUD/CAD',
    price: 0.98535,
    change: 0.001432,
    changePercent: 0.1453,
    timestamp: Date.now(),
    marketStatus: 'OPEN',
  },
  {
    symbol: 'BTCUSD',
    displayName: 'BTC/USD',
    price: 104250.20,
    change: 1458.00,
    changePercent: 1.42,
    timestamp: Date.now(),
    marketStatus: 'OPEN',
  },
  {
    symbol: 'ETHUSD',
    displayName: 'ETH/USD',
    price: 3812.40,
    change: 33.17,
    changePercent: 0.87,
    timestamp: Date.now(),
    marketStatus: 'OPEN',
  },
]

// Simulate market data updates with realistic price movements
export function getMarketData(): MarketDataSnapshot {
  // In production, this would fetch from a real API
  // For now, we'll simulate small price movements based on time
  const now = Date.now()
  
  return {
    instruments: SAMPLE_INSTRUMENTS.map(instrument => {
      return {
        ...instrument,
        marketStatus: instrument.symbol === 'BTCUSD' || instrument.symbol === 'ETHUSD' || isMarketOpen(now)
          ? 'OPEN'
          : 'CLOSED',
        timestamp: now,
      }
    }),
    timestamp: now,
  }
}

// Format price for display
export function formatPrice(price: number, precision: number = 5): string {
  // Auto-detect appropriate precision for the magnitude of the price
  if (price > 1000) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else if (price > 10) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
  } else {
    return price.toLocaleString('en-US', { minimumFractionDigits: 5, maximumFractionDigits: 5 })
  }
}

// Format change percentage
export function formatChangePercent(changePercent: number): string {
  const sign = changePercent >= 0 ? '+' : ''
  return `${sign}${changePercent.toFixed(4)}%`
}

// Determine if market is open (simplified - assumes standard forex hours)
export function isMarketOpen(timestamp: number = Date.now()): boolean {
  const date = new Date(timestamp)
  const day = date.getUTCDay()
  const hours = date.getUTCHours()
  
  // Simplified: assume market closed on weekends (Fri 22:00 UTC to Sun 22:00 UTC)
  if (day === 0 || day === 6) {
    if (day === 5 && hours < 22) return true // Friday before cutoff
    return false
  }
  
  return true
}
