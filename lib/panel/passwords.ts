import "server-only"
import { timingSafeEqual } from "crypto"
import { db } from "@/lib/db"
import { panelSecrets } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { type Role, ROLES, hashPassword, verifyPermanent } from "./auth"

function safeEqualHex(a: string, b: string): boolean {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

/** Get the stored secondary password hash for a role (null if none set). */
async function getSecondaryHash(role: Role): Promise<string | null> {
  try {
    const [row] = await db
      .select()
      .from(panelSecrets)
      .where(eq(panelSecrets.role, role))
      .limit(1)
    return row?.passwordHash ?? null
  } catch (error) {
    console.error("Error reading secondary password:", error)
    return null
  }
}

/**
 * Verify a login attempt. Accepts EITHER the role's permanent password OR the
 * owner-configured secondary password. Both are valid ways to sign in.
 */
export async function verifyLogin(role: Role, password: string): Promise<boolean> {
  if (verifyPermanent(role, password)) return true

  const stored = await getSecondaryHash(role)
  if (!stored) return false
  return safeEqualHex(hashPassword(password), stored)
}

/** Owner-only: set (or clear) the secondary password for a role. */
export async function setSecondaryPassword(
  role: Role,
  plain: string | null,
): Promise<void> {
  const passwordHash = plain && plain.length > 0 ? hashPassword(plain) : null
  await db
    .insert(panelSecrets)
    .values({ role, passwordHash, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: panelSecrets.role,
      set: { passwordHash, updatedAt: new Date() },
    })
}

/** Return which roles currently have a secondary password configured. */
export async function getSecondaryStatus(): Promise<Record<Role, boolean>> {
  const status = { owner: false, admin: false, developer: false } as Record<
    Role,
    boolean
  >
  try {
    const rows = await db.select().from(panelSecrets)
    for (const row of rows) {
      if (ROLES.includes(row.role as Role) && row.passwordHash) {
        status[row.role as Role] = true
      }
    }
  } catch (error) {
    console.error("Error reading secondary status:", error)
  }
  return status
}
