'use client'

import { CSSProperties, useEffect, useRef } from 'react'

type ParticleTextProps = {
  text: string
  particleSize?: number
  density?: number
  color?: string
  highlightColor?: string
  scatter?: number
  gatherDuration?: number
  stagger?: number
  pointerRepel?: number
  repelRadius?: number
  idleDrift?: number
  trigger?: 'mount' | 'hover' | 'click'
  fontSize?: string | number
  fontWeight?: number
  fontFamily?: string
  glow?: boolean
  className?: string
  style?: CSSProperties
}

type Particle = { x: number; y: number; targetX: number; targetY: number; startX: number; startY: number; size: number; color: string; seed: number; delay: number }
type Rgb = { r: number; g: number; b: number }

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const easeOut = (value: number) => 1 - Math.pow(1 - value, 3)
const toRgb = (value: string): Rgb | null => { const clean = value.replace('#', ''); return /^[0-9a-fA-F]{6}$/.test(clean) ? { r: parseInt(clean.slice(0, 2), 16), g: parseInt(clean.slice(2, 4), 16), b: parseInt(clean.slice(4, 6), 16) } : null }

function resolveSize(value: string | number, container: HTMLElement, weight: number, family: string) {
  if (typeof value === 'number') return value
  const probe = document.createElement('span')
  probe.textContent = 'M'
  probe.style.cssText = `position:absolute;visibility:hidden;font:${weight} ${value} ${family}`
  container.appendChild(probe)
  const size = parseFloat(getComputedStyle(probe).fontSize) || 96
  probe.remove()
  return size
}

export default function ParticleText({ text, particleSize = 2, density = 4, color = '#fff', highlightColor = '#8b5cf6', scatter = 180, gatherDuration = 1600, stagger = 420, pointerRepel = 40, repelRadius = 120, idleDrift = .7, trigger = 'mount', fontSize = 'clamp(3rem, 12vw, 8rem)', fontWeight = 800, fontFamily = 'inherit', glow = true, className = '', style }: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!container || !canvas || !context) return
    let particles: Particle[] = []
    let frame = 0
    let resizeFrame = 0
    let width = 0
    let height = 0
    let gathering = false
    let gatherStart = 0
    let reducedMotion = false
    const pointer = { active: false, x: 0, y: 0, smoothX: 0, smoothY: 0 }

    const gather = (scatterParticles: boolean) => {
      gatherStart = performance.now()
      particles.forEach((particle) => {
        if (scatterParticles && !reducedMotion) {
          const angle = particle.seed * Math.PI * 2
          particle.x = particle.targetX + Math.cos(angle) * scatter
          particle.y = particle.targetY + Math.sin(angle) * scatter
        }
        particle.startX = particle.x
        particle.startY = particle.y
        particle.delay = reducedMotion ? 0 : particle.seed * stagger
      })
      gathering = true
    }

    const render = (now: number) => {
      context.clearRect(0, 0, width, height)
      context.shadowBlur = glow && !reducedMotion ? particleSize * 3 : 0
      context.shadowColor = highlightColor
      pointer.smoothX += (pointer.x - pointer.smoothX) * .18
      pointer.smoothY += (pointer.y - pointer.smoothY) * .18
      let complete = true
      particles.forEach((particle) => {
        let x = particle.targetX
        let y = particle.targetY
        let progress = 1
        if (gathering) {
          progress = clamp((now - gatherStart - particle.delay) / Math.max(1, gatherDuration), 0, 1)
          const eased = easeOut(progress)
          x = particle.startX + (particle.targetX - particle.startX) * eased
          y = particle.startY + (particle.targetY - particle.startY) * eased
          if (progress < 1) complete = false
        } else if (!reducedMotion) {
          x += Math.sin(now * .0009 + particle.seed * 10) * idleDrift
          y += Math.cos(now * .00075 + particle.seed * 8) * idleDrift
        }
        const distanceX = x - pointer.smoothX
        const distanceY = y - pointer.smoothY
        const distance = Math.hypot(distanceX, distanceY)
        if (pointer.active && !reducedMotion && distance > 0 && distance < repelRadius) {
          const force = Math.pow(1 - distance / repelRadius, 2) * pointerRepel
          x += distanceX / distance * force
          y += distanceY / distance * force
        }
        const follow = reducedMotion ? 1 : .22
        particle.x += (x - particle.x) * follow
        particle.y += (y - particle.y) * follow
        context.globalAlpha = clamp(.35 + progress * .65, 0, 1)
        context.fillStyle = particle.color
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2)
        context.fill()
      })
      context.globalAlpha = 1
      context.shadowBlur = 0
      if (gathering && complete) gathering = false
      frame = requestAnimationFrame(render)
    }

    const sample = () => {
      const bounds = container.getBoundingClientRect()
      width = Math.floor(bounds.width)
      height = Math.floor(bounds.height)
      if (!width || !height) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const family = fontFamily === 'inherit' ? getComputedStyle(container).fontFamily || 'sans-serif' : fontFamily
      const size = resolveSize(fontSize, container, fontWeight, family)
      const font = `${fontWeight} ${size}px ${family}`
      const source = document.createElement('canvas')
      source.width = width
      source.height = height
      const sourceContext = source.getContext('2d', { willReadFrequently: true })
      if (!sourceContext) return
      sourceContext.font = font
      sourceContext.textAlign = 'center'
      sourceContext.textBaseline = 'middle'
      sourceContext.fillStyle = '#fff'
      const lines = text.split('\n')
      const lineHeight = size * 1.02
      const firstLineY = height / 2 - ((lines.length - 1) * lineHeight) / 2
      lines.forEach((line, index) => sourceContext.fillText(line, width / 2, firstLineY + index * lineHeight))
      const image = sourceContext.getImageData(0, 0, width, height).data
      const base = toRgb(color)
      const highlight = toRgb(highlightColor)
      const nextParticles: Particle[] = []
      for (let y = 0; y < height; y += Math.max(2, Math.floor(density))) for (let x = 0; x < width; x += Math.max(2, Math.floor(density))) if (image[(y * width + x) * 4 + 3] > 40) {
        const seed = ((nextParticles.length * 9301 + 49297) % 233280) / 233280
        const blend = base && highlight ? clamp(x / Math.max(1, width), 0, 1) : 0
        const particleColor = base && highlight ? `rgb(${Math.round(base.r + (highlight.r - base.r) * blend)}, ${Math.round(base.g + (highlight.g - base.g) * blend)}, ${Math.round(base.b + (highlight.b - base.b) * blend)})` : color
        nextParticles.push({ x, y, targetX: x, targetY: y, startX: x, startY: y, size: particleSize * (.75 + seed * .45), color: particleColor, seed, delay: seed * stagger })
      }
      particles = nextParticles
      pointer.x = width / 2
      pointer.y = height / 2
      pointer.smoothX = pointer.x
      pointer.smoothY = pointer.y
      gather(false)
    }

    const move = (event: PointerEvent) => { const bounds = canvas.getBoundingClientRect(); pointer.x = event.clientX - bounds.left; pointer.y = event.clientY - bounds.top; pointer.active = true }
    const leave = () => { pointer.active = false }
    const enter = (event: PointerEvent) => { move(event); if (trigger === 'hover') gather(true) }
    const click = () => { if (trigger === 'click') gather(true) }
    const resize = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(sample) }
    const observer = new ResizeObserver(resize)
    observer.observe(container)
    canvas.addEventListener('pointerenter', enter)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    canvas.addEventListener('click', click)
    sample()
    frame = requestAnimationFrame(render)
    return () => { observer.disconnect(); canvas.removeEventListener('pointerenter', enter); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); canvas.removeEventListener('click', click); cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame) }
  }, [color, density, fontFamily, fontSize, fontWeight, gatherDuration, glow, highlightColor, idleDrift, particleSize, pointerRepel, repelRadius, scatter, stagger, text, trigger])

  return <div ref={containerRef} className={`particle-text ${className}`} style={style} aria-label={text}><canvas ref={canvasRef} className="particle-text__canvas" aria-hidden="true" /><span className="particle-text__sr">{text}</span></div>
}
