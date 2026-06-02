import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Leaderboard" };

const TIER_STYLES: Record<string, string> = {
  platinum: "tier-platinum",
  gold: "tier-gold",
  silver: "tier-silver",
  bronze: "tier-bronze",
};

const RANK_MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

type LeaderboardEntry = {
  id: string;
  clerk_user_id: string;
  display_name: string;
  initials: string;
  unit_number: string;
  tier: string;
  points: number;
  rank: number;
};

export default async function LeaderboardPage() {
  const { userId } = await auth();
  const supabase = await createServerClient();

  const { data: raw } = await supabase
    .from("leaderboard_monthly")
    .select("*")
    .order("rank", { ascending: true })
    .limit(25);

  const leaderboard = (raw as unknown) as LeaderboardEntry[] | null;
  const myEntry = leaderboard?.find((r) => r.clerk_user_id === userId);

  return (
    <div className="space-y-6">
      {/* Podium */}
      {leaderboard && leaderboard.length >= 3 && (
        <div className="sp-card p-6" style={{ background: "linear-gradient(135deg,#0F2545,#1A3355)" }}>
          <p className="text-center text-xs text-slate-400 font-semibold mb-5">
            🏆 This Month&apos;s Top Residents
          </p>
          <div className="flex items-end justify-center gap-4 px-8">
            {/* 2nd */}
            <div className="text-center flex-1">
              <div className="text-3xl mb-2">🥈</div>
              <div className="w-12 h-12 rounded-full bg-navy-600 flex items-center justify-center font-bold text-sm mx-auto mb-2 border-2 border-slate-400">
                {leaderboard[1].initials}
              </div>
              <p className="text-xs font-bold">{leaderboard[1].display_name}</p>
              <p className="text-sm font-black text-gold-bright">{leaderboard[1].points.toLocaleString()} pts</p>
              <div className="h-12 bg-white/5 rounded-t-md mt-2" />
            </div>
            {/* 1st */}
            <div className="text-center flex-1">
              <div className="text-4xl mb-1">👑</div>
              <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center font-black text-navy-900 text-lg mx-auto mb-2 border-2 border-gold-bright shadow-lg shadow-gold-primary/40">
                {leaderboard[0].initials}
              </div>
              <p className="text-xs font-bold">{leaderboard[0].display_name}</p>
              <p className="text-base font-black text-gold-bright">{leaderboard[0].points.toLocaleString()} pts</p>
              <div className="h-20 bg-gold-primary/10 rounded-t-md mt-2 border border-gold-primary/20" />
            </div>
            {/* 3rd */}
            <div className="text-center flex-1">
              <div className="text-3xl mb-2">🥉</div>
              <div className="w-12 h-12 rounded-full bg-navy-600 flex items-center justify-center font-bold text-sm mx-auto mb-2 border-2 border-amber-700">
                {leaderboard[2].initials}
              </div>
              <p className="text-xs font-bold">{leaderboard[2].display_name}</p>
              <p className="text-sm font-black text-gold-bright">{leaderboard[2].points.toLocaleString()} pts</p>
              <div className="h-8 bg-white/5 rounded-t-md mt-2" />
            </div>
          </div>
        </div>
      )}

      {/* Full list */}
      <div className="sp-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold">Full Rankings</h2>
          <span className="pill-green flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live
          </span>
        </div>

        <div className="space-y-1">
          {(leaderboard ?? []).map((entry) => {
            const isYou = entry.clerk_user_id === userId;
            const medal = RANK_MEDALS[entry.rank];

            return (
              <div
                key={entry.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isYou
                    ? "bg-gold-primary/8 border border-gold-primary/25"
                    : "hover:bg-navy-700"
                }`}
              >
                <div className="w-8 text-center text-lg">
                  {medal ?? <span className="text-sm font-bold text-slate-500">{entry.rank}</span>}
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: isYou ? "linear-gradient(135deg,#8B6B25,#C9993A)" : "#1A3355" }}
                >
                  {entry.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">
                    {entry.display_name}
                    {isYou && (
                      <span className="ml-2 text-xs text-gold-primary font-bold">← You</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400">{entry.unit_number}</p>
                </div>
                <span className={TIER_STYLES[entry.tier] ?? "tier-bronze"}>
                  {entry.tier}
                </span>
                <div className="text-right">
                  <span className="text-sm font-black text-gold-bright">{entry.points.toLocaleString()}</span>
                  <span className="text-xs text-slate-500 block">pts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
