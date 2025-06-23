"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Eye, MoreHorizontal, Trash2, Plus, Loader2 } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { toast } from "sonner"
import FileUpload from "@/components/ui/file-upload"
import type { Testimonial } from "@/lib/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TestimonialManagementTable() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    quote: "",
    image: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Fetch testimonials
  const fetchTestimonials = async () => {
    setLoading(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('id', { ascending: false })
      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      toast.error("Failed to fetch testimonials")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTestimonials() }, [])

  // Add testimonial
  const addTestimonial = async () => {
    if (!formData.name || !formData.position || !formData.quote || !formData.image) {
      toast.error("Please fill in all fields and upload an image")
      return
    }
    setSubmitting(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('testimonials')
        .insert([{ ...formData }])
        .select()
      if (error) {
        console.error("Supabase insert error:", error)
        console.error("Supabase insert data:", data)
        toast.error(error.message || "Failed to add testimonial")
        return
      }
      setTestimonials(prev => [data[0], ...prev])
      setIsAddDialogOpen(false)
      setFormData({ name: "", position: "", quote: "", image: "" })
      toast.success("Testimonial added successfully.")
    } catch (error) {
      console.error("Add testimonial error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to add testimonial")
    } finally {
      setSubmitting(false)
    }
  }

  // Edit testimonial
  const updateTestimonial = async () => {
    if (!editingTestimonial) return
    if (!formData.name || !formData.position || !formData.quote || !formData.image) {
      toast.error("Please fill in all fields and upload an image")
      return
    }
    setSubmitting(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error, data } = await supabase
        .from('testimonials')
        .update({ ...formData })
        .eq('id', editingTestimonial.id)
      if (error) {
        console.error("Supabase update error:", error)
        console.error("Supabase update data:", data)
        toast.error(error.message || "Failed to update testimonial")
        return
      }
      await fetchTestimonials()
      setIsEditDialogOpen(false)
      setEditingTestimonial(null)
      setFormData({ name: "", position: "", quote: "", image: "" })
      toast.success("Testimonial updated successfully.")
    } catch (error) {
      console.error("Update testimonial error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update testimonial")
    } finally {
      setSubmitting(false)
    }
  }

  // Delete testimonial
  const deleteTestimonial = async (id: string) => {
    setDeleting(id)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)
      if (error) throw error
      setTestimonials(prev => prev.filter(t => t.id !== id))
      toast.success("Testimonial deleted successfully.")
    } catch (error) {
      toast.error("Failed to delete testimonial")
    } finally {
      setDeleting(null)
    }
  }

  // Handle image upload
  const handleImageUpload = (file: File, url: string) => {
    setFormData(prev => ({ ...prev, image: url }))
  }

  // Open edit dialog
  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      position: testimonial.position,
      quote: testimonial.quote,
      image: testimonial.image
    })
    setIsEditDialogOpen(true)
  }

  // Filtered testimonials
  const filteredTestimonials = testimonials.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.quote.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading testimonials...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search testimonials..."
            className="pl-8"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
              <DialogDescription>Fill in the details below to add a new testimonial.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  placeholder="Enter position"
                />
              </div>
              <div>
                <Label htmlFor="quote">Quote *</Label>
                <Textarea
                  id="quote"
                  value={formData.quote}
                  onChange={e => setFormData(prev => ({ ...prev, quote: e.target.value }))}
                  placeholder="Enter testimonial quote"
                  rows={3}
                />
              </div>
              <div>
                <Label>Image *</Label>
                <FileUpload
                  onFileUpload={handleImageUpload}
                  accept="image/*"
                  maxSize={5}
                  uploadEndpoint="/api/upload"
                  className="mt-2"
                />
                {formData.image && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    Current image: <a href={formData.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Image</a>
                  </div>
                )}
              </div>
              <Button onClick={addTestimonial} disabled={submitting} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                  </>
                ) : (
                  "Add Testimonial"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTestimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No testimonials found
                </TableCell>
              </TableRow>
            ) : (
              filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>{testimonial.name}</TableCell>
                  <TableCell>{testimonial.position}</TableCell>
                  <TableCell className="max-w-xs truncate">{testimonial.quote}</TableCell>
                  <TableCell>
                    {testimonial.image && (
                      <img src={testimonial.image} alt="Testimonial" className="w-16 h-16 object-cover rounded" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          {deleting === testimonial.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => { setSelectedTestimonial(testimonial); setIsViewDialogOpen(true) }}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(testimonial)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => deleteTestimonial(testimonial.id)}
                          disabled={deleting === testimonial.id}
                          className="text-red-600"
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
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter name"
              />
            </div>
            <div>
              <Label htmlFor="edit-position">Position *</Label>
              <Input
                id="edit-position"
                value={formData.position}
                onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
                placeholder="Enter position"
              />
            </div>
            <div>
              <Label htmlFor="edit-quote">Quote *</Label>
              <Textarea
                id="edit-quote"
                value={formData.quote}
                onChange={e => setFormData(prev => ({ ...prev, quote: e.target.value }))}
                placeholder="Enter testimonial quote"
                rows={3}
              />
            </div>
            <div>
              <Label>Image *</Label>
              <FileUpload
                onFileUpload={handleImageUpload}
                accept="image/*"
                maxSize={5}
                uploadEndpoint="/api/upload"
                className="mt-2"
              />
              {formData.image && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Current image: <a href={formData.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Image</a>
                </div>
              )}
            </div>
            <Button onClick={updateTestimonial} disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </>
              ) : (
                "Update Testimonial"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Testimonial Details</DialogTitle>
          </DialogHeader>
          {selectedTestimonial && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <p className="text-muted-foreground">{selectedTestimonial.name}</p>
              </div>
              <div>
                <Label>Position</Label>
                <p className="text-muted-foreground">{selectedTestimonial.position}</p>
              </div>
              <div>
                <Label>Quote</Label>
                <p className="text-muted-foreground whitespace-pre-line">{selectedTestimonial.quote}</p>
              </div>
              <div>
                <Label>Image</Label>
                {selectedTestimonial.image && <img src={selectedTestimonial.image} alt="Testimonial" className="w-32 h-32 object-cover rounded mt-2" />}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 