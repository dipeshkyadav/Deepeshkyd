import nodemailer from "nodemailer"
import { env } from "@/lib/env"

/**
 * Gmail SMTP mailer — powers the contact form, checkout email verification,
 * and order notifications.
 *
 * Required runtime env vars (server-side, no rebuild needed):
 * - SMTP_USER — the Gmail address that sends mail
 * - SMTP_PASS — a Gmail App Password (Google Account → Security →
 *   2-Step Verification → App passwords)
 * - BUSINESS_EMAIL — where orders and contact messages are delivered
 *   (falls back to NEXT_PUBLIC_CONTACT_EMAIL)
 *
 * Optional: SMTP_HOST (default smtp.gmail.com), SMTP_PORT (default 465),
 * MAIL_FROM (default "Dipeshkyd Website <SMTP_USER>").
 */
export function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim())
}

/** Where orders and contact messages are delivered. */
export function businessEmail(): string {
  return process.env.BUSINESS_EMAIL?.trim() || env.contactEmail
}

export async function sendMail(options: {
  to: string
  subject: string
  text: string
  replyTo?: string
}): Promise<void> {
  const user = process.env.SMTP_USER!.trim()
  const port = Number(process.env.SMTP_PORT?.trim() || 465)
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass: process.env.SMTP_PASS!.trim() },
  })
  await transport.sendMail({
    from: process.env.MAIL_FROM?.trim() || `Dipeshkyd Website <${user}>`,
    ...options,
  })
}
