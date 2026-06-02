import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Rewards Store" };

type RewardRow = {
  id: string;
  name: string;
  description: string;
  points_cost: number;
  icon?: string;
  category: string;
  is_active: boolean;
};

type ResidentBalance = { points_balance: number };

export default async function RewardsPage() {
  const { userId } = await auth();
  const supabase = await createServerClient();

  const [residentResult, rewardsResult] = await Promise.all([
    supabase
      .from("residents")
      .select("points_balance")
      .eq("clerk_user_id", userId as string)
      .single(),
    supabase
      .from("rewards")
      .select("*")
      .eq("is_active", true)
      .order("points_cost", { ascending: true }),
  ]);

  const resident = (residentResult.data as unknown) as ResidentBalance | null;
  const rewards = (rewardsResult.data as unknown) as RewardRow[] | null;
  const balance = resident?.points_balance ?? 0;

  return (
    <div className="space-y-6">
      {/* Balance */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 bg-navy-700 border border-gold-muted rounded-full px-5 py-3">
          <span className="text-xl">⭐</span>
          <div>
            <p className="text-xl font-black text-gold-bright">{balance.toLocaleString()} pts</p>
            <p className="text-xs text-slate-400">Available to redeem</p>
          </div>
        </div>
      </div>

      {/* Rewards grid */}
      <div className="grid grid-cols-4 gap-4">
        {(rewards ?? []).map((reward) => {
          const canRedeem = balance >= reward.points_cost;
          return (
            <div
              key={reward.id}
              className="sp-card overflow-hidden hover:border-gold-muted transition-all hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
            >
              <div className="h-20 bg-navy-600 flex items-center justify-center text-4xl">
                {reward.icon ?? "🎁"}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold mb-1">{reward.name}</h3>
                <p className="text-xs text-slate-400 mb-3">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-gold-bright">
                    ⭐ {reward.points_cost.toLocaleString()}
                  </span>
                  <button
                    disabled={!canRedeem}
                    className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-gold-primary to-gold-bright text-navy-900 disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:scale-105 active:scale-95"
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
