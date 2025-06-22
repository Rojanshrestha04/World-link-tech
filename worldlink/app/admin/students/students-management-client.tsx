'use client'

import AdminHeader from "@/components/admin/admin-header"
import StudentManagementTable from "@/components/admin/student-management-table"

export default function StudentsManagementClient() {
  return (
    <>
      <AdminHeader
        title="Student Management"
        description="View and manage student information"
        action={{
          label: "Add New Student",
          onClick: () => console.log("Add new student"),
        }}
      />

      <StudentManagementTable />
    </>
  )
} 