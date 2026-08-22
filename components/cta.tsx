import { ArrowRight } from 'lucide-react'

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side at 50% 0%, oklch(0.62 0.24 12), transparent)',
          }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
            Pon a AKARI a trabajar hoy mismo
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Descarga, configura tu número y vincula en segundos. Tu bot 24/7 te
            espera.
          </p>
          <a
            href="#connect"
            className="glow-brand mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-7 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Empezar a vincular
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
