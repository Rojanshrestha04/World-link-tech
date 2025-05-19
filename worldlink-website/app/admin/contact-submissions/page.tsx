import AdminHeader from "@/components/admin/admin-header"
import ContactSubmissionsTable from "@/components/admin/contact-submissions-table"

export const metadata = {
  title: "Contact Submissions | Admin Dashboard",
  description: "Manage contact form submissions for World Link Technical Training Institute",
}

export default function ContactSubmissionsPage() {
  return (
    <>
      <AdminHeader title="Contact Submissions" description="View and manage contact form submissions" />
      <ContactSubmissionsTable />
    </>
  )
}
