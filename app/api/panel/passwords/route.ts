import "server-only"
import { NextResponse } from "next/server"
import { type Role, ROLES, verifyAuth } from "@/lib/panel/auth"
import { getSecondaryStatus, setSecondaryPassword } from "@/lib/panel/passwords"

export async function GET(request: Request) {
  const { role } = await verifyAuth(request)
  if (role !== "owner") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }
  const status = await getSecondaryStatus()
  return NextResponse.json({ status })
}

export async function POST(request: Request) {
  const { role } = await verifyAuth(request)
  if (role !== "owner") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  let body: { targetRole?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 })
  }

  const targetRole = body.targetRole as Role
  if (!ROLES.includes(targetRole)) {
    return NextResponse.json({ error: "Rol inválido" }, { status: 400 })
  }

  // Empty string clears the secondary password (permanent still works).
  const password = typeof body.password === "string" ? body.password.trim() : ""
  await setSecondaryPassword(targetRole, password.length ? password : null)

  const status = await getSecondaryStatus()
  return NextResponse.json({ ok: true, status })
}
