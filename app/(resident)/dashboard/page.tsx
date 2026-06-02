import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase/server";
import PointsHero from "@/components/resident/PointsHero";
import StreakCard from "@/components/resident/StreakCard";
import ActivityFeed from "@/components/resident/ActivityFeed";
import EarnCard from "@/components/resident/EarnCard";

export const metadata = { title: "Dashboard" };

type ResidentRow = {
  id: string;
  display_name: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  points_balance: number;
  current_streak: number;
  point_transactions: Array<{ points: number; reason: string; created_at: string }>;
};

type PointRule = {
  id: string;
  name: string;
  description: string;
  points: number;
  icon?: string;
  frequency?: string;
};

export default async function DashboardPage() {
  const { userId } = await auth();
  const supabase = await createServerClient();

  const [residentResult, earnResult] = await Promise.all([
    supabase
      .from("residents")
      .select("*, point_transactions(points, reason, created_at)")
      .eq("clerk_user_id", userId as string)
      .single(),
    supabase
      .from("point_rules")
      .select("*")
      .eq("is_active", true)
      .order("points", { ascending: false })
      .limit(4),
  ]);

  const resident = (residentResult.data as unknown) as ResidentRow | null;
  const earnOpps = (earnResult.data as unknown) as PointRule[] | null;

  return (
    <div className="space-y-6">
      <PointsHero resident={resident} />

      <div className="grid grid-cols-2 gap-4">
        <StreakCard streak={resident?.current_streak ?? 0} />
        <ActivityFeed transactions={(resident?.point_transactions ?? []) as any} />
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold">⚡ Quick Earn Opportunities</h2>
          <a href="/earn" className="text-xs text-gold-primary font-semibold hover:text-gold-bright">
            See all →
          </a>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {(earnOpps ?? []).map((opp) => (
            <EarnCard key={opp.id} rule={opp} />
          ))}
        </div>
      </section>
    </div>
  );
}
