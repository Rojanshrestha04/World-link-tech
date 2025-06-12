"use client"

import AdminHeader from "@/components/admin/admin-header"
import CourseManagementTable from "@/components/admin/course-management-table"

export default function CoursesClientPage() {
  const handleAddCourse = () => {
    console.log("Add new course")
  }
  

  return (
    <>
      <CourseManagementTable />
    </>
  )
} 