import type { Metadata } from "next"
import { AdminAuthProvider } from "@/contexts/auth-context"

export const metadata: Metadata = {
  title: "Admin Login | World Link Technical Training Institute",
  description: "Login to the admin panel of World Link Technical Training Institute",
}

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      {children}
    </AdminAuthProvider>
  )
} 