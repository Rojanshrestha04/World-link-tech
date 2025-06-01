"use client"

import React from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAdminAuth } from "@/contexts/auth-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === "/admin/login"
  const { user, isAdmin, isLoading } = useAdminAuth()

  useEffect(() => {
    if (!isLoading) {
      if (!user && !isLoginPage) {
        router.push("/admin/login")
      } else if (user && !isAdmin && !isLoginPage) {
        router.push("/admin/login")
      }
    }
  }, [user, isAdmin, isLoading, isLoginPage, router])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    )
  }

  // If not authenticated and not on login page, redirect to login
  if (!user && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access the admin panel.</p>
        </div>
      </div>
    )
  }

  // If authenticated but not admin, show access denied
  if (user && !isAdmin && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
          <p className="text-gray-600">You do not have permission to access the admin panel.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && user && isAdmin && <AdminSidebar />}
      <main className={!isLoginPage && user && isAdmin ? "lg:pl-64" : ""}>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}