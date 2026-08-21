import { NextResponse } from "next/server"
import { PANEL_COOKIE, PANEL_COOKIE_OPTIONS } from "@/lib/panel/auth"

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(PANEL_COOKIE, "", {
    ...PANEL_COOKIE_OPTIONS,
    maxAge: 0,
  })
  return res
}
