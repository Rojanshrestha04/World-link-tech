"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Settings, User as LucideUserIcon } from "lucide-react"
import { User as SupabaseUser } from "@supabase/supabase-js"
import { useAdminAuth } from "@/contexts/auth-context"

interface UserProfileDropdownProps {
  user: SupabaseUser | null;
  isLoading: boolean;
}

export default function UserProfileDropdown({ user, isLoading }: UserProfileDropdownProps) {
  const router = useRouter()
  const { signOut } = useAdminAuth()

  const handleLogout = async () => {
    try {
      // Use the proper signOut function from auth context
      await signOut()
      // The signOut function already handles the redirect to home page
      // But we can also redirect to admin-login if needed
      router.push("/admin-login")
    } catch (error) {
      console.error("Logout error:", error)
      // Fallback redirect in case of error
      router.push("/admin-login")
    }
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </Button>
    )
  }

  if (!user) {
    return null
  }

  const displayName = user.user_metadata?.full_name || user.email || "";

  const initials = (displayName)
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
          <LucideUserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}