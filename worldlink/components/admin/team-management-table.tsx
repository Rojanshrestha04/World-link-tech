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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const initialFormData = {
  name: "",
  position: "",
  bio: "",
  image: "",
  email: "",
  phone: "",
  linkedin: "",
  category: "",
  is_active: true,
  display_order: 0,
}

export default function TeamManagementTable() {
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingTeam, setEditingTeam] = useState<any | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Get unique categories from teams data
  const getUniqueCategories = () => {
    const categories = teams.map(team => team.category).filter(Boolean)
    return [...new Set(categories)].sort()
  }

  // Fetch teams
  const fetchTeams = async () => {
    setLoading(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('display_order', { ascending: true })
        .order('id', { ascending: false })
      if (error) throw error
      setTeams(data || [])
    } catch (error) {
      toast.error("Failed to fetch team members")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTeams() }, [])

  // Add team member
  const addTeam = async () => {
    if (!formData.name || !formData.position || !formData.category) {
      toast.error("Please fill in all required fields")
      return
    }
    setSubmitting(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('teams')
        .insert([{ ...formData }])
        .select()
      if (error) {
        toast.error(error.message || "Failed to add team member")
        return
      }
      setTeams(prev => [data[0], ...prev])
      setIsAddDialogOpen(false)
      setFormData(initialFormData)
      toast.success("Team member added successfully.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add team member")
    } finally {
      setSubmitting(false)
    }
  }

  // Edit team member
  const updateTeam = async () => {
    if (!editingTeam) return
    if (!formData.name || !formData.position || !formData.category) {
      toast.error("Please fill in all required fields")
      return
    }
    setSubmitting(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error, data } = await supabase
        .from('teams')
        .update({ ...formData })
        .eq('id', editingTeam.id)
      if (error) {
        toast.error(error.message || "Failed to update team member")
        return
      }
      await fetchTeams()
      setIsEditDialogOpen(false)
      setEditingTeam(null)
      setFormData(initialFormData)
      toast.success("Team member updated successfully.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update team member")
    } finally {
      setSubmitting(false)
    }
  }

  // Delete team member
  const deleteTeam = async (id: number) => {
    setDeleting(id)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', id)
      if (error) throw error
      setTeams(prev => prev.filter(t => t.id !== id))
      toast.success("Team member deleted successfully.")
    } catch (error) {
      toast.error("Failed to delete team member")
    } finally {
      setDeleting(null)
    }
  }

  // Handle image upload
  const handleImageUpload = (file: File, url: string) => {
    setFormData(prev => ({ ...prev, image: url }))
  }

  // Open edit dialog
  const openEditDialog = (team: any) => {
    setEditingTeam(team)
    setFormData({
      name: team.name,
      position: team.position,
      bio: team.bio || "",
      image: team.image || "",
      email: team.email || "",
      phone: team.phone || "",
      linkedin: team.linkedin || "",
      category: team.category,
      is_active: team.is_active,
      display_order: team.display_order || 0,
    })
    setIsEditDialogOpen(true)
  }

  // Filtered teams
  const filteredTeams = teams.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.bio && t.bio.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading team members...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search team members..."
            className="pl-8"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>Fill in the details below to add a new team member.</DialogDescription>
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
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {getUniqueCategories().map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Enter bio"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={e => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="Enter LinkedIn URL"
                />
              </div>
              <div>
                <Label>Image</Label>
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
              <div>
                <Label htmlFor="is_active">Active</Label>
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={e => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="ml-2"
                />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={e => setFormData(prev => ({ ...prev, display_order: Number(e.target.value) }))}
                  placeholder="Enter display order (number)"
                />
              </div>
              <Button onClick={addTeam} disabled={submitting} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                  </>
                ) : (
                  "Add Team Member"
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
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No team members found
                </TableCell>
              </TableRow>
            ) : (
              filteredTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.image && (<img src={team.image} alt="Team" className="w-12 h-12 object-cover rounded" />)}</TableCell>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>{team.position}</TableCell>
                  <TableCell>{team.category}</TableCell>
                  <TableCell>{team.is_active ? "Yes" : "No"}</TableCell>
                  <TableCell>{team.display_order}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          {deleting === team.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => { setSelectedTeam(team); setIsViewDialogOpen(true) }}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(team)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => deleteTeam(team.id)}
                          disabled={deleting === team.id}
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
            <DialogTitle>Edit Team Member</DialogTitle>
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
              <Label htmlFor="edit-category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {getUniqueCategories().map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-bio">Bio</Label>
              <Textarea
                id="edit-bio"
                value={formData.bio}
                onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Enter bio"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter phone"
              />
            </div>
            <div>
              <Label htmlFor="edit-linkedin">LinkedIn</Label>
              <Input
                id="edit-linkedin"
                value={formData.linkedin}
                onChange={e => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                placeholder="Enter LinkedIn URL"
              />
            </div>
            <div>
              <Label>Image</Label>
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
            <div>
              <Label htmlFor="edit-is_active">Active</Label>
              <input
                type="checkbox"
                id="edit-is_active"
                checked={formData.is_active}
                onChange={e => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                className="ml-2"
              />
            </div>
            <div>
              <Label htmlFor="edit-display_order">Display Order</Label>
              <Input
                id="edit-display_order"
                type="number"
                value={formData.display_order}
                onChange={e => setFormData(prev => ({ ...prev, display_order: Number(e.target.value) }))}
                placeholder="Enter display order (number)"
              />
            </div>
            <Button onClick={updateTeam} disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </>
              ) : (
                "Update Team Member"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Team Member Details</DialogTitle>
          </DialogHeader>
          {selectedTeam && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <p className="text-muted-foreground">{selectedTeam.name}</p>
              </div>
              <div>
                <Label>Position</Label>
                <p className="text-muted-foreground">{selectedTeam.position}</p>
              </div>
              <div>
                <Label>Category</Label>
                <p className="text-muted-foreground">{selectedTeam.category}</p>
              </div>
              <div>
                <Label>Bio</Label>
                <p className="text-muted-foreground whitespace-pre-line">{selectedTeam.bio}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-muted-foreground">{selectedTeam.email}</p>
              </div>
              <div>
                <Label>Phone</Label>
                <p className="text-muted-foreground">{selectedTeam.phone}</p>
              </div>
              <div>
                <Label>LinkedIn</Label>
                {selectedTeam.linkedin && <a href={selectedTeam.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>}
              </div>
              <div>
                <Label>Image</Label>
                {selectedTeam.image && <img src={selectedTeam.image} alt="Team" className="w-32 h-32 object-cover rounded mt-2" />}
              </div>
              <div>
                <Label>Active</Label>
                <p className="text-muted-foreground">{selectedTeam.is_active ? "Yes" : "No"}</p>
              </div>
              <div>
                <Label>Display Order</Label>
                <p className="text-muted-foreground">{selectedTeam.display_order}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
