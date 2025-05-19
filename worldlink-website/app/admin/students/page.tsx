import AdminHeader from "@/components/admin/admin-header"
import StudentManagementTable from "@/components/admin/student-management-table"

export const metadata = {
  title: "Student Management | Admin Dashboard",
  description: "Manage students for World Link Technical Training Institute",
}

export default function StudentsManagementPage() {
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
