"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EyeIcon, Loader2 } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"

interface Application {
  id: string;
  full_name: string;
  course: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function RecentApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecentApplications() {
      const supabase = getSupabaseBrowserClient()
      
      try {
        const { data, error } = await supabase
          .from('application_submissions')
          .select('id, full_name, course, created_at, status')
          .order('created_at', { ascending: false })
          .limit(5)

        if (error) throw error

        setApplications(data || [])
        setError(null)
      } catch (error) {
        console.error('Error fetching recent applications:', error)
        setError('Failed to load applications')
        setApplications([])
      } finally {
        setLoading(false)
      }
    }

    fetchRecentApplications()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
              No recent applications
            </TableCell>
          </TableRow>
        ) : (
          applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.id}</TableCell>
              <TableCell>{application.full_name}</TableCell>
              <TableCell>{application.course}</TableCell>
              <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    application.status === "approved"
                      ? "success"
                      : application.status === "rejected"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
