"use client"

import { useState } from "react"
import { Lock, ShieldCheck, Code2, Crown } from "lucide-react"

type Role = "owner" | "admin" | "developer"

const ROLE_META: Record<
  Role,
  { label: string; desc: string; icon: React.ElementType }
> = {
  owner: {
    label: "Owner",
    desc: "Control total del sitio",
    icon: Crown,
  },
  admin: {
    label: "Admin",
    desc: "Anuncios y contenido",
    icon: ShieldCheck,
  },
  developer: {
    label: "Developer",
    desc: "Secciones y sistema",
    icon: Code2,
  },
}

export function PanelLogin({ onSuccess }: { onSuccess: () => void }) {
  const [role, setRole] = useState<Role>("owner")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/panel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? "No se pudo iniciar sesión")
        return
      }
      onSuccess()
    } catch {
      setError("Error de red")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="glow-brand mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-gradient">
            <Lock className="size-6 text-primary-foreground" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
            Panel de control AKARI
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Acceso restringido. Selecciona tu rol e ingresa la contraseña.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(ROLE_META) as Role[]).map((r) => {
              const Meta = ROLE_META[r]
              const Icon = Meta.icon
              const active = role === r
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors ${
                    active
                      ? "border-primary bg-secondary"
                      : "border-border hover:bg-secondary/50"
                  }`}
                >
                  <Icon
                    className={`size-5 ${active ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span className="text-xs font-semibold">{Meta.label}</span>
                </button>
              )
            })}
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            {ROLE_META[role].desc}
          </p>

          <div className="mt-5">
            <label
              htmlFor="panel-password"
              className="mb-2 block text-sm font-medium"
            >
              Contraseña
            </label>
            <input
              id="panel-password"
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-primary"
              placeholder="••••••••••••"
            />
          </div>

          {error && (
            <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="glow-brand mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand-gradient text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  )
}
