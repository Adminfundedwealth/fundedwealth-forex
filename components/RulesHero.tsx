import { ArrowRight } from 'lucide-react'

type RulesHeroProps = {
  title: string
  description: string
  ctaText: string
  ctaLink: string
}

export function RulesHero({ title, description, ctaText, ctaLink }: RulesHeroProps) {
  const titleWords = title.split(' ')
  const titleStart = titleWords.slice(0, -1).join(' ')
  const highlightedTitle = titleWords.at(-1)

  return (
    <section className="rules-hero flash-rules-hero">
      <h1>{titleStart} {highlightedTitle && <em>{highlightedTitle}</em>}</h1>
      <p className="rules-lead">{description}</p>
      <div className="rules-hero-actions"><a className="button primary-liquid" href={ctaLink}>{ctaText} <ArrowRight /></a><a className="rules-outline-button" href="/rules">BACK TO ALL RULES</a></div>
    </section>
  )
}
