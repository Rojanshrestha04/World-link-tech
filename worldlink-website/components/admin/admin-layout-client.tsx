
'use client'

import { AdminAuthProvider } from "@/contexts/auth-context"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { usePathname } from "next/navigation"
import { useAdminAuth } from "@/contexts/auth-context"

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, isAdmin, isLoading } = useAdminAuth()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    // Login page without sidebar
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You need to be logged in as an admin to access this page.</p>
          <a 
            href="/admin/login" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  // Regular admin pages with sidebar - proper layout without overlap
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