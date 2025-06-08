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
import { CheckCircle, EyeIcon, MoreHorizontal, Search, Trash2, XCircle } from "lucide-react"
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
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("application_submissions")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Supabase error:", error)
        throw error
      }
      if (!data) {
        console.error("No data returned from Supabase", { data, error })
      }
      setSubmissions(data as ApplicationSubmission[])
    } catch (error) {
      console.error("Error fetching applications:", error)
      // Add extra debug info
      if (typeof error === 'object' && error !== null) {
        console.error("Error details:", JSON.stringify(error, null, 2))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const updateApplicationStatus = async (id: string, status: "pending" | "approved" | "rejected") => {
    try {
      const { error } = await supabase.from("application_submissions").update({ status }).eq("id", id)

      if (error) throw error

      // Update local state
      setSubmissions(submissions.map((app) => (app.id === id ? { ...app, status } : app)))
    } catch (error) {
      console.error("Error updating application status:", error)
    }
  }

  const deleteApplication = async (id: string) => {
    try {
      const { error } = await supabase.from("application_submissions").delete().eq("id", id)

      if (error) throw error

      // Update local state
      setSubmissions(submissions.filter((app) => app.id !== id))
    } catch (error) {
      console.error("Error deleting application:", error)
    }
  }

  const viewApplication = (application: ApplicationSubmission) => {
    setSelectedSubmission(application)
    setIsDialogOpen(true)
  }

  // Filter applications based on search and status
  const filteredApplications = submissions.filter((application) => {
    const matchesSearch =
      application.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.course.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || application.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Preferred Time</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Loading applications...
                </TableCell>
              </TableRow>
            ) : filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.full_name}</TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell>{application.course}</TableCell>
                  <TableCell>{application.preferred_time}</TableCell>
                  <TableCell>{format(new Date(application.created_at), "MMM d, yyyy")}</TableCell>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => viewApplication(application)}>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateApplicationStatus(application.id, "approved")}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateApplicationStatus(application.id, "rejected")}>
                          <XCircle className="mr-2 h-4 w-4 text-red-600" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteApplication(application.id)}>
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Submitted on{" "}
              {selectedSubmission && format(new Date(selectedSubmission.created_at), "MMMM d, yyyy 'at' h:mm a")}
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1">{selectedSubmission.full_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{selectedSubmission.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1">{selectedSubmission.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                  <p className="mt-1">{format(new Date(selectedSubmission.date_of_birth), "MMMM d, yyyy")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                  <p className="mt-1">
                    {selectedSubmission.gender.charAt(0).toUpperCase() + selectedSubmission.gender.slice(1)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Education</h3>
                  <p className="mt-1">{selectedSubmission.education}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1">{selectedSubmission.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Course</h3>
                  <p className="mt-1">{selectedSubmission.course}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Preferred Time</h3>
                  <p className="mt-1">
                    {selectedSubmission.preferred_time.charAt(0).toUpperCase() +
                      selectedSubmission.preferred_time.slice(1)}
                  </p>
                </div>
              </div>

              {selectedSubmission.how_did_you_hear && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">How did you hear about us?</h3>
                  <p className="mt-1">{selectedSubmission.how_did_you_hear}</p>
                </div>
              )}

              {selectedSubmission.message && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Additional Message</h3>
                  <div className="mt-1 p-4 bg-gray-50 rounded-md">
                    <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    updateApplicationStatus(selectedSubmission.id, "rejected")
                    setIsDialogOpen(false)
                  }}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    updateApplicationStatus(selectedSubmission.id, "approved")
                    setIsDialogOpen(false)
                  }}
                >
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
