'use client'

const letterColours = ['#f43f5e', '#f97316', '#facc15', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef']

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
    className,
  ].join(' ')

  return <span className={combinedClassName}>{Array.from(text).map((character, index) => <span key={`${character}-${index}`} style={{ color: letterColours[index % letterColours.length] }}>{character}</span>)}</span>
}
