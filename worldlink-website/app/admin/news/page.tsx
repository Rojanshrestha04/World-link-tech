'use client'

import AdminHeader from "@/components/admin/admin-header"
import NewsManagementTable from "@/components/admin/news-management-table"

// Client component wrapper
function NewsManagementClient() {
  const handleAddArticle = () => {
    console.log("Add new article")
  }

  return (
    <>
      <AdminHeader
        title="News & Events Management"
        description="Create and manage news articles and events"
        action={{
          label: "Add New Article",
          onClick: handleAddArticle,
        }}
      />

      <NewsManagementTable />
    </>
  )
}

// Server component page
export default function NewsManagementPage() {
  return <NewsManagementClient />
}
