import { NextResponse } from "next/server"
import { z } from "zod"
import { sendMail, smtpConfigured } from "@/lib/mailer"
import { generateCode, signCode } from "@/lib/otp"

const schema = z.object({ email: z.string().email().max(200) })

/**
 * Step 1 of checkout — email a 6-digit verification code to the buyer.
 * Requires SMTP_USER + SMTP_PASS (Gmail App Password) at runtime.
 */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    )
  }
  if (!smtpConfigured()) {
    return NextResponse.json(
      { error: "Email verification is not configured on the server yet." },
      { status: 503 },
    )
  }
  const email = parsed.data.email.trim().toLowerCase()
  const { code, expires } = generateCode()
  try {
    await sendMail({
      to: email,
      subject: `${code} is your Dipeshkyd verification code`,
      text: `Your verification code is ${code}.\n\nIt expires in 10 minutes. If you didn't request this, you can ignore this email.\n\n\u2014 Dipeshkyd (dipeshkyd.com)`,
    })
  } catch {
    return NextResponse.json(
      { error: "Could not send the code right now \u2014 try again in a minute." },
      { status: 502 },
    )
  }
  return NextResponse.json({ token: signCode(email, code, expires), expires })
}
