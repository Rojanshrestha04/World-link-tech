"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pencil, Search, Trash2, Plus, Loader2, Upload, Eye } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { toast } from "sonner"
import FileUpload from "@/components/ui/file-upload"

interface GalleryImage {
  id: string
  title: string
  category: string
  image: string
  created_at: string
}

export default function GalleryManagementWithUpload() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [categories, setCategories] = useState<string[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Fetch gallery images from database
  const fetchImages = async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching images:', error)
        toast.error("Failed to fetch gallery images")
        return
      }

      setImages(data || [])
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data?.map(img => img.category) || [])]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to fetch gallery images")
    } finally {
      setLoading(false)
    }
  }

  // Handle file upload completion
  const handleFileUpload = (file: File, url: string) => {
    setFormData(prev => ({ ...prev, image: url }))
    toast.success(`File "${file.name}" uploaded successfully`)
  }

  // Add new image
  const addImage = async () => {
    if (!formData.title || !formData.category || !formData.image) {
      toast.error("Please fill in all fields")
      return
    }

    setSubmitting(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('gallery_images')
        .insert([formData])
        .select()

      if (error) {
        console.error('Error adding image:', error)
        toast.error("Failed to add image")
        return
      }

      // Update local state
      if (data && data[0]) {
        setImages(prev => [data[0], ...prev])
      }
      
      // Reset form
      setFormData({ title: "", category: "", image: "" })
      setIsAddDialogOpen(false)
      
      toast.success("Image added successfully")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to add image")
    } finally {
      setSubmitting(false)
    }
  }

  // Update image
  const updateImage = async () => {
    if (!editingImage || !formData.title || !formData.category || !formData.image) {
      toast.error("Please fill in all fields")
      return
    }

    setSubmitting(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('gallery_images')
        .update(formData)
        .eq('id', editingImage.id)
        .select()

      if (error) {
        console.error('Error updating image:', JSON.stringify(error || error))
        toast.error("Failed to update image")
        return
      }

      // Update local state
      if (data && data[0]) {
        setImages(prev => prev.map(img => 
          img.id === editingImage.id ? data[0] : img
        ))
      }
      
      // Reset form
      setFormData({ title: "", category: "", image: "" })
      setEditingImage(null)
      setIsEditDialogOpen(false)
      
      toast.success("Image updated successfully")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to update image")
    } finally {
      setSubmitting(false)
    }
  }

  // Delete image
  const deleteImage = async (id: string) => {
    setDeleting(id)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting image:', error)
        toast.error("Failed to delete image")
        return
      }

      // Update local state
      setImages(prev => prev.filter(img => img.id !== id))
      
      toast.success("Image deleted successfully")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to delete image")
    } finally {
      setDeleting(null)
    }
  }

  // Open edit dialog
  const openEditDialog = (image: GalleryImage) => {
    setEditingImage(image)
    setFormData({
      title: image.title,
      category: image.category,
      image: image.image
    })
    setIsEditDialogOpen(true)
  }

  const handleViewDetails = (image: GalleryImage) => {
    setSelectedImage(image)
    setIsViewDialogOpen(true)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  // Filter images based on search and category
  const filteredImages = images.filter((image) => {
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || image.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading gallery images...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search images..."
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
        
        {/* Add Image Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter image title"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                {categories.length > 0 ? (
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Enter category"
                  />
                )}
              </div>
              
              {/* Upload Method Tabs */}
              <div>
                <Label>Image Source</Label>
                <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as "file" | "url")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="file">Upload File</TabsTrigger>
                    <TabsTrigger value="url">Image URL</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="file" className="mt-4">
                    <FileUpload
                      accept="image/*"
                      maxSize={5}
                      onFileUpload={handleFileUpload}
                      uploadEndpoint="/api/upload"
                      showPreview={true}
                    />
                  </TabsContent>
                  
                  <TabsContent value="url" className="mt-4">
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="Enter image URL"
                    />
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Image Preview */}
              {formData.image && (
                <div>
                  <Label>Preview</Label>
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              )}
              
              <Button onClick={addImage} disabled={submitting} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Image"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Image Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter image title"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                {categories.length > 0 ? (
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="edit-category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Enter category"
                  />
                )}
              </div>
              {/* Upload Method Tabs */}
              <div>
                <Label>Image Source</Label>
                <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as "file" | "url")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="file">Upload File</TabsTrigger>
                    <TabsTrigger value="url">Image URL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="file" className="mt-4">
                    <FileUpload
                      accept="image/*"
                      maxSize={5}
                      onFileUpload={handleFileUpload}
                      uploadEndpoint="/api/upload"
                      showPreview={true}
                    />
                  </TabsContent>
                  <TabsContent value="url" className="mt-4">
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="Enter image URL"
                    />
                  </TabsContent>
                </Tabs>
              </div>
              {/* Image Preview */}
              {formData.image && (
                <div>
                  <Label>Preview</Label>
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              )}
              <Button onClick={updateImage} disabled={submitting} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Image"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rest of the component remains the same... */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-12">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No images found</h3>
          <p className="text-muted-foreground">
            {searchQuery || categoryFilter !== "all" 
              ? "Try adjusting your search or filter criteria"
              : "Get started by adding your first image"
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg border bg-card">
              <div className="aspect-square relative">
                <Image
                  src={image.image}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold truncate">{image.title}</h3>
                <Badge variant="secondary" className="mt-2">
                  {image.category}
                </Badge>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => openEditDialog(image)}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteImage(image.id)}
                    disabled={deleting === image.id}
                  >
                    {deleting === image.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Trash2 className="h-3 w-3" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleViewDetails(image)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Image Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Image Details</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <p className="text-sm text-muted-foreground">{selectedImage.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <p className="text-sm text-muted-foreground">{selectedImage.category}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Image</label>
                {selectedImage.image && <img src={selectedImage.image} alt="Gallery" className="w-80 h-48 object-cover rounded mt-2" />}
              </div>
              <div>
                <label className="text-sm font-medium">Created At</label>
                <p className="text-sm text-muted-foreground">{new Date(selectedImage.created_at).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}