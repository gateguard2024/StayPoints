import { DEMO_REWARDS, DEMO_RESIDENT } from "@/lib/demo/data";

export const metadata = { title: "Rewards Store" };

const CAT_BG: Record<string, string> = {
  gift_card:   "linear-gradient(135deg,#1A3355,#243B55)",
  rent_credit: "linear-gradient(135deg,#1A3355,#1E3D55)",
  amenity:     "linear-gradient(135deg,#1A2F1E,#1E3D25)",
  experience:  "linear-gradient(135deg,#2D1B69,#3D2B7A)",
};

export default function DemoRewardsPage() {
  const balance = DEMO_RESIDENT.points_balance;
  const featured = DEMO_REWARDS.find((r) => r.featured);
  const rest = DEMO_REWARDS.filter((r) => !r.featured);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Balance */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#112240", border: "1px solid #8B6B25", borderRadius: 100, padding: "10px 20px" }}>
          <span style={{ fontSize: 20 }}>⭐</span>
          <div>
            <p style={{ fontSize: 20, fontWeight: 900, color: "#F0B429" }}>{balance.toLocaleString()} pts</p>
            <p style={{ fontSize: 11, color: "#94A3B8" }}>Available to redeem</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, background: "#060E1A", borderRadius: 100, padding: 3 }}>
          {["All Rewards","Gift Cards","Rent Credits","Amenities"].map((t, i) => (
            <div key={t} style={{ padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 600, background: i === 0 ? "#112240" : "transparent", color: i === 0 ? "#F1F5F9" : "#94A3B8", cursor: "pointer" }}>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <div style={{ background: "linear-gradient(135deg,#1A3355,#243B55)", border: "1px solid #8B6B25", borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 48 }}>{featured.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, color: "#C9993A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>🌟 Featured Reward</p>
              <p style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{featured.name}</p>
              <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 14 }}>{featured.description}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "#F0B429" }}>⭐ {featured.points_cost.toLocaleString()} pts</span>
                <button disabled style={{ padding: "6px 16px", borderRadius: 100, fontSize: 12, fontWeight: 700, background: "rgba(201,153,58,0.3)", color: "#F0B429", border: "none", cursor: "not-allowed", opacity: 0.7 }}>
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
            <div key={r.id} style={{ background: "#112240", border: "1px solid #1E3A5F", borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ height: 80, background: CAT_BG[r.category] ?? "#1A3355", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
                {r.icon}
              </div>
              <div style={{ padding: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{r.name}</p>
                <p style={{ fontSize: 11, color: "#94A3B8", marginBottom: 12 }}>{r.description}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#F0B429" }}>⭐ {r.points_cost.toLocaleString()}</span>
                  <button
                    disabled={!canRedeem}
                    style={{
                      fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 100, border: "none", cursor: canRedeem ? "pointer" : "not-allowed",
                      background: canRedeem ? "linear-gradient(135deg,#C9993A,#F0B429)" : "rgba(201,153,58,0.2)",
                      color: canRedeem ? "#060E1A" : "#8B6B25", opacity: canRedeem ? 1 : 0.6,
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
