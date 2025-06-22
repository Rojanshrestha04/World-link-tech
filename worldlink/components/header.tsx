"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
  ChevronDown,
  Menu,
  Search,
  UserCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAdminAuth } from "@/contexts/auth-context"

const navigation = [
  {
    name: "Home",
    href: "/",
    children: null,
  },
  {
    name: "About Us",
    href: "/about",
    children: [
      { name: "Our Institute", href: "/about" },
      { name: "Mission & Vision", href: "/about/mission-vision" },
      { name: "Our Team", href: "/about/team" },
      { name: "Facilities", href: "/about/facilities" },
    ],
  },
  {
    name: "Courses",
    href: "/courses",
    children: [
      { name: "IT & Computing", href: "/courses/it" },
      { name: "Electrical", href: "/courses/electrical" },
      { name: "Mechanical", href: "/courses/mechanical" },
      { name: "Hospitality", href: "/courses/hospitality" },
    ],
  },
  {
    name: "Admission",
    href: "/admission",
    children: [
      { name: "Admission Process", href: "/admission" },
      { name: "Eligibility Criteria", href: "/admission/eligibility" },
      { name: "Required Documents", href: "/admission/documents" },
      { name: "Apply Online", href: "/admission/apply" },
    ],
  },
  {
    name: "Gallery",
    href: "/gallery",
    children: null,
  },
  {
    name: "News & Events",
    href: "/news",
    children: null,
  },
  {
    name: "Contact Us",
    href: "/contact",
    children: null,
  },
]

export default function Header() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const { user, signOut, isAdmin } = useAdminAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-slate-100 py-2 px-4 text-sm text-slate-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <Link href="/contact" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Phone className="h-3 w-3" />
              <span className="hidden sm:inline">01-5970000</span>
            </Link>
            <Link
              href="mailto:info@worldlinktraining.edu.np"
              className="hidden sm:flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Mail className="h-3 w-3" />
              <span>info@worldlinktraining.edu.np</span>
            </Link>
          </div>
          <div className="flex gap-3">
            <Link href="https://facebook.com" aria-label="Facebook">
              <Facebook className="h-4 w-4 text-slate-600 hover:text-blue-600 transition-colors" />
            </Link>
            <Link href="https://youtube.com" aria-label="YouTube">
              <Youtube className="h-4 w-4 text-slate-600 hover:text-blue-600 transition-colors" />
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram">
              <Instagram className="h-4 w-4 text-slate-600 hover:text-blue-600 transition-colors" />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter">
              <Twitter className="h-4 w-4 text-slate-600 hover:text-blue-600 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4 border-b">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-blue-700">
                WORLD LINK
                <div className="text-sm font-normal text-blue-600">TECHNICAL TRAINING INSTITUTE</div>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-8 w-8 text-blue-500 p-1.5 bg-blue-100 rounded-full" />
              <div>
                <div className="text-sm text-slate-500">Our Location</div>
                <div className="text-sm font-medium">Kathmandu, Nepal</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-blue-500 p-1.5 bg-blue-100 rounded-full" />
              <div>
                <div className="text-sm text-slate-500">Office Hours</div>
                <div className="text-sm font-medium">Sun-Fri: 9:00 AM - 5:00 PM</div>
              </div>
            </div>
          </div>

          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-700">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <form onSubmit={handleSearch} className="relative mb-6">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search courses..."
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>

                  {navigation.map((item) => (
                    <div key={item.name} className="py-1">
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-2 font-medium",
                          pathname === item.href ? "text-blue-700" : "text-slate-700 hover:text-blue-700",
                        )}
                      >
                        {item.name}
                      </Link>

                      {item.children && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "block py-1 text-sm",
                                pathname === child.href ? "text-blue-700" : "text-slate-600 hover:text-blue-700",
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-2 py-2">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">Kathmandu, Nepal</span>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Phone className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">01-5970000</span>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">info@worldlinktraining.edu.np</span>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between">
          <ul className="flex">
            {navigation.map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-4 font-medium hover:border-b-2 hover:border-blue-700 transition-colors",
                    pathname === item.href
                      ? "text-blue-700 border-b-2 border-blue-700"
                      : "text-slate-700 hover:text-blue-700",
                  )}
                >
                  {item.name} {item.children && <ChevronDown className="h-4 w-4 ml-1" />}
                </Link>

                {item.children && (
                  <div className="absolute left-0 top-full bg-white shadow-md rounded-b-md w-48 hidden group-hover:block z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "block px-4 py-2 hover:bg-slate-100",
                          pathname === child.href ? "text-blue-700" : "text-slate-700",
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-[200px] pl-8 h-9 focus-visible:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link href="/admin" className="text-sm font-medium text-blue-700 hover:text-blue-800">
                Admin Panel
              </Link>
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    {user.email} <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/admin/profile" className="flex items-center">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <Link href="#" className="flex items-center">
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
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!user && (
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Notice Bar */}
      <div className="bg-blue-700 text-white py-2 px-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <span className="font-semibold mr-2">Notice:</span>
            <div className="overflow-hidden">
              <div className="whitespace-nowrap animate-marquee">
                New batch for Computer Hardware & Networking starting from May 1, 2025. Limited seats available!
                Register now for early bird discount.
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
