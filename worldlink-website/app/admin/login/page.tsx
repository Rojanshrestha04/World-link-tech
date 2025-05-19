import type { Metadata } from "next"
import AdminLoginForm from "@/components/admin/admin-login-form"

export const metadata: Metadata = {
  title: "Admin Login | World Link Technical Training Institute",
  description: "Login to the admin panel of World Link Technical Training Institute",
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-600 mt-2">Enter your credentials to access the admin panel</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  )
}
