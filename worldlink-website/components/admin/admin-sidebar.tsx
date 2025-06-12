"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  ImageIcon,
  FileQuestion,
  Settings,
  Menu,
  X,
  Mail,
  FolderOpen,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { useAdminAuth } from "@/contexts/auth-context"

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
    id: "resources",
    title: "Resources",
    href: "/admin/resources",
    icon: FolderOpen,
  },
  {
    id: "careers",
    title: "Careers",
    href: "/admin/careers",
    icon: Briefcase,
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
  const [open, setOpen] = useState(false)
  const { user, isAdmin, isLoading } = useAdminAuth()

  // Don't render sidebar if user is not logged in or not an admin
  if (isLoading) {
    return null // or a loading spinner if you prefer
  }

  if (!user || !isAdmin) {
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
            <div className="flex h-full flex-col gap-2">
              <div className="flex h-[60px] items-center px-6">
                <Link href="/admin" className="flex items-center gap-2 font-semibold">
                  <span className="text-lg">Admin Panel</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="grid gap-1 px-2">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100",
                        pathname === item.href ? "bg-gray-100" : "transparent"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-white lg:flex">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <span className="text-lg">Admin Panel</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid gap-1 px-2 py-4">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100",
                  pathname === item.href ? "bg-gray-100" : "transparent"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
