import { DEMO_REWARDS, DEMO_RESIDENT } from "@/lib/demo/data";

export const metadata = { title: "Rewards Store" };

const T = { text: "#0F1E35", sub: "#56687A", muted: "#8A9BB0", card: "#FFFFFF", cardBdr: "#DDE5EF", bg2: "#F4F7FB" };

const CAT_HEADER: Record<string, string> = {
  gift_card:   "linear-gradient(135deg,#EEF2F7,#E3EAF5)",
  rent_credit: "linear-gradient(135deg,#FEF9EC,#FDF0C8)",
  amenity:     "linear-gradient(135deg,#EDFAF4,#D4F1E4)",
  experience:  "linear-gradient(135deg,#F3EEFF,#E8D9FF)",
};

export default function DemoRewardsPage() {
  const balance = DEMO_RESIDENT.points_balance;
  const featured = DEMO_REWARDS.find((r) => r.featured);
  const rest = DEMO_REWARDS.filter((r) => !r.featured);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Balance + filter row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#FEF9EC", border: "1px solid #E8C96A", borderRadius: 100, padding: "10px 20px" }}>
          <span style={{ fontSize: 20 }}>⭐</span>
          <div>
            <p style={{ fontSize: 20, fontWeight: 900, color: "#B45309" }}>{balance.toLocaleString()} pts</p>
            <p style={{ fontSize: 11, color: T.sub }}>Available to redeem</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, background: T.bg2, borderRadius: 100, padding: 3, border: `1px solid ${T.cardBdr}` }}>
          {["All Rewards","Gift Cards","Rent Credits","Amenities"].map((t, i) => (
            <div key={t} style={{ padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 600, background: i === 0 ? T.card : "transparent", color: i === 0 ? T.text : T.muted, cursor: "pointer", boxShadow: i === 0 ? "0 1px 3px rgba(15,30,53,0.08)" : "none" }}>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <div style={{ background: "linear-gradient(135deg,#0F2545,#1A3355)", border: "1px solid rgba(201,153,58,0.3)", borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 48 }}>{featured.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, color: "#C9993A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>🌟 Featured Reward</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: "#F1F5F9", marginBottom: 6 }}>{featured.name}</p>
              <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 14 }}>{featured.description}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "#F0B429" }}>⭐ {featured.points_cost.toLocaleString()} pts</span>
                <button disabled style={{ padding: "6px 16px", borderRadius: 100, fontSize: 12, fontWeight: 700, background: "rgba(201,153,58,0.2)", color: "#C9993A", border: "none", cursor: "not-allowed", opacity: 0.8 }}>
                  Need {(featured.points_cost - balance).toLocaleString()} more pts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rewards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {rest.map((r) => {
          const canRedeem = balance >= r.points_cost;
          return (
            <div key={r.id} style={{ background: T.card, border: `1px solid ${T.cardBdr}`, borderRadius: 12, overflow: "hidden", cursor: "pointer", boxShadow: "0 1px 4px rgba(15,30,53,0.06)" }}>
              <div style={{ height: 80, background: CAT_HEADER[r.category] ?? T.bg2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
                {r.icon}
              </div>
              <div style={{ padding: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: T.text }}>{r.name}</p>
                <p style={{ fontSize: 11, color: T.sub, marginBottom: 12 }}>{r.description}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#B45309" }}>⭐ {r.points_cost.toLocaleString()}</span>
                  <button
                    disabled={!canRedeem}
                    style={{
                      fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 100, border: "none", cursor: canRedeem ? "pointer" : "not-allowed",
                      background: canRedeem ? "linear-gradient(135deg,#C9993A,#F0B429)" : T.bg2,
                      color: canRedeem ? "#060E1A" : T.muted,
                    }}
                  >
                    {canRedeem ? "Redeem" : "Locked"}
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
