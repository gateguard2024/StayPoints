interface PointRule {
  id: string;
  name: string;
  description: string;
  points: number;
  icon?: string;
  frequency?: string;
}

export default function EarnCard({ rule }: { rule: PointRule }) {
  return (
    <div className="sp-card p-4 hover:border-gold-muted transition-all hover:-translate-y-0.5 cursor-pointer flex flex-col">
      <span className="text-2xl mb-2.5">{rule.icon ?? "⭐"}</span>
      <p className="text-xs font-bold mb-1">{rule.name}</p>
      <p className="text-xs text-slate-400 mb-3 flex-1">{rule.description}</p>
      <div>
        <span className="text-sm font-black text-emerald-400">+{rule.points} pts</span>
        {rule.frequency && (
          <span className="text-xs text-slate-500 block">{rule.frequency}</span>
        )}
      </div>
    </div>
  );
}
