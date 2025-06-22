'use client'

import AdminHeader from "@/components/admin/admin-header"
import UserManagementTable from "@/components/admin/user-management-table"

// Client component wrapper
function UserManagementClient() {
  const handleAddUser = () => {
    console.log("Add new user")
  }

  return (
    <>
      <AdminHeader
        title="User Management"
        description="Manage admin users and permissions"
        action={{
          label: "Add New User",
          onClick: handleAddUser,
        }}
      />

      <UserManagementTable />
    </>
  )
}

// Server component page
export default function UserManagementPage() {
  return <UserManagementClient />
}
