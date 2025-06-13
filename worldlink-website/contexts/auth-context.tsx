"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
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
    await supabase.auth.signOut()
    router.push("/")
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

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true)
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
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
        } else {
            setUser(null);
            setSession(null);
            setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching admin session:", error)
        setUser(null);
        setSession(null);
        setIsAdmin(false);
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
        } else if (userError) {
            console.error("Auth state change - error fetching user role:", userError);
            setIsAdmin(false);
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
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
    await supabase.auth.signOut()
    router.push("/admin-login")
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
