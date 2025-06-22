
"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EyeIcon, MoreHorizontal, Search, Trash2, CheckCircle, XCircle } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ApplicationSubmission {
  id: string
  full_name: string
  email: string
  phone: string
  address: string
  date_of_birth: string
  gender: string
  education: string
  course: string
  preferred_time: string
  how_did_you_hear: string | null
  message: string | null
  created_at: string
  status: "pending" | "approved" | "rejected"
}

export default function ApplicationSubmissionsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [submissions, setSubmissions] = useState<ApplicationSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ApplicationSubmission | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Fetch applications from database
  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setIsLoading(true)
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('application_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching applications:', error)
        return
      }

      setSubmissions(data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('application_submissions')
        .update({ status: newStatus })
        .eq('id', applicationId)

      if (error) {
        console.error('Error updating application status:', error)
        return
      }

      // Refresh applications list
      fetchApplications()
    } catch (error) {
      console.error('Error updating application status:', error)
    }
  }

  const handleDeleteApplication = async (applicationId: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return

    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('application_submissions')
        .delete()
        .eq('id', applicationId)

      if (error) {
        console.error('Error deleting application:', error)
        alert('Failed to delete application')
        return
      }

      // Refresh applications list
      fetchApplications()
    } catch (error) {
      console.error('Error deleting application:', error)
      alert('Failed to delete application')
    }
  }

  const handleViewDetails = (submission: ApplicationSubmission) => {
    setSelectedSubmission(submission)
    setIsDialogOpen(true)
  }

  // Filter applications based on search and status
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch = 
      submission.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.course.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading applications...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Preferred Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{submission.full_name}</div>
                      <div className="text-sm text-muted-foreground">{submission.email}</div>
                      <div className="text-sm text-muted-foreground">{submission.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{submission.course}</Badge>
                  </TableCell>
                  <TableCell>{submission.education}</TableCell>
                  <TableCell>{submission.preferred_time}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>
                    {format(new Date(submission.created_at), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(submission)}>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleStatusUpdate(submission.id, "approved")}
                          disabled={submission.status === "approved"}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusUpdate(submission.id, "rejected")}
                          disabled={submission.status === "rejected"}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteApplication(submission.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Application Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Complete application information for {selectedSubmission?.full_name}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.full_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedSubmission.date_of_birth), "MMM dd, yyyy")}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Education</label>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.education}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Course</label>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.course}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Preferred Time</label>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.preferred_time}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <p className="text-sm text-muted-foreground">{selectedSubmission.address}</p>
              </div>
              {selectedSubmission.how_did_you_hear && (
                <div>
                  <label className="text-sm font-medium">How did you hear about us?</label>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.how_did_you_hear}</p>
                </div>
              )}
              {selectedSubmission.message && (
                <div>
                  <label className="text-sm font-medium">Additional Message</label>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.message}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Application Date</label>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(selectedSubmission.created_at), "MMM dd, yyyy 'at' hh:mm a")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}