"use client";

import { useState, useEffect, useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Eye, EyeOff, MoreHorizontal, Search, Trash2, Plus, Loader2, Calendar } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Career {
  id: string;
  title: string;
  slug: string;
  company: string;
  location: string;
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience_level: 'entry' | 'mid' | 'senior' | 'executive';
  salary_range: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills_required: string[];
  application_deadline: string;
  contact_email: string;
  contact_phone?: string;
  status: 'active' | 'closed' | 'draft';
  featured: boolean;
  remote_work: boolean;
  posted_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const departmentOptions = [
  'IT', 'HR', 'Marketing', 'Sales', 'Finance', 'Operations', 'Administration', 'Customer Service',
  'Engineering', 'Legal', 'R&D', 'Procurement', 'Logistics', 'Training', 'Quality Assurance', 'Support', 'Business Development', 'Design', 'Production', 'Other'
];

export default function CareersManagementTable() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [formData, setFormData] = useState<any>({
    title: "",
    company: "",
    location: "",
    job_type: "full-time",
    experience_level: "entry",
    salary_range: "",
    description: "",
    requirements: [""],
    responsibilities: [""],
    benefits: [""],
    skills_required: [""],
    application_deadline: "",
    contact_email: "",
    contact_phone: "",
    status: "active",
    featured: false,
    remote_work: false,
    posted_date: new Date().toISOString().split('T')[0],
    is_active: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const router = useRouter();

  const supabase = getSupabaseBrowserClient();

  // Fetch careers
  const fetchCareers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCareers(data || []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCareers(); }, []);

  // Slugify
  const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  // Reset form
  const resetFormData = () => {
    setFormData({
      title: "",
      company: "",
      location: "",
      job_type: "full-time",
      experience_level: "entry",
      salary_range: "",
      description: "",
      requirements: [""],
      responsibilities: [""],
      benefits: [""],
      skills_required: [""],
      application_deadline: "",
      contact_email: "",
      contact_phone: "",
      status: "active",
      featured: false,
      remote_work: false,
      posted_date: new Date().toISOString().split('T')[0],
      is_active: true,
    });
    setEditingCareer(null);
  };

  // Add career
  const addCareer = async () => {
    console.log('[addCareer] formData:', formData);
    if (!formData.title || !formData.company || !formData.location || !formData.job_type || !formData.experience_level || !formData.description || !formData.contact_email) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const slug = slugify(formData.title);
      // Ensure all JSONB fields are arrays
      const insertData = {
        ...formData,
        slug,
        requirements: Array.isArray(formData.requirements) ? formData.requirements.filter((r: string) => r.trim() !== "") : [],
        responsibilities: Array.isArray(formData.responsibilities) ? formData.responsibilities.filter((r: string) => r.trim() !== "") : [],
        benefits: Array.isArray(formData.benefits) ? formData.benefits.filter((b: string) => b.trim() !== "") : [],
        skills_required: Array.isArray(formData.skills_required) ? formData.skills_required.filter((s: string) => s.trim() !== "") : [],
        application_deadline: formData.application_deadline || null,
        posted_date: formData.posted_date || new Date().toISOString().split('T')[0],
        is_active: formData.is_active,
      };
      delete insertData.department;
      console.log('[addCareer] Insert data:', insertData);
      const { data, error } = await supabase
        .from('careers')
        .insert([insertData])
        .select('*')
        .single();
      if (error) {
        console.error('[addCareer] Error:', error);
        throw error;
      }
      console.log('[addCareer] Inserted data:', data);
      setCareers(prev => [data, ...prev]);
      resetFormData();
      setIsAddDialogOpen(false);
      toast.success("Career added successfully");
      setTimeout(() => {
        router.push("/admin/careers");
      }, 1000);
    } catch (error) {
      console.error('[addCareer] Exception:', error);
      toast.error("Failed to add career");
      setTimeout(() => {
        router.push("/admin/careers");
      }, 1000);
    } finally {
      setSubmitting(false);
    }
  };

  // Update career
  const updateCareer = async () => {
    if (!editingCareer) return;
    console.log('[updateCareer] formData:', formData);
    if (!formData.title || !formData.company || !formData.location || !formData.job_type || !formData.experience_level || !formData.description || !formData.contact_email) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const slug = slugify(formData.title);
      const updateData = {
        ...formData,
        slug,
        requirements: Array.isArray(formData.requirements) ? formData.requirements.filter((r: string) => r.trim() !== "") : [],
        responsibilities: Array.isArray(formData.responsibilities) ? formData.responsibilities.filter((r: string) => r.trim() !== "") : [],
        benefits: Array.isArray(formData.benefits) ? formData.benefits.filter((b: string) => b.trim() !== "") : [],
        skills_required: Array.isArray(formData.skills_required) ? formData.skills_required.filter((s: string) => s.trim() !== "") : [],
        application_deadline: formData.application_deadline || null,
        posted_date: formData.posted_date || new Date().toISOString().split('T')[0],
        is_active: formData.is_active,
        updated_at: new Date().toISOString(),
      };
      delete updateData.department;
      console.log('[updateCareer] Update data:', updateData);
      const { error } = await supabase
        .from('careers')
        .update(updateData)
        .eq('id', editingCareer.id);
      if (error) {
        console.error('[updateCareer] Error:', error);
        throw error;
      }
      await fetchCareers();
      resetFormData();
      setIsEditDialogOpen(false);
      toast.success("Career updated successfully");
      setTimeout(() => {
        router.push("/admin/careers");
      }, 1000);
    } catch (error) {
      console.error('[updateCareer] Exception:', error);
      toast.error("Failed to update career");
      setTimeout(() => {
        router.push("/admin/careers");
      }, 1000);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete career
  const deleteCareer = async (id: string) => {
    setDeleting(id);
    try {
      const { error } = await supabase.from('careers').delete().eq('id', id);
      if (error) throw error;
      setCareers(prev => prev.filter(c => c.id !== id));
      toast.success("Career deleted successfully.");
      setTimeout(() => {
        router.push("/admin/careers");
      }, 1000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
      setTimeout(() => {
        router.push("/admin/careers");
      }, 1000);
    } finally {
      setDeleting(null);
    }
  };

  // Toggle active status
  const toggleActiveStatus = async (career: Career) => {
    setUpdatingStatus(career.id);
    try {
      const { error } = await supabase
        .from('careers')
        .update({ is_active: !career.is_active, updated_at: new Date().toISOString() })
        .eq('id', career.id);
      if (error) throw error;
      setCareers(prev => prev.map(c => c.id === career.id ? { ...c, is_active: !c.is_active, updated_at: new Date().toISOString() } : c));
      toast.success(`Career ${career.is_active ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Open edit dialog
  const openEditDialog = (career: Career) => {
    setEditingCareer(career);
    setFormData({
      ...career,
      application_deadline: career.application_deadline ? career.application_deadline.split('T')[0] : "",
      posted_date: career.posted_date ? career.posted_date.split('T')[0] : new Date().toISOString().split('T')[0],
      requirements: career.requirements && career.requirements.length > 0 ? career.requirements : [""],
      responsibilities: career.responsibilities && career.responsibilities.length > 0 ? career.responsibilities : [""],
      benefits: career.benefits && career.benefits.length > 0 ? career.benefits : [""],
      skills_required: career.skills_required && career.skills_required.length > 0 ? career.skills_required : [""],
    });
    setIsEditDialogOpen(true);
  };

  // Array field helpers
  const addArrayField = (field: 'requirements' | 'responsibilities' | 'benefits' | 'skills_required') => {
    setFormData((prev: any) => ({ ...prev, [field]: [...prev[field], ""] }));
  };
  const updateArrayField = (field: 'requirements' | 'responsibilities' | 'benefits' | 'skills_required', index: number, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: prev[field].map((item: string, i: number) => i === index ? value : item) }));
  };
  const removeArrayField = (field: 'requirements' | 'responsibilities' | 'benefits' | 'skills_required', index: number) => {
    setFormData((prev: any) => ({ ...prev, [field]: prev[field].filter((_: string, i: number) => i !== index) }));
  };

  // Filtered careers
  const filteredCareers = careers.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "active" && career.is_active) ||
      (statusFilter === "inactive" && !career.is_active);
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (career: Career) => {
    setSelectedCareer(career);
    setIsViewDialogOpen(true);
  };

  // Table loading
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading careers...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters/Search/Add Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search careers..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <Button onClick={() => { resetFormData(); setIsAddDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Career
        </Button>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Career</DialogTitle>
              <DialogDescription>Fill in the details below to add a new career.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input id="title" value={formData.title} onChange={e => setFormData((prev: any) => ({ ...prev, title: e.target.value }))} placeholder="Enter job title" />
                </div>
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input id="company" value={formData.company} onChange={e => setFormData((prev: any) => ({ ...prev, company: e.target.value }))} placeholder="Enter company name" />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" value={formData.location} onChange={e => setFormData((prev: any) => ({ ...prev, location: e.target.value }))} placeholder="Enter job location" />
                </div>
                <div>
                  <Label htmlFor="job_type">Employment Type *</Label>
                  <Select value={formData.job_type} onValueChange={value => setFormData((prev: any) => ({ ...prev, job_type: value }))}>
                    <SelectTrigger><SelectValue placeholder="Select employment type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience_level">Experience Level *</Label>
                  <Select value={formData.experience_level} onValueChange={value => setFormData((prev: any) => ({ ...prev, experience_level: value }))}>
                    <SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact_email">Contact Email *</Label>
                  <Input id="contact_email" type="email" value={formData.contact_email} onChange={e => setFormData((prev: any) => ({ ...prev, contact_email: e.target.value }))} placeholder="Enter contact email" />
                </div>
                <div>
                  <Label htmlFor="salary_range">Salary Range</Label>
                  <Input id="salary_range" value={formData.salary_range} onChange={e => setFormData((prev: any) => ({ ...prev, salary_range: e.target.value }))} placeholder="e.g., $50,000 - $70,000" />
                </div>
                <div>
                  <Label htmlFor="posted_date">Posted Date</Label>
                  <Input id="posted_date" type="date" value={formData.posted_date} onChange={e => setFormData((prev: any) => ({ ...prev, posted_date: e.target.value }))} />
                </div>
                <div>
                  <Label htmlFor="application_deadline">Application Deadline</Label>
                  <Input id="application_deadline" type="date" value={formData.application_deadline} onChange={e => setFormData((prev: any) => ({ ...prev, application_deadline: e.target.value }))} />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea id="description" value={formData.description} onChange={e => setFormData((prev: any) => ({ ...prev, description: e.target.value }))} placeholder="Enter job description" rows={4} />
              </div>
              {/* Requirements */}
              <div>
                <Label>Requirements</Label>
                {formData.requirements.map((req: string, index: number) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input value={req} onChange={e => updateArrayField('requirements', index, e.target.value)} placeholder="Enter requirement" />
                    {formData.requirements.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayField('requirements', index)} className="text-red-500 hover:text-red-700 h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="link" onClick={() => addArrayField('requirements')} className="text-blue-600 hover:text-blue-800 p-0 h-auto">+ Add Requirement</Button>
              </div>
              {/* Responsibilities */}
              <div>
                <Label>Responsibilities</Label>
                {formData.responsibilities.map((resp: string, index: number) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input value={resp} onChange={e => updateArrayField('responsibilities', index, e.target.value)} placeholder="Enter responsibility" />
                    {formData.responsibilities.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayField('responsibilities', index)} className="text-red-500 hover:text-red-700 h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="link" onClick={() => addArrayField('responsibilities')} className="text-blue-600 hover:text-blue-800 p-0 h-auto">+ Add Responsibility</Button>
              </div>
              {/* Benefits */}
              <div>
                <Label>Benefits</Label>
                {formData.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input value={benefit} onChange={e => updateArrayField('benefits', index, e.target.value)} placeholder="Enter benefit" />
                    {formData.benefits.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayField('benefits', index)} className="text-red-500 hover:text-red-700 h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="link" onClick={() => addArrayField('benefits')} className="text-blue-600 hover:text-blue-800 p-0 h-auto">+ Add Benefit</Button>
              </div>
              {/* Skills Required */}
              <div>
                <Label>Skills Required</Label>
                {formData.skills_required.map((skill: string, index: number) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input value={skill} onChange={e => updateArrayField('skills_required', index, e.target.value)} placeholder="Enter skill" />
                    {formData.skills_required.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayField('skills_required', index)} className="text-red-500 hover:text-red-700 h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="link" onClick={() => addArrayField('skills_required')} className="text-blue-600 hover:text-blue-800 p-0 h-auto">+ Add Skill</Button>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="is_active" checked={formData.is_active} onChange={e => setFormData((prev: any) => ({ ...prev, is_active: e.target.checked }))} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <Label htmlFor="is_active">Active (visible to applicants)</Label>
              </div>
              <Button onClick={addCareer} disabled={submitting} className="w-full">
                {submitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Adding...</>) : "Add Career"}
                </Button>
              </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCareers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No careers found</TableCell>
              </TableRow>
            ) : (
              filteredCareers.map((career) => (
                <TableRow key={career.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{career.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">{career.company}</div>
                    </div>
                  </TableCell>
                  <TableCell>{career.company}</TableCell>
                  <TableCell>{career.location}</TableCell>
                  <TableCell>
                    {career.is_active ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(career.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
                  <TableCell>{new Date(career.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          {(updatingStatus === career.id || deleting === career.id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openEditDialog(career)}>
                          <Edit className="mr-2 h-4 w-4" />Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleActiveStatus(career)} disabled={updatingStatus === career.id}>
                          <Calendar className="mr-2 h-4 w-4" />
                          {career.is_active ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteCareer(career.id)} disabled={deleting === career.id} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewDetails(career)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
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
            <DialogTitle>Edit Career</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Job Title *</Label>
                <Input id="edit-title" value={formData.title} onChange={e => setFormData((prev: any) => ({ ...prev, title: e.target.value }))} placeholder="Enter job title" />
              </div>
              <div>
                <Label htmlFor="edit-company">Company *</Label>
                <Input id="edit-company" value={formData.company} onChange={e => setFormData((prev: any) => ({ ...prev, company: e.target.value }))} placeholder="Enter company name" />
              </div>
              <div>
                <Label htmlFor="edit-location">Location *</Label>
                <Input id="edit-location" value={formData.location} onChange={e => setFormData((prev: any) => ({ ...prev, location: e.target.value }))} placeholder="Enter job location" />
              </div>
              <div>
                <Label htmlFor="edit-job_type">Employment Type *</Label>
                <Select value={formData.job_type} onValueChange={value => setFormData((prev: any) => ({ ...prev, job_type: value }))}>
                  <SelectTrigger><SelectValue placeholder="Select employment type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-experience_level">Experience Level *</Label>
                <Select value={formData.experience_level} onValueChange={value => setFormData((prev: any) => ({ ...prev, experience_level: value }))}>
                  <SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-contact_email">Contact Email *</Label>
                <Input id="edit-contact_email" type="email" value={formData.contact_email} onChange={e => setFormData((prev: any) => ({ ...prev, contact_email: e.target.value }))} placeholder="Enter contact email" />
              </div>
              <div>
                <Label htmlFor="edit-salary_range">Salary Range</Label>
                <Input id="edit-salary_range" value={formData.salary_range} onChange={e => setFormData((prev: any) => ({ ...prev, salary_range: e.target.value }))} placeholder="e.g., $50,000 - $70,000" />
              </div>
              <div>
                <Label htmlFor="edit-posted_date">Posted Date</Label>
                <Input id="edit-posted_date" type="date" value={formData.posted_date} onChange={e => setFormData((prev: any) => ({ ...prev, posted_date: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="edit-application_deadline">Application Deadline</Label>
                <Input id="edit-application_deadline" type="date" value={formData.application_deadline} onChange={e => setFormData((prev: any) => ({ ...prev, application_deadline: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Job Description *</Label>
              <Textarea id="edit-description" value={formData.description} onChange={e => setFormData((prev: any) => ({ ...prev, description: e.target.value }))} placeholder="Enter job description" rows={4} />
            </div>
            {/* Requirements */}
            <div>
              <Label>Requirements</Label>
              {formData.requirements.map((req: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input value={req} onChange={e => updateArrayField('requirements', index, e.target.value)} placeholder="Enter requirement" />
                  {formData.requirements.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayField('requirements', index)} className="text-red-500 hover:text-red-700 h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="link" onClick={() => addArrayField('requirements')} className="text-blue-600 hover:text-blue-800 p-0 h-auto">+ Add Requirement</Button>
            </div>
            {/* Responsibilities */}
            <div>
              <Label>Responsibilities</Label>
              {formData.responsibilities.map((resp: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input value={resp} onChange={e => updateArrayField('responsibilities', index, e.target.value)} placeholder="Enter responsibility" />
                  {formData.responsibilities.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayField('responsibilities', index)} className="text-red-500 hover:text-red-700 h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="link" onClick={() => addArrayField('responsibilities')} className="text-blue-600 hover:text-blue-800 p-0 h-auto">+ Add Responsibility</Button>
            </div>
            {/* Benefits */}
            <div>
              <Label>Benefits</Label>
              {formData.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input value={benefit} onChange={e => updateArrayField('benefits', index, e.target.value)} placeholder="Enter benefit" />
                  {formData.benefits.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayField('benefits', index)} className="text-red-500 hover:text-red-700 h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="link" onClick={() => addArrayField('benefits')} className="text-blue-600 hover:text-blue-800 p-0 h-auto">+ Add Benefit</Button>
            </div>
            {/* Skills Required */}
            <div>
              <Label>Skills Required</Label>
              {formData.skills_required.map((skill: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input value={skill} onChange={e => updateArrayField('skills_required', index, e.target.value)} placeholder="Enter skill" />
                  {formData.skills_required.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayField('skills_required', index)} className="text-red-500 hover:text-red-700 h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="link" onClick={() => addArrayField('skills_required')} className="text-blue-600 hover:text-blue-800 p-0 h-auto">+ Add Skill</Button>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="edit-is_active" checked={formData.is_active} onChange={e => setFormData((prev: any) => ({ ...prev, is_active: e.target.checked }))} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <Label htmlFor="edit-is_active">Active (visible to applicants)</Label>
            </div>
            <Button onClick={updateCareer} disabled={submitting} className="w-full">
              {submitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Updating...</>) : "Update Career"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Career Details</DialogTitle>
          </DialogHeader>
          {selectedCareer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Job Type</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.job_type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Experience Level</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.experience_level}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Salary Range</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.salary_range}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Contact Email</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.contact_email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Contact Phone</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.contact_phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-muted-foreground">{selectedCareer.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Requirements</label>
                <ul className="text-sm text-muted-foreground list-disc ml-5">
                  {selectedCareer.requirements.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              <div>
                <label className="text-sm font-medium">Responsibilities</label>
                <ul className="text-sm text-muted-foreground list-disc ml-5">
                  {selectedCareer.responsibilities.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              <div>
                <label className="text-sm font-medium">Benefits</label>
                <ul className="text-sm text-muted-foreground list-disc ml-5">
                  {selectedCareer.benefits.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              <div>
                <label className="text-sm font-medium">Skills Required</label>
                <ul className="text-sm text-muted-foreground list-disc ml-5">
                  {selectedCareer.skills_required.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Application Deadline</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.application_deadline}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Posted Date</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.posted_date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Featured</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.featured ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Remote Work</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.remote_work ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Active</label>
                  <p className="text-sm text-muted-foreground">{selectedCareer.is_active ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Created At</label>
                  <p className="text-sm text-muted-foreground">{new Date(selectedCareer.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Updated At</label>
                  <p className="text-sm text-muted-foreground">{new Date(selectedCareer.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
