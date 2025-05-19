import type React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { createServerClient } from "@supabase/ssr"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies(); // Keep 'await' since cookies() returns a Promise in your Next.js version

  // Check if environment variables are defined
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase environment variables are missing. Please check your .env.local file."
    );
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if we're on the login page
  const pathname = cookieStore.get("__pathname")?.value || "/";
  const isLoginPage = pathname === "/admin/login";

  // If not logged in and not on login page, redirect to login
  if (!session && !isLoginPage) {
    redirect("/admin/login");
  }

  // If logged in but not admin role and not on login page, redirect to home
  if (session && !isLoginPage) {
    const { data: userData, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (error || userData?.role !== "admin") {
      redirect("/");
    }
  }

  // If logged in and on login page, redirect to admin dashboard
  if (session && isLoginPage) {
    redirect("/admin");
  }

  return (
    // Remove the site header and footer for admin pages
    <div className="min-h-screen bg-slate-50">
      {!isLoginPage && <AdminSidebar />}
      <main
        className={
          !isLoginPage ? "lg:pl-64 pt-16 pb-12 px-4 sm:px-6 lg:px-8" : ""
        }
      >
        {children}
      </main>
    </div>
  );
}