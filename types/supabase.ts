export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      links: {
        Row: {
          created_at: string | null
          id: number
          original_link: string | null
          short_link: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          original_link?: string | null
          short_link?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          original_link?: string | null
          short_link?: string | null
          user_id?: string | null
        }
        Delete: {
          created_at?: string | null
          id?: number
          original_link?: string | null
          short_link?: string | null
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}