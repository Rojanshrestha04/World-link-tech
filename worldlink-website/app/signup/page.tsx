import type { Metadata } from "next"
import SignupForm from "@/components/auth/signup-form"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign Up | World Link Technical Training Institute",
  description: "Create a new account at World Link Technical Training Institute",
}

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-slate-600">Join World Link Technical Training Institute</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <SignupForm />

          <div className="mt-6 text-center text-sm">
            <p className="text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
