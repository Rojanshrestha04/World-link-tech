
"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useRef } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null
    success: boolean
  }>
  signUp: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<{
    error: Error | null
    success: boolean
  }>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const UserAuthContext = createContext<AuthContextType | undefined>(undefined)
const AdminAuthContext = createContext<AuthContextType | undefined>(undefined)

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true)

      try {
        // Get session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (session) {
          setSession(session)
          setUser(session.user)

          // Check if user is admin
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("role")
            .eq("id", session.user.id)
            .single()

          if (!userError && userData) {
            setIsAdmin(userData.role === "admin")
          }
        }
      } catch (error) {
        console.error("Error fetching session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        // Check if user is admin
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single()

        if (!userError && userData) {
          setIsAdmin(userData.role === "admin")
        }
      } else {
        setIsAdmin(false)
      }

      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error && data.user) {
        try {
          // First check if user exists in the users table
          const { data: userData, error: userCheckError } = await supabase
            .from('users')
            .select('id')
            .eq('id', data.user.id)
            .single()

          if (userCheckError) {
            console.error("Error checking user existence:", userCheckError)
            // Continue with login even if check fails
          } else if (userData) {
            // Only update if user exists in the table
            const { error: updateError } = await supabase
              .from('users')
              .update({ 
                last_sign_in_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              .eq('id', data.user.id)

            if (updateError) {
              console.error("Error updating last_sign_in_at:", updateError)
              // Continue with login even if update fails
            }
          }
        } catch (updateError) {
          console.error("Error in last_sign_in_at update process:", updateError)
          // Continue with login even if update process fails
        }
      }

      return {
        error,
        success: !error,
      }
    } catch (error) {
      return {
        error: error as Error,
        success: false,
      }
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      return {
        error,
        success: !error,
      }
    } catch (error) {
      return {
        error: error as Error,
        success: false,
      }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      toast.success("Logged out successfully!")
      router.push("/")
    } catch (error: any) {
      toast.error(error?.message || "Logout failed")
      throw error
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  }

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>
}

export function useUserAuth() {
  const context = useContext(UserAuthContext)
  if (context === undefined) {
    throw new Error("useUserAuth must be used within a UserAuthProvider")
  }
  return context
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()
  
  // Refs to prevent race conditions and duplicate checks
  const isInitialized = useRef(false)
  const adminCheckCache = useRef<{ [userId: string]: { isAdmin: boolean; timestamp: number } }>({})
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes cache

  // Function to check admin status with caching
  const checkAdminStatus = async (userId: string): Promise<boolean> => {
    const now = Date.now()
    const cached = adminCheckCache.current[userId]
    
    // Return cached result if still valid
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      console.log('[AdminAuth] Using cached admin status:', cached.isAdmin)
      return cached.isAdmin
    }

    try {
      console.log('[AdminAuth] Checking admin status for user:', userId)
      
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single()

      if (userError) {
        console.error('[AdminAuth] Error fetching user role:', userError)
        return false
      }

      const isAdminUser = userData?.role === "admin"
      
      // Cache the result
      adminCheckCache.current[userId] = {
        isAdmin: isAdminUser,
        timestamp: now
      }
      
      console.log('[AdminAuth] Admin status determined:', isAdminUser)
      return isAdminUser
    } catch (error) {
      console.error('[AdminAuth] Exception during admin check:', error)
      return false
    }
  }

  // Initialize auth state
  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      try {
        console.log('[AdminAuth] Initializing auth state...')
        
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (!isMounted) return
        
        if (error) {
          console.error('[AdminAuth] Error getting session:', error)
          setIsLoading(false)
          return
        }

        if (session?.user) {
          console.log('[AdminAuth] Session found, checking admin status...')
          setSession(session)
          setUser(session.user)
          
          const adminStatus = await checkAdminStatus(session.user.id)
          
          if (isMounted) {
            setIsAdmin(adminStatus)
          }
        } else {
          console.log('[AdminAuth] No session found')
          setSession(null)
          setUser(null)
          setIsAdmin(false)
        }
        
        if (isMounted) {
          setIsLoading(false)
          isInitialized.current = true
        }
      } catch (error) {
        console.error('[AdminAuth] Error initializing auth:', error)
        if (isMounted) {
          setIsLoading(false)
          isInitialized.current = true
        }
      }
    }

    initializeAuth()

    return () => {
      isMounted = false
    }
  }, [supabase])

  // Set up auth state change listener
  useEffect(() => {
    let isMounted = true

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return
      
      console.log('[AdminAuth] Auth state change:', event, !!session)
      
      // Don't process events before initialization is complete
      if (!isInitialized.current && event !== 'INITIAL_SESSION') {
        return
      }

      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        // Check admin status for authenticated user
        const adminStatus = await checkAdminStatus(session.user.id)
        if (isMounted) {
          setIsAdmin(adminStatus)
        }
      } else {
        // Clear admin status for unauthenticated user
        if (isMounted) {
          setIsAdmin(false)
          // Clear cache when user logs out
          adminCheckCache.current = {}
        }
      }

      // Only refresh router after initialization
      if (isInitialized.current) {
        router.refresh()
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [router, supabase])

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error && data.user) {
        try {
          // First check if user exists in the users table
          const { data: userData, error: userCheckError } = await supabase
            .from('users')
            .select('id')
            .eq('id', data.user.id)
            .single()

          if (userCheckError) {
            console.error("Error checking user existence:", userCheckError)
            // Continue with login even if check fails
          } else if (userData) {
            // Only update if user exists in the table
            const { error: updateError } = await supabase
              .from('users')
              .update({ 
                last_sign_in_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              .eq('id', data.user.id)

            if (updateError) {
              console.error("Error updating last_sign_in_at:", updateError)
              // Continue with login even if update fails
            }
          }
        } catch (updateError) {
          console.error("Error in last_sign_in_at update process:", updateError)
          // Continue with login even if update process fails
        }
      }

      return {
        error,
        success: !error,
      }
    } catch (error) {
      return {
        error: error as Error,
        success: false,
      }
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      return {
        error,
        success: !error,
      }
    } catch (error) {
      return {
        error: error as Error,
        success: false,
      }
    }
  }

  const signOut = async () => {
    try {
      // Clear cache before signing out
      adminCheckCache.current = {}
      await supabase.auth.signOut()
      toast.success("Logged out successfully!")
      router.push("/")
    } catch (error: any) {
      toast.error(error?.message || "Logout failed")
      throw error
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
