import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader />
      <main className="flex-1 pt-16">{children}</main>
      <SiteFooter />
    </div>
  )
} 