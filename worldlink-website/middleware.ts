import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session and trying to access admin routes, redirect to login
  if (
    !session &&
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If session exists and trying to access login page, redirect to admin dashboard
  if (session && request.nextUrl.pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  // If session exists, check if user is admin
  if (session) {
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", session.user.id)
      .single()

    // If user is not admin and trying to access admin routes, redirect to home
    if (userData?.role !== "admin" && request.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
