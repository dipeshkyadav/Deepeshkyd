import { createHmac } from "crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

/**
 * Admin authentication — zero external services.
 *
 * - The admin email defaults to the site owner and can be overridden with
 *   `ADMIN_EMAIL`.
 * - Login stays DISABLED until `ADMIN_PASSWORD` (8+ characters) is set in
 *   the environment — there is no default password.
 * - Sessions are HMAC-signed, HTTP-only cookies valid for 7 days.
 * - These are server-side runtime variables (not `NEXT_PUBLIC_*`), so
 *   changing them only requires an app restart, not a rebuild.
 */
export const ADMIN_COOKIE = "dipeshkyd-admin"
const SESSION_DAYS = 7

export function adminEmail(): string {
  return (process.env.ADMIN_EMAIL ?? "dipudon456@gmail.com").trim().toLowerCase()
}

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? ""
}

/** Admin login stays disabled until a strong-enough password is set. */
export function adminConfigured(): boolean {
  return adminPassword().length >= 8
}

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? `dipeshkyd:${adminPassword()}`
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex")
}

export function checkCredentials(email: string, password: string): boolean {
  if (!adminConfigured()) return false
  return (
    email.trim().toLowerCase() === adminEmail() && password === adminPassword()
  )
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  return `${expires}.${sign(`${adminEmail()}|${expires}`)}`
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !adminConfigured()) return false
  const dot = token.indexOf(".")
  if (dot < 1) return false
  const expires = Number(token.slice(0, dot))
  const signature = token.slice(dot + 1)
  if (!Number.isFinite(expires) || Date.now() > expires) return false
  return signature === sign(`${adminEmail()}|${expires}`)
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies()
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value)
}

/** Server-component guard: bounce to the login screen when signed out. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login")
}
