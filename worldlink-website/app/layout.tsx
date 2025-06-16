import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UserAuthProvider } from "@/context/auth-context"

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
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${inter.className} flex flex-col h-full`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <UserAuthProvider>
            {children}
          </UserAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}