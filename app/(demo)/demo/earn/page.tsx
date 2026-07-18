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

const T = { text: "#0F1E35", sub: "#56687A", muted: "#8A9BB0", card: "#FFFFFF", cardBdr: "#DDE5EF", bg2: "#F4F7FB" };

const CAT_BG: Record<string, string> = {
  recurring: "rgba(16,185,129,0.1)",
  onetime:   "rgba(201,153,58,0.1)",
  community: "rgba(59,130,246,0.1)",
  referral:  "rgba(139,92,246,0.1)",
};

export default function DemoEarnPage() {
  const grouped = groupByCategory(DEMO_EARN_RULES);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Header stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: T.card, border: `1px solid #E8C96A`, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(15,30,53,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 32 }}>⭐</span>
            <div>
              <p style={{ fontSize: 11, color: T.sub, marginBottom: 4 }}>Total Earned All Time</p>
              <p style={{ fontSize: 28, fontWeight: 900, color: "#B45309" }}>{DEMO_RESIDENT.lifetime_points.toLocaleString()} pts</p>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <p style={{ fontSize: 11, color: T.sub, marginBottom: 4 }}>This Month</p>
              <p style={{ fontSize: 20, fontWeight: 800, color: "#047857" }}>+320 pts</p>
            </div>
          </div>
        </div>
        <div style={{ background: T.card, border: `1px solid ${T.cardBdr}`, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(15,30,53,0.06)" }}>
          <p style={{ fontSize: 12, color: T.sub, marginBottom: 10 }}>Your Badges (9/24 earned)</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 22 }}>
            🏠 💰 🌟 🤝 🔥
            <span style={{ opacity: 0.25 }}>🎖️</span>
            <span style={{ opacity: 0.25 }}>🏆</span>
            <span style={{ opacity: 0.25 }}>💎</span>
          </div>
        </div>
      </div>

      {/* Rules by category */}
      {Object.entries(grouped).map(([cat, rules]) => (
        <section key={cat}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
              {EARN_CATEGORY_LABELS[cat] ?? cat}
            </p>
            <div style={{ flex: 1, height: 1, background: T.cardBdr }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rules.map((rule) => (
              <div key={rule.id} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "14px 16px",
                background: T.card, border: `1px solid ${rule.urgent ? "#E8C96A" : T.cardBdr}`,
                borderRadius: 12, cursor: "pointer", boxShadow: "0 1px 3px rgba(15,30,53,0.05)",
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, background: CAT_BG[rule.category] ?? "rgba(148,163,184,0.1)" }}>
                  {rule.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{rule.name}</p>
                    {rule.urgent && <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(201,153,58,0.12)", color: "#B45309", padding: "1px 8px", borderRadius: 100 }}>⏰ Due in 2 months</span>}
                    {rule.completed && <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(16,185,129,0.12)", color: "#047857", padding: "1px 8px", borderRadius: 100 }}>✓ Earned this month</span>}
                  </div>
                  <p style={{ fontSize: 11, color: T.sub }}>{rule.description}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: rule.urgent ? "#B45309" : "#047857", display: "block" }}>+{rule.points}</p>
                  <p style={{ fontSize: 10, color: T.muted }}>{rule.frequency}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
