'use client'

import { useEffect, useState } from 'react'
import { BarChart3, Bell, CircleDollarSign, LineChart, Smartphone, TrendingUp } from 'lucide-react'

const chartPaths = [
  'M0 128 C22 121 30 128 48 110 S72 121 91 96 S112 111 132 86 S150 93 172 72 S191 89 211 64 S235 72 253 79 S275 54 294 62 S320 42 340 54 S359 32 381 42 S403 29 423 37 S447 19 465 32 S490 12 511 22 S534 8 551 19 S581 4 620 0',
  'M0 124 C22 116 31 130 49 106 S73 119 92 91 S113 108 134 82 S151 96 174 69 S193 85 213 60 S236 76 255 73 S277 51 296 58 S322 46 342 50 S361 29 383 39 S405 32 425 34 S449 17 467 29 S492 15 513 20 S536 5 554 16 S583 2 620 4',
  'M0 130 C21 123 32 125 50 112 S74 117 93 99 S115 105 135 88 S153 91 175 76 S195 83 214 67 S238 70 256 81 S278 57 298 64 S324 39 344 56 S363 35 385 45 S407 25 427 39 S451 22 469 34 S494 9 515 25 S538 7 556 21 S585 1 620 2',
]

export default function AuthShowcase() {
  const [chartFrame, setChartFrame] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setChartFrame((frame) => (frame + 1) % chartPaths.length), 4200)
    return () => window.clearInterval(timer)
  }, [])

  const balance = (99940.7 + chartFrame * 2.15).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <aside className="auth-showcase" aria-label="FundedWealth trading platform preview">
      <div className="auth-showcase-glow" aria-hidden="true" />
      <div className="auth-showcase-header">
        <div>
          <p className="auth-showcase-eyebrow">THE FUNDEDWEALTH FOREX PLATFORM</p>
          <h2>Your trading desk, <em>reimagined.</em></h2>
          <p className="auth-showcase-description">Track your performance, manage your funded accounts, and trade with clarity from one powerful platform.</p>
        </div>
        <span className="auth-dark-mode">Dark mode <i /></span>
      </div>
      <div className="auth-dashboard">
        <div className="auth-dashboard-topbar"><span className="auth-window-dots"><i /><i /><i /></span><b>Account Overview</b><span className="auth-live-status"><i /> LIVE MARKET</span><span className="auth-chart-switch"><strong>Line Chart</strong><span>Bar Chart</span><span>Daily⌄</span></span></div>
        <div className="auth-dashboard-body">
          <div className="auth-dashboard-sidebar"><strong>◈ Accounts</strong><small>ANALYTICS</small><span><BarChart3 /> Market Heatmap</span><span><LineChart /> Market News</span><span><Bell /> Economic Calendar</span><small>OVER</small><span>◉ Affiliate</span><span>▣ Account Comparison</span><span>▤ Data &amp; Privacy</span><small>HELP</small><span>⚙ Settings</span><span>◌ Support</span></div>
          <div className="auth-dashboard-main">
            <div className="auth-metrics"><div><small>ACCOUNT BALANCE</small><strong>${balance}</strong></div><div><small>EQUITY</small><strong>${(480.58 + chartFrame * 1.42).toFixed(2)}</strong></div><div><small>AVERAGE WIN</small><strong>${(32.16 + chartFrame * .18).toFixed(2)}</strong></div><div><small>WIN RATIO</small><strong>{(31.58 + chartFrame * .08).toFixed(2)}%</strong></div></div>
            <div className="auth-equity-chart"><div className="auth-chart-label"><span>Performance</span><b>+{(12.48 + chartFrame * .06).toFixed(2)}%</b></div><svg viewBox="0 0 620 150" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="authChartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#38bdf8" stopOpacity=".34" /><stop offset="1" stopColor="#6366f1" stopOpacity="0" /></linearGradient></defs><path d={`${chartPaths[chartFrame]} L620 150 L0 150 Z`} fill="url(#authChartFill)" /><path d={chartPaths[chartFrame]} fill="none" stroke="#67e8f9" strokeWidth="3" /></svg><div className="auth-chart-axis"><span>$99.4K</span><span>$99.7K</span><span>$100K</span></div></div>
            <div className="auth-bottom-panels"><div className="auth-volume"><div className="auth-panel-title"><span>Market Overview</span><small>Weekly⌄</small></div><div className="auth-bars"><i /><i /><i /><i className="is-highlight" /><i /><i /><i /></div><div className="auth-volume-footer"><span>Trading activity</span><b>+8.42%</b></div></div><div className="auth-positions"><div className="auth-panel-title"><span>Open Positions</span><small>View all</small></div><div><b><CircleDollarSign /> EUR/USD</b><strong>+$142.20</strong></div><div><b><TrendingUp /> GBP/JPY</b><strong className="is-loss">-$38.10</strong></div><div><b><CircleDollarSign /> BTC/USD</b><strong>+$89.55</strong></div></div></div>
          </div>
        </div>
      </div>
      <div className="auth-mobile-card"><div><Smartphone /><span>Mobile dashboard</span></div><strong>+12.48%</strong><small>Live account performance</small></div>
    </aside>
  )
}
