'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, FileText, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import RecentApplicationsTable from "@/components/admin/recent-applications-table"
import EnrollmentChart from "@/components/admin/enrollment-chart"
import { useAdminAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase"

// Client component wrapper
function AdminDashboardClient() {
  const { user, isLoading, isAdmin } = useAdminAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    activeCourses: 0,
    newApplications: 0,
    totalEvents: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/')
    }
  }, [isLoading, isAdmin, router])

  useEffect(() => {
    async function fetchStats() {
      const supabase = getSupabaseBrowserClient()
      
      try {
        // Fetch active courses count
        const { count: activeCoursesCount } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)

        // Fetch new applications count (last 7 days)
        const { count: newApplicationsCount } = await supabase
          .from('application_submissions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

        // Fetch total events from news_articles with category 'events'
        const { count: totalEventsCount } = await supabase
          .from('news_articles')
          .select('*', { count: 'exact', head: true })
          .eq('category', 'events')

        setStats({
          activeCourses: activeCoursesCount || 0,
          newApplications: newApplicationsCount || 0,
          totalEvents: totalEventsCount || 0
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isAdmin) {
      fetchStats()
    }
  }, [isAdmin])

  if (isLoading || loading) {
    return <div>Loading...</div>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <>
      <AdminHeader title="Dashboard" description="Overview of your institute's performance and key metrics" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCourses}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">Active</span> courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newApplications}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500 font-medium">Last 7 days</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground mt-1">From news articles</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Enrollment Overview</CardTitle>
                  <CardDescription>Student enrollment trends over time</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <EnrollmentChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest student applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentApplicationsTable />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Content</CardTitle>
                <CardDescription>Detailed analytics will be displayed here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Analytics dashboard content will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default function AdminDashboard() {
  return <AdminDashboardClient />
}
