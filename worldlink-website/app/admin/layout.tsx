import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminAuthProvider } from "@/contexts/auth-context"
import AdminLayoutClient from "@/components/admin/admin-layout-client"
import "@/app/globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Admin Dashboard - World Link Technical Training Institute",
  description: "Admin dashboard for managing the World Link Technical Training Institute website",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AdminAuthProvider>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </AdminAuthProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </ThemeProvider>
  )
}