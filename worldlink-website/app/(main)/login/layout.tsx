import type { Metadata } from "next"
import { UserAuthProvider } from "@/contexts/auth-context"

export const metadata: Metadata = {
  title: "Login | World Link Technical Training Institute",
  description: "Login to your account at World Link Technical Training Institute",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserAuthProvider>
      {children}
    </UserAuthProvider>
  )
} 