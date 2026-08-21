import {
  Puzzle,
  Users,
  Crown,
  Clock,
  UserPlus,
  ShieldBan,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Puzzle,
    title: 'Sistema de plugins',
    desc: 'Carga automática de comandos desde la carpeta plugins con alias y recarga en caliente.',
  },
  {
    icon: Users,
    title: 'Sub-bots ilimitados',
    desc: 'Cada usuario vincula su propia sesión. Reconexión automática y respaldo entre instancias.',
  },
  {
    icon: Crown,
    title: 'Cuentas premium',
    desc: 'Sesiones dedicadas para usuarios premium con gestión y reconexión independiente.',
  },
  {
    icon: Clock,
    title: 'Actividad 24/7',
    desc: 'Packs siempre activos con MongoDB, autostatus y limpieza de caché programada.',
  },
  {
    icon: UserPlus,
    title: 'Bienvenidas y despedidas',
    desc: 'Eventos de grupo automáticos para dar la bienvenida y despedir a los miembros.',
  },
  {
    icon: ShieldBan,
    title: 'Anti-link',
    desc: 'Detección y moderación de enlaces no permitidos para mantener tus grupos limpios.',
  },
]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="max-w-2xl">
        <h2 className="text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
          Todo lo que un bot serio necesita
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          AKARI combina modularidad y estabilidad para escalar de un solo número
          a toda una red de bots sin perder el control.
        </p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="group bg-card p-7 transition-colors hover:bg-secondary">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <f.icon className="size-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
