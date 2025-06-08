import AdminLayoutClient from "@/components/admin/admin-layout-client"

export const metadata = {
  title: "Admin Dashboard | World Link Technical Training Institute",
  description: "Admin dashboard for World Link Technical Training Institute website management",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}