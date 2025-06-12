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
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import FileUpload from "@/components/ui/file-upload"
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
  Calendar as CalendarIcon,
  ExternalLink,
  Upload
} from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Resource {
  id: string
  title: string
  description: string
  file: string
  category: 'Publications' | 'Policy' | 'Reports' | 'Curriculum'
  date: string
  created_at: string
  updated_at: string
}

interface Publication {
  id: string
  resource_id: string
  publication_type: 'handbook' | 'calendar' | 'newsletter' | 'guide' | 'manual'
  version?: string
  language: string
}

interface Policy {
  id: string
  resource_id: string
  policy_type: 'admission' | 'scholarship' | 'conduct' | 'academic' | 'administrative'
  effective_date?: Date
  review_date?: Date
  approved_by?: string
  version?: string
}

interface Report {
  id: string
  resource_id: string
  report_type: 'annual' | 'training' | 'partnership' | 'financial' | 'performance'
  reporting_period?: string
  fiscal_year?: string
  prepared_by?: string
  approved_by?: string
}

interface Curriculum {
  id: string
  resource_id: string
  occupation: string
  type: string
  developed_by: string
  curriculum_type: 'Curriculum' | 'OP' | 'OSS/NOSS'
  course_category?: 'IT' | 'Electrical' | 'Mechanical' | 'Hospitality' | 'Construction' | 'Agriculture'
  duration?: string
  credit_hours?: number
  prerequisites?: string[]
  learning_outcomes?: string[]
  assessment_methods?: string[]
  approved_date?: Date
  revision_date?: Date
  status: 'active' | 'draft' | 'archived' | 'under_review'
}

interface ResourceWithDetails extends Resource {
  publication?: Publication
  policy?: Policy
  report?: Report
  curriculum?: Curriculum
}

interface FormData {
  // Resource fields
  title: string
  description: string
  file: string
  category: 'Publications' | 'Policy' | 'Reports' | 'Curriculum'
  date: string
  
  // Publication fields
  publication_type?: 'handbook' | 'calendar' | 'newsletter' | 'guide' | 'manual'
  version?: string
  language?: string
  
  // Policy fields
  policy_type?: 'admission' | 'scholarship' | 'conduct' | 'academic' | 'administrative'
  effective_date?: Date
  review_date?: Date
  approved_by?: string
  
  // Report fields
  report_type?: 'annual' | 'training' | 'partnership' | 'financial' | 'performance'
  reporting_period?: string
  fiscal_year?: string
  prepared_by?: string
  
  // Curriculum fields
  occupation?: string
  type?: string
  developed_by?: string
  curriculum_type?: 'Curriculum' | 'OP' | 'OSS/NOSS'
  course_category?: 'IT' | 'Electrical' | 'Mechanical' | 'Hospitality' | 'Construction' | 'Agriculture'
  duration?: string
  credit_hours?: number
  prerequisites?: string[]
  learning_outcomes?: string[]
  assessment_methods?: string[]
  approved_date?: Date
  revision_date?: Date
  status?: 'active' | 'draft' | 'archived' | 'under_review'
}

export default function ResourcesManagement() {
  const [resources, setResources] = useState<ResourceWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<ResourceWithDetails | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    file: "",
    category: "Publications",
    date: new Date().toISOString().split('T')[0],
    language: "English",
    status: "active"
  })
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string>("")
  const { toast } = useToast()

  // Fetch resources with their details
  const fetchResources = async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      
      // Fetch resources with their related data using the views
      const { data: publicationsData } = await supabase.from('publications_view').select('*')
      const { data: policiesData } = await supabase.from('policies_view').select('*')
      const { data: reportsData } = await supabase.from('reports_view').select('*')
      const { data: curriculumsData } = await supabase.from('curriculums_view').select('*')

      // Combine all resources
      const allResources: ResourceWithDetails[] = [
        ...(publicationsData || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          file: item.file,
          category: item.category as 'Publications',
          date: item.date,
          created_at: item.created_at,
          updated_at: item.updated_at,
          publication: {
            id: item.id,
            resource_id: item.id,
            publication_type: item.publication_type,
            version: item.version,
            language: item.language
          }
        })),
        ...(policiesData || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          file: item.file,
          category: item.category as 'Policy',
          date: item.date,
          created_at: item.created_at,
          updated_at: item.updated_at,
          policy: {
            id: item.id,
            resource_id: item.id,
            policy_type: item.policy_type,
            effective_date: item.effective_date ? new Date(item.effective_date) : undefined,
            review_date: item.review_date ? new Date(item.review_date) : undefined,
            approved_by: item.approved_by,
            version: item.version
          }
        })),
        ...(reportsData || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          file: item.file,
          category: item.category as 'Reports',
          date: item.date,
          created_at: item.created_at,
          updated_at: item.updated_at,
          report: {
            id: item.id,
            resource_id: item.id,
            report_type: item.report_type,
            reporting_period: item.reporting_period,
            fiscal_year: item.fiscal_year,
            prepared_by: item.prepared_by,
            approved_by: item.approved_by
          }
        })),
        ...(curriculumsData || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          file: item.file,
          category: item.category as 'Curriculum',
          date: item.date,
          created_at: item.created_at,
          updated_at: item.updated_at,
          curriculum: {
            id: item.id,
            resource_id: item.id,
            occupation: item.occupation,
            type: item.type,
            developed_by: item.developed_by,
            curriculum_type: item.curriculum_type,
            course_category: item.course_category,
            duration: item.duration,
            credit_hours: item.credit_hours,
            prerequisites: item.prerequisites,
            learning_outcomes: item.learning_outcomes,
            assessment_methods: item.assessment_methods,
            approved_date: item.approved_date ? new Date(item.approved_date) : undefined,
            revision_date: item.revision_date ? new Date(item.revision_date) : undefined,
            status: item.status
          }
        }))
      ]

      setResources(allResources.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
    } catch (error) {
      console.error('Error fetching resources:', error)
      toast({
        title: "Error",
        description: "Failed to fetch resources",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle file upload
  const handleFileUpload = async (file: File, url: string) => {
    setUploadedFile(file)
    setFileUrl(url)
    setFormData(prev => ({ ...prev, file: url }))
  }

  // Add new resource
  const addResource = async () => {
    if (!formData.title || !formData.description || !formData.file) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and upload a file",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const supabase = getSupabaseBrowserClient()
      
      // Insert into resources table
      const { data: resourceData, error: resourceError } = await supabase
        .from('resources')
        .insert([{
          title: formData.title,
          description: formData.description,
          file: formData.file,
          category: formData.category,
          date: formData.date
        }])
        .select()
        .single()

      if (resourceError) {
        throw resourceError
      }

      // Insert into appropriate child table based on category
      let childError = null
      
      switch (formData.category) {
        case 'Publications':
          const { error: pubError } = await supabase
            .from('publications')
            .insert([{
              resource_id: resourceData.id,
              publication_type: formData.publication_type,
              version: formData.version,
              language: formData.language || 'English'
            }])
          childError = pubError
          break
          
        case 'Policy':
          const { error: polError } = await supabase
            .from('policies')
            .insert([{
              resource_id: resourceData.id,
              policy_type: formData.policy_type,
              effective_date: formData.effective_date?.toISOString().split('T')[0],
              review_date: formData.review_date?.toISOString().split('T')[0],
              approved_by: formData.approved_by,
              version: formData.version
            }])
          childError = polError
          break
          
        case 'Reports':
          const { error: repError } = await supabase
            .from('reports')
            .insert([{
              resource_id: resourceData.id,
              report_type: formData.report_type,
              reporting_period: formData.reporting_period,
              fiscal_year: formData.fiscal_year,
              prepared_by: formData.prepared_by,
              approved_by: formData.approved_by
            }])
          childError = repError
          break
          
        case 'Curriculum':
          const { error: curError } = await supabase
            .from('curriculums')
            .insert([{
              resource_id: resourceData.id,
              occupation: formData.occupation,
              type: formData.type,
              developed_by: formData.developed_by,
              curriculum_type: formData.curriculum_type,
              course_category: formData.course_category,
              duration: formData.duration,
              credit_hours: formData.credit_hours,
              prerequisites: formData.prerequisites,
              learning_outcomes: formData.learning_outcomes,
              assessment_methods: formData.assessment_methods,
              approved_date: formData.approved_date?.toISOString().split('T')[0],
              revision_date: formData.revision_date?.toISOString().split('T')[0],
              status: formData.status || 'active'
            }])
          childError = curError
          break
      }

      if (childError) {
        throw childError
      }

      // Reset form and refresh data
      resetForm()
      setIsAddDialogOpen(false)
      await fetchResources()
      
      toast({
        title: "Success",
        description: "Resource added successfully",
      })
    } catch (error) {
      console.error('Error adding resource:', error)
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
    if (!editingResource || !formData.title || !formData.description || !formData.file) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const supabase = getSupabaseBrowserClient()
      
      // Update resources table
      const { error: resourceError } = await supabase
        .from('resources')
        .update({
          title: formData.title,
          description: formData.description,
          file: formData.file,
          category: formData.category,
          date: formData.date
        })
        .eq('id', editingResource.id)

      if (resourceError) {
        throw resourceError
      }

      // Update appropriate child table based on category
      let childError = null
      
      switch (formData.category) {
        case 'Publications':
          const { error: pubError } = await supabase
            .from('publications')
            .update({
              publication_type: formData.publication_type,
              version: formData.version,
              language: formData.language || 'English'
            })
            .eq('resource_id', editingResource.id)
          childError = pubError
          break
          
        case 'Policy':
          const { error: polError } = await supabase
            .from('policies')
            .update({
              policy_type: formData.policy_type,
              effective_date: formData.effective_date?.toISOString().split('T')[0],
              review_date: formData.review_date?.toISOString().split('T')[0],
              approved_by: formData.approved_by,
              version: formData.version
            })
            .eq('resource_id', editingResource.id)
          childError = polError
          break
          
        case 'Reports':
          const { error: repError } = await supabase
            .from('reports')
            .update({
              report_type: formData.report_type,
              reporting_period: formData.reporting_period,
              fiscal_year: formData.fiscal_year,
              prepared_by: formData.prepared_by,
              approved_by: formData.approved_by
            })
            .eq('resource_id', editingResource.id)
          childError = repError
          break
          
        case 'Curriculum':
          const { error: curError } = await supabase
            .from('curriculums')
            .update({
              occupation: formData.occupation,
              type: formData.type,
              developed_by: formData.developed_by,
              curriculum_type: formData.curriculum_type,
              course_category: formData.course_category,
              duration: formData.duration,
              credit_hours: formData.credit_hours,
              prerequisites: formData.prerequisites,
              learning_outcomes: formData.learning_outcomes,
              assessment_methods: formData.assessment_methods,
              approved_date: formData.approved_date?.toISOString().split('T')[0],
              revision_date: formData.revision_date?.toISOString().split('T')[0],
              status: formData.status || 'active'
            })
            .eq('resource_id', editingResource.id)
          childError = curError
          break
      }

      if (childError) {
        throw childError
      }

      // Reset form and refresh data
      resetForm()
      setEditingResource(null)
      setIsEditDialogOpen(false)
      await fetchResources()
      
      toast({
        title: "Success",
        description: "Resource updated successfully",
      })
    } catch (error) {
      console.error('Error updating resource:', error)
      toast({
        title: "Error",
        description: "Failed to update resource",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
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
        throw error
      }

      setResources(prev => prev.filter(resource => resource.id !== id))
      
      toast({
        title: "Success",
        description: "Resource deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting resource:', error)
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive",
      })
    } finally {
      setDeleting(null)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      file: "",
      category: "Publications",
      date: new Date().toISOString().split('T')[0],
      language: "English",
      status: "active"
    })
    setUploadedFile(null)
    setFileUrl("")
  }

  // Open edit dialog
  const openEditDialog = (resource: ResourceWithDetails) => {
    setEditingResource(resource)
    
    const baseFormData: FormData = {
      title: resource.title,
      description: resource.description,
      file: resource.file,
      category: resource.category,
      date: resource.date
    }

    // Add category-specific fields
    if (resource.publication) {
      Object.assign(baseFormData, {
        publication_type: resource.publication.publication_type,
        version: resource.publication.version,
        language: resource.publication.language
      })
    } else if (resource.policy) {
      Object.assign(baseFormData, {
        policy_type: resource.policy.policy_type,
        effective_date: resource.policy.effective_date,
        review_date: resource.policy.review_date,
        approved_by: resource.policy.approved_by,
        version: resource.policy.version
      })
    } else if (resource.report) {
      Object.assign(baseFormData, {
        report_type: resource.report.report_type,
        reporting_period: resource.report.reporting_period,
        fiscal_year: resource.report.fiscal_year,
        prepared_by: resource.report.prepared_by,
        approved_by: resource.report.approved_by
      })
    } else if (resource.curriculum) {
      Object.assign(baseFormData, {
        occupation: resource.curriculum.occupation,
        type: resource.curriculum.type,
        developed_by: resource.curriculum.developed_by,
        curriculum_type: resource.curriculum.curriculum_type,
        course_category: resource.curriculum.course_category,
        duration: resource.curriculum.duration,
        credit_hours: resource.curriculum.credit_hours,
        prerequisites: resource.curriculum.prerequisites,
        learning_outcomes: resource.curriculum.learning_outcomes,
        assessment_methods: resource.curriculum.assessment_methods,
        approved_date: resource.curriculum.approved_date,
        revision_date: resource.curriculum.revision_date,
        status: resource.curriculum.status
      })
    }

    setFormData(baseFormData)
    setIsEditDialogOpen(true)
  }

  useEffect(() => {
    fetchResources()
  }, [])

  // Filter resources
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getCategoryBadge = (category: string) => {
    const colors = {
      "Publications": "bg-blue-100 text-blue-800",
      "Policy": "bg-green-100 text-green-800",
      "Reports": "bg-orange-100 text-orange-800",
      "Curriculum": "bg-purple-100 text-purple-800"
    }
    return <Badge className={colors[category as keyof typeof colors]}>{category}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Render category-specific fields
  const renderCategoryFields = () => {
    switch (formData.category) {
      case 'Publications':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="publication_type">Publication Type *</Label>
                <Select 
                  value={formData.publication_type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, publication_type: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="handbook">Handbook</SelectItem>
                    <SelectItem value="calendar">Calendar</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={formData.language || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                  placeholder="English"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={formData.version || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                placeholder="e.g., v1.0, 2024 Edition"
              />
            </div>
          </>
        )
        
      case 'Policy':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="policy_type">Policy Type *</Label>
                <Select 
                  value={formData.policy_type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, policy_type: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admission">Admission</SelectItem>
                    <SelectItem value="scholarship">Scholarship</SelectItem>
                    <SelectItem value="conduct">Conduct</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={formData.version || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                  placeholder="e.g., v1.0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Effective Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.effective_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.effective_date ? format(formData.effective_date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.effective_date}
                      onSelect={(date) => setFormData(prev => ({ ...prev, effective_date: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Review Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.review_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.review_date ? format(formData.review_date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.review_date}
                      onSelect={(date) => setFormData(prev => ({ ...prev, review_date: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <Label htmlFor="approved_by">Approved By</Label>
              <Input
                id="approved_by"
                value={formData.approved_by || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, approved_by: e.target.value }))}
                placeholder="Name of approver"
              />
            </div>
          </>
        )
        
      case 'Reports':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="report_type">Report Type *</Label>
                <Select 
                  value={formData.report_type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, report_type: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fiscal_year">Fiscal Year</Label>
                <Input
                  id="fiscal_year"
                  value={formData.fiscal_year || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, fiscal_year: e.target.value }))}
                  placeholder="e.g., 2023-24"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prepared_by">Prepared By</Label>
                <Input
                  id="prepared_by"
                  value={formData.prepared_by || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, prepared_by: e.target.value }))}
                  placeholder="Name of preparer"
                />
              </div>
              <div>
                <Label htmlFor="approved_by">Approved By</Label>
                <Input
                  id="approved_by"
                  value={formData.approved_by || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, approved_by: e.target.value }))}
                  placeholder="Name of approver"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reporting_period">Reporting Period</Label>
              <Input
                id="reporting_period"
                value={formData.reporting_period || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, reporting_period: e.target.value }))}
                placeholder="e.g., Q1 2024, January-March 2024"
              />
            </div>
          </>
        )
        
      case 'Curriculum':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="occupation">Occupation *</Label>
                <Input
                  id="occupation"
                  value={formData.occupation || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
                  placeholder="e.g., Network Technician"
                />
              </div>
              <div>
                <Label htmlFor="type">Type *</Label>
                <Input
                  id="type"
                  value={formData.type || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  placeholder="e.g., Level 1, Level 2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="curriculum_type">Curriculum Type *</Label>
                <Select 
                  value={formData.curriculum_type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, curriculum_type: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Curriculum">Curriculum</SelectItem>
                    <SelectItem value="OP">OP</SelectItem>
                    <SelectItem value="OSS/NOSS">OSS/NOSS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="course_category">Course Category</Label>
                <Select 
                  value={formData.course_category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, course_category: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="developed_by">Developed By *</Label>
                <Input
                  id="developed_by"
                  value={formData.developed_by || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, developed_by: e.target.value }))}
                  placeholder="Organization/Person"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 6 months, 1 year"
                />
              </div>
              <div>
                <Label htmlFor="credit_hours">Credit Hours</Label>
                <Input
                  id="credit_hours"
                  type="number"
                  value={formData.credit_hours || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, credit_hours: parseInt(e.target.value) || undefined }))}
                  placeholder="e.g., 120"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Approved Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.approved_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.approved_date ? format(formData.approved_date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.approved_date}
                      onSelect={(date) => setFormData(prev => ({ ...prev, approved_date: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Revision Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.revision_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.revision_date ? format(formData.revision_date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.revision_date}
                      onSelect={(date) => setFormData(prev => ({ ...prev, revision_date: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </>
        )
        
      default:
        return null
    }
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
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Publications">Publications</SelectItem>
            <SelectItem value="Policy">Policy</SelectItem>
            <SelectItem value="Reports">Reports</SelectItem>
            <SelectItem value="Curriculum">Curriculum</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter resource title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Publications">Publications</SelectItem>
                      <SelectItem value="Policy">Policy</SelectItem>
                      <SelectItem value="Reports">Reports</SelectItem>
                      <SelectItem value="Curriculum">Curriculum</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div>
                <Label>File Upload *</Label>
                <FileUpload
                  onFileUpload={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
                  maxSize={50}
                  uploadEndpoint="/api/upload"
                  className="mt-2"
                />
              </div>

              {renderCategoryFields()}

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
              <TableHead>Category</TableHead>
              <TableHead>Type/Details</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
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
                  <TableCell>{getCategoryBadge(resource.category)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {resource.publication && (
                        <Badge variant="outline">{resource.publication.publication_type}</Badge>
                      )}
                      {resource.policy && (
                        <Badge variant="outline">{resource.policy.policy_type}</Badge>
                      )}
                      {resource.report && (
                        <Badge variant="outline">{resource.report.report_type}</Badge>
                      )}
                      {resource.curriculum && (
                        <div className="space-y-1">
                          <Badge variant="outline">{resource.curriculum.curriculum_type}</Badge>
                          <div className="text-xs text-muted-foreground">
                            {resource.curriculum.occupation}
                          </div>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {formatDate(resource.date)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {formatDate(resource.created_at)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          {deleting === resource.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <a 
                            href={resource.file} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center w-full"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(resource)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter resource title"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Publications">Publications</SelectItem>
                    <SelectItem value="Policy">Policy</SelectItem>
                    <SelectItem value="Reports">Reports</SelectItem>
                    <SelectItem value="Curriculum">Curriculum</SelectItem>
                  </SelectContent>
                </Select>
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
              <Label htmlFor="edit-date">Date *</Label>
              <Input
                id="edit-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div>
              <Label>File Upload</Label>
              <FileUpload
                onFileUpload={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
                maxSize={50}
                uploadEndpoint="/api/upload"
                className="mt-2"
              />
              {formData.file && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Current file: <a href={formData.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View File</a>
                </div>
              )}
            </div>

            {renderCategoryFields()}

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
