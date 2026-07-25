import type { Metadata } from "next"
import { Great_Vibes, Inter, Oswald, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { CartDrawer } from "@/components/cart/CartDrawer"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { site } from "@/lib/data"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
})
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
})
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-condensed",
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Dipesh Kr Yadav documents his journey as a content creator and growth hacker — courses, tutorials, and tools that teach you the right way to grow.",
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
}

/** Applies the saved theme before first paint — prevents dark-mode flash. */
const themeScript = `try{var t=localStorage.getItem("dipeshkyd-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${greatVibes.variable} ${oswald.variable} ${inter.variable} bg-bg-light font-body text-ink antialiased dark:bg-bg-dark dark:text-ink-ondark`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-purple focus:px-4 focus:py-2 focus:text-ink-ondark"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
