import { Sparkles } from 'lucide-react'

type CustomCard = { id: string; title: string; description: string }

export function CustomOptions({ cards }: { cards: CustomCard[] }) {
  if (cards.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
        Más opciones
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary">
              <Sparkles className="size-5 text-primary" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{c.title}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              {c.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
