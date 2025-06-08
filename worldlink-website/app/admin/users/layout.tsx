import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "User Management | Admin Dashboard",
  description: "Manage admin users for World Link Technical Training Institute",
}

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 