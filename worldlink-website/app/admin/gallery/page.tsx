'use client'

import AdminHeader from "@/components/admin/admin-header"
import GalleryManagement from "@/components/admin/gallery-management"

// Client component wrapper
function GalleryManagementClient() {
  return (
    <>
      <AdminHeader
        title="Gallery Management"
        description="Upload and manage gallery images"
        action={{
          label: "Upload Images",
          onClick: () => console.log("Upload images"),
        }}
      />

      <GalleryManagement />
    </>
  )
}

export default function GalleryManagementPage() {
  return <GalleryManagementClient />
}
