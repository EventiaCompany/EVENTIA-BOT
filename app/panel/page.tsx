"use client"

import useSWR from "swr"
import { PanelLogin } from "@/components/panel/panel-login"
import { PanelDashboard } from "@/components/panel/panel-dashboard"

type Permission =
  | "site_settings"
  | "announcements"
  | "sections"
  | "cards"
  | "passwords"
  | "system"

type Session = { role: string | null; permissions: Permission[] }

const fetcher = (url: string): Promise<Session> =>
  fetch(url).then((r) => r.json())

export default function PanelPage() {
  const { data, isLoading, mutate } = useSWR<Session>(
    "/api/panel/session",
    fetcher,
  )

  async function logout() {
    await fetch("/api/panel/logout", { method: "POST" })
    mutate({ role: null, permissions: [] }, false)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Cargando...
      </div>
    )
  }

  if (!data?.role) {
    return <PanelLogin onSuccess={() => mutate()} />
  }

  return (
    <PanelDashboard
      role={data.role}
      permissions={data.permissions}
      onLogout={logout}
    />
  )
}
