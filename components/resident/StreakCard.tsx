"use client";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function StreakCard({ streak }: { streak: number }) {
  const today = new Date().getDay(); // 0=Sun, 1=Mon...
  const adjustedToday = today === 0 ? 6 : today - 1; // 0=Mon

  return (
    <div className="sp-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold">🔥 Payment Streak</h2>
        <span className="pill-green">{streak} days</span>
      </div>

      <p className="text-xs text-slate-400 mb-4">On-time rent pays you back. Keep it up!</p>

      {/* Day dots */}
      <div className="flex gap-2 mb-5">
        {DAYS.map((day, i) => {
          const isPast = i < adjustedToday;
          const isToday = i === adjustedToday;
          return (
            <div
              key={`${day}-${i}`}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                isToday
                  ? "bg-gold-bright border-gold-bright text-navy-900 shadow-md shadow-gold-primary/40"
                  : isPast
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-[#1E3A5F] text-slate-600"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Next milestone */}
      <div className="bg-navy-700 rounded-lg p-3">
        <p className="text-xs text-slate-400 mb-1">Next milestone</p>
        <p className="text-sm font-bold">
          30-day streak → <span className="text-gold-bright">+500 bonus pts</span>
        </p>
        <div className="progress-bar mt-2">
          <div className="progress-fill" style={{ width: `${Math.min((streak / 30) * 100, 100)}%` }} />
        </div>
      </div>
    </div>
  );
}
