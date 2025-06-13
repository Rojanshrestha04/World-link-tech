"use client";

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Plus, Edit, Trash2, Search, Filter, MapPin, Clock, DollarSign, Users, Eye, EyeOff, MoreHorizontal, Loader2 } from 'lucide-react';
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience_level: 'entry' | 'mid' | 'senior' | 'executive';
  salary_range: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  application_deadline: string;
  is_active: boolean;
  positions_available: number;
  created_at: string;
  updated_at: string;
  company: string;
  contact_email: string;
}

interface CareerFormData {
  title: string;
  department: string;
  location: string;
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience_level: 'entry' | 'mid' | 'senior' | 'executive';
  salary_range: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  application_deadline: string;
  is_active: boolean;
  positions_available: number;
  company: string;
  contact_email: string;
}

export default function CareersManagement() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterEmploymentType, setFilterEmploymentType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Toast state
  const { toast } = useToast();

  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState<CareerFormData>({
    title: '',
    department: '',
    location: '',
    employment_type: 'full-time',
    experience_level: 'entry',
    salary_range: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    benefits: [''],
    application_deadline: '',
    is_active: true,
    positions_available: 1,
    company: '',
    contact_email: ''
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCareers(data || []);
      toast({
        title: "Careers fetched successfully",
        description: `Found ${data.length} careers.`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch careers');
      toast({
        title: "Error fetching careers",
        description: err instanceof Error ? err.message : 'Failed to fetch careers',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const careerData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        responsibilities: formData.responsibilities.filter(resp => resp.trim() !== ''),
        benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
        updated_at: new Date().toISOString()
      };

      if (editingCareer) {
        const { error } = await supabase
          .from('careers')
          .update(careerData)
          .eq('id', editingCareer.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('careers')
          .insert([{ ...careerData, created_at: new Date().toISOString() }]);
        
        if (error) throw error;
      }

      await fetchCareers();
      resetForm();
      setShowModal(false);
      toast({
        title: "Career saved successfully",
        description: editingCareer ? "Career has been updated." : "New career has been added.",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save career');
      toast({
        title: "Failed to save career",
        description: err instanceof Error ? err.message : 'Unknown error during save.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this career posting?')) return;
    
    try {
      setLoading(true);
      const { error } = await supabase
        .from('careers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await fetchCareers();
      toast({
        title: "Career deleted successfully",
        description: "The career posting has been removed.",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete career');
      toast({
        title: "Failed to delete career",
        description: err instanceof Error ? err.message : 'Unknown error during delete.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (career: Career) => {
    try {
      const { error } = await supabase
        .from('careers')
        .update({ 
          is_active: !career.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', career.id);
      
      if (error) throw error;
      await fetchCareers();
      toast({
        title: "Career status updated",
        description: `Career is now ${career.is_active ? 'inactive' : 'active'}.`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update career status');
      toast({
        title: "Failed to update career status",
        description: err instanceof Error ? err.message : 'Unknown error.',
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      employment_type: 'full-time',
      experience_level: 'entry',
      salary_range: '',
      description: '',
      requirements: [''],
      responsibilities: [''],
      benefits: [''],
      application_deadline: '',
      is_active: true,
      positions_available: 1,
      company: '',
      contact_email: ''
    });
    setEditingCareer(null);
  };

  const handleEdit = (career: Career) => {
    setEditingCareer(career);
    setFormData({
      title: career.title || '',
      department: career.department || '',
      location: career.location || '',
      employment_type: career.employment_type || 'full-time', 
      experience_level: career.experience_level || 'entry',
      salary_range: career.salary_range || '',
      description: career.description || '',
      requirements: career.requirements?.length > 0 ? career.requirements : [''],
      responsibilities: career.responsibilities?.length > 0 ? career.responsibilities : [''],
      benefits: career.benefits?.length > 0 ? career.benefits : [''],
      application_deadline: career.application_deadline ? career.application_deadline.split('T')[0] : '',
      is_active: career.is_active ?? true,
      positions_available: career.positions_available || 1,
      company: career.company || '',
      contact_email: career.contact_email || ''
    });
    setShowModal(true);
  };

  const addArrayField = (field: 'requirements' | 'responsibilities' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'requirements' | 'responsibilities' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'requirements' | 'responsibilities' | 'benefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Filter careers
  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || career.department === filterDepartment;
    const matchesEmploymentType = !filterEmploymentType || career.employment_type === filterEmploymentType;
    const matchesStatus = !filterStatus || 
                         (filterStatus === 'active' && career.is_active) ||
                         (filterStatus === 'inactive' && !career.is_active);
    
    return matchesSearch && matchesDepartment && matchesEmploymentType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCareers.length / itemsPerPage);
  const paginatedCareers = filteredCareers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const departments = [...new Set(careers.map(career => career.department))];

  if (loading && careers.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Careers Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Career
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Departments</option>
            {departments.map((dept, index) => (
              <option key={`${dept}-${index}`} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={filterEmploymentType}
            onChange={(e) => setFilterEmploymentType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Careers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department & Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employment Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCareers.map((career) => (
                <tr key={career.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{career.title}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <DollarSign className="w-3 h-3" />
                        {career.salary_range}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        {career.positions_available} position(s)
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{career.department}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {career.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 capitalize">{career.employment_type?.replace('-', ' ') || 'Not specified'}</div>
                    <div className="text-sm text-gray-500 capitalize">{career.experience_level || 'Not specified'} Level</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Deadline: {career.application_deadline ? new Date(career.application_deadline).toLocaleDateString() : 'Not set' }
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(career)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        career.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {career.is_active ? (
                        <>
                          <Eye className="w-3 h-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 mr-1" />
                          Inactive
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Career
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(career)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => toggleStatus(career)}
                          className="text-blue-600"
                        >
                          {career.is_active ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(career.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredCareers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredCareers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCareer ? 'Edit Career' : 'Add New Career'}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter job title"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter job location"
                  />
                </div>

                <div>
                  <Label htmlFor="employment_type">Employment Type *</Label>
                  <Select
                    required
                    value={formData.employment_type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, employment_type: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
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
                  <Select
                    required
                    value={formData.experience_level}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, experience_level: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
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
                  <Input
                    id="contact_email"
                    type="email"
                    required
                    value={formData.contact_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                    placeholder="Enter contact email"
                  />
                </div>

                <div>
                  <Label htmlFor="salary_range">Salary Range</Label>
                  <Input
                    id="salary_range"
                    type="text"
                    value={formData.salary_range}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary_range: e.target.value }))}
                    placeholder="e.g., $50,000 - $70,000"
                  />
                </div>

                <div>
                  <Label htmlFor="positions_available">Positions Available</Label>
                  <Input
                    id="positions_available"
                    type="number"
                    min="1"
                    value={typeof formData.positions_available !== 'number' || !Number.isFinite(formData.positions_available) ? '' : String(formData.positions_available)}
                    onChange={(e) => {
                      const value = e.target.value;
                      const num = Number(value);
                      setFormData(prev => ({
                        ...prev,
                        positions_available: (isNaN(num) || value === '') ? 1 : num
                      }));
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="application_deadline">Application Deadline</Label>
                  <Input
                    id="application_deadline"
                    type="date"
                    value={formData.application_deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, application_deadline: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter job description"
                />
              </div>

              {/* Requirements */}
              <div>
                <Label>Requirements</Label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      type="text"
                      value={req}
                      onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                      placeholder="Enter requirement"
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayField('requirements', index)}
                        className="text-red-500 hover:text-red-700 h-10 w-10 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => addArrayField('requirements')}
                  className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                >
                  + Add Requirement
                </Button>
              </div>

              {/* Responsibilities */}
              <div>
                <Label>Responsibilities</Label>
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      type="text"
                      value={resp}
                      onChange={(e) => updateArrayField('responsibilities', index, e.target.value)}
                      placeholder="Enter responsibility"
                    />
                    {formData.responsibilities.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayField('responsibilities', index)}
                        className="text-red-500 hover:text-red-700 h-10 w-10 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => addArrayField('responsibilities')}
                  className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                >
                  + Add Responsibility
                </Button>
              </div>

              {/* Benefits */}
              <div>
                <Label>Benefits</Label>
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateArrayField('benefits', index, e.target.value)}
                      placeholder="Enter benefit"
                    />
                    {formData.benefits.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayField('benefits', index)}
                        className="text-red-500 hover:text-red-700 h-10 w-10 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => addArrayField('benefits')}
                  className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                >
                  + Add Benefit
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="is_active">Active (visible to applicants)</Label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {"Saving..."}
                    </>
                  ) : (
                    editingCareer ? "Update Career" : "Add Career"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
