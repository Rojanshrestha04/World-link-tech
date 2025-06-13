'use client'

import { AdminAuthProvider } from "@/contexts/auth-context"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { usePathname, useRouter } from "next/navigation"
import { useAdminAuth } from "@/contexts/auth-context"

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAdmin, isLoading } = useAdminAuth()

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login prompt if not authenticated
  if (!user || !isAdmin) {
    router.push('/admin-login')
    return null
  }

  // Regular admin pages with sidebar
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      {/* Main content area with proper left margin to account for sidebar */}
      <main className="flex-1 lg:ml-64 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  )
}