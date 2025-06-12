import AdminHeader from "@/components/admin/admin-header"
import ResourcesManagement from "@/components/admin/resource-management-table"
export const metadata = {
  title: "Resources Management | Admin Dashboard",
  description: "Manage resources for World Link Technical Training Institute",
}

export default function ResourceManagementPage() {
  return (
    <>
    <AdminHeader title="Resource Management" description="Add, edit and delete resources" />
    
      <ResourcesManagement />
    </>
  )
}
