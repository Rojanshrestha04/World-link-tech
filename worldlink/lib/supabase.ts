import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SupabaseClient } from '@supabase/supabase-js'

// This is a singleton to prevent multiple instances of Supabase client
let browserClient: SupabaseClient | null = null

// For client components
export function getSupabaseBrowserClient() {
  if (!browserClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables:", {
        url: supabaseUrl ? "present" : "missing",
        key: supabaseAnonKey ? "present" : "missing"
      })
      throw new Error("Supabase environment variables are missing. Please check your .env.local file.")
    }

    try {
      browserClient = createClientComponentClient({
        supabaseUrl,
        supabaseKey: supabaseAnonKey,
        options: {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storageKey: 'supabase.auth.token',
            flowType: 'pkce'
          },
          global: {
            headers: {
              'x-application-name': 'worldlink-admin'
            },
            fetch: (url: RequestInfo, init?: RequestInit) => fetch(url, { ...init, cache: 'no-store' }),
          },
          db: {
            schema: 'public'
          },
          realtime: {
            params: {
              eventsPerSecond: 10
            }
          }
        }
      })

      // Add error handling for network issues
      browserClient.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
          browserClient = null
        }
      })
    } catch (error) {
      console.error("Failed to initialize Supabase client:", error)
      throw new Error("Failed to initialize Supabase client. Please check your configuration.")
    }
  }
  return browserClient
}

// For server components and API routes
export const getSupabaseServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase environment variables:", {
      url: supabaseUrl ? "present" : "missing",
      key: supabaseServiceKey ? "present" : "missing"
    })
    throw new Error("Supabase environment variables are missing. Please check your .env.local file.")
  }

  try {
    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {
          'x-application-name': 'worldlink-admin'
        }
      },
      db: {
        schema: 'public'
      }
    })
  } catch (error) {
    console.error("Failed to initialize Supabase server client:", error)
    throw new Error("Failed to initialize Supabase server client. Please check your configuration.")
  }
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