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
    }
  }
}
