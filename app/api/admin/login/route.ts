import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import {
  ADMIN_COOKIE,
  adminConfigured,
  checkCredentials,
  createSessionToken,
} from "@/lib/admin/auth"

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin login is disabled. Set ADMIN_PASSWORD (8+ characters) in your environment first — see .env.example.",
      },
      { status: 503 },
    )
  }
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === "string" ? body.email : ""
  const password = typeof body?.password === "string" ? body.password : ""
  if (!checkCredentials(email, password)) {
    return NextResponse.json(
      { error: "Wrong email or password." },
      { status: 401 },
    )
  }
  const store = await cookies()
  store.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return NextResponse.json({ ok: true })
}
