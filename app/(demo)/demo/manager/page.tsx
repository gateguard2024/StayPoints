import { DEMO_MANAGER } from "@/lib/demo/data";

export const metadata = { title: "Portfolio Overview" };

const T = { text: "#0F1E35", sub: "#56687A", muted: "#8A9BB0", card: "#FFFFFF", cardBdr: "#DDE5EF", bg2: "#F4F7FB" };

export default function DemoManagerPage() {
  const { stats, properties, at_risk, campaigns } = DEMO_MANAGER;

  const statCards = [
    { icon: "🏠", value: `${stats.retention_rate}%`,                          label: "Retention Rate",         change: "+4% vs last year",    accent: "#10B981" },
    { icon: "⭐", value: `${(stats.points_issued_mtd / 1000).toFixed(0)}K`,   label: "Points Issued (MTD)",    change: "+12% vs last month",  accent: "#C9993A" },
    { icon: "👥", value: `${stats.active_residents}`,                          label: "Active Residents",       change: `${stats.engagement_pct}% engagement`, accent: "#3B82F6" },
    { icon: "🔄", value: `${stats.renewals_this_quarter}`,                     label: "Renewals This Quarter",  change: "+7 vs prior quarter", accent: "#8B5CF6" },
  ];

  const retentionColors: Record<string, string> = { good: "#047857", warn: "#B45309", bad: "#B91C1C" };
  const riskColors: Record<string, { bg: string; border: string; color: string }> = {
    high:   { bg: "rgba(239,68,68,0.06)",   border: "rgba(239,68,68,0.18)",   color: "#B91C1C" },
    medium: { bg: "rgba(245,158,11,0.06)",  border: "rgba(245,158,11,0.18)",  color: "#B45309" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Manager tag */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "4px 12px", width: "fit-content" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#1D4ED8" }}>📊 Property Manager View · {DEMO_MANAGER.portfolio}</span>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {statCards.map((s) => (
          <div key={s.label} style={{ background: T.card, border: `1px solid ${T.cardBdr}`, borderTop: `3px solid ${s.accent}`, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(15,30,53,0.06)" }}>
            <p style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</p>
            <p style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, marginBottom: 4, color: T.text }}>{s.value}</p>
            <p style={{ fontSize: 12, color: T.sub, fontWeight: 500 }}>{s.label}</p>
            <p style={{ fontSize: 11, color: "#047857", fontWeight: 600, marginTop: 6 }}>↑ {s.change}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Properties */}
        <div style={{ background: T.card, border: `1px solid ${T.cardBdr}`, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(15,30,53,0.06)" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 16 }}>🏢 Properties Overview</p>
          {properties.map((p, i) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < properties.length - 1 ? `1px solid ${T.cardBdr}` : "none" }}>
              <span style={{ fontSize: 20 }}>🏢</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{p.name}</p>
                <p style={{ fontSize: 11, color: T.sub }}>{p.detail}</p>
              </div>
              <span style={{ fontSize: 15, fontWeight: 800, color: retentionColors[p.status] }}>{p.retention}%</span>
            </div>
          ))}
        </div>

        {/* At-risk */}
        <div style={{ background: T.card, border: `1px solid ${T.cardBdr}`, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(15,30,53,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: T.text }}>⚠️ At-Risk Residents</p>
            <span style={{ background: "rgba(239,68,68,0.1)", color: "#B91C1C", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>{at_risk.length} flagged</span>
          </div>
          <p style={{ fontSize: 11, color: T.sub, marginBottom: 14 }}>Residents with low engagement or expiring leases</p>
          {at_risk.map((r) => {
            const rc = riskColors[r.severity];
            return (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: rc.bg, border: `1px solid ${rc.border}`, borderRadius: 8, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: T.card, color: rc.color, border: `1px solid ${rc.border}`, flexShrink: 0 }}>
                  {r.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{r.display_name} · {r.unit_number}</p>
                  <p style={{ fontSize: 10, color: T.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.risk_reason}</p>
                </div>
                <span style={{ fontSize: 11, color: "#B45309", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                  {r.severity === "high" ? "Send Offer →" : "Remind →"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campaigns */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: T.text }}>🚀 Active Campaigns</p>
          <button style={{ padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 700, background: "linear-gradient(135deg,#C9993A,#F0B429)", color: "#060E1A", border: "none", cursor: "pointer" }}>
            + New Campaign
          </button>
        </div>
        {campaigns.map((c) => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, background: T.card, border: `1px solid ${T.cardBdr}`, borderRadius: 12, marginBottom: 10, boxShadow: "0 1px 3px rgba(15,30,53,0.05)" }}>
            <span style={{ fontSize: 24 }}>{c.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{c.name}</p>
              <p style={{ fontSize: 11, color: T.sub }}>{c.description}</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100,
                background: c.status === "active" ? "rgba(16,185,129,0.1)" : T.bg2,
                color: c.status === "active" ? "#047857" : T.muted,
              }}>
                {c.status === "active" ? "● Active" : "● Draft"}
              </span>
              {c.end_date && <p style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>Ends {c.end_date}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
