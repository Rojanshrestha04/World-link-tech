import AdminHeader from "@/components/admin/admin-header"
import UserManagementTable from "@/components/admin/user-management-table"

export const metadata = {
  title: "User Management | Admin Dashboard",
  description: "Manage admin users for World Link Technical Training Institute",
}

export default function UserManagementPage() {
  return (
    <>
      <AdminHeader
        title="User Management"
        description="Manage admin users and permissions"
        action={{
          label: "Add New User",
          onClick: () => console.log("Add new user"),
        }}
      />

      <UserManagementTable />
    </>
  )
}
