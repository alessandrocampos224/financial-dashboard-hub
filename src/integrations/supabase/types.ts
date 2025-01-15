export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      brands: {
        Row: {
          cover: string | null
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          status: boolean | null
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          cover?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: boolean | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          cover?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: boolean | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      carriers: {
        Row: {
          city: string | null
          created_at: string | null
          deleted_at: string | null
          district: string | null
          document: string | null
          email: string | null
          id: string
          ie: string | null
          name: string
          number: string | null
          phone: string | null
          state: string | null
          status: boolean | null
          street: string | null
          tenant_id: string | null
          updated_at: string | null
          zip: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          deleted_at?: string | null
          district?: string | null
          document?: string | null
          email?: string | null
          id?: string
          ie?: string | null
          name: string
          number?: string | null
          phone?: string | null
          state?: string | null
          status?: boolean | null
          street?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          zip?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          deleted_at?: string | null
          district?: string | null
          document?: string | null
          email?: string | null
          id?: string
          ie?: string | null
          name?: string
          number?: string | null
          phone?: string | null
          state?: string | null
          status?: boolean | null
          street?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          cover: string | null
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          status: boolean | null
          tenant_id: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          cover?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: boolean | null
          tenant_id?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          cover?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: boolean | null
          tenant_id?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          amount: number | null
          created_at: string | null
          id: string
          order_id: string | null
          product_id: string | null
          quantity: number | null
          status: boolean | null
          unitary: number | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number | null
          status?: boolean | null
          unitary?: number | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number | null
          status?: boolean | null
          unitary?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number | null
          created_at: string | null
          customer_id: string | null
          deleted_at: string | null
          description: string | null
          discount: number | null
          id: string
          interest: number | null
          invoice: string | null
          price: number | null
          status: boolean | null
          tenant_id: string | null
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          customer_id?: string | null
          deleted_at?: string | null
          description?: string | null
          discount?: number | null
          id?: string
          interest?: number | null
          invoice?: string | null
          price?: number | null
          status?: boolean | null
          tenant_id?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          customer_id?: string | null
          deleted_at?: string | null
          description?: string | null
          discount?: number | null
          id?: string
          interest?: number | null
          invoice?: string | null
          price?: number | null
          status?: boolean | null
          tenant_id?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          id: string
          tenant_id: string | null
          safe_id: string | null
          user_id: string | null
          order_id: string | null
          parcela: number | null
          amount: number | null
          discount: number | null
          affix: number | null
          price: number | null
          description: string | null
          number: string | null
          status: boolean | null
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          tenant_id?: string | null
          safe_id?: string | null
          user_id?: string | null
          order_id?: string | null
          parcela?: number | null
          amount?: number | null
          discount?: number | null
          affix?: number | null
          price?: number | null
          description?: string | null
          number?: string | null
          status?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          tenant_id?: string | null
          safe_id?: string | null
          user_id?: string | null
          order_id?: string | null
          parcela?: number | null
          amount?: number | null
          discount?: number | null
          affix?: number | null
          price?: number | null
          description?: string | null
          number?: string | null
          status?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_safe_id_fkey"
            columns: ["safe_id"]
            isOneToOne: false
            referencedRelation: "safes"
            referencedColumns: ["id"]
          }
        ]
      }
      safes: {
        Row: {
          id: string
          tenant_id: string | null
          positive: number | null
          negative: number | null
          amount: number | null
          description: string | null
          status: boolean | null
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          tenant_id?: string | null
          positive?: number | null
          negative?: number | null
          amount?: number | null
          description?: string | null
          status?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          tenant_id?: string | null
          positive?: number | null
          negative?: number | null
          amount?: number | null
          description?: string | null
          status?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
