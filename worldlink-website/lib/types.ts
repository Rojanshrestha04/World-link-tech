export interface Course {
  id: number
  title: string
  slug: string
  description: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration_weeks: number
  price: number
  instructor_name: string
  instructor_bio?: string
  max_students: number
  start_date: string
  end_date?: string
  schedule?: string
  prerequisites: string[]
  learning_outcomes: string[]
  course_materials: string[]
  curriculum: {
    title: string
    topics: string[]
  }[]
  is_active: boolean
  is_featured: boolean
  image_url: string
  syllabus_url?: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  position: string
  quote: string
  image: string
}

export interface GalleryImage {
  id: string
  title: string
  category: string
  image: string
}

export interface NewsArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  image: string
  category: string
}

export interface Resource {
  id: string
  title: string
  description: string
  file: string
  category: string
  created_at: string
}

export interface Curriculum extends Resource {
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
  approved_date?: string
  revision_date?: string
  status?: 'active' | 'draft' | 'archived' | 'under_review'
}

export interface Policy extends Resource {
  policy_type: 'admission' | 'scholarship' | 'conduct' | 'academic' | 'administrative'
  effective_date?: string
  review_date?: string
  approved_by?: string
  version?: string
}

export interface Publication extends Resource {
  publication_type: 'handbook' | 'calendar' | 'newsletter' | 'guide' | 'manual'
  version?: string
  language?: string
}

export interface Report extends Resource {
  report_type: 'annual' | 'training' | 'partnership' | 'financial' | 'performance'
  reporting_period?: string
  fiscal_year?: string
  prepared_by?: string
  approved_by?: string
}