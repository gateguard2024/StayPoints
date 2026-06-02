import { createServerClient } from "@/lib/supabase/server";
import AtRiskList from "@/components/manager/AtRiskList";
import CampaignCard from "@/components/manager/CampaignCard";
import type { Database } from "@/types/database";

export const metadata = { title: "Portfolio Overview" };

type PortfolioStats = {
  retention_rate: number;
  points_issued_mtd: number;
  active_residents: number;
  engagement_pct: number;
  renewals_this_quarter: number;
};

type Resident = Database["public"]["Tables"]["residents"]["Row"];
type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];

export default async function ManagerOverviewPage() {
  const supabase = await createServerClient();

  const [statsResult, atRiskResult, campaignsResult] = await Promise.all([
    supabase.from("portfolio_stats").select("*").single(),
    supabase
      .from("residents")
      .select("*")
      .eq("is_at_risk", true)
      .order("lease_end_date", { ascending: true })
      .limit(5),
    supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = (statsResult.data as unknown) as PortfolioStats | null;
  const atRisk = (atRiskResult.data as unknown) as Resident[] | null;
  const campaigns = (campaignsResult.data as unknown) as Campaign[] | null;

  const statCards = [
    { icon: "🏠", value: `${stats?.retention_rate ?? 0}%`,                            label: "Retention Rate",        change: "+4% vs last year",    color: "green"  },
    { icon: "⭐", value: `${((stats?.points_issued_mtd ?? 0) / 1000).toFixed(0)}K`,   label: "Points Issued (MTD)",   change: "+12% vs last month",  color: "gold"   },
    { icon: "👥", value: `${stats?.active_residents ?? 0}`,                            label: "Active Residents",      change: `${stats?.engagement_pct ?? 0}% engagement`, color: "blue" },
    { icon: "🔄", value: `${stats?.renewals_this_quarter ?? 0}`,                       label: "Renewals This Quarter", change: "+7 vs prior quarter", color: "purple" },
  ];

  const colorMap: Record<string, string> = {
    green:  "border-t-emerald-500",
    gold:   "border-t-gold-primary",
    blue:   "border-t-blue-500",
    purple: "border-t-purple-500",
  };

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className={`sp-card p-5 border-t-2 ${colorMap[s.color]}`}>
            <p className="text-2xl mb-3">{s.icon}</p>
            <p className="text-3xl font-black mb-1">{s.value}</p>
            <p className="text-xs text-slate-400 font-medium">{s.label}</p>
            <p className="text-xs text-emerald-400 font-semibold mt-2">↑ {s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AtRiskList residents={atRisk ?? []} />

        {/* Campaigns */}
        <div className="sp-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold">🚀 Active Campaigns</h2>
            <button className="btn-gold text-xs py-1.5 px-3">+ New</button>
          </div>
          <div className="space-y-3">
            {(campaigns ?? []).map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
