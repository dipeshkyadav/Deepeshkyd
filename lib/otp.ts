import { createHmac, randomInt, timingSafeEqual } from "crypto"

/**
 * Stateless email verification codes (OTP) for checkout.
 *
 * The server never stores codes. It signs `email|code|expires` with an HMAC
 * secret and hands the signature to the client; at order time the client
 * returns the code + signature and the server recomputes to verify. Works
 * on serverless (no database, survives cold starts).
 */
const CODE_TTL_MS = 10 * 60 * 1000 // 10 minutes

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.SMTP_PASS?.trim() ||
    "dipeshkyd-otp-fallback"
  )
}

export function generateCode(): { code: string; expires: number } {
  return {
    code: randomInt(100000, 1000000).toString(),
    expires: Date.now() + CODE_TTL_MS,
  }
}

export function signCode(email: string, code: string, expires: number): string {
  return createHmac("sha256", secret())
    .update(`${email.trim().toLowerCase()}|${code}|${expires}`)
    .digest("hex")
}

export function verifyCode(
  email: string,
  code: string,
  expires: number,
  token: string,
): boolean {
  if (!Number.isFinite(expires) || Date.now() > expires) return false
  const expected = signCode(email, code, expires)
  const received = Buffer.from(token)
  const wanted = Buffer.from(expected)
  if (received.length !== wanted.length) return false
  return timingSafeEqual(received, wanted)
}
