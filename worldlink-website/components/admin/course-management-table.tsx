"use client";

import { useState, useEffect, useRef } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import { Plus, Edit, Trash2, Search, Filter, Clock, Users, DollarSign, Calendar, Eye, EyeOff, BookOpen, Upload, X, MoreHorizontal, Star, Loader2 } from 'lucide-react';
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
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  price: number;
  instructor_name: string;
  instructor_bio: string;
  max_students: number;
  start_date: string;
  end_date: string;
  schedule: string;
  prerequisites: string[];
  learning_outcomes: string[];
  course_materials: string[];
  is_active: boolean;
  is_featured: boolean;
  image_url: string;
  syllabus_url: string;
  created_at: string;
  updated_at: string;
}

export default function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Toast state
  const { toast } = useToast();

  // File upload states
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedSyllabusFile, setSelectedSyllabusFile] = useState<File | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  
  // File input refs
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const syllabusFileInputRef = useRef<HTMLInputElement>(null);

  const supabase = getSupabaseBrowserClient();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    duration_weeks: 1,
    price: 0,
    instructor_name: '',
    instructor_bio: '',
    max_students: 1,
    start_date: '',
    end_date: '',
    schedule: '',
    prerequisites: [''],
    learning_outcomes: [''],
    course_materials: [''],
    is_active: true,
    is_featured: false,
    image_url: '',
    syllabus_url: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching courses:', error);
        throw new Error(error.message);
      }
      setCourses(data || []);
      toast({
        title: "Courses fetched successfully",
        description: `Found ${data.length} courses.`,
      });
    } catch (err) {
      console.error('Error in fetchCourses:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      toast({
        title: "Error fetching courses",
        description: err instanceof Error ? err.message : 'Failed to fetch courses',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // File upload function
  const uploadFile = async (file: File, bucket: string, folder: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setUploadingFiles(true);
      
      let imageUrl = formData.image_url;
      let syllabusUrl = formData.syllabus_url;

      // Upload image file if selected
      if (selectedImageFile) {
        try {
          imageUrl = await uploadFile(selectedImageFile, 'course-files', 'images');
        } catch (err) {
          throw new Error('Failed to upload image file: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
      }

      // Upload syllabus file if selected
      if (selectedSyllabusFile) {
        try {
          syllabusUrl = await uploadFile(selectedSyllabusFile, 'course-files', 'syllabus');
        } catch (err) {
          throw new Error('Failed to upload syllabus file: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
      }
      
      const courseData = {
        ...formData,
        image_url: imageUrl,
        syllabus_url: syllabusUrl,
        prerequisites: formData.prerequisites.filter(req => req.trim() !== ''),
        learning_outcomes: formData.learning_outcomes.filter(outcome => outcome.trim() !== ''),
        course_materials: formData.course_materials.filter(material => material.trim() !== ''),
        updated_at: new Date().toISOString()
      };

      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', editingCourse.id);
        
        if (error) {
          console.error('Error updating course:', error);
          throw new Error(error.message);
        }
      } else {
        const { error } = await supabase
          .from('courses')
          .insert([{ ...courseData, created_at: new Date().toISOString() }]);
        
        if (error) {
          console.error('Error creating course:', error);
          throw new Error(error.message);
        }
      }

      await fetchCourses();
      resetForm();
      setShowModal(false);
      toast({
        title: "Course saved successfully",
        description: editingCourse ? "Course has been updated." : "New course has been added.",
      });
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err instanceof Error ? err.message : 'Failed to save course');
      toast({
        title: "Failed to save course",
        description: err instanceof Error ? err.message : 'Unknown error during save.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setUploadingFiles(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting course:', error);
        throw new Error(error.message);
      }
      await fetchCourses();
      toast({
        title: "Course deleted successfully",
        description: "The course has been removed.",
      });
    } catch (err) {
      console.error('Error in handleDelete:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete course');
      toast({
        title: "Failed to delete course",
        description: err instanceof Error ? err.message : 'Unknown error during delete.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (course: Course) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ 
          is_active: !course.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', course.id);
      
      if (error) throw error;
      await fetchCourses();
      toast({
        title: "Course status updated",
        description: `Course is now ${course.is_active ? 'inactive' : 'active'}.`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update course status');
      toast({
        title: "Failed to update course status",
        description: err instanceof Error ? err.message : 'Unknown error.',
        variant: "destructive",
      });
    }
  };

  const toggleFeatured = async (course: Course) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ 
          is_featured: !course.is_featured,
          updated_at: new Date().toISOString()
        })
        .eq('id', course.id);
      
      if (error) throw error;
      await fetchCourses();
      toast({
        title: "Course featured status updated",
        description: `Course is now ${course.is_featured ? 'regular' : 'featured'}.`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update featured status');
      toast({
        title: "Failed to update featured status",
        description: err instanceof Error ? err.message : 'Unknown error.',
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
      duration_weeks: 1,
      price: 0,
      instructor_name: '',
      instructor_bio: '',
      max_students: 1,
      start_date: '',
      end_date: '',
      schedule: '',
      prerequisites: [''],
      learning_outcomes: [''],
      course_materials: [''],
      is_active: true,
      is_featured: false,
      image_url: '',
      syllabus_url: ''
    });
    setEditingCourse(null);
    setSelectedImageFile(null);
    setSelectedSyllabusFile(null);
    if (imageFileInputRef.current) imageFileInputRef.current.value = '';
    if (syllabusFileInputRef.current) syllabusFileInputRef.current.value = '';
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || '',
      description: course.description || '',
      category: course.category || '',
      level: course.level || 'beginner',
      duration_weeks: course.duration_weeks || 1,
      price: course.price || 0,
      instructor_name: course.instructor_name || '',
      instructor_bio: course.instructor_bio || '',
      max_students: course.max_students || 1,
      start_date: course.start_date ? course.start_date.split('T')[0] : '',
      end_date: course.end_date ? course.end_date.split('T')[0] : '',
      schedule: course.schedule || '',
      prerequisites: course.prerequisites?.length > 0 ? course.prerequisites : [''],
      learning_outcomes: course.learning_outcomes?.length > 0 ? course.learning_outcomes : [''],
      course_materials: course.course_materials?.length > 0 ? course.course_materials : [''],
      is_active: course.is_active ?? true,
      is_featured: course.is_featured ?? false,
      image_url: course.image_url || '',
      syllabus_url: course.syllabus_url || ''
    });
    setShowModal(true);
  };

  const addArrayField = (field: 'prerequisites' | 'learning_outcomes' | 'course_materials') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'prerequisites' | 'learning_outcomes' | 'course_materials', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'prerequisites' | 'learning_outcomes' | 'course_materials', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // File handling functions
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validImageTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size must be less than 5MB');
        return;
      }
      
      setSelectedImageFile(file);
      setError(null);
    }
  };

  const handleSyllabusFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validDocTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validDocTypes.includes(file.type)) {
        setError('Please select a valid document file (PDF, DOC, or DOCX)');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Syllabus file size must be less than 10MB');
        return;
      }
      
      setSelectedSyllabusFile(file);
      setError(null);
    }
  };

  const removeSelectedFile = (type: 'image' | 'syllabus') => {
    if (type === 'image') {
      setSelectedImageFile(null);
      if (imageFileInputRef.current) imageFileInputRef.current.value = '';
    } else {
      setSelectedSyllabusFile(null);
      if (syllabusFileInputRef.current) syllabusFileInputRef.current.value = '';
    }
  };

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (course.instructor_name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || course.category === filterCategory;
    const matchesLevel = !filterLevel || course.level === filterLevel;
    const matchesStatus = !filterStatus || 
                         (filterStatus === 'active' && course.is_active) ||
                         (filterStatus === 'inactive' && !course.is_active) ||
                         (filterStatus === 'featured' && course.is_featured);
    
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = [...new Set(courses.map(course => course.category))];

  if (loading && courses.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Courses Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Course
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
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="featured">Featured</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor & Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment & Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price & Dates
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
              {paginatedCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500 capitalize flex items-center gap-2">
                        <BookOpen className="w-3 h-3" />
                        {course.level} Level
                      </div>
                      {course.is_featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{course.instructor_name}</div>
                    <div className="text-sm text-gray-500">{course.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.max_students} students
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration_weeks} weeks
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      ${course.price}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(course.start_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => toggleStatus(course)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          course.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {course.is_active ? (
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
                      <button
                        onClick={() => toggleFeatured(course)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          course.is_featured
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {course.is_featured ? 'Featured' : 'Regular'}
                      </button>
                    </div>
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
                          View Course
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(course)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => toggleStatus(course)}
                          className="text-blue-600"
                        >
                          {course.is_active ? (
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
                          onClick={() => toggleFeatured(course)}
                          className="text-yellow-600"
                        >
                          {course.is_featured ? (
                            <>
                              <Star className="mr-2 h-4 w-4" />
                              Remove Featured
                            </>
                          ) : (
                            <>
                              <Star className="mr-2 h-4 w-4" />
                              Make Featured
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(course.id)}
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
                    {Math.min(currentPage * itemsPerPage, filteredCourses.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredCourses.length}</span> results
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
              <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter course title"
                  />
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

                <div>
                  <Label htmlFor="level">Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, level: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Duration (weeks) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={typeof formData.duration_weeks !== 'number' || !Number.isFinite(formData.duration_weeks) ? '' : String(formData.duration_weeks)}
                    onChange={(e) => {
                      const value = e.target.value;
                      const num = Number(value);
                      setFormData(prev => ({
                        ...prev,
                        duration_weeks: (isNaN(num) || value === '') ? 1 : num
                      }));
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={typeof formData.price !== 'number' || !Number.isFinite(formData.price) ? '' : String(formData.price)}
                    onChange={(e) => {
                      const value = e.target.value;
                      const num = Number(value);
                      setFormData(prev => ({
                        ...prev,
                        price: (isNaN(num) || value === '') ? 0 : num
                      }));
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="max_students">Max Students *</Label>
                  <Input
                    id="max_students"
                    type="number"
                    min="1"
                    value={typeof formData.max_students !== 'number' || !Number.isFinite(formData.max_students) ? '' : String(formData.max_students)}
                    onChange={(e) => {
                      const value = e.target.value;
                      const num = Number(value);
                      setFormData(prev => ({
                        ...prev,
                        max_students: (isNaN(num) || value === '') ? 1 : num
                      }));
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="start_date">Start Date *</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="end_date">End Date *</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="instructor_name">Instructor Name *</Label>
                  <Input
                    id="instructor_name"
                    value={formData.instructor_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, instructor_name: e.target.value }))}
                    placeholder="Enter instructor name"
                  />
                </div>

                <div>
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input
                    id="schedule"
                    value={formData.schedule}
                    onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                    placeholder="e.g., Mon-Wed-Fri 10:00-12:00"
                  />
                </div>

                {/* Course Image File Upload */}
                <div>
                  <Label htmlFor="image">Course Image</Label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      ref={imageFileInputRef}
                      onChange={handleImageFileSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => imageFileInputRef.current?.click()}
                      className="w-full justify-start"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Image File
                    </Button>
                    {selectedImageFile && (
                      <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-md">
                        <span className="text-sm text-blue-700 truncate">
                          {selectedImageFile.name}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSelectedFile('image')}
                          className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {editingCourse && formData.image_url && !selectedImageFile && (
                      <div className="text-sm text-gray-500">
                        Current: <a href={formData.image_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View current image</a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Syllabus File Upload */}
                <div>
                  <Label htmlFor="syllabus">Syllabus Document</Label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      ref={syllabusFileInputRef}
                      onChange={handleSyllabusFileSelect}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => syllabusFileInputRef.current?.click()}
                      className="w-full justify-start"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Syllabus File
                    </Button>
                    {selectedSyllabusFile && (
                      <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-md">
                        <span className="text-sm text-blue-700 truncate">
                          {selectedSyllabusFile.name}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSelectedFile('syllabus')}
                          className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {editingCourse && formData.syllabus_url && !selectedSyllabusFile && (
                      <div className="text-sm text-gray-500">
                        Current: <a href={formData.syllabus_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View current syllabus</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Course Description *</Label>
                <Textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter course description"
                />
              </div>

              <div>
                <Label htmlFor="instructor_bio">Instructor Bio</Label>
                <Textarea
                  id="instructor_bio"
                  rows={3}
                  value={formData.instructor_bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructor_bio: e.target.value }))}
                  placeholder="Enter instructor bio"
                />
              </div>

              {/* Prerequisites */}
              <div>
                <Label>Prerequisites</Label>
                {formData.prerequisites.map((prereq, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={prereq}
                      onChange={(e) => updateArrayField('prerequisites', index, e.target.value)}
                      placeholder="Enter prerequisite"
                    />
                    {formData.prerequisites.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayField('prerequisites', index)}
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
                  onClick={() => addArrayField('prerequisites')}
                  className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                >
                  + Add Prerequisite
                </Button>
              </div>

              {/* Learning Outcomes */}
              <div>
                <Label>Learning Outcomes</Label>
                {formData.learning_outcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={outcome}
                      onChange={(e) => updateArrayField('learning_outcomes', index, e.target.value)}
                      placeholder="Enter learning outcome"
                    />
                    {formData.learning_outcomes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayField('learning_outcomes', index)}
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
                  onClick={() => addArrayField('learning_outcomes')}
                  className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                >
                  + Add Learning Outcome
                </Button>
              </div>

              {/* Course Materials */}
              <div>
                <Label>Course Materials</Label>
                {formData.course_materials.map((material, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={material}
                      onChange={(e) => updateArrayField('course_materials', index, e.target.value)}
                      placeholder="Enter course material"
                    />
                    {formData.course_materials.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayField('course_materials', index)}
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
                  onClick={() => addArrayField('course_materials')}
                  className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                >
                  + Add Course Material
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="is_active">Active (visible to students)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="is_featured">Featured Course</Label>
                </div>
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
                  disabled={loading || uploadingFiles}
                >
                  {loading || uploadingFiles ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {uploadingFiles ? "Uploading..." : "Saving..."}
                    </>
                  ) : (
                    editingCourse ? "Update Course" : "Add Course"
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
