import { DEMO_RESIDENT, DEMO_ACTIVITY, DEMO_EARN_RULES, TIER_CONFIG } from "@/lib/demo/data";

export const metadata = { title: "Dashboard" };

const T = {
  text:    "#0F1E35",
  sub:     "#56687A",
  muted:   "#8A9BB0",
  card:    "#FFFFFF",
  cardBdr: "#DDE5EF",
  bg2:     "#F4F7FB",
  divider: "#EEF2F7",
};

export default function DemoDashboardPage() {
  const { points_balance, tier, current_streak } = DEMO_RESIDENT;
  const tierCfg = TIER_CONFIG[tier];
  const progress = tierCfg.threshold
    ? Math.round((points_balance / tierCfg.threshold) * 100)
    : 100;
  const quickEarn = DEMO_EARN_RULES.filter((r) => !r.completed).slice(0, 4);

  const statCards = [
    { icon: "🔥", value: `${current_streak}`,               label: "Day Streak",        change: "↑ On-time payments",    accent: "#EA580C" },
    { icon: "📅", value: `${DEMO_RESIDENT.months_tenancy}`, label: "Months Tenancy",    change: "↑ Renewal due in 2 mo", accent: "#10B981" },
    { icon: "🏆", value: `#${DEMO_RESIDENT.community_rank}`,label: "Community Rank",    change: "↑ Up 3 spots",          accent: "#8B5CF6" },
    { icon: "🤝", value: `${DEMO_RESIDENT.referral_count}`, label: "Referrals",         change: "↑ +1,500 pts earned",   accent: "#3B82F6" },
  ];

  const DAYS = ["M","T","W","T","F","S","S"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* ── Points Hero (dark focal card on light bg) ── */}
      <div style={{
        position: "relative", overflow: "hidden", borderRadius: "16px",
        border: "1px solid rgba(201,153,58,0.3)", padding: "28px",
        background: "linear-gradient(135deg,#0F2545 0%,#1A3355 50%,#0F2545 100%)"
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,153,58,0.18) 0%,transparent 70%)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 12, color: "#94A3B8" }}>Good morning,</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#F1F5F9" }}>{DEMO_RESIDENT.display_name} 👋</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(201,153,58,0.15)", border: "1px solid rgba(201,153,58,0.3)", borderRadius: 100, padding: "6px 14px" }}>
              <span style={{ fontSize: 18 }}>{tierCfg.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#F0B429" }}>{tierCfg.label} Tier</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 52, fontWeight: 900, color: "#F0B429", letterSpacing: -2, lineHeight: 1 }}>
              {points_balance.toLocaleString()}
            </span>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#C9993A" }}>StayPoints</span>
          </div>
          <p style={{ fontSize: 12, color: "#94A3B8", marginBottom: 20 }}>
            ≈ ${(points_balance / 100).toFixed(2)} redemption value · Earned 320 pts this month
          </p>
          {tierCfg.threshold && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>Progress to <strong style={{ color: "#E2E8F0" }}>{tierCfg.next}</strong></span>
                <span style={{ fontSize: 11, color: "#F0B429", fontWeight: 700 }}>{points_balance.toLocaleString()} / {tierCfg.threshold.toLocaleString()}</span>
              </div>
              <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 100, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", borderRadius: 100, background: "linear-gradient(90deg,#C9993A,#F0B429)" }} />
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <a href="/demo/earn" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 100, fontWeight: 700, fontSize: 13, background: "linear-gradient(135deg,#C9993A,#F0B429)", color: "#060E1A", textDecoration: "none" }}>
              ⭐ Earn More Points
            </a>
            <a href="/demo/rewards" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 100, fontWeight: 700, fontSize: 13, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#CBD5E1", textDecoration: "none" }}>
              🎁 Redeem Rewards
            </a>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {statCards.map((s) => (
          <div key={s.label} style={{ background: T.card, border: `1px solid ${T.cardBdr}`, borderRadius: 12, padding: 20, borderTop: `3px solid ${s.accent}`, boxShadow: "0 1px 4px rgba(15,30,53,0.06)" }}>
            <p style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</p>
            <p style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, marginBottom: 4, color: T.text }}>{s.value}</p>
            <p style={{ fontSize: 12, color: T.sub, fontWeight: 500 }}>{s.label}</p>
            <p style={{ fontSize: 11, color: "#10B981", fontWeight: 600, marginTop: 6 }}>{s.change}</p>
          </div>
        ))}
      </div>

      {/* ── Streak + Activity ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Streak */}
        <div style={{ background: T.card, border: `1px solid ${T.cardBdr}`, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(15,30,53,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: T.text }}>🔥 Payment Streak</p>
            <span style={{ background: "rgba(16,185,129,0.12)", color: "#047857", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>{current_streak} days</span>
          </div>
          <p style={{ fontSize: 12, color: T.sub, marginBottom: 16 }}>On-time rent pays you back. Keep it up!</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {DAYS.map((d, i) => {
              const isToday = i === 4;
              const isPast = i < 4;
              return (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700,
                  border: `2px solid ${isToday ? "#F0B429" : isPast ? "#10B981" : T.cardBdr}`,
                  background: isToday ? "#F0B429" : isPast ? "#10B981" : T.bg2,
                  color: isToday ? "#060E1A" : isPast ? "white" : T.muted,
                  boxShadow: isToday ? "0 0 10px rgba(240,180,41,0.35)" : "none",
                }}>
                  {d}
                </div>
              );
            })}
          </div>
          <div style={{ background: T.bg2, borderRadius: 8, padding: 12, border: `1px solid ${T.cardBdr}` }}>
            <p style={{ fontSize: 12, color: T.sub, marginBottom: 4 }}>Next milestone</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: T.text }}>30-day streak → <span style={{ color: "#C9993A" }}>+500 bonus pts</span></p>
            <div style={{ background: T.cardBdr, borderRadius: 100, height: 4, marginTop: 8, overflow: "hidden" }}>
              <div style={{ width: "93%", height: "100%", background: "#F0B429", borderRadius: 100 }} />
            </div>
          </div>
        </div>

        {/* Activity */}
        <div style={{ background: T.card, border: `1px solid ${T.cardBdr}`, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(15,30,53,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: T.text }}>📋 Recent Activity</p>
            <span style={{ fontSize: 12, color: "#C9993A", fontWeight: 600, cursor: "pointer" }}>View all</span>
          </div>
          {DEMO_ACTIVITY.map((tx, i) => (
            <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < DEMO_ACTIVITY.length - 1 ? `1px solid ${T.divider}` : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, background: tx.type === "earn" ? "rgba(16,185,129,0.1)" : "rgba(201,153,58,0.1)" }}>
                {tx.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tx.reason}</p>
                <p style={{ fontSize: 11, color: T.muted }}>{tx.time}</p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, flexShrink: 0, color: tx.type === "earn" ? "#047857" : "#B45309" }}>
                {tx.type === "earn" ? "+" : "−"}{tx.points.toLocaleString()} pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Earn ── */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: T.text }}>⚡ Quick Earn Opportunities</p>
          <a href="/demo/earn" style={{ fontSize: 12, color: "#C9993A", fontWeight: 600, textDecoration: "none" }}>See all →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {quickEarn.map((r) => (
            <div key={r.id} style={{ background: T.card, border: `1px solid ${T.cardBdr}`, borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", cursor: "pointer", boxShadow: "0 1px 4px rgba(15,30,53,0.06)" }}>
              <span style={{ fontSize: 24, marginBottom: 10 }}>{r.icon}</span>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: T.text }}>{r.name}</p>
              <p style={{ fontSize: 11, color: T.sub, marginBottom: 12, flex: 1 }}>{r.description}</p>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#047857" }}>+{r.points} pts</p>
              <p style={{ fontSize: 10, color: T.muted }}>{r.frequency}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
