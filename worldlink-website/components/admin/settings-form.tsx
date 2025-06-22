"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UserManagementTable from "@/components/admin/user-management-table"
import { useAdminAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { Pencil } from "lucide-react"

const generalFormSchema = z.object({
  siteName: z.string().min(2, {
    message: "Site name must be at least 2 characters.",
  }),
  siteDescription: z.string().min(10, {
    message: "Site description must be at least 10 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
})

const passwordFormSchema = z.object({
  newPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
})

export default function SettingsForm() {
  const { user, signOut } = useAdminAuth()
  const [editMode, setEditMode] = useState(false)

  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      siteName: "World Link Technical Training Institute",
      siteDescription: "CTEVT affiliated vocational training provider offering quality short-term courses in Nepal.",
      contactEmail: "info@worldlinktraining.edu.np",
      contactPhone: "01-5970000",
      address: "Jawalakhel, Lalitpur, Kathmandu, Nepal",
    },
  })

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  // Fetch settings from DB on mount
  useEffect(() => {
    const fetchSettings = async () => {
      const res = await fetch("/api/settings")
      if (!res.ok) return
      const data = await res.json()
      generalForm.reset({
        siteName: data.site_name,
        siteDescription: data.site_description,
        contactEmail: data.contact_email,
        contactPhone: data.contact_phone,
        address: data.address,
      })
    }
    fetchSettings()
  }, [generalForm])

  // Update settings in DB on submit
  async function onGeneralSubmit(values: z.infer<typeof generalFormSchema>) {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site_name: values.siteName,
        site_description: values.siteDescription,
        contact_email: values.contactEmail,
        contact_phone: values.contactPhone,
        address: values.address,
      }),
    })
    if (res.ok) {
      toast.success("Your general settings have been updated.")
    } else {
      toast.error("Failed to update settings.")
    }
  }

  async function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    if (!user) {
      toast.error("No user logged in.")
      return
    }

    try {
      const supabase = await import("@/lib/supabase").then(mod => mod.getSupabaseBrowserClient());
      const { error } = await supabase.auth.updateUser({
        password: values.newPassword,
      })

      if (error) {
        throw error
      }

      toast.success("Your password has been successfully changed. Please log in again with your new password.")
      signOut()
    } catch (error) {
      console.error("Error changing password:", error)
      toast.error(`Failed to change password: ${(error as Error).message}`)
    } finally {
      passwordForm.reset()
    }
  }

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="password">Change Password</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card className="relative">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure basic information about your website</CardDescription>
            {!editMode && (
              <button
                className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
                onClick={() => setEditMode(true)}
                aria-label="Edit Settings"
              >
                <Pencil className="w-5 h-5" />
              </button>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {!editMode ? (
              <div className="space-y-4">
                <div>
                  <div className="font-semibold">Site Name</div>
                  <div className="text-muted-foreground">{generalForm.getValues("siteName")}</div>
                </div>
                <div>
                  <div className="font-semibold">Site Description</div>
                  <div className="text-muted-foreground">{generalForm.getValues("siteDescription")}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="font-semibold">Contact Email</div>
                    <div className="text-muted-foreground">{generalForm.getValues("contactEmail")}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Contact Phone</div>
                    <div className="text-muted-foreground">{generalForm.getValues("contactPhone")}</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-muted-foreground">{generalForm.getValues("address")}</div>
                </div>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              </div>
            ) : (
              <Form {...generalForm}>
                <form
                  onSubmit={generalForm.handleSubmit(async (values) => {
                    await onGeneralSubmit(values)
                    setEditMode(false)
                  })}
                  className="space-y-6"
                >
                  <FormField
                    control={generalForm.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of your website as it appears in the browser title and headers
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={generalForm.control}
                    name="siteDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormDescription>A brief description of your website for SEO purposes</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={generalForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2 mt-4">
                    <Button type="submit">Save Changes</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage admin users and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <UserManagementTable />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your new password. It should be at least 6 characters long.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Update Password</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
