import { createServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Ways to Earn" };

type PointRule = {
  id: string;
  name: string;
  description: string;
  points: number;
  category: string;
  frequency: string;
  is_active: boolean;
  icon?: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  recurring:  "🔁 Recurring Monthly",
  onetime:    "🎯 Big One-Time Bonuses",
  community:  "🌆 Community Engagement",
  referral:   "🤝 Referrals",
};

export default async function EarnPage() {
  const supabase = createServerClient();

  const { data: raw } = await supabase
    .from("point_rules")
    .select("*")
    .eq("is_active", true)
    .order("points", { ascending: false });

  const rules = (raw as unknown) as PointRule[] | null;

  const grouped = (rules ?? []).reduce<Record<string, PointRule[]>>((acc, rule) => {
    const cat = rule.category ?? "recurring";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(rule);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Header stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="sp-card p-5 border-gold-muted">
          <div className="flex items-center gap-4">
            <span className="text-4xl">⭐</span>
            <div>
              <p className="text-xs text-slate-400 mb-1">Total Earned All Time</p>
              <p className="text-3xl font-black text-gold-bright">12,320 pts</p>
            </div>
          </div>
        </div>
        <div className="sp-card p-5">
          <p className="text-xs text-slate-400 mb-3">Your Badges</p>
          <div className="flex gap-2 flex-wrap text-2xl">
            🏠 💰 🌟 🤝 🔥
            <span className="opacity-30">🎖️</span>
            <span className="opacity-30">🏆</span>
          </div>
        </div>
      </div>

      {/* Rules by category */}
      {Object.entries(grouped).map(([category, categoryRules]) => (
        <section key={category}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {CATEGORY_LABELS[category] ?? category}
            </h2>
            <div className="flex-1 h-px bg-[#1E3A5F]" />
          </div>

          <div className="space-y-2">
            {categoryRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center gap-4 p-4 sp-card hover:border-gold-muted transition-colors cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {rule.icon ?? "⭐"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{rule.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{rule.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-emerald-400 block">
                    +{rule.points}
                  </span>
                  <span className="text-xs text-slate-500">{rule.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
