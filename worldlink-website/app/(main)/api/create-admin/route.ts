import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

// This is a protected route that should only be accessible in development
// or with proper authorization in production
export async function POST(request: NextRequest) {
  // In production, you would add additional security checks here
  if (process.env.NODE_ENV === "production") {
    // Check for a secret token or other authorization
    const authHeader = request.headers.get("authorization")
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  try {
    const supabase = getSupabaseServerClient()
    const { email, password, fullName } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName || "Admin User",
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Update user role to admin
    const { error: updateError } = await supabase.from("users").update({ role: "admin" }).eq("id", authData.user.id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      userId: authData.user.id,
    })
  } catch (error) {
    console.error('Error creating admin user:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 })
  }
}
