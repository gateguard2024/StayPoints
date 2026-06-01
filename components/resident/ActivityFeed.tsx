import { formatDistanceToNow } from "date-fns";

interface Transaction {
  id: string;
  points: number;
  reason: string;
  type: "earn" | "redeem";
  created_at: string;
  icon?: string;
}

export default function ActivityFeed({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="sp-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold">📋 Recent Activity</h2>
        <span className="text-xs text-gold-primary font-semibold cursor-pointer hover:text-gold-bright">
          View all
        </span>
      </div>

      <div className="divide-y divide-[#1E3A5F]">
        {transactions.length === 0 && (
          <p className="text-xs text-slate-500 py-4 text-center">No activity yet — start earning!</p>
        )}
        {transactions.map((tx) => {
          const isEarn = tx.type === "earn";
          return (
            <div key={tx.id} className="flex items-center gap-3 py-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 ${
                  isEarn ? "bg-emerald-500/15" : "bg-gold-primary/15"
                }`}
              >
                {tx.icon ?? (isEarn ? "💰" : "🎁")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">{tx.reason}</p>
                <p className="text-xs text-slate-500">
                  {formatDistanceToNow(new Date(tx.created_at), { addSuffix: true })}
                </p>
              </div>
              <span
                className={`text-sm font-bold flex-shrink-0 ${
                  isEarn ? "text-emerald-400" : "text-gold-primary"
                }`}
              >
                {isEarn ? "+" : "−"}{Math.abs(tx.points)} pts
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
