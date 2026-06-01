/**
 * Auto-generated Supabase types placeholder.
 * Run `npm run db:generate` after connecting your Supabase project
 * to replace this file with fully-typed definitions.
 */
export type Database = {
  public: {
    Tables: {
      residents: {
        Row: {
          id: string;
          clerk_user_id: string;
          property_id: string;
          unit_number: string;
          display_name: string;
          email: string;
          phone?: string;
          tier: "bronze" | "silver" | "gold" | "platinum";
          points_balance: number;
          lifetime_points: number;
          current_streak: number;
          longest_streak: number;
          lease_start_date: string;
          lease_end_date: string;
          is_at_risk: boolean;
          risk_reason?: string;
          initials: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["residents"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["residents"]["Insert"]>;
      };
      point_transactions: {
        Row: {
          id: string;
          resident_id: string;
          points: number;
          type: "earn" | "redeem" | "adjust";
          reason: string;
          icon?: string;
          metadata?: Record<string, unknown>;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["point_transactions"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["point_transactions"]["Insert"]>;
      };
      point_rules: {
        Row: {
          id: string;
          event_key: string;
          name: string;
          description: string;
          points: number;
          category: "recurring" | "onetime" | "community" | "referral";
          frequency: string;
          icon?: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["point_rules"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["point_rules"]["Insert"]>;
      };
      rewards: {
        Row: {
          id: string;
          name: string;
          description: string;
          points_cost: number;
          icon?: string;
          category: "gift_card" | "rent_credit" | "amenity" | "experience";
          is_active: boolean;
          stock?: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["rewards"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["rewards"]["Insert"]>;
      };
      properties: {
        Row: {
          id: string;
          name: string;
          address: string;
          unit_count: number;
          manager_clerk_user_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["properties"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["properties"]["Insert"]>;
      };
      campaigns: {
        Row: {
          id: string;
          property_id: string;
          name: string;
          description?: string;
          icon?: string;
          status: "draft" | "active" | "ended";
          start_date?: string;
          end_date?: string;
          bonus_points: number;
          target_event?: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["campaigns"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Insert"]>;
      };
    };
    Views: {
      leaderboard_monthly: {
        Row: {
          id: string;
          clerk_user_id: string;
          display_name: string;
          initials: string;
          unit_number: string;
          tier: string;
          points: number;
          rank: number;
        };
      };
      portfolio_stats: {
        Row: {
          retention_rate: number;
          points_issued_mtd: number;
          active_residents: number;
          engagement_pct: number;
          renewals_this_quarter: number;
        };
      };
    };
    Functions: {
      increment_points_balance: {
        Args: { p_resident_id: string; p_points: number };
        Returns: void;
      };
      update_resident_tier: {
        Args: { p_resident_id: string };
        Returns: void;
      };
    };
  };
};
