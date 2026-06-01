interface Resident {
  id: string;
  display_name: string;
  unit_number: string;
  risk_reason?: string;
  clerk_user_id: string;
}

export default function AtRiskList({ residents }: { residents: Resident[] }) {
  return (
    <div className="sp-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold">⚠️ At-Risk Residents</h2>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">
          {residents.length} flagged
        </span>
      </div>
      <p className="text-xs text-slate-400 mb-4">Residents with low engagement or expiring leases</p>

      <div className="space-y-2">
        {residents.length === 0 && (
          <p className="text-xs text-slate-500 text-center py-4">All clear — no at-risk residents 🎉</p>
        )}
        {residents.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-red-500/7 border border-red-500/20"
          >
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-xs font-bold text-red-400 flex-shrink-0">
              {r.display_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold">{r.display_name} · {r.unit_number}</p>
              <p className="text-xs text-slate-400 truncate">{r.risk_reason ?? "At risk"}</p>
            </div>
            <button className="text-xs text-gold-primary font-semibold hover:text-gold-bright whitespace-nowrap">
              Send Offer →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
