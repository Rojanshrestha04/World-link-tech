import type { Metadata } from "next"
import Link from "next/link"
import LoginForm from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Login | World Link Technical Training Institute",
  description: "Login to your account at World Link Technical Training Institute",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Login to Your Account</h1>
          <p className="text-slate-600 mt-2">Welcome back to World Link Technical Training Institute</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <LoginForm />
          <div className="mt-6 text-center text-sm">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
            <div className="mt-4">
              <Link href="/admin-login">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
