import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  // Delete the session cookie
  const cookieStore = await cookies() // Await the cookies() function
  cookieStore.delete("session-token")

  return NextResponse.json({ success: true })
}