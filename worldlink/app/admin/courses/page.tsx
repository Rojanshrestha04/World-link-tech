import AdminHeader from "@/components/admin/admin-header"
import CourseManagementTable from "@/components/admin/course-management-table"

export const metadata = {
  title: "Course Management | Admin Dashboard",
  description: "Manage courses for World Link Technical Training Institute",
}

export default function CoursesManagementPage() {
  return (
    <>
      <AdminHeader
        title="Course Management"
        description="Create and manage courses"
      />

      <CourseManagementTable />
    </>
  )
}
