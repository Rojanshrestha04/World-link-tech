import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = getSupabaseServerClient()
    
    // Get users from public.users table
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (usersError) {
      return NextResponse.json({ error: usersError.message }, { status: 400 })
    }

    // Get auth users to get last_sign_in_at
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Merge the data
    const mergedUsers = usersData?.map(user => {
      const authUser = authUsers?.users.find(authUser => authUser.id === user.id)
      return {
        ...user,
        last_sign_in_at: authUser?.last_sign_in_at
      }
    }) || []

    return NextResponse.json({ users: mergedUsers })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseServerClient()
    const { email, password, full_name, role, is_active } = await request.json()

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        display_name: full_name,
        role: role,
      }
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "User creation failed: No user data returned" }, { status: 400 })
    }

    // Insert user profile into public.users table
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email,
          full_name,
          role,
          is_active,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()

    if (profileError) {
      // If profile creation fails, delete the auth user
      await supabase.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    // Sign out the newly created user to prevent automatic sign-in
    await supabase.auth.admin.signOut(authData.user.id)

    return NextResponse.json({ 
      success: true, 
      user: profileData[0] 
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
} 