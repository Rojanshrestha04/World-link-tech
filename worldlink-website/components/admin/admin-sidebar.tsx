"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  ImageIcon,
  FileQuestion,
  Settings,
  LogOut,
  Menu,
  X,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase"

const sidebarItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    id: "courses",
    title: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    id: "students",
    title: "Students",
    href: "/admin/students",
    icon: Users,
  },
  {
    id: "applications",
    title: "Applications",
    href: "/admin/applications",
    icon: FileText,
  },
  {
    id: "news",
    title: "News & Events",
    href: "/admin/news",
    icon: FileText,
  },
  {
    id: "gallery",
    title: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    id: "inquiries",
    title: "Inquiries",
    href: "/admin/inquiries",
    icon: FileQuestion,
  },
  {
    id: "contact-submissions",
    title: "Contact Submissions",
    href: "/admin/contact-submissions",
    icon: Mail,
  },
  {
    id: "settings",
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data: { session }, error } = await supabase.auth.getSession()

        if (!session) {
          setIsAuthenticated(false)
          router.push("/admin/login")
          return
        }

        if (error) {
          console.error("Session error:", error.message)
          setIsAuthenticated(false)
          router.push("/admin/login")
          return
        }

        // Check if user has admin role
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("role, email")
          .eq("id", session.user.id)
          .single()

        if (userError) {
          console.error("User role error:", userError.message)
          setIsAuthenticated(false)
          router.push("/admin/login")
          return
        }

        if (!userData) {
          console.error("No user data found for ID:", session.user.id)
          setIsAuthenticated(false)
          router.push("/admin/login")
          return
        }

        // Verify admin role and email domain
        const isAdminUser = userData.role === "admin"
        
        if (!isAdminUser) {
          setIsAuthenticated(false)
          router.push("/admin/login")
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        if (error instanceof Error) {
          console.error("Auth check failed:", error.message)
        } else {
          console.error("Auth check failed: Unknown error")
        }
        setIsAuthenticated(false)
        router.push("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error("Logout error:", error)
        return
      }

      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-40 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="font-bold text-lg text-blue-700">Admin Panel</div>
                <div className="text-sm text-slate-500">World Link Training Institute</div>
              </div>
              <nav className="flex-1 overflow-auto py-4">
                <ul className="space-y-1 px-2">
                  {sidebarItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                          pathname === item.href
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col h-full bg-white border-r">
          <div className="p-4 border-b">
            <div className="font-bold text-lg text-blue-700">Admin Panel</div>
            <div className="text-sm text-slate-500">World Link Training Institute</div>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <ul className="space-y-1 px-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
