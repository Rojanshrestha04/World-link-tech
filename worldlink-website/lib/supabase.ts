import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SupabaseClient } from '@supabase/supabase-js'

// This is a singleton to prevent multiple instances of Supabase client
let browserClient: SupabaseClient | null = null

// For client components
export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createClientComponentClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })
  }
  return browserClient
}

// For server components and API routes
export const getSupabaseServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || '',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: string
  avatar_url: string | null
  created_at: string
  updated_at: string
}