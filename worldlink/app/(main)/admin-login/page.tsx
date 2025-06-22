'use client'

import { Suspense } from "react"
import AdminLoginForm from "@/components/admin/admin-login-form"

export default function AdminLoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-600 mt-2">Enter your credentials to access the admin panel</p>
        </div>
        <Suspense fallback={<div className="bg-white p-8 rounded-lg shadow-sm">Loading...</div>}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  )
}
