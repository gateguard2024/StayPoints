import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase/server";
import PointsHero from "@/components/resident/PointsHero";
import StreakCard from "@/components/resident/StreakCard";
import ActivityFeed from "@/components/resident/ActivityFeed";
import EarnCard from "@/components/resident/EarnCard";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const { userId } = await auth();
  const supabase = createServerClient();

  // Fetch resident profile and points
  const { data: resident } = await supabase
    .from("residents")
    .select("*, point_transactions(points, reason, created_at)")
    .eq("clerk_user_id", userId)
    .single();

  // Fetch quick earn opportunities (uncompleted this month)
  const { data: earnOpps } = await supabase
    .from("point_rules")
    .select("*")
    .eq("is_active", true)
    .order("points", { ascending: false })
    .limit(4);

  return (
    <div className="space-y-6">
      <PointsHero resident={resident} />

      <div className="grid grid-cols-2 gap-4">
        <StreakCard streak={resident?.current_streak ?? 0} />
        <ActivityFeed transactions={resident?.point_transactions ?? []} />
      </div>

      {/* Quick earn opportunities */}
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
