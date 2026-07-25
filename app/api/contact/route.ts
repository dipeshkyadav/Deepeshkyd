import { NextResponse } from "next/server"
import { z } from "zod"
import { env } from "@/lib/env"

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000),
})

/**
 * Delivers contact-form messages straight to the business inbox
 * (env.contactEmail) via the Resend HTTP API.
 *
 * Requires the RESEND_API_KEY runtime env var. Without it, this responds
 * 503 and the form falls back to opening the visitor's email app with the
 * message prefilled — it still ends up in the same inbox.
 */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 })
  }
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      { error: "Direct sending is not configured on the server." },
      { status: 503 },
    )
  }
  const { name, email, message } = parsed.data
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.MAIL_FROM?.trim() ||
        "Dipeshkyd Website <onboarding@resend.dev>",
      to: [env.contactEmail],
      reply_to: email,
      subject: `New message from dipeshkyd.com — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  })
  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not send right now." },
      { status: 502 },
    )
  }
  return NextResponse.json({ ok: true })
}
