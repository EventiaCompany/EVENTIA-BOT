import Link from 'next/link'
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react'

type CustomCard = {
  id: string
  title: string
  description: string
  url?: string
  imageUrl?: string
  category?: string
  price?: string
  ctaLabel?: string
  active?: boolean
}

function safeUrl(value?: string) {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null
  } catch {
    return null
  }
}

export function CustomOptions({ cards }: { cards: CustomCard[] }) {
  const visibleCards = cards.filter((card) => card.active !== false)
  if (visibleCards.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-5 py-16" aria-labelledby="custom-options-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">También puedes encontrar</p>
          <h2 id="custom-options-title" className="mt-2 text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
            Más opciones
          </h2>
        </div>
        <Sparkles className="hidden size-6 text-primary sm:block" aria-hidden="true" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCards.map((card) => {
          const href = safeUrl(card.url)
          const content = (
            <>
              {card.imageUrl ? (
                <img src={card.imageUrl} alt="" className="h-44 w-full object-cover" />
              ) : (
                <div className="flex h-44 items-center justify-center bg-secondary">
                  <Sparkles className="size-8 text-primary" aria-hidden="true" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {card.category && <p className="text-xs font-semibold uppercase tracking-wider text-primary">{card.category}</p>}
                    <h3 className="mt-1 font-display text-lg font-bold">{card.title}</h3>
                  </div>
                  {card.price && <span className="shrink-0 text-sm font-semibold text-foreground">{card.price}</span>}
                </div>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                {href && (
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {card.ctaLabel || 'Ver más'} <ArrowUpRight className="size-4" />
                  </span>
                )}
              </div>
            </>
          )

          return href ? (
            <Link key={card.id} href={href} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl border border-border bg-card transition-transform hover:-translate-y-1 hover:border-primary/50">
              {content}
            </Link>
          ) : (
            <article key={card.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              {content}
            </article>
          )
        })}
      </div>
    </section>
  )
}
