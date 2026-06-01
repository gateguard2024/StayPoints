"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEMO_RESIDENT, DEMO_MANAGER } from "@/lib/demo/data";

type Mode = "resident" | "manager";

const RESIDENT_NAV = [
  { href: "/demo/dashboard",   icon: "🏠", label: "Dashboard"      },
  { href: "/demo/earn",        icon: "⭐", label: "Ways to Earn", badge: "9" },
  { href: "/demo/rewards",     icon: "🎁", label: "Rewards Store"  },
  { href: "/demo/leaderboard", icon: "🏆", label: "Leaderboard"    },
];

const MANAGER_NAV = [
  { href: "/demo/manager",     icon: "📊", label: "Overview"    },
  { href: "/demo/manager",     icon: "👥", label: "Residents"   },
  { href: "/demo/manager",     icon: "🚀", label: "Campaigns"   },
  { href: "/demo/manager",     icon: "📈", label: "Analytics"   },
];

const PAGE_TITLES: Record<string, [string, string]> = {
  "/demo/dashboard":   ["Dashboard",     "Oakwood Residences · Unit 4B"],
  "/demo/earn":        ["Ways to Earn",  "Discover how to earn more StayPoints"],
  "/demo/rewards":     ["Rewards Store", "Redeem your StayPoints for great rewards"],
  "/demo/leaderboard": ["Leaderboard",   "Oakwood Residences · June 2026"],
  "/demo/manager":     ["Portfolio Overview", "Oakwood Properties Group"],
};

export default function DemoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>(pathname.includes("manager") ? "manager" : "resident");
  const nav = mode === "resident" ? RESIDENT_NAV : MANAGER_NAV;
  const [title, subtitle] = PAGE_TITLES[pathname] ?? ["Demo", "StayPoints Demo"];

  return (
    <div className="flex min-h-screen">
      {/* Demo banner */}
      <div className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-center gap-3 px-4 py-2"
           style={{ background: "linear-gradient(90deg,#C9993A,#F0B429)", color: "#060E1A" }}>
        <span className="text-sm font-bold">⭐ StayPoints — Interactive Demo</span>
        <span className="text-xs opacity-70">|</span>
        <span className="text-xs font-semibold opacity-80">No login required · All data is illustrative</span>
        <a href="mailto:rfeldman@gateguard.co"
           className="ml-4 text-xs font-bold underline hover:opacity-80">
          Request Access →
        </a>
      </div>

      {/* Sidebar */}
      <aside className="w-56 border-r flex flex-col fixed top-8 left-0 bottom-0 z-50"
             style={{ background: "#060E1A", borderColor: "#1E3A5F" }}>
        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: "#1E3A5F" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shadow-md"
                 style={{ background: "linear-gradient(135deg,#C9993A,#F0B429)", boxShadow: "0 4px 12px rgba(201,153,58,0.25)" }}>
              ⭐
            </div>
            <div>
              <p className="text-sm font-black text-white">StayPoints</p>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#C9993A" }}>
                {mode === "manager" ? "Manager" : "Resident"}
              </p>
            </div>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="px-3 py-3 border-b" style={{ borderColor: "#1E3A5F" }}>
          <div className="flex rounded-lg p-0.5" style={{ background: "#0A1628" }}>
            {(["resident", "manager"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-1.5 rounded-md text-xs font-bold capitalize transition-all"
                style={{
                  background: mode === m ? "#112240" : "transparent",
                  color: mode === m ? "#F1F5F9" : "#475569",
                }}
              >
                {m === "resident" ? "🏠 Resident" : "📊 Manager"}
              </button>
            ))}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: isActive ? "linear-gradient(135deg,#1A3355,#243B55)" : "transparent",
                  color: isActive ? "#F0B429" : "#94A3B8",
                }}
              >
                <span className="w-5 text-center text-base">{item.icon}</span>
                {item.label}
                {"badge" in item && item.badge && (
                  <span className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: "#C9993A", color: "#060E1A" }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User pill */}
        <div className="p-3 border-t" style={{ borderColor: "#1E3A5F" }}>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                 style={{ background: "linear-gradient(135deg,#8B6B25,#C9993A)", color: "#060E1A" }}>
              {mode === "manager" ? DEMO_MANAGER.initials : DEMO_RESIDENT.initials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-300 truncate">
                {mode === "manager" ? DEMO_MANAGER.name : DEMO_RESIDENT.display_name}
              </p>
              <p className="text-xs font-semibold" style={{ color: "#C9993A" }}>
                {mode === "manager" ? "🏢 Manager" : "🥇 Gold Tier"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-56 flex flex-col mt-8">
        {/* Topbar */}
        <header className="sticky top-8 z-40 px-7 py-3.5 flex items-center justify-between border-b"
                style={{ background: "#060E1A", borderColor: "#1E3A5F" }}>
          <div>
            <h1 className="text-base font-bold text-white">{title}</h1>
            <p className="text-xs" style={{ color: "#94A3B8" }}>{subtitle}</p>
          </div>
          {mode === "resident" && (
            <div className="flex items-center gap-2 rounded-full px-4 py-2 border"
                 style={{ background: "#112240", borderColor: "#8B6B25" }}>
              <span style={{ color: "#F0B429" }}>⭐</span>
              <span className="text-sm font-black" style={{ color: "#F0B429" }}>
                {DEMO_RESIDENT.points_balance.toLocaleString()}
              </span>
              <span className="text-xs" style={{ color: "#94A3B8" }}>pts</span>
            </div>
          )}
        </header>

        <main className="flex-1 p-7 overflow-auto" style={{ background: "#0A1628" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
