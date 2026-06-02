"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

type Mode = "resident" | "manager";

interface NavItem {
  href: string;
  icon: string;
  label: string;
  badge?: string | number;
}

const RESIDENT_NAV: NavItem[] = [
  { href: "/dashboard", icon: "🏠", label: "Dashboard" },
  { href: "/earn", icon: "⭐", label: "Ways to Earn", badge: "12" },
  { href: "/rewards", icon: "🎁", label: "Rewards Store" },
  { href: "/leaderboard", icon: "🏆", label: "Leaderboard" },
  { href: "/profile", icon: "👤", label: "Profile" },
];

const MANAGER_NAV: NavItem[] = [
  { href: "/overview", icon: "📊", label: "Overview" },
  { href: "/residents", icon: "👥", label: "Residents" },
  { href: "/campaigns", icon: "🚀", label: "Campaigns" },
  { href: "/analytics", icon: "📈", label: "Analytics" },
];

interface AppShellProps {
  mode: Mode;
  children: React.ReactNode;
}

export default function AppShell({ mode, children }: AppShellProps) {
  const pathname = usePathname();
  const nav = mode === "resident" ? RESIDENT_NAV : MANAGER_NAV;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-navy-900 border-r border-[#1E3A5F] flex flex-col fixed top-0 left-0 bottom-0 z-50">
        {/* Logo */}
        <div className="px-5 py-6 border-b border-[#1E3A5F]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center text-xl shadow-md shadow-gold-primary/20">
              ⭐
            </div>
            <div>
              <p className="text-sm font-black">StayPoints</p>
              <p className="text-xs text-gold-primary font-semibold uppercase tracking-wider">
                {mode === "manager" ? "Manager" : "Resident"}
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="text-xs text-slate-600 font-bold uppercase tracking-widest px-3 mb-2 mt-1">
            {mode === "manager" ? "Operations" : "Main"}
          </p>
          {nav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-navy-600 to-navy-500 text-gold-bright font-semibold"
                    : "text-slate-400 hover:text-slate-100 hover:bg-navy-700"
                }`}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-gold-primary text-navy-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-[#1E3A5F]">
          <div className="flex items-center gap-3 px-3 py-2">
            <UserButton />
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate text-slate-300">My Account</p>
              <p className="text-xs text-gold-primary font-semibold">
                {mode === "manager" ? "🏢 Manager" : "🥇 Gold Tier"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-56 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 bg-navy-900 border-b border-[#1E3A5F] px-7 py-3.5 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold capitalize">
              {pathname.split("/").filter(Boolean).at(-1)?.replace(/-/g, " ") ?? "Dashboard"}
            </h1>
            <p className="text-xs text-slate-400">
              {mode === "manager" ? "Oakwood Residences Portfolio" : "Oakwood Residences · Unit 4B"}
            </p>
          </div>
          {mode === "resident" && (
            <div className="flex items-center gap-2 bg-navy-700 border border-gold-muted rounded-full px-4 py-2">
              <span className="text-gold-bright">⭐</span>
              <span className="text-sm font-black text-gold-bright">4,820</span>
              <span className="text-xs text-slate-400">pts</span>
            </div>
          )}
        </header>

        <main className="flex-1 p-7 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
