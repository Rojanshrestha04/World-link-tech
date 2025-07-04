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
  ChevronDown,
  UserCircle,
  MessageCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { useAdminAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AdminLogo from "@/components/admin/admin-logo"

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
    id: "testimonials",
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageCircle,
  },
  {
    id: "teams",
    title: "Teams",
    href: "/admin/teams",
    icon: Users,
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
  const { user, isAdmin, isLoading, signOut } = useAdminAuth()

  // Don't render sidebar if user is not logged in or not an admin
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    if (typeof window !== 'undefined') {
      alert("You are not authorized to access the admin dashboard. Please log in as an admin.");
      window.location.href = '/admin-login';
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">You are not authorized to access the admin dashboard. Please log in as an admin.</p>
        </div>
      </div>
    )
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
                  <AdminLogo />
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
              <div className="mt-auto border-t p-4">
                {user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex w-full items-center justify-between">
                        <UserCircle className="ml-2 h-4 w-4" />
                        <span className="truncate">{user.email}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/admin/profile" className="flex items-center w-full">
                          <UserCircle className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => signOut()}>
                        <div className="flex items-center w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mr-2 h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                            />
                          </svg>
                          <span>Logout</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-white lg:flex">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <AdminLogo />
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
        <div className="mt-auto border-t p-4">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex w-full items-center justify-between">
                  <span className="truncate">{user.email}</span>
                  <UserCircle className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/admin/profile" className="flex items-center w-full">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <div className="flex items-center w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="mr-2 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                    <span>Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </>
  )
}
