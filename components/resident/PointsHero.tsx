"use client";

import Link from "next/link";

interface Resident {
  display_name?: string;
  points_balance?: number;
  tier?: string;
  current_streak?: number;
}

const TIER_CONFIG = {
  bronze:   { icon: "🥉", next: "Silver",   threshold: 2500 },
  silver:   { icon: "🥈", next: "Gold",     threshold: 5000 },
  gold:     { icon: "🥇", next: "Platinum", threshold: 7500 },
  platinum: { icon: "💎", next: null,        threshold: null },
};

export default function PointsHero({ resident }: { resident: Resident | null }) {
  const name = resident?.display_name ?? "Resident";
  const points = resident?.points_balance ?? 0;
  const tier = (resident?.tier ?? "bronze") as keyof typeof TIER_CONFIG;
  const { icon: tierIcon, next, threshold } = TIER_CONFIG[tier];

  const progress = threshold ? Math.min((points / threshold) * 100, 100) : 100;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold-muted p-7"
         style={{ background: "linear-gradient(135deg,#0F2545 0%,#1A3355 50%,#0F2545 100%)" }}>
      {/* Glow orbs */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full"
           style={{ background: "radial-gradient(circle,rgba(201,153,58,0.15) 0%,transparent 70%)" }} />
      <div className="absolute -bottom-10 left-10 w-32 h-32 rounded-full"
           style={{ background: "radial-gradient(circle,rgba(240,180,41,0.08) 0%,transparent 70%)" }} />

      <div className="relative">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-slate-400">Good morning,</p>
            <p className="text-xl font-bold">{name} 👋</p>
          </div>
          <div className="flex items-center gap-2 bg-gold-primary/15 border border-gold-muted rounded-full px-4 py-1.5">
            <span className="text-lg">{tierIcon}</span>
            <span className="text-sm font-bold text-gold-bright capitalize">{tier} Tier</span>
          </div>
        </div>

        {/* Points display */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-5xl font-black text-gold-bright tracking-tight">
            {points.toLocaleString()}
          </span>
          <span className="text-base font-bold text-gold-primary">StayPoints</span>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          ≈ ${(points / 100).toFixed(2)} redemption value · Earned 320 pts this month
        </p>

        {/* Progress to next tier */}
        {next && threshold && (
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-slate-400">Progress to <strong className="text-slate-300">{next}</strong></span>
              <span className="text-xs text-gold-bright font-bold">{points.toLocaleString()} / {threshold.toLocaleString()}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex gap-3 mt-5">
          <Link href="/earn" className="btn-gold">⭐ Earn More Points</Link>
          <Link href="/rewards" className="btn-outline">🎁 Redeem Rewards</Link>
        </div>
      </div>
    </div>
  );
}
