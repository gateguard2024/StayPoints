import { DEMO_LEADERBOARD, TIER_CONFIG } from "@/lib/demo/data";

export const metadata = { title: "Leaderboard" };

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function DemoLeaderboardPage() {
  const top3 = DEMO_LEADERBOARD.slice(0, 3);
  const rest = DEMO_LEADERBOARD.slice(3);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Podium */}
      <div style={{ background: "linear-gradient(135deg,#0F2545,#1A3355)", border: "1px solid #1E3A5F", borderRadius: 16, padding: 24 }}>
        <p style={{ textAlign: "center", fontSize: 12, color: "#94A3B8", fontWeight: 600, marginBottom: 20 }}>
          🏆 June 2026 Standings — Oakwood Residences
        </p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 16, paddingBottom: 8 }}>
          {[top3[1], top3[0], top3[2]].map((entry, idx) => {
            const isFirst = idx === 1;
            const podiumH = isFirst ? 80 : idx === 0 ? 50 : 32;
            return (
              <div key={entry.id} style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontSize: isFirst ? 32 : 28, marginBottom: isFirst ? 4 : 6 }}>
                  {isFirst ? "👑" : idx === 0 ? "🥈" : "🥉"}
                </div>
                <div style={{
                  width: isFirst ? 64 : 52, height: isFirst ? 64 : 52, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: isFirst ? 18 : 14, margin: "0 auto 8px",
                  background: isFirst ? "linear-gradient(135deg,#C9993A,#F0B429)" : "#1A3355",
                  color: isFirst ? "#060E1A" : "#F1F5F9",
                  border: `${isFirst ? 3 : 2}px solid ${isFirst ? "#F0B429" : idx === 0 ? "#C0C0C0" : "#CD7F32"}`,
                  boxShadow: isFirst ? "0 0 20px rgba(201,153,58,0.5)" : "none",
                }}>
                  {entry.initials}
                </div>
                <p style={{ fontSize: isFirst ? 12 : 11, fontWeight: 700 }}>{entry.display_name}</p>
                <p style={{ fontSize: isFirst ? 16 : 13, fontWeight: 900, color: "#F0B429" }}>{entry.points.toLocaleString()} pts</p>
                <div style={{ height: podiumH, background: isFirst ? "rgba(201,153,58,0.1)" : "rgba(255,255,255,0.04)", borderRadius: "6px 6px 0 0", marginTop: 8, border: isFirst ? "1px solid rgba(201,153,58,0.2)" : "none" }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Full list */}
      <div style={{ background: "#112240", border: "1px solid #1E3A5F", borderRadius: 12, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 700 }}>Full Rankings</p>
          <span style={{ background: "rgba(16,185,129,0.15)", color: "#10B981", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
            Live
          </span>
        </div>

        {DEMO_LEADERBOARD.map((entry) => {
          const tierCfg = TIER_CONFIG[entry.tier as keyof typeof TIER_CONFIG];
          const tierColors: Record<string, { bg: string; color: string }> = {
            platinum: { bg: "rgba(139,92,246,0.2)", color: "#A78BFA" },
            gold:     { bg: "rgba(201,153,58,0.2)", color: "#F0B429" },
            silver:   { bg: "rgba(148,163,184,0.2)", color: "#CBD5E1" },
            bronze:   { bg: "rgba(205,127,50,0.2)", color: "#CD7F32" },
          };
          const tc = tierColors[entry.tier] ?? tierColors.bronze;

          return (
            <div key={entry.id} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, marginBottom: 4,
              background: entry.isYou ? "rgba(201,153,58,0.08)" : "transparent",
              border: entry.isYou ? "1px solid rgba(201,153,58,0.25)" : "1px solid transparent",
            }}>
              <div style={{ width: 28, textAlign: "center", fontSize: entry.rank <= 3 ? 18 : 13, fontWeight: 800, color: entry.rank <= 3 ? "#F0B429" : "#475569" }}>
                {MEDALS[entry.rank] ?? entry.rank}
              </div>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 13, flexShrink: 0,
                background: entry.isYou ? "linear-gradient(135deg,#8B6B25,#C9993A)" : "#1A3355",
                color: entry.isYou ? "#060E1A" : "#F1F5F9",
              }}>
                {entry.initials}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700 }}>
                  {entry.display_name}
                  {entry.isYou && <span style={{ marginLeft: 8, fontSize: 10, color: "#C9993A", fontWeight: 700 }}>← You</span>}
                </p>
                <p style={{ fontSize: 11, color: "#94A3B8" }}>Unit {entry.unit_number}</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: tc.bg, color: tc.color }}>
                {tierCfg?.label ?? entry.tier}
              </span>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#F0B429" }}>{entry.points.toLocaleString()}</p>
                <p style={{ fontSize: 10, color: "#475569" }}>pts</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tier reference */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {Object.entries(TIER_CONFIG).map(([key, cfg]) => {
          const colors: Record<string, { bg: string; border: string; color: string }> = {
            bronze:   { bg: "rgba(205,127,50,0.1)", border: "rgba(205,127,50,0.2)", color: "#CD7F32" },
            silver:   { bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.2)", color: "#CBD5E1" },
            gold:     { bg: "rgba(201,153,58,0.1)", border: "rgba(201,153,58,0.25)", color: "#F0B429" },
            platinum: { bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.2)", color: "#A78BFA" },
          };
          const c = colors[key];
          return (
            <div key={key} style={{ textAlign: "center", padding: 12, background: c.bg, borderRadius: 8, border: `1px solid ${c.border}` }}>
              <p style={{ fontSize: 24, marginBottom: 4 }}>{cfg.icon}</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: c.color }}>{cfg.label}</p>
              <p style={{ fontSize: 11, color: "#94A3B8" }}>{cfg.threshold ? `${(key === "bronze" ? 0 : (cfg.threshold === 2500 ? 0 : key === "silver" ? 2500 : key === "gold" ? 5000 : 7500)).toLocaleString()} – ${(cfg.threshold - 1).toLocaleString()} pts` : "7,500+ pts"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
