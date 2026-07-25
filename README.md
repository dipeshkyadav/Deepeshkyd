# Dipeshkyd — dipeshkyd.com

Personal brand site for **Dipesh Kr Yadav** (Dipeshkyd) — The Growth Hacker | Professional Content Creator.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS (design tokens in `app/globals.css` + `tailwind.config.ts`)
- Framer Motion (all motion respects `prefers-reduced-motion`)
- Zustand (cart, persisted to local storage)
- React Hook Form + Zod (contact form)
- Lucide React icons · next/font self-hosted fonts

## Payment — no Stripe

Checkout is a **WhatsApp/Telegram order flow**:

- The cart composes a prefilled order message.
- WhatsApp: opens `wa.me/9779821594372` with the order text (+977 9821594372).
- Telegram: copies the order text and opens `t.me/deepeshkyd`.
- Payment confirmation and file delivery happen in the chat. No payment keys, no API routes.

Contact details live in `lib/data.ts` (`contact`, `whatsappLink`, `telegramLink`).

## Run locally

```bash
npm install
npm run dev
```

## Before launch — replace sample content

All sample content is marked in `lib/data.ts`:

- `stats` — every value is `[REPLACE WITH REAL FIGURE]`
- `videos` — real videos from the channel are wired in; add more via the admin panel
- `courses`, `products`, `blogPosts` — sample entries in Dipesh's voice; replace with real ones
- Legal pages (`/privacy`, `/terms`, `/refund`) — placeholder copy marked `[REVIEW BEFORE LAUNCH]`
- Photos: only Dipesh's real photos in `public/images/` — never stock or AI faces

## Admin panel

- Sign in at `/admin/login` — email `dipudon456@gmail.com` (override with `ADMIN_EMAIL`) plus your `ADMIN_PASSWORD`.
- Manage blog posts (create, edit, delete, featured post, pull quotes) and site data (stats, videos, products, courses) from `/admin`.
- Login stays disabled until `ADMIN_PASSWORD` (8+ characters) is set — there is no insecure default.
- Admin edits are saved to `content/*.json` at runtime (gitignored). Back that folder up before redeploys; without it the site falls back to the defaults in `lib/data.ts`.
- `ADMIN_*` variables are read at runtime — changing them only needs an app restart, not a rebuild.

### Admin write troubleshooting (read-only filesystems)

- On read-only/non-persistent hosts, admin save requests can return JSON errors like `CONTENT_STORAGE_READ_ONLY` or `CONTENT_STORAGE_PERMISSION_DENIED`.
- This means runtime file writes to `content/*.json` are blocked by the platform.
- Fix by deploying to writable persistent storage, or by moving admin content persistence to an external store (DB/object storage) for that environment.

## Environment variables

All runtime configuration is centralized in `lib/env.ts` — the only file that
reads `process.env`. **Every value has a safe default**, so the site builds
and runs correctly with zero env setup.

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://dipeshkyd.com` | Canonical origin for SEO/OG metadata |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `9779821594372` | wa.me order number — country code + number, digits only |
| `NEXT_PUBLIC_WHATSAPP_DISPLAY` | `+977 9821594372` | Number as displayed to visitors |
| `NEXT_PUBLIC_TELEGRAM_HANDLE` | `deepeshkyd` | Telegram handle without the `@` |

- **Local**: copy `.env.example` to `.env.local` and edit.
- **Hostinger**: hPanel → your Node.js app → **Environment variables**.
- ⚠️ `NEXT_PUBLIC_*` values are inlined at **build time** — set them in
  hPanel *before* the build step runs. Changing them later requires a
  rebuild/redeploy.

## Deploy — Hostinger Cloud Startup (Node.js Web Apps)

1. Push this repo to GitHub (private, Student Pack).
2. Create a Node.js app in hPanel connected to the repo.
3. Set the environment variables above (optional — defaults are correct for launch).
4. Settings: install `npm ci` · build `npm run build` · start `npm run start -- -p $PORT` · Node 20.
5. Point `dipeshkyd.com` at the app.

## Build phases

- [x] Phase 1 — Foundation (scaffold, tokens, fonts)
- [x] Phase 2 — Design system (UI components)
- [x] Phase 3 — Layout shell (navbar, footer, theme toggle, cart drawer)
- [x] Phase 4 — Home page
- [x] Phase 5 — Course, YT Tutorial, Blog, Shop, Contact, About + legal pages
- [x] Phase 6a — Error scan (full type-check: 0 errors) + env management
- [ ] Phase 6b — Polish (Lighthouse on real deploy, real content)
- [ ] Phase 7 — Deploy to Hostinger
