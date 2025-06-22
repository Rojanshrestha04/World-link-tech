
'use client'

import AdminSidebar from "@/components/admin/admin-sidebar"
import { usePathname, useRouter } from "next/navigation"
import { useAdminAuth } from "@/contexts/auth-context"
import { useEffect } from "react"

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAdmin, isLoading } = useAdminAuth()

  useEffect(() => {
    // Only redirect if we're done loading and user is not admin
    if (!isLoading && (!user || !isAdmin)) {
      console.log('[AdminLayoutClient] Redirecting non-admin user')
      // Show error and redirect
      alert("You are not authorized to access the admin dashboard. Please log in as an admin.");
      router.push('/admin-login');
    }
  }, [user, isAdmin, isLoading, router])

  // Show loading state while checking authentication
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

  // Show error if not authenticated or not admin
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">You are not authorized to access the admin dashboard. Please log in as an admin.</p>
        </div>
      </div>
    )
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
