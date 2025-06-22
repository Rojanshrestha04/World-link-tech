import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseServerClient()
    const userId = params.id
    const { email, full_name, role, is_active } = await request.json()

    // Update user in auth system
    const { error: authError } = await supabase.auth.admin.updateUserById(
      userId,
      {
        email,
        user_metadata: {
          display_name: full_name,
          role: role,
        }
      }
    )

    if (authError) {
      console.error('Error updating user in auth:', authError)
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Update user in public.users table
    const { data: updatedProfile, error: profileError } = await supabase
      .from('users')
      .update({
        email,
        full_name,
        role,
        is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()

    if (profileError) {
      console.error('Error updating user profile:', profileError)
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    if (!updatedProfile || updatedProfile.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      user: updatedProfile[0] 
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseServerClient()
    const userId = params.id

    // First delete from auth.users
    const { error: authError } = await supabase.auth.admin.deleteUser(userId)

    if (authError) {
      console.error('Error deleting user from auth:', authError)
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Then delete from public.users
    const { error: profileError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)

    if (profileError) {
      console.error('Error deleting user profile:', profileError)
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
} 