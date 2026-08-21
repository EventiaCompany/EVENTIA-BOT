import { Check } from 'lucide-react'

const TIERS = [
  {
    name: 'Bot principal',
    desc: 'La instancia central que coordina toda la red.',
    features: [
      'Vinculación por QR o código',
      'Carga completa de plugins',
      'Eventos de grupo y anti-link',
      'Respaldo con sub-bots',
    ],
    featured: false,
  },
  {
    name: 'Sub-bot',
    desc: 'Cada usuario ejecuta su propia sesión conectada.',
    features: [
      'Sesión independiente por número',
      'Reconexión automática',
      'Failover al principal',
      'Configuración propia',
    ],
    featured: true,
  },
  {
    name: 'Premium',
    desc: 'Sesiones dedicadas con prioridad y gestión.',
    features: [
      'Instancia premium aislada',
      'Reconexión gestionada',
      'Acceso prioritario',
      'Persistencia en MongoDB',
    ],
    featured: false,
  },
]

export function Tiers() {
  return (
    <section id="tiers" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
          Un bot, tres formas de operar
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Desde un único número hasta una red completa de instancias con respaldo
          entre sí.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`relative flex flex-col rounded-2xl border p-7 ${
              t.featured
                ? 'glow-brand border-primary/50 bg-card'
                : 'border-border bg-card'
            }`}
          >
            {t.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-primary-foreground">
                Más usado
              </span>
            )}
            <h3 className="font-display text-xl font-bold">{t.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
            <ul className="mt-6 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check className="size-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
