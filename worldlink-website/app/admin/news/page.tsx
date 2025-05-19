import AdminHeader from "@/components/admin/admin-header"
import NewsManagementTable from "@/components/admin/news-management-table"

export const metadata = {
  title: "News Management | Admin Dashboard",
  description: "Manage news and events for World Link Technical Training Institute",
}

export default function NewsManagementPage() {
  return (
    <>
      <AdminHeader
        title="News & Events Management"
        description="Create and manage news articles and events"
        action={{
          label: "Add New Article",
          onClick: () => console.log("Add new article"),
        }}
      />

      <NewsManagementTable />
    </>
  )
}
