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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  CheckCircle, 
  EyeIcon, 
  MoreHorizontal, 
  Search, 
  XCircle, 
  Loader2, 
  Mail, 
  Phone, 
  MessageSquare,
  Clock,
  User
} from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { toast } from "sonner"

interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  inquiry_type: string
  priority: string
  status: string
  assigned_to?: string
  created_at: string
  updated_at: string
}

export default function InquiryManagementTable() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [inquiryTypes, setInquiryTypes] = useState<string[]>([])
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Fetch inquiries from database
  const fetchInquiries = async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching inquiries:', error)
        toast.error("Failed to fetch inquiries")
        return
      }

      setInquiries(data || [])
      
      // Extract unique inquiry types
      const uniqueTypes = [...new Set(data?.map(inquiry => inquiry.inquiry_type) || [])]
      setInquiryTypes(uniqueTypes)
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to fetch inquiries")
    } finally {
      setLoading(false)
    }
  }

  // Update inquiry status
  const updateInquiryStatus = async (id: string, newStatus: string) => {
    setUpdatingStatus(id)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('inquiries')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        console.error('Error updating status:', error)
        toast.error("Failed to update inquiry status")
        return
      }

      // Update local state
      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === id 
            ? { ...inquiry, status: newStatus, updated_at: new Date().toISOString() } 
            : inquiry
        )
      )

      toast.success("Inquiry status updated successfully.")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to update inquiry status")
    } finally {
      setUpdatingStatus(null)
    }
  }

  // Update inquiry priority
  const updateInquiryPriority = async (id: string, newPriority: string) => {
    setUpdatingStatus(id)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('inquiries')
        .update({ 
          priority: newPriority,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        console.error('Error updating priority:', error)
        toast.error("Failed to update inquiry priority")
        return
      }

      // Update local state
      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === id 
            ? { ...inquiry, priority: newPriority, updated_at: new Date().toISOString() } 
            : inquiry
        )
      )

      toast.success(`Inquiry priority updated to ${newPriority}`)
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to update inquiry priority")
    } finally {
      setUpdatingStatus(null)
    }
  }

  // Delete inquiry
  const deleteInquiry = async (id: string) => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting inquiry:', error)
        toast.error("Failed to delete inquiry")
        return
      }

      // Update local state
      setInquiries(prev => prev.filter(inquiry => inquiry.id !== id))
      
      toast.success("Inquiry deleted successfully")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to delete inquiry")
    }
  }

  // View inquiry details
  const viewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setIsViewDialogOpen(true)
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  // Filter inquiries based on search, status, priority, and type
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter
    const matchesPriority = priorityFilter === "all" || inquiry.priority === priorityFilter
    const matchesType = typeFilter === "all" || inquiry.inquiry_type === typeFilter
    return matchesSearch && matchesStatus && matchesPriority && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      "general": "bg-gray-100 text-gray-800",
      "course": "bg-blue-100 text-blue-800",
      "admission": "bg-green-100 text-green-800",
      "technical": "bg-red-100 text-red-800",
      "billing": "bg-purple-100 text-purple-800",
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
        <span className="ml-2">Loading inquiries...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inquiries..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]">
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
              <TableHead>Inquirer</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No inquiries found
                </TableCell>
              </TableRow>
            ) : (
              filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center">
                        <User className="mr-1 h-3 w-3" />
                        {inquiry.name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {inquiry.email}
                      </div>
                      {inquiry.phone && (
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Phone className="mr-1 h-3 w-3" />
                          {inquiry.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium truncate">{inquiry.subject}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {inquiry.message.substring(0, 50)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(inquiry.inquiry_type)}</TableCell>
                  <TableCell>{getPriorityBadge(inquiry.priority)}</TableCell>
                  <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatDate(inquiry.created_at)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          {updatingStatus === inquiry.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => viewInquiry(inquiry)}>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => updateInquiryStatus(inquiry.id, "in_progress")}
                          disabled={updatingStatus === inquiry.id}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateInquiryStatus(inquiry.id, "resolved")}
                          disabled={updatingStatus === inquiry.id}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Resolved
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateInquiryStatus(inquiry.id, "closed")}
                          disabled={updatingStatus === inquiry.id}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Closed
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Priority</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => updateInquiryPriority(inquiry.id, "high")}
                          disabled={updatingStatus === inquiry.id}
                        >
                          High Priority
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateInquiryPriority(inquiry.id, "medium")}
                          disabled={updatingStatus === inquiry.id}
                        >
                          Medium Priority
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateInquiryPriority(inquiry.id, "low")}
                          disabled={updatingStatus === inquiry.id}
                        >
                          Low Priority
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => deleteInquiry(inquiry.id)}
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
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Name</h4>
                  <p>{selectedInquiry.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Status</h4>
                  {getStatusBadge(selectedInquiry.status)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>{selectedInquiry.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p>{selectedInquiry.phone || "Not provided"}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold">Type</h4>
                  {getTypeBadge(selectedInquiry.inquiry_type)}
                </div>
                <div>
                  <h4 className="font-semibold">Priority</h4>
                  {getPriorityBadge(selectedInquiry.priority)}
                </div>
                <div>
                  <h4 className="font-semibold">Date Submitted</h4>
                  <p>{formatDate(selectedInquiry.created_at)}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Subject</h4>
                <p>{selectedInquiry.subject}</p>
              </div>
              <div>
                <h4 className="font-semibold">Message</h4>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>
              {selectedInquiry.assigned_to && (
                <div>
                  <h4 className="font-semibold">Assigned To</h4>
                  <p>{selectedInquiry.assigned_to}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => updateInquiryStatus(selectedInquiry.id, "in_progress")}
                  disabled={updatingStatus === selectedInquiry.id}
                  variant="outline"
                >
                  Mark In Progress
                </Button>
                <Button
                  onClick={() => updateInquiryStatus(selectedInquiry.id, "resolved")}
                  disabled={updatingStatus === selectedInquiry.id}
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
