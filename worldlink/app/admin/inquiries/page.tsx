import AdminHeader from "@/components/admin/admin-header"
import InquiryManagementTable from "@/components/admin/inquiry-management-table"

export const metadata = {
  title: "Inquiry Management | Admin Dashboard",
  description: "Manage contact inquiries for World Link Technical Training Institute",
}

export default function InquiryManagementPage() {
  return (
    <>
      <AdminHeader title="Inquiry Management" description="View and respond to contact inquiries" />

      <InquiryManagementTable />
    </>
  )
}
