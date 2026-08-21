import Link from 'next/link'
import { Bot } from 'lucide-react'

const NAV = [
  { label: 'Características', href: '#features' },
  { label: 'Conexión', href: '#connect' },
  { label: 'Planes', href: '#tiers' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-brand-gradient">
            <Bot className="size-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">AKARI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="#connect"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-gradient px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Conectar bot
        </a>
      </div>
    </header>
  )
}
