import type { Metadata } from "next"
import { AdminShell } from "@/components/admin/AdminShell"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pb-24 pt-10">
      <AdminShell>{children}</AdminShell>
    </div>
  )
}
