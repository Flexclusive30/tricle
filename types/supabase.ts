export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      regions: {
        Row: {
          id: number
          slug: string
          name: string
          tagline: string
          description: string
        }
        Insert: {
          id?: number
          slug: string
          name: string
          tagline: string
          description: string
        }
        Update: {
          id?: number
          slug?: string
          name?: string
          tagline?: string
          description?: string
        }
      }
      categories: {
        Row: {
          id: number
          slug: string
          name: string
          icon: string
          count: number
          description: string
        }
        Insert: {
          id?: number
          slug: string
          name: string
          icon: string
          count?: number
          description: string
        }
        Update: {
          id?: number
          slug?: string
          name?: string
          icon?: string
          count?: number
          description?: string
        }
      }
      providers: {
        Row: {
          id: number
          slug: string
          name: string
          category: string
          region: string
          location: string
          address: string
          description: string
          rating: number
          review_count: number
          price: number
          tags: string[] | null
          amenities: string[] | null
          services: string[] | null
          phone: string | null
          email: string | null
          website: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          slug: string
          name: string
          category: string
          region: string
          location: string
          address: string
          description: string
          rating: number
          review_count?: number
          price: number
          tags?: string[] | null
          amenities?: string[] | null
          services?: string[] | null
          phone?: string | null
          email?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          slug?: string
          name?: string
          category?: string
          region?: string
          location?: string
          address?: string
          description?: string
          rating?: number
          review_count?: number
          price?: number
          tags?: string[] | null
          amenities?: string[] | null
          services?: string[] | null
          phone?: string | null
          email?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: number
          slug: string
          name: string
          category: string
          region: string
          location: string
          date: string
          time: string
          description: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          slug: string
          name: string
          category: string
          region: string
          location: string
          date: string
          time: string
          description: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          slug?: string
          name?: string
          category?: string
          region?: string
          location?: string
          date?: string
          time?: string
          description?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: number
          provider_id: number
          user_id: string | null
          user_name: string
          rating: number
          comment: string
          date: string
        }
        Insert: {
          id?: number
          provider_id: number
          user_id?: string | null
          user_name: string
          rating: number
          comment: string
          date?: string
        }
        Update: {
          id?: number
          provider_id?: number
          user_id?: string | null
          user_name?: string
          rating?: number
          comment?: string
          date?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string | null
          name: string | null
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          name?: string | null
          created_at?: string
        }
      }
      saved_items: {
        Row: {
          id: number
          user_id: string
          provider_id: number
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          provider_id: number
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          provider_id?: number
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: number
          user_id: string
          provider_id: number
          booking_date: string
          booking_time: string | null
          people: number
          status: string
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          provider_id: number
          booking_date: string
          booking_time?: string | null
          people: number
          status?: string
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          provider_id?: number
          booking_date?: string
          booking_time?: string | null
          people?: number
          status?: string
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
