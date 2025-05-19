import AdminHeader from "@/components/admin/admin-header"
import GalleryManagement from "@/components/admin/gallery-management"

export const metadata = {
  title: "Gallery Management | Admin Dashboard",
  description: "Manage gallery images for World Link Technical Training Institute",
}

export default function GalleryManagementPage() {
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
