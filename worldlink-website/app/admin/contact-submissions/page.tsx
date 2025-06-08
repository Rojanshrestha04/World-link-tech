'use client'

import AdminHeader from "@/components/admin/admin-header"
import ContactSubmissionsTable from "@/components/admin/contact-submissions-table"

// Client component wrapper
function ContactSubmissionsClient() {
  return (
    <>
      <AdminHeader title="Contact Submissions" description="View and manage contact form submissions" />
      <ContactSubmissionsTable />
    </>
  )
}

export default function ContactSubmissionsPage() {
  return <ContactSubmissionsClient />
}
