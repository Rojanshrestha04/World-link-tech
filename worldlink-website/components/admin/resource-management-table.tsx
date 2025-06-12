
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Edit, 
  MoreHorizontal, 
  Search, 
  Trash2, 
  Plus, 
  Loader2, 
  FileText,
  Download,
  Eye,
  Calendar,
  ExternalLink
} from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface Resource {
  id: string
  title: string
  description: string
  type: string
  category: string
  file_url?: string
  external_url?: string
  is_public: boolean
  download_count: number
  created_at: string
  updated_at: string
}

export default function ResourcesManagement() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [accessFilter, setAccessFilter] = useState("all")
  const [types, setTypes] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "document",
    category: "",
    file_url: "",
    external_url: "",
    is_public: true
  })
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [updatingAccess, setUpdatingAccess] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch resources from database
  const fetchResources = async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching resources:', error)
        toast({
          title: "Error",
          description: "Failed to fetch resources",
          variant: "destructive",
        })
        return
      }

      setResources(data || [])
      
      // Extract unique types and categories
      const uniqueTypes = [...new Set(data?.map(resource => resource.type) || [])]
      const uniqueCategories = [...new Set(data?.map(resource => resource.category) || [])]
      setTypes(uniqueTypes)
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to fetch resources",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Add new resource
  const addResource = async () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (!formData.file_url && !formData.external_url) {
      toast({
        title: "Error",
        description: "Please provide either a file URL or external URL",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('resources')
        .insert([{
          ...formData,
          download_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()

      if (error) {
        console.error('Error adding resource:', error)
        toast({
          title: "Error",
          description: "Failed to add resource",
          variant: "destructive",
        })
        return
      }

      if (data && data[0]) {
        setResources(prev => [data[0], ...prev])
        
        // Update types and categories if new ones were added
        if (!types.includes(formData.type)) {
          setTypes(prev => [...prev, formData.type])
        }
        if (!categories.includes(formData.category)) {
          setCategories(prev => [...prev, formData.category])
        }
      }

      setFormData({
        title: "",
        description: "",
        type: "document",
        category: "",
        file_url: "",
        external_url: "",
        is_public: true
      })
      setIsAddDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Resource added successfully",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to add resource",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Update resource
  const updateResource = async () => {
    if (!editingResource || !formData.title || !formData.description || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (!formData.file_url && !formData.external_url) {
      toast({
        title: "Error",
        description: "Please provide either a file URL or external URL",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('resources')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingResource.id)

      if (error) {
        console.error('Error updating resource:', error)
        toast({
          title: "Error",
          description: "Failed to update resource",
          variant: "destructive",
        })
        return
      }

      // Update local state
      setResources(prev => 
        prev.map(resource => 
          resource.id === editingResource.id 
            ? { ...resource, ...formData, updated_at: new Date().toISOString() } 
            : resource
        )
      )

      // Update types and categories if new ones were added
      if (!types.includes(formData.type)) {
        setTypes(prev => [...prev, formData.type])
      }
      if (!categories.includes(formData.category)) {
        setCategories(prev => [...prev, formData.category])
      }

      setFormData({
        title: "",
        description: "",
        type: "document",
        category: "",
        file_url: "",
        external_url: "",
        is_public: true
      })
      setEditingResource(null)
      setIsEditDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Resource updated successfully",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to update resource",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Toggle public access
  const togglePublicAccess = async (id: string, currentStatus: boolean) => {
    setUpdatingAccess(id)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('resources')
        .update({ 
          is_public: !currentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        console.error('Error updating access:', error)
        toast({
          title: "Error",
          description: "Failed to update resource access",
          variant: "destructive",
        })
        return
      }

      // Update local state
      setResources(prev => 
        prev.map(resource => 
          resource.id === id 
            ? { ...resource, is_public: !currentStatus, updated_at: new Date().toISOString() } 
            : resource
        )
      )

      toast({
        title: "Success",
        description: `Resource is now ${!currentStatus ? 'public' : 'private'}`,
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to update resource access",
        variant: "destructive",
      })
    } finally {
      setUpdatingAccess(null)
    }
  }

  // Delete resource
  const deleteResource = async (id: string) => {
    setDeleting(id)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting resource:', error)
        toast({
          title: "Error",
          description: "Failed to delete resource",
          variant: "destructive",
        })
        return
      }

      // Update local state
      setResources(prev => prev.filter(resource => resource.id !== id))
      
      toast({
        title: "Success",
        description: "Resource deleted successfully",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive",
      })
    } finally {
      setDeleting(null)
    }
  }

  // Open edit dialog
  const openEditDialog = (resource: Resource) => {
    setEditingResource(resource)
    setFormData({
      title: resource.title,
      description: resource.description,
      type: resource.type,
      category: resource.category,
      file_url: resource.file_url || "",
      external_url: resource.external_url || "",
      is_public: resource.is_public
    })
    setIsEditDialogOpen(true)
  }

  useEffect(() => {
    fetchResources()
  }, [])

  // Filter resources based on search, type, category, and access
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || resource.type === typeFilter
    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter
    const matchesAccess = accessFilter === "all" || 
      (accessFilter === "public" && resource.is_public) ||
      (accessFilter === "private" && !resource.is_public)
    return matchesSearch && matchesType && matchesCategory && matchesAccess
  })

  const getTypeBadge = (type: string) => {
    const colors = {
      "document": "bg-blue-100 text-blue-800",
      "video": "bg-red-100 text-red-800",
      "audio": "bg-green-100 text-green-800",
      "image": "bg-purple-100 text-purple-800",
      "link": "bg-orange-100 text-orange-800",
      "software": "bg-gray-100 text-gray-800"
    }
    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  const getAccessBadge = (isPublic: boolean) => {
    return isPublic ? (
      <Badge className="bg-green-100 text-green-800">Public</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Private</Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading resources...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={accessFilter} onValueChange={setAccessFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by access" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Access</SelectItem>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter resource title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Enter category"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter resource description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="file_url">File URL</Label>
                <Input
                  id="file_url"
                  value={formData.file_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, file_url: e.target.value }))}
                  placeholder="Enter file URL (for downloadable files)"
                />
              </div>
              <div>
                <Label htmlFor="external_url">External URL</Label>
                <Input
                  id="external_url"
                  value={formData.external_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, external_url: e.target.value }))}
                  placeholder="Enter external URL (for links)"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_public"
                  checked={formData.is_public}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_public: e.target.checked }))}
                />
                <Label htmlFor="is_public">Make resource public</Label>
              </div>
              <Button onClick={addResource} disabled={submitting} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Resource"
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
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No resources found
                </TableCell>
              </TableRow>
            ) : (
              filteredResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        {resource.title}
                      </div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {resource.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(resource.type)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{resource.category}</Badge>
                  </TableCell>
                  <TableCell>{getAccessBadge(resource.is_public)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Download className="mr-1 h-3 w-3" />
                      {resource.download_count}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(resource.created_at)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          {(updatingAccess === resource.id || deleting === resource.id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {resource.file_url && (
                          <DropdownMenuItem>
                            <a 
                              href={resource.file_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center w-full"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </a>
                          </DropdownMenuItem>
                        )}
                        {resource.external_url && (
                          <DropdownMenuItem>
                            <a 
                              href={resource.external_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center w-full"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open Link
                            </a>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => openEditDialog(resource)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => togglePublicAccess(resource.id, resource.is_public)}
                          disabled={updatingAccess === resource.id}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          {resource.is_public ? "Make Private" : "Make Public"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteResource(resource.id)}
                          disabled={deleting === resource.id}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter resource title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <Input
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Enter category"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter resource description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-file_url">File URL</Label>
              <Input
                id="edit-file_url"
                value={formData.file_url}
                onChange={(e) => setFormData(prev => ({ ...prev, file_url: e.target.value }))}
                placeholder="Enter file URL (for downloadable files)"
              />
            </div>
            <div>
              <Label htmlFor="edit-external_url">External URL</Label>
              <Input
                id="edit-external_url"
                value={formData.external_url}
                onChange={(e) => setFormData(prev => ({ ...prev, external_url: e.target.value }))}
                placeholder="Enter external URL (for links)"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-is_public"
                checked={formData.is_public}
                onChange={(e) => setFormData(prev => ({ ...prev, is_public: e.target.checked }))}
              />
              <Label htmlFor="edit-is_public">Make resource public</Label>
            </div>
            <Button onClick={updateResource} disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Resource"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
