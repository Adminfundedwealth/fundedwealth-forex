'use client'

import DepthText from '@/components/DepthText'

type ColourfulTextProps = {
  text?: string
  className?: string
}

export default function ColourfulText({
  text = 'Prove Your Edge.',
  className = '',
}: ColourfulTextProps) {
  return (
    <DepthText
      text={text}
      layers={26}
      depth={2.8}
      faceColor="#F8FAFC"
      depthColor="#8B5CF6"
      tilt={6}
      perspective={1200}
      autoOrbit={true}
      orbitSpeed={0.28}
      fontSize="clamp(2.4rem, 5vw, 7rem)"
      fontWeight={900}
      fontFamily="'Inter', 'Segoe UI', sans-serif"
      className={className}
      style={{
        display: 'inline-block',
        lineHeight: 1,
      }}
    />
  )
}
