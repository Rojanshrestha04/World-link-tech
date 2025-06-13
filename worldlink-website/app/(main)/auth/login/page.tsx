import type { Metadata } from "next"
import LoginForm from "@/components/auth/login-form"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login | World Link Technical Training Institute",
  description: "Login to your account at World Link Technical Training Institute",
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-slate-600">Login to access your account</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <LoginForm />

          <div className="mt-6 text-center text-sm">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
