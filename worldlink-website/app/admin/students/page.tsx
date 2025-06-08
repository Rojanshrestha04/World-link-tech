import AdminHeader from "@/components/admin/admin-header"
import StudentManagementTable from "@/components/admin/student-management-table"
import StudentsManagementClient from "./students-management-client"

export const metadata = {
  title: "Student Management | Admin Dashboard",
  description: "Manage students for World Link Technical Training Institute",
}

export default function StudentsManagementPage() {
  return <StudentsManagementClient />
}
