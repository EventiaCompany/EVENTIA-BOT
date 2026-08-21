import { NextResponse } from "next/server"
import {
  type Role,
  ROLES,
  PANEL_COOKIE,
  PANEL_COOKIE_OPTIONS,
  PERMISSIONS,
  createSessionToken,
} from "@/lib/panel/auth"
import { verifyLogin } from "@/lib/panel/passwords"

export async function POST(request: Request) {
  let body: { role?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 })
  }

  const role = body.role as Role
  const password = body.password ?? ""

  if (!ROLES.includes(role)) {
    return NextResponse.json({ error: "Rol inválido" }, { status: 400 })
  }

  if (!(await verifyLogin(role, password))) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
  }

  const res = NextResponse.json({ role, permissions: PERMISSIONS[role] })
  res.cookies.set(PANEL_COOKIE, createSessionToken(role), {
    ...PANEL_COOKIE_OPTIONS,
    maxAge: 60 * 60 * 8, // 8 hours
  })
  return res
}
