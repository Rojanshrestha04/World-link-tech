import AdminHeader from "@/components/admin/admin-header"
import ApplicationSubmissionsTable from "@/components/admin/application-submissions-table"

export const metadata = {
  title: "Application Submissions | Admin Dashboard",
  description: "Manage application form submissions for World Link Technical Training Institute",
}

export default function ApplicationSubmissionsPage() {
  return (
    <>
      <AdminHeader title="Application Submissions" description="View and manage student applications" />
      <ApplicationSubmissionsTable />
    </>
  )
}
