"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useUserAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    children: [
      { name: "Mission & Vision", href: "/about/mission-vision" },
      { name: "Our Team", href: "/about/team" },
      { name: "Facilities", href: "/about/facilities" },
    ],
  },
  { name: "Courses", href: "/courses" },
  { name: "News & Events", href: "/news" },
  {
    name: "Resources",
    href: "/resources",
    children: [
      { name: "Publications", href: "/resources/publications" },
      { name: "Policy", href: "/resources/policy" },
      { name: "Curriculum", href: "/resources/curriculum" },
      { name: "Reports", href: "/resources/reports" },
    ],
  },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useUserAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-sm py-4",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">World Link Technical Training Institute</span>
            <Image
              src="/logo.png"
              alt="World Link Technical Training Institute Logo"
              width={180}
              height={60}
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name} className="relative group">
                <button
                  className={cn(
                    "flex items-center gap-1 text-sm font-semibold leading-6",
                    isActive(item.href)
                      ? "text-blue-600"
                      : "text-gray-900 hover:text-blue-600 transition-colors duration-200",
                  )}
                >
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={cn(
                        "block px-4 py-2 text-sm",
                        pathname === child.href
                          ? "bg-gray-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600",
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-semibold leading-6",
                  isActive(item.href)
                    ? "text-blue-600"
                    : "text-gray-900 hover:text-blue-600 transition-colors duration-200",
                )}
              >
                {item.name}
              </Link>
            ),
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200">
                  <User className="h-4 w-4" />
                  {user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer hover:bg-gray-100 transition-colors duration-200 w-full">Profile</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer hover:bg-gray-100 transition-colors duration-200 w-full">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200"
                >
                  Login
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button 
                  variant="ghost" 
                  className="hover:bg-gray-100 hover:text-blue-700 transition-all duration-200"
                >
                  Admin
                </Button>
              </Link>
            </>
          )}
          <Link href="/admission/apply">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200"
            >
              Apply Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn("lg:hidden fixed inset-0 z-50 bg-white", mobileMenuOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">World Link Technical Training Institute</span>
                <Image
                  src="/logo.png"
                  alt="World Link Technical Training Institute Logo"
                  width={180}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) =>
                    item.children ? (
                      <div key={item.name} className="space-y-2">
                        <div
                          className={cn(
                            "block rounded-lg px-3 py-2 text-base font-semibold leading-7",
                            isActive(item.href)
                              ? "text-blue-600"
                              : "text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200",
                          )}
                        >
                          {item.name}
                        </div>
                        <div className="ml-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-sm font-medium leading-6",
                                pathname === child.href
                                  ? "text-blue-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200",
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-base font-semibold leading-7",
                          isActive(item.href) 
                            ? "text-blue-600" 
                            : "text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200",
                        )}
                      >
                        {item.name}
                      </Link>
                    ),
                  )}
                </div>
                <div className="py-6 space-y-3">
                  {user ? (
                    <>
                      <Link
                        href="/profile"
                        className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        Profile
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={signOut}
                        className="flex w-full items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        Login
                      </Link>
                      <Link
                        href="/admin/login"
                        className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        Admin Login
                      </Link>
                    </>
                  )}
                  <Link
                    href="/admission/apply"
                    className="block rounded-lg bg-blue-600 px-3 py-2.5 text-center text-base font-semibold leading-7 text-white hover:bg-blue-700 hover:scale-[1.02] transition-all duration-200"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}