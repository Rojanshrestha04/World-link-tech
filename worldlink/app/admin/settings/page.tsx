'use client'

import AdminHeader from "@/components/admin/admin-header"
import SettingsForm from "@/components/admin/settings-form"

// Client component wrapper
function SettingsClient() {
  return (
    <>
      <AdminHeader title="Settings" description="Configure website settings and preferences" />
      <SettingsForm />
    </>
  )
}

export default function SettingsPage() {
  return <SettingsClient />
}
