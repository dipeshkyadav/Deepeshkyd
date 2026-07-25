import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="pb-24 pt-12">{children}</div>
}
