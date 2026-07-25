import { NextResponse } from "next/server"
import { z } from "zod"
import { businessEmail, sendMail, smtpConfigured } from "@/lib/mailer"
import { verifyCode } from "@/lib/otp"
import { formatUsd } from "@/lib/utils"

const itemSchema = z.object({
  name: z.string().min(1).max(200),
  quantity: z.number().int().min(1).max(99),
  priceUsd: z.number().min(0).max(100000),
})

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  // International format: "+" then country code and number, any country.
  phone: z
    .string()
    .regex(/^\+\d[\d ()-]{5,20}$/, "Use international format, e.g. +977 98XXXXXXXX"),
  code: z.string().regex(/^\d{6}$/),
  token: z.string().min(16).max(200),
  expires: z.number(),
  items: z.array(itemSchema).min(1).max(50),
})

/**
 * Step 2 of checkout — verify the emailed code, then send the order to the
 * business inbox (BUSINESS_EMAIL) and a confirmation to the buyer.
 */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return NextResponse.json(
      { error: issue?.message ?? "Invalid order." },
      { status: 400 },
    )
  }
  if (!smtpConfigured()) {
    return NextResponse.json(
      { error: "Ordering is not configured on the server yet." },
      { status: 503 },
    )
  }
  const { name, email, phone, code, token, expires, items } = parsed.data
  if (!verifyCode(email.trim().toLowerCase(), code, expires, token)) {
    return NextResponse.json(
      { error: "That code is wrong or has expired \u2014 request a new one." },
      { status: 401 },
    )
  }

  const orderId = `DK-${Date.now().toString(36).toUpperCase()}`
  const total = items.reduce(
    (sum, item) => sum + item.priceUsd * item.quantity,
    0,
  )
  const lines = items
    .map(
      (item) =>
        `\u2022 ${item.name} \u00d7${item.quantity} \u2014 ${formatUsd(item.priceUsd * item.quantity)}`,
    )
    .join("\n")

  try {
    await sendMail({
      to: businessEmail(),
      replyTo: email,
      subject: `New order ${orderId} \u2014 ${formatUsd(total)} from ${name}`,
      text: `New order on dipeshkyd.com\n\nOrder: ${orderId}\nName: ${name}\nEmail: ${email} (verified)\nPhone: ${phone}\n\n${lines}\nTotal: ${formatUsd(total)}\n\nReply to this email or message the buyer to arrange payment and delivery.`,
    })
    await sendMail({
      to: email,
      replyTo: businessEmail(),
      subject: `Order ${orderId} received \u2014 Dipeshkyd`,
      text: `Hi ${name},\n\nThanks for your order at dipeshkyd.com!\n\nOrder: ${orderId}\n${lines}\nTotal: ${formatUsd(total)}\n\nI'll contact you at this email or ${phone} shortly to arrange payment and delivery.\n\n\u2014 Dipesh Kr Yadav\nThe Growth Hacker | Professional Content Creator`,
    })
  } catch {
    return NextResponse.json(
      { error: "Could not place the order right now \u2014 try again in a minute." },
      { status: 502 },
    )
  }
  return NextResponse.json({ ok: true, orderId })
}
