import "server-only"
import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

export type Role = "owner" | "admin" | "developer"

export const ROLES: Role[] = ["owner", "admin", "developer"]

export type Permission =
  | "site_settings" // change site title, logo, hero texts (owner only)
  | "announcements" // create/manage announcements
  | "sections" // toggle site sections
  | "cards" // add custom option cards
  | "passwords" // manage secondary passwords (owner only)
  | "system" // system / config panel

/**
 * PERMANENT passwords. These live ONLY in code, are never stored in the
 * database, and can NEVER be changed from the panel. Each role always accepts
 * its permanent password(s). The owner has two permanent passwords.
 */
const PERMANENT_PASSWORDS: Record<Role, string[]> = {
  owner: [
    "OWNER_EVENTIA-BOT-COMPANY502_09_2927_",
    "ownerbot5636363609eventiacompany",
  ],
  admin: ["ADMIMBOT-EVENTIA-COMPANY-6767-NEMO"],
  developer: ["DEVERLOPER502-BOT-EVENTIA-NEMO-2927"],
}

// Owner can do everything. The other roles get a scoped subset.
export const PERMISSIONS: Record<Role, Permission[]> = {
  owner: ["site_settings", "announcements", "sections", "cards", "passwords", "system"],
  admin: ["announcements", "cards"],
  developer: ["sections", "system"],
}

export function roleHas(role: Role, permission: Permission): boolean {
  return PERMISSIONS[role]?.includes(permission) ?? false
}

const SECRET = process.env.PANEL_SECRET ?? "akari-eventia-world-panel-secret"
const COOKIE_NAME = "akari_panel"

function sign(value: string): string {
  return createHmac("sha256", SECRET).update(value).digest("hex")
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

/** Hash a plaintext password for storage / comparison (secondary passwords). */
export function hashPassword(plain: string): string {
  return createHmac("sha256", SECRET).update(`pw:${plain}`).digest("hex")
}

/** Check ONLY the permanent (unchangeable) passwords for a role. */
export function verifyPermanent(role: Role, password: string): boolean {
  const list = PERMANENT_PASSWORDS[role]
  if (!list) return false
  // Compare against every permanent password in constant time.
  let ok = false
  for (const expected of list) {
    if (safeEqual(password, expected)) ok = true
  }
  return ok
}

/** Build a tamper-proof session token: `<role>.<hmac(role)>`. */
export function createSessionToken(role: Role): string {
  return `${role}.${sign(role)}`
}

export function readSessionToken(token: string | undefined): Role | null {
  if (!token) return null
  const [role, mac] = token.split(".")
  if (!role || !mac) return null
  if (!ROLES.includes(role as Role)) return null
  if (!safeEqual(mac, sign(role))) return null
  return role as Role
}

/** Read the current role from the httpOnly cookie (server side). */
export async function getSessionRole(): Promise<Role | null> {
  const store = await cookies()
  return readSessionToken(store.get(COOKIE_NAME)?.value)
}

export const PANEL_COOKIE = COOKIE_NAME

// Cookie options that work inside the v0 preview iframe (cross-site context
// requires SameSite=None + Secure) as well as in production.
export const PANEL_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "none" as const,
  secure: true,
  path: "/",
}

/** Verify auth from a request: returns the role or null if invalid. */
export async function verifyAuth(request: Request) {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return { role: null as Role | null }

  const parsed = Object.fromEntries(
    cookieHeader.split("; ").map((c) => {
      const [k, ...rest] = c.split("=")
      return [k, rest.join("=")]
    }),
  )

  return { role: readSessionToken(parsed[COOKIE_NAME]) }
}
