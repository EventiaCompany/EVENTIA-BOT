import { NextResponse } from "next/server"
import { getSessionRole, PERMISSIONS } from "@/lib/panel/auth"

export async function GET() {
  const role = await getSessionRole()
  if (!role) return NextResponse.json({ role: null, permissions: [] })
  return NextResponse.json({ role, permissions: PERMISSIONS[role] })
}
