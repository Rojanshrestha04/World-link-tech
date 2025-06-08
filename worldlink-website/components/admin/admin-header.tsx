'use client'

import UserProfileDropdown from "@/components/admin/user-profile-dropdown"
import ActionButton from "@/components/admin/action-button"

interface AdminHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

// Client component for the header
export default function AdminHeader({ title, description, action }: AdminHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <UserProfileDropdown />
        {action && <ActionButton label={action.label} onClick={action.onClick} />}
      </div>
    </div>
  )
}
