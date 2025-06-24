"use client"

import AdminHeader from "@/components/admin/admin-header"
import TeamManagementTable from "@/components/admin/team-management-table"

export default function AdminTeamsPage() {
  return (
    <>
      <AdminHeader
        title="Teams Management"
        description="Create and manage team members"
      />
      <TeamManagementTable />
    </>
  )
}
