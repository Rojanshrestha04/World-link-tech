'use client'

import AdminHeader from "@/components/admin/admin-header"
import TestimonialManagementTable from "@/components/admin/testimonial-management-table"

export default function AdminTestimonialsPage() {
  return (
    <>
      <AdminHeader
        title="Testimonials Management"
        description="Create and manage testimonials"
      />

      <TestimonialManagementTable />
    </>
  )
}


