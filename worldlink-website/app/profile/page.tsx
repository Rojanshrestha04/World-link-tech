"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { UserProfile } from "@/lib/supabase"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { Loader2 } from "lucide-react"
import PageHeader from "@/components/page-header"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [fullName, setFullName] = useState("")
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login?callbackUrl=/profile")
    }

    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase.from("users").select("*").eq("id", user.id).single()

        if (!error && data) {
          setProfile(data as UserProfile)
          setFullName(data.full_name || "")
        }
      }
    }

    fetchProfile()
  }, [user, isLoading, router, supabase])

  const updateProfile = async () => {
    if (!user) return

    setIsUpdating(true)
    try {
      const { error } = await supabase
        .from("users")
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      // Update local state
      if (profile) {
        setProfile({
          ...profile,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <>
      <PageHeader title="My Profile" description="Manage your account settings and preferences" />

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="profile" className="max-w-3xl mx-auto">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email || ""} disabled />
                  <p className="text-sm text-muted-foreground">Your email address cannot be changed</p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={profile?.role || "user"} disabled />
                </div>

                <Button onClick={updateProfile} disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <Button>Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
