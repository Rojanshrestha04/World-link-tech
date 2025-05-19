import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify, SignJWT } from "jose"

// In a real application, this would be stored in an environment variable
const JWT_SECRET = new TextEncoder().encode("your-secret-key-change-this-in-production")

// In a real application, these would be stored in a database
export const adminUsers = [
  {
    id: "1",
    email: "admin@worldlinktraining.edu.np",
    name: "Admin User",
    password: "admin123", // In a real app, this would be hashed
    role: "admin",
  },
]

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface Session {
  user: User
  expires: string
}

// Create a session token
export async function createSessionToken(user: User): Promise<string> {
  // Remove sensitive information
  const sessionUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }

  // Set expiry to 24 hours from now
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

  const session: Session = {
    user: sessionUser,
    expires: expires.toISOString(),
  }

  // Create a JWT token
  const token = await new SignJWT({ session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires.toISOString())
    .sign(JWT_SECRET)

  return token
}

// Verify a session token
export async function verifySessionToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    })

    const session = payload.session as Session

    // Check if session has expired
    if (new Date(session.expires) < new Date()) {
      return null
    }

    return session
  } catch (error) {
    return null
  }
}

// Get the current session
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session-token")?.value

  if (!token) {
    return null
  }

  return verifySessionToken(token)
}

// Check if the user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}

// Login a user
export async function login(email: string, password: string): Promise<User | null> {
  // In a real application, you would hash the password and compare with the stored hash
  const user = adminUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return null
  }

  // Remove password from user object
  const { password: _, ...userWithoutPassword } = user

  return userWithoutPassword as User
}

// Middleware to protect routes
export async function authMiddleware(request: NextRequest) {
  const session = await getSession()

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

  return NextResponse.next()
}
