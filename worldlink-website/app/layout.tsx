import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UserAuthProvider } from "@/context/auth-context"
import { AdminAuthProvider } from "@/contexts/auth-context"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "World Link Technical Training Institute",
  description: "Empowering through quality technical education and training",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AdminAuthProvider>
            <UserAuthProvider>
              <SiteHeader />
              <main className="min-h-screen pt-16">{children}</main>
              <SiteFooter />
            </UserAuthProvider>
          </AdminAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}