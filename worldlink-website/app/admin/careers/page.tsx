import AdminHeader from "@/components/admin/admin-header"
import CareersManagement from "@/components/admin/careers-management-table"
export const metadata = {
  title: "Careers Management | Admin Dashboard",
  description: "Manage Jobs for World Link Technical Training Institute",
}

export default function CareersManagementPage() {
  return (
    <>
      <CareersManagement />
    </>
  )
}
