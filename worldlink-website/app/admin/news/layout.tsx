import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "News Management | Admin Dashboard",
  description: "Manage news and events for World Link Technical Training Institute",
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 