import { DEMO_EARN_RULES, DEMO_RESIDENT, EARN_CATEGORY_LABELS } from "@/lib/demo/data";

export const metadata = { title: "Ways to Earn" };

type Rule = typeof DEMO_EARN_RULES[number];

function groupByCategory(rules: Rule[]) {
  return rules.reduce<Record<string, Rule[]>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});
}

const CAT_BG: Record<string, string> = {
  recurring: "rgba(16,185,129,0.1)",
  onetime: "rgba(201,153,58,0.1)",
  community: "rgba(59,130,246,0.1)",
  referral: "rgba(139,92,246,0.1)",
};

export default function DemoEarnPage() {
  const grouped = groupByCategory(DEMO_EARN_RULES);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Header stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#112240", border: "1px solid #8B6B25", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 32 }}>⭐</span>
            <div>
              <p style={{ fontSize: 11, color: "#94A3B8", marginBottom: 4 }}>Total Earned All Time</p>
              <p style={{ fontSize: 28, fontWeight: 900, color: "#F0B429" }}>{DEMO_RESIDENT.lifetime_points.toLocaleString()} pts</p>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <p style={{ fontSize: 11, color: "#94A3B8", marginBottom: 4 }}>This Month</p>
              <p style={{ fontSize: 20, fontWeight: 800, color: "#10B981" }}>+320 pts</p>
            </div>
          </div>
        </div>
        <div style={{ background: "#112240", border: "1px solid #1E3A5F", borderRadius: 12, padding: 20 }}>
          <p style={{ fontSize: 12, color: "#94A3B8", marginBottom: 10 }}>Your Badges (9/24 earned)</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 22 }}>
            🏠 💰 🌟 🤝 🔥
            <span style={{ opacity: 0.3 }}>🎖️</span>
            <span style={{ opacity: 0.3 }}>🏆</span>
            <span style={{ opacity: 0.3 }}>💎</span>
          </div>
        </div>
      </div>

      {/* Rules by category */}
      {Object.entries(grouped).map(([cat, rules]) => (
        <section key={cat}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
              {EARN_CATEGORY_LABELS[cat] ?? cat}
            </p>
            <div style={{ flex: 1, height: 1, background: "#1E3A5F" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rules.map((rule) => (
              <div key={rule.id} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "14px 16px",
                background: "#112240", border: `1px solid ${rule.urgent ? "#8B6B25" : "#1E3A5F"}`,
                borderRadius: 12, cursor: "pointer",
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, background: CAT_BG[rule.category] ?? "rgba(148,163,184,0.1)" }}>
                  {rule.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <p style={{ fontSize: 13, fontWeight: 700 }}>{rule.name}</p>
                    {rule.urgent && <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(201,153,58,0.15)", color: "#F0B429", padding: "1px 8px", borderRadius: 100 }}>⏰ Due in 2 months</span>}
                    {rule.completed && <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(16,185,129,0.15)", color: "#10B981", padding: "1px 8px", borderRadius: 100 }}>✓ Earned this month</span>}
                  </div>
                  <p style={{ fontSize: 11, color: "#94A3B8" }}>{rule.description}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: rule.urgent ? "#F0B429" : "#10B981", display: "block" }}>+{rule.points}</p>
                  <p style={{ fontSize: 10, color: "#475569" }}>{rule.frequency}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
