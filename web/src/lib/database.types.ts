// สร้างอัตโนมัติจาก Supabase (generate_typescript_types) — อย่าแก้มือ สร้างใหม่หลังเปลี่ยน schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      album_photos: {
        Row: {
          album_id: number
          caption: string
          created_at: string
          id: number
          sort_order: number
          src: string
        }
        Insert: {
          album_id: number
          caption?: string
          created_at?: string
          id?: never
          sort_order?: number
          src: string
        }
        Update: {
          album_id?: number
          caption?: string
          created_at?: string
          id?: never
          sort_order?: number
          src?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_photos_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      albums: {
        Row: {
          category: string
          created_at: string
          id: number
          is_published: boolean
          place: string | null
          place_icon: string | null
          slug: string
          sort_order: number
          taken_on: string | null
          taken_precision: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: never
          is_published?: boolean
          place?: string | null
          place_icon?: string | null
          slug: string
          sort_order?: number
          taken_on?: string | null
          taken_precision?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: never
          is_published?: boolean
          place?: string | null
          place_icon?: string | null
          slug?: string
          sort_order?: number
          taken_on?: string | null
          taken_precision?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: number
          message: string
          name: string
          org: string | null
          province: string | null
          tel: string | null
          topic: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: never
          message: string
          name: string
          org?: string | null
          province?: string | null
          tel?: string | null
          topic: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: never
          message?: string
          name?: string
          org?: string | null
          province?: string | null
          tel?: string | null
          topic?: string
        }
        Relationships: []
      }
      glossary_terms: {
        Row: {
          abbr: string
          created_at: string
          definition: string
          full_name: string
          groups: string[]
          id: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          abbr: string
          created_at?: string
          definition: string
          full_name: string
          groups?: string[]
          id?: never
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          abbr?: string
          created_at?: string
          definition?: string
          full_name?: string
          groups?: string[]
          id?: never
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      libraries: {
        Row: {
          created_at: string
          id: number
          no: number | null
          opened_year_be: number
          province: string
          region: string
          school: string
          tel: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: never
          no?: number | null
          opened_year_be: number
          province: string
          region: string
          school?: string
          tel?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: never
          no?: number | null
          opened_year_be?: number
          province?: string
          region?: string
          school?: string
          tel?: string
          updated_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          audience: string | null
          body_html: string | null
          categories: string[]
          ceremony_on: string | null
          ceremony_precision: string | null
          cover: string | null
          created_at: string
          excerpt: string | null
          gallery: string[]
          icon: string | null
          id: number
          is_published: boolean
          is_sample: boolean
          library_no: number | null
          news_category: string | null
          province: string | null
          published_on: string
          published_precision: string
          reading_minutes: number | null
          related_terms: string[]
          school: string | null
          slug: string
          title: string
          tone: string | null
          type: string
          updated_at: string
          views: number
        }
        Insert: {
          audience?: string | null
          body_html?: string | null
          categories?: string[]
          ceremony_on?: string | null
          ceremony_precision?: string | null
          cover?: string | null
          created_at?: string
          excerpt?: string | null
          gallery?: string[]
          icon?: string | null
          id?: never
          is_published?: boolean
          is_sample?: boolean
          library_no?: number | null
          news_category?: string | null
          province?: string | null
          published_on: string
          published_precision?: string
          reading_minutes?: number | null
          related_terms?: string[]
          school?: string | null
          slug: string
          title: string
          tone?: string | null
          type: string
          updated_at?: string
          views?: number
        }
        Update: {
          audience?: string | null
          body_html?: string | null
          categories?: string[]
          ceremony_on?: string | null
          ceremony_precision?: string | null
          cover?: string | null
          created_at?: string
          excerpt?: string | null
          gallery?: string[]
          icon?: string | null
          id?: never
          is_published?: boolean
          is_sample?: boolean
          library_no?: number | null
          news_category?: string | null
          province?: string | null
          published_on?: string
          published_precision?: string
          reading_minutes?: number | null
          related_terms?: string[]
          school?: string | null
          slug?: string
          title?: string
          tone?: string | null
          type?: string
          updated_at?: string
          views?: number
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
