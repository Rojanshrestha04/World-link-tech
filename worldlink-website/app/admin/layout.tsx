import AdminLayoutClient from "@/components/admin/admin-layout-client"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminAuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Admin Dashboard | World Link Technical Training Institute",
  description: "Admin dashboard for World Link Technical Training Institute website management",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col h-full`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AdminAuthProvider>
            <AdminLayoutClient>{children}</AdminLayoutClient>
          </AdminAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}