'use client'

import { usePathname } from 'next/navigation'

const programs = [
  { label: 'FLASH', href: '/rules/flash' },
  { label: 'INSTANT', href: '/rules/instant' },
  { label: '1 STEP', href: '/rules/1-step' },
  { label: '2 STEP', href: '/rules/2-step' },
]

export function ProgramTabs() {
  const pathname = usePathname()

  return (
    <nav className="model-tabs rules-program-tabs" aria-label="Rules programs">
      {programs.map((program, index) => {
        const active = pathname === program.href
        return <a className={`rules-program-tab${active ? ' is-active' : ''}`} href={program.href} aria-current={active ? 'page' : undefined} key={program.href}><i>{index + 1}</i><span>{program.label}</span><em className="model-tab-glow" aria-hidden="true" /><em className="model-tab-orbit" aria-hidden="true" /></a>
      })}
    </nav>
  )
}
