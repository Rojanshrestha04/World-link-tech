"use client"

import AdminHeader from "@/components/admin/admin-header"
import CourseManagementTable from "@/components/admin/course-management-table"

export default function CoursesClientPage() {
  const handleAddCourse = () => {
    console.log("Add new course")
  }

  return (
    <>
      <AdminHeader
        title="Course Management"
        description="Add, edit, and manage training courses"
        action={{
          label: "Add New Course",
          onClick: handleAddCourse,
        }}
      />

      <CourseManagementTable />
    </>
  )
} 