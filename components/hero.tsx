import Image from 'next/image'
import { Zap, ArrowRight } from 'lucide-react'

type HeroProps = {
  badge?: string
  title?: string
  highlight?: string
  subtitle?: string
}

export function Hero({
  badge = 'Powered by Eventia World',
  title = 'El bot de WhatsApp',
  highlight = 'multidispositivo',
  subtitle = 'AKARI se conecta en segundos por QR o código de 8 dígitos. Sistema de plugins, sub-bots, cuentas premium y actividad 24/7 sobre una base estable en Baileys.',
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* subtle radial glow, load-bearing as brand light source */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, oklch(0.58 0.25 350), transparent)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Zap className="size-3.5 text-primary" />
            {badge}
          </span>

          <h1 className="mt-6 text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {title} <span className="text-gradient">{highlight}</span> que nunca duerme
          </h1>

          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#connect"
              className="glow-brand inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Vincular ahora
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#features"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-6 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Ver características
            </a>
          </div>

          <dl className="mt-12 grid max-w-sm grid-cols-3 gap-6">
            {[
              { k: '24/7', v: 'En línea' },
              { k: '∞', v: 'Sub-bots' },
              { k: '2', v: 'Métodos de login' },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl font-bold text-foreground">{s.k}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="glow-brand relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-border">
            <Image
              src="/akari-hero.png"
              alt="Teléfono mostrando una conversación del bot AKARI en WhatsApp"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
