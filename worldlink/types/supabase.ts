export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          subject: string
          inquiry_type: string
          message: string
          created_at: string
          status: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          subject: string
          inquiry_type: string
          message: string
          created_at?: string
          status?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          subject?: string
          inquiry_type?: string
          message?: string
          created_at?: string
          status?: string
        }
      }
      application_submissions: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          address: string
          date_of_birth: string
          gender: string
          education: string
          course: string
          preferred_time: string
          how_did_you_hear: string | null
          message: string | null
          created_at: string
          status: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          address: string
          date_of_birth: string
          gender: string
          education: string
          course: string
          preferred_time: string
          how_did_you_hear?: string | null
          message?: string | null
          created_at?: string
          status?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          address?: string
          date_of_birth?: string
          gender?: string
          education?: string
          course?: string
          preferred_time?: string
          how_did_you_hear?: string | null
          message?: string | null
          created_at?: string
          status?: string
        }
      }
      resources: {
        Row: {
          id: string
          title: string
          description: string
          file: string
          category: string
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          file: string
          category: string
          date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          file?: string
          category?: string
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
      publications: {
        Row: {
          id: string
          resource_id: string
          publication_type: string | null
          version: string | null
          language: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          resource_id: string
          publication_type?: string | null
          version?: string | null
          language?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          resource_id?: string
          publication_type?: string | null
          version?: string | null
          language?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      policies: {
        Row: {
          id: string
          resource_id: string
          policy_type: string | null
          effective_date: string | null
          review_date: string | null
          approved_by: string | null
          version: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          resource_id: string
          policy_type?: string | null
          effective_date?: string | null
          review_date?: string | null
          approved_by?: string | null
          version?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          resource_id?: string
          policy_type?: string | null
          effective_date?: string | null
          review_date?: string | null
          approved_by?: string | null
          version?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          resource_id: string
          report_type: string | null
          reporting_period: string | null
          fiscal_year: string | null
          prepared_by: string | null
          approved_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          resource_id: string
          report_type?: string | null
          reporting_period?: string | null
          fiscal_year?: string | null
          prepared_by?: string | null
          approved_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          resource_id?: string
          report_type?: string | null
          reporting_period?: string | null
          fiscal_year?: string | null
          prepared_by?: string | null
          approved_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      curriculums: {
        Row: {
          id: string
          resource_id: string
          occupation: string
          type: string
          developed_by: string
          curriculum_type: string
          course_category: string | null
          duration: string | null
          credit_hours: number | null
          prerequisites: string[] | null
          learning_outcomes: string[] | null
          assessment_methods: string[] | null
          approved_date: string | null
          revision_date: string | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          resource_id: string
          occupation: string
          type: string
          developed_by: string
          curriculum_type: string
          course_category?: string | null
          duration?: string | null
          credit_hours?: number | null
          prerequisites?: string[] | null
          learning_outcomes?: string[] | null
          assessment_methods?: string[] | null
          approved_date?: string | null
          revision_date?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          resource_id?: string
          occupation?: string
          type?: string
          developed_by?: string
          curriculum_type?: string
          course_category?: string | null
          duration?: string | null
          credit_hours?: number | null
          prerequisites?: string[] | null
          learning_outcomes?: string[] | null
          assessment_methods?: string[] | null
          approved_date?: string | null
          revision_date?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          category: string
          duration: string
          start_date: string
          price: number
          image: string
          featured: boolean
          prerequisites: string[] | null
          curriculum: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          category: string
          duration: string
          start_date: string
          price: number
          image: string
          featured?: boolean
          prerequisites?: string[] | null
          curriculum?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          category?: string
          duration?: string
          start_date?: string
          price?: number
          image?: string
          featured?: boolean
          prerequisites?: string[] | null
          curriculum?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      careers: {
        Row: {
          id: string
          title: string
          slug: string
          company: string
          location: string
          job_type: string
          experience_level: string
          salary_range: string | null
          description: string
          requirements: Json | null
          responsibilities: Json | null
          benefits: Json | null
          skills_required: Json | null
          application_deadline: string | null
          contact_email: string
          contact_phone: string | null
          status: string | null
          featured: boolean | null
          remote_work: boolean | null
          posted_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          company: string
          location: string
          job_type: string
          experience_level: string
          salary_range?: string | null
          description: string
          requirements?: Json | null
          responsibilities?: Json | null
          benefits?: Json | null
          skills_required?: Json | null
          application_deadline?: string | null
          contact_email: string
          contact_phone?: string | null
          status?: string | null
          featured?: boolean | null
          remote_work?: boolean | null
          posted_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          company?: string
          location?: string
          job_type?: string
          experience_level?: string
          salary_range?: string | null
          description?: string
          requirements?: Json | null
          responsibilities?: Json | null
          benefits?: Json | null
          skills_required?: Json | null
          application_deadline?: string | null
          contact_email?: string
          contact_phone?: string | null
          status?: string | null
          featured?: boolean | null
          remote_work?: boolean | null
          posted_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          inquiry_id: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          inquiry_type: string
          status: string | null
          priority: string | null
          assigned_to: string | null
          response: string | null
          responded_at: string | null
          follow_up_required: boolean | null
          follow_up_date: string | null
          source: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          inquiry_id: string
          name: string
          email: string
          phone?: string | null
          subject: string
          message: string
          inquiry_type: string
          status?: string | null
          priority?: string | null
          assigned_to?: string | null
          response?: string | null
          responded_at?: string | null
          follow_up_required?: boolean | null
          follow_up_date?: string | null
          source?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          inquiry_id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string
          message?: string
          inquiry_type?: string
          status?: string | null
          priority?: string | null
          assigned_to?: string | null
          response?: string | null
          responded_at?: string | null
          follow_up_required?: boolean | null
          follow_up_date?: string | null
          source?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      publications_view: {
        Row: {
          id: string
          title: string
          description: string
          file: string
          category: string
          date: string
          publication_type: string | null
          version: string | null
          language: string | null
          created_at: string
          updated_at: string
        }
      }
      policies_view: {
        Row: {
          id: string
          title: string
          description: string
          file: string
          category: string
          date: string
          policy_type: string | null
          effective_date: string | null
          review_date: string | null
          approved_by: string | null
          version: string | null
          created_at: string
          updated_at: string
        }
      }
      reports_view: {
        Row: {
          id: string
          title: string
          description: string
          file: string
          category: string
          date: string
          report_type: string | null
          reporting_period: string | null
          fiscal_year: string | null
          prepared_by: string | null
          approved_by: string | null
          created_at: string
          updated_at: string
        }
      }
      curriculums_view: {
        Row: {
          id: string
          title: string
          description: string
          file: string
          category: string
          date: string
          occupation: string
          type: string
          developed_by: string
          curriculum_type: string
          course_category: string | null
          duration: string | null
          credit_hours: number | null
          prerequisites: string[] | null
          learning_outcomes: string[] | null
          assessment_methods: string[] | null
          approved_date: string | null
          revision_date: string | null
          status: string | null
          created_at: string
          updated_at: string
        }
      }
    }
  }
}