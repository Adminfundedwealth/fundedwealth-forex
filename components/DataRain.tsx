'use client'

import { useEffect, useRef } from 'react'

const instruments = ['EUR/USD', 'GBP/JPY', 'XAU/USD', 'USD/CAD', 'BTC/USD', '+1.24%', '-0.15%', '1.1415', '104,250', 'BUY', 'SELL']
const colors = ['#06B6D4', '#2DD4BF', '#3B82F6', '#8B5CF6']

export default function DataRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const fontSize = 14
    const columnWidth = 100
    let animationFrame = 0
    let width = 0
    let height = 0
    let drops: number[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const columns = Math.floor(window.innerWidth / columnWidth)
      drops = Array.from({ length: columns }, () => Math.random() * -40)
    }

    const draw = () => {
      context.fillStyle = 'rgba(5, 11, 20, 0.1)'
      context.fillRect(0, 0, width, height)
      context.font = `${fontSize}px monospace font-bold`

      drops.forEach((drop, index) => {
        const text = instruments[Math.floor(Math.random() * instruments.length)]
        context.fillStyle = colors[Math.floor(Math.random() * colors.length)]
        context.fillText(text, index * columnWidth, drop * 20)
        drops[index] = drop + 1

        if (drop * 20 > height && Math.random() > 0.95) {
          drops[index] = 0
        }
      })

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animationFrame = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
}
