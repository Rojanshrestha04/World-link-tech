
'use client'

import { AdminAuthProvider } from "@/contexts/auth-context"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { usePathname } from "next/navigation"

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  return (
    <AdminAuthProvider>
      {isLoginPage ? (
        // Login page without sidebar
        <div className="min-h-screen">
          {children}
        </div>
      ) : (
        // Regular admin pages with sidebar
        <div className="flex h-screen">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      )}
    </AdminAuthProvider>
  )
}
