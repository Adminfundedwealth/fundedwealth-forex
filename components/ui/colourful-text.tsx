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
  const combinedClassName = [
    'inline-block font-black tracking-[-0.06em] drop-shadow-[0_0_30px_rgba(56,189,248,0.35)]',
    'bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-blue-400 to-cyan-300',
    className,
  ].join(' ')

  return <span className={combinedClassName}>{text}</span>
}
