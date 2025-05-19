import AdminHeader from "@/components/admin/admin-header"
import SettingsForm from "@/components/admin/settings-form"

export const metadata = {
  title: "Settings | Admin Dashboard",
  description: "Configure settings for World Link Technical Training Institute website",
}

export default function SettingsPage() {
  return (
    <>
      <AdminHeader title="Settings" description="Configure website settings and preferences" />

      <SettingsForm />
    </>
  )
}
