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
import { EyeIcon, MailOpen, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  inquiry_type: string
  message: string
  created_at: string
  status: "unread" | "read" | "responded"
}

export default function ContactSubmissionsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      setSubmissions(data as ContactSubmission[])
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSubmissionStatus = async (id: string, status: "unread" | "read" | "responded") => {
    try {
      const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id)

      if (error) throw error

      // Update local state
      setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, status } : sub)))
    } catch (error) {
      console.error("Error updating submission status:", error)
    }
  }

  const deleteSubmission = async (id: string) => {
    try {
      const { error } = await supabase.from("contact_submissions").delete().eq("id", id)

      if (error) throw error

      // Update local state
      setSubmissions(submissions.filter((sub) => sub.id !== id))
    } catch (error) {
      console.error("Error deleting submission:", error)
    }
  }

  const viewSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission)
    setIsDialogOpen(true)

    // Mark as read if it's unread
    if (submission.status === "unread") {
      updateSubmissionStatus(submission.id, "read")
    }
  }

  // Filter submissions based on search and status
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
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
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="responded">Responded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Inquiry Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Loading submissions...
                </TableCell>
              </TableRow>
            ) : filteredSubmissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No submissions found
                </TableCell>
              </TableRow>
            ) : (
              filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.subject}</TableCell>
                  <TableCell>{submission.inquiry_type}</TableCell>
                  <TableCell>{format(new Date(submission.created_at), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        submission.status === "unread"
                          ? "default"
                          : submission.status === "responded"
                            ? "success"
                            : "outline"
                      }
                    >
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
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
                        <DropdownMenuItem onClick={() => viewSubmission(submission)}>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateSubmissionStatus(submission.id, "responded")}>
                          <MailOpen className="mr-2 h-4 w-4" />
                          Mark as Responded
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteSubmission(submission.id)}>
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

      {/* Submission Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Contact Submission Details</DialogTitle>
            <DialogDescription>
              Submitted on{" "}
              {selectedSubmission && format(new Date(selectedSubmission.created_at), "MMMM d, yyyy 'at' h:mm a")}
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="mt-1">{selectedSubmission.name}</p>
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
                  <h3 className="text-sm font-medium text-gray-500">Inquiry Type</h3>
                  <p className="mt-1">{selectedSubmission.inquiry_type}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Subject</h3>
                <p className="mt-1">{selectedSubmission.subject}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Message</h3>
                <div className="mt-1 p-4 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => updateSubmissionStatus(selectedSubmission.id, "read")}>
                  Mark as Read
                </Button>
                <Button
                  onClick={() => {
                    updateSubmissionStatus(selectedSubmission.id, "responded")
                    setIsDialogOpen(false)
                  }}
                >
                  Mark as Responded
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
