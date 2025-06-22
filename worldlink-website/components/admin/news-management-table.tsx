"use client"

import { useState, useEffect, useRef } from "react"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Eye, MoreHorizontal, Search, Trash2, Plus, Loader2, Calendar, Upload, X } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { toast } from "sonner"
import FileUpload from "@/components/ui/file-upload"

interface NewsArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  image: string
  published: boolean
  created_at: string
  updated_at: string
}

export default function NewsManagementTable() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categories, setCategories] = useState<string[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    published: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
  
  // File upload states
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [uploadingFile, setUploadingFile] = useState(false)
  
  // File input refs
  const imageFileInputRef = useRef<HTMLInputElement>(null)
  const editImageFileInputRef = useRef<HTMLInputElement>(null)
  
  // File upload function
  const uploadFile = async (file: File, bucket: string, folder: string): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return publicUrl
  }

  // Handle image file selection
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!validImageTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, GIF, or WebP)")
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image file size must be less than 5MB")
        return
      }
      
      setSelectedImageFile(file)
    }
  }

  // Remove selected file
  const removeSelectedFile = () => {
    setSelectedImageFile(null)
    if (imageFileInputRef.current) imageFileInputRef.current.value = ''
    if (editImageFileInputRef.current) editImageFileInputRef.current.value = ''
  }

  // Reset form data
  const resetFormData = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      image: "",
      published: false
    })
    setSelectedImageFile(null)
    if (imageFileInputRef.current) imageFileInputRef.current.value = ''
    if (editImageFileInputRef.current) editImageFileInputRef.current.value = ''
  }

  // Fetch news articles from database
  const fetchArticles = async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching articles:', error)
        toast.error("Failed to fetch news articles")
        return
      }

      setArticles(data || [])
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data?.map(article => article.category) || [])]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to fetch news articles")
    } finally {
      setLoading(false)
    }
  }

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  // Handle image upload
  const handleImageUpload = (file: File, url: string) => {
    setFormData(prev => ({ ...prev, image: url }))
  }

  // Add new article
  const addArticle = async () => {
    if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
      toast.error("Please fill in all required fields")
      return
    }

    const slug = formData.slug || generateSlug(formData.title)

    setSubmitting(true)
    setUploadingFile(true)
    
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('news_articles')
        .insert([{ ...formData, slug }])
        .select()

      if (error) {
        // Log more details
        if (error instanceof Error) {
          console.error('Error:', error.message, error.stack)
        } else {
          console.error('Error:', JSON.stringify(error))
        }
        toast.error("Failed to add article")
        return
      }

      if (data && data[0]) {
        setArticles(prev => [data[0], ...prev])
        
        // Update categories if new category was added
        if (!categories.includes(formData.category)) {
          setCategories(prev => [...prev, formData.category])
        }
      }

      resetFormData()
      setIsAddDialogOpen(false)
      
      toast.success("Article added successfully.")
    } catch (error) {
      // Log more details
      if (error instanceof Error) {
        console.error('Error:', error.message, error.stack)
      } else {
        console.error('Error:', JSON.stringify(error))
      }
      toast.error("Failed to add article")
    } finally {
      setSubmitting(false)
      setUploadingFile(false)
    }
  }

  // Update article
  const updateArticle = async () => {
    if (!editingArticle || !formData.title || !formData.excerpt || !formData.content || !formData.category) {
      toast.error("Please fill in all required fields")
      return
    }

    setSubmitting(true)
    setUploadingFile(true)

    try {
      const newsData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        updated_at: new Date().toISOString(),
      }

      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('news_articles')
        .update(newsData)
        .eq('id', editingArticle.id)

      if (error) {
        console.error('Error updating article:', error)
        toast.error("Failed to update article")
        return
      }

      // Re-fetch articles from the database for consistency
      await fetchArticles()

      resetFormData()
      setEditingArticle(null)
      setIsEditDialogOpen(false)
      
      toast.success("Article updated successfully.")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to update article")
    } finally {
      setSubmitting(false)
      setUploadingFile(false)
    }
  }

  // Toggle publish status
  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    setUpdatingStatus(id)
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('news_articles')
        .update({ published: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) {
        console.error('Error updating status:', error.message || error)
        toast.error(error.message || "Failed to update article status")
        return
      }

      if (!data || data.length === 0) {
        console.error('No data returned after update')
        toast.error("Failed to update article status: No data returned")
        return
      }

      // Update local state
      setArticles(prev => 
        prev.map(article => 
          article.id === id 
            ? { ...article, published: !currentStatus, updated_at: new Date().toISOString() } 
            : article
        )
      )

      toast.success(`Article ${!currentStatus ? 'published' : 'unpublished'} successfully.`)
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error)
      toast.error(error instanceof Error ? error.message : "Failed to update article status")
    } finally {
      setUpdatingStatus(null)
    }
  }

  // Delete article
  const deleteArticle = async (id: string) => {
    setDeleting(id)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting article:', error)
        toast.error("Failed to delete article")
        return
      }

      // Update local state
      setArticles(prev => prev.filter(article => article.id !== id))
      
      toast.success("Article deleted successfully.")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to delete article")
    } finally {
      setDeleting(null)
    }
  }

  // Open edit dialog
  const openEditDialog = (article: NewsArticle) => {
    setEditingArticle(article)
    setFormData({
      title: article.title || "",
      slug: article.slug || "",
      excerpt: article.excerpt || "",
      content: article.content || "",
      category: article.category || "",
      image: article.image || "",
      published: article.published ?? false
    })
    setSelectedImageFile(null)
    setIsEditDialogOpen(true)
  }

  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const handleViewDetails = (article: NewsArticle) => {
    setSelectedArticle(article)
    setIsViewDialogOpen(true)
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  // Filter articles based on search, category, and status
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "published" && article.published) ||
      (statusFilter === "draft" && !article.published)
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (published: boolean) => {
    return published ? (
      <Badge className="bg-green-100 text-green-800">Published</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
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
        <span className="ml-2">Loading news articles...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news articles..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Article</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new article.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value
                    setFormData(prev => ({ 
                      ...prev, 
                      title,
                      slug: generateSlug(title)
                    }))
                  }}
                  placeholder="Enter article title"
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="article-slug"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category">
                      {formData.category === "news" && "News"}
                      {formData.category === "notices" && "Notices"}
                      {formData.category === "events" && "Events"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="notices">Notices</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Image File Upload */}
              <div>
                <Label htmlFor="image">Article Image</Label>
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
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the article"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Full article content"
                  rows={8}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
              <Button onClick={addArticle} disabled={submitting || uploadingFile} className="w-full">
                {submitting || uploadingFile ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {uploadingFile ? "Uploading..." : "Adding..."}
                  </>
                ) : (
                  "Add Article"
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
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No articles found
                </TableCell>
              </TableRow>
            ) : (
              filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{article.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {article.excerpt}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{article.category}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(article.published)}</TableCell>
                  <TableCell>{formatDate(article.created_at)}</TableCell>
                  <TableCell>{formatDate(article.updated_at)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          {(updatingStatus === article.id || deleting === article.id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(article)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(article)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => togglePublishStatus(article.id, article.published)}
                          disabled={updatingStatus === article.id}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {article.published ? "Unpublish" : "Publish"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteArticle(article.id)}
                          disabled={deleting === article.id}
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
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value
                  setFormData(prev => ({ 
                    ...prev, 
                    title,
                    slug: generateSlug(title)
                  }))
                }}
                placeholder="Enter article title"
              />
            </div>
            <div>
              <Label htmlFor="edit-slug">Slug</Label>
              <Input
                id="edit-slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="article-slug"
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category">
                    {formData.category === "news" && "News"}
                    {formData.category === "notices" && "Notices"}
                    {formData.category === "events" && "Events"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="notices">Notices</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Edit Image File Upload */}
            <div>
              <Label htmlFor="edit-image">Article Image</Label>
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
              <Label htmlFor="edit-excerpt">Excerpt *</Label>
              <Textarea
                id="edit-excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the article"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-content">Content *</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Full article content"
                rows={8}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-published"
                checked={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              />
              <Label htmlFor="edit-published">Published</Label>
            </div>
            <Button onClick={updateArticle} disabled={submitting || uploadingFile} className="w-full">
              {submitting || uploadingFile ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {uploadingFile ? "Uploading..." : "Updating..."}
                </>
              ) : (
                "Update Article"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>News Details</DialogTitle>
          </DialogHeader>
          {selectedArticle && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <p className="text-sm text-muted-foreground">{selectedArticle.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <p className="text-sm text-muted-foreground">{selectedArticle.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <p className="text-sm text-muted-foreground">{selectedArticle.published ? 'Published' : 'Draft'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <p className="text-sm text-muted-foreground">{selectedArticle.slug}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Excerpt</label>
                <p className="text-sm text-muted-foreground">{selectedArticle.excerpt}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Content</label>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{selectedArticle.content}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Image</label>
                {selectedArticle.image && <img src={selectedArticle.image} alt="Article" className="w-40 h-24 object-cover rounded mt-2" />}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Created At</label>
                  <p className="text-sm text-muted-foreground">{new Date(selectedArticle.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Updated At</label>
                  <p className="text-sm text-muted-foreground">{new Date(selectedArticle.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
