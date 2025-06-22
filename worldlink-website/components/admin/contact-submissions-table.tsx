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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, EyeIcon, MoreHorizontal, Search, XCircle, Loader2, Mail, Phone, MessageSquare } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { toast } from "sonner"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  inquiry_type: string
  message: string
  created_at: string
  status: string
}

export default function ContactSubmissionsTable() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState("all")
  const [inquiryTypes, setInquiryTypes] = useState<string[]>([])
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Fetch contact submissions from database
  const fetchSubmissions = async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching submissions:', error)
        toast.error("Failed to fetch contact submissions")
        return
      }

      setSubmissions(data || [])
      
      // Extract unique inquiry types
      const uniqueTypes = [...new Set(data?.map(sub => sub.inquiry_type) || [])]
      setInquiryTypes(uniqueTypes)
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to fetch contact submissions")
    } finally {
      setLoading(false)
    }
  }

  // Update submission status
  const updateSubmissionStatus = async (id: string, newStatus: string) => {
    setUpdatingStatus(id)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) {
        console.error('Error updating status:', error)
        toast.error("Failed to update submission status")
        return
      }

      // Update local state
      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === id ? { ...sub, status: newStatus } : sub
        )
      )

      toast.success(`Submission status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to update submission status")
    } finally {
      setUpdatingStatus(null)
    }
  }

  // Delete submission
  const deleteSubmission = async (id: string) => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting submission:', error)
        toast.error("Failed to delete submission")
        return
      }

      // Update local state
      setSubmissions(prev => prev.filter(sub => sub.id !== id))
      
      toast.success("Contact submission deleted successfully.")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to delete submission")
    }
  }

  // View submission details
  const viewSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission)
    setIsViewDialogOpen(true)
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  // Filter submissions based on search, status, and inquiry type
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch = 
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    const matchesInquiryType = inquiryTypeFilter === "all" || submission.inquiry_type === inquiryTypeFilter
    return matchesSearch && matchesStatus && matchesInquiryType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getInquiryTypeBadge = (type: string) => {
    const colors = {
      "general": "bg-gray-100 text-gray-800",
      "course": "bg-blue-100 text-blue-800",
      "admission": "bg-green-100 text-green-800",
      "technical": "bg-red-100 text-red-800",
      "complaint": "bg-orange-100 text-orange-800"
    }
    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading contact submissions...</span>
      </div>
    )
  }

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
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={inquiryTypeFilter} onValueChange={setInquiryTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {inquiryTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No contact submissions found
                </TableCell>
              </TableRow>
            ) : (
              filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-1 h-3 w-3" />
                        {submission.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="mr-1 h-3 w-3" />
                        {submission.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium truncate">{submission.subject}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {submission.message.substring(0, 50)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getInquiryTypeBadge(submission.inquiry_type)}</TableCell>
                  <TableCell>{formatDate(submission.created_at)}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          {updatingStatus === submission.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => viewSubmission(submission)}>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => updateSubmissionStatus(submission.id, "in_progress")}
                          disabled={updatingStatus === submission.id}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Mark In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateSubmissionStatus(submission.id, "resolved")}
                          disabled={updatingStatus === submission.id}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Resolved
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => deleteSubmission(submission.id)}
                          className="text-red-600"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
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

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Submission Details</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Name</h4>
                  <p>{selectedSubmission.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Status</h4>
                  {getStatusBadge(selectedSubmission.status)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>{selectedSubmission.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p>{selectedSubmission.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Inquiry Type</h4>
                  {getInquiryTypeBadge(selectedSubmission.inquiry_type)}
                </div>
                <div>
                  <h4 className="font-semibold">Date Submitted</h4>
                  <p>{formatDate(selectedSubmission.created_at)}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Subject</h4>
                <p>{selectedSubmission.subject}</p>
              </div>
              <div>
                <h4 className="font-semibold">Message</h4>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => updateSubmissionStatus(selectedSubmission.id, "in_progress")}
                  disabled={updatingStatus === selectedSubmission.id}
                  variant="outline"
                >
                  Mark In Progress
                </Button>
                <Button
                  onClick={() => updateSubmissionStatus(selectedSubmission.id, "resolved")}
                  disabled={updatingStatus === selectedSubmission.id}
                >
                  Mark Resolved
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
