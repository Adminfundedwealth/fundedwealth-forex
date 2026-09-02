import { ArrowRight } from 'lucide-react'

type RulesReadyCtaProps = {
  program: '1-STEP' | '2-STEP'
  description: string
  href: string
}

export function RulesReadyCta({ program, description, href }: RulesReadyCtaProps) {
  return <section className="flash-ready-cta" aria-label={`Start ${program} challenge`}><div><p className="flash-ready-kicker">{program} CHALLENGE</p><h2>READY TO START YOUR CHALLENGE?</h2><p>{description}</p><a className="flash-ready-button" href={href}>START {program} CHALLENGE <ArrowRight /></a></div></section>
}
