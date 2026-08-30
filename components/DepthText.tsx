'use client'

import { CSSProperties, useEffect, useMemo, useRef } from 'react'

const MAX_LAYERS = 64

type DepthTextProps = {
  text: string
  layers?: number
  depth?: number
  faceColor?: string
  depthColor?: string
  tilt?: number
  pointerTracking?: boolean
  smoothing?: number
  perspective?: number
  autoOrbit?: boolean
  orbitSpeed?: number
  fontSize?: string | number
  fontWeight?: number
  fontFamily?: string
  shadow?: boolean
  className?: string
  style?: CSSProperties
}

type Rotation = { x: number; y: number }
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const getLayerColor = (face: string, depth: string, index: number, total: number) => `color-mix(in srgb, ${face} ${Math.round((1 - (index / Math.max(1, total)) ** 2) * 72 + 4)}%, ${depth})`
const getTransform = (rotation: Rotation) => `rotateX(${rotation.x.toFixed(3)}deg) rotateY(${rotation.y.toFixed(3)}deg)`

export default function DepthText({ text, layers = 34, depth = 2.4, faceColor = '#f8fafc', depthColor = '#7c3aed', tilt = 7.5, pointerTracking = true, smoothing = .14, perspective = 900, autoOrbit = true, orbitSpeed = .35, fontSize = 'clamp(3rem, 12vw, 7rem)', fontWeight = 900, fontFamily = 'inherit', shadow = true, className = '', style = {} }: DepthTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const stageRef = useRef<HTMLSpanElement>(null)
  const safeLayers = clamp(Math.round(Number(layers) || 1), 2, MAX_LAYERS)
  const safeDepth = clamp(Number(depth) || 0, 0, 12)
  const safeTilt = clamp(Number(tilt) || 0, 0, 12)
  const safeSmoothing = clamp(Number(smoothing) || .14, .02, .35)
  const safePerspective = clamp(Number(perspective) || 900, 300, 2000)
  const safeOrbitSpeed = clamp(Number(orbitSpeed) || 0, 0, 2)
  const baseRotation = useMemo(() => ({ x: -safeTilt * .32, y: safeTilt * .42 }), [safeTilt])
  const depthLayers = useMemo(() => Array.from({ length: safeLayers }, (_, layerIndex) => { const index = safeLayers - layerIndex; return { index, color: getLayerColor(faceColor, depthColor, index, safeLayers), transform: `translateZ(${-index * safeDepth}px)` } }), [safeLayers, safeDepth, faceColor, depthColor])

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const canTrackPointer = pointerTracking && finePointer && !reducedMotion
    let frameId = 0
    let activePointer = false
    let startTime = performance.now()
    const current = { ...baseRotation }
    const target = { ...baseRotation }
    const applyTransform = () => { stage.style.transform = getTransform(current) }
    if (reducedMotion) { applyTransform(); return }
    const handlePointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      activePointer = true
      const x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width * .8), -1, 1)
      const y = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height * .8), -1, 1)
      target.x = baseRotation.x - y * safeTilt
      target.y = baseRotation.y + x * safeTilt
    }
    const handlePointerLeave = () => { activePointer = false; target.x = baseRotation.x; target.y = baseRotation.y }
    if (canTrackPointer) { window.addEventListener('pointermove', handlePointerMove); window.addEventListener('pointerleave', handlePointerLeave); window.addEventListener('blur', handlePointerLeave) }
    const tick = (now: number) => {
      if ((!canTrackPointer || !activePointer) && autoOrbit) {
        const orbit = (now - startTime) / 1000 * safeOrbitSpeed * Math.PI * 2
        target.x = baseRotation.x + Math.sin(orbit) * safeTilt * (canTrackPointer ? .18 : .55)
        target.y = baseRotation.y + Math.cos(orbit * .85) * safeTilt * (canTrackPointer ? .18 : .55)
      }
      current.x += (target.x - current.x) * safeSmoothing
      current.y += (target.y - current.y) * safeSmoothing
      applyTransform()
      frameId = requestAnimationFrame(tick)
    }
    applyTransform()
    frameId = requestAnimationFrame(tick)
    return () => { window.removeEventListener('pointermove', handlePointerMove); window.removeEventListener('pointerleave', handlePointerLeave); window.removeEventListener('blur', handlePointerLeave); cancelAnimationFrame(frameId); startTime = 0 }
  }, [autoOrbit, baseRotation, pointerTracking, safeOrbitSpeed, safeSmoothing, safeTilt])

  const rootStyle = { ...style, '--depth-text-perspective': `${safePerspective}px`, '--depth-text-font-size': typeof fontSize === 'number' ? `${fontSize}px` : fontSize, '--depth-text-font-weight': fontWeight, '--depth-text-font-family': fontFamily, '--depth-text-face-color': faceColor, '--depth-text-shadow': shadow ? `0 22px 34px color-mix(in srgb, ${depthColor} 36%, transparent), 0 4px 8px rgba(0, 0, 0, .28)` : 'none' } as CSSProperties
  return <span ref={rootRef} className={`depth-text ${className}`.trim()} style={rootStyle} aria-label={text}><span ref={stageRef} className="depth-text__stage">{depthLayers.map((layer) => <span aria-hidden="true" className="depth-text__layer" key={layer.index} style={{ color: layer.color, transform: layer.transform }}>{text}</span>)}<span className="depth-text__face">{text}</span></span><span className="depth-text__sr">{text}</span></span>
}
