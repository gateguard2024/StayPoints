// ─── All hardcoded demo data ────────────────────────────────────────────────
// No Supabase or Clerk required. Used exclusively by /demo/* routes.

export const DEMO_RESIDENT = {
  id: "demo-resident-1",
  display_name: "Marcus Reynolds",
  initials: "MR",
  unit_number: "4B",
  property_name: "Oakwood Residences",
  tier: "gold" as const,
  points_balance: 4820,
  lifetime_points: 12320,
  current_streak: 28,
  longest_streak: 42,
  lease_start_date: "2025-04-01",
  lease_end_date: "2026-08-01",
  months_tenancy: 14,
  community_rank: 7,
  referral_count: 3,
};

export const DEMO_ACTIVITY = [
  { id: "1", type: "earn" as const,   icon: "💰", reason: "June Rent — On Time",            points: 150,  time: "2 hours ago" },
  { id: "2", type: "earn" as const,   icon: "🎖️", reason: "Badge Unlocked: \"Regulars\"",   points: 200,  time: "Yesterday" },
  { id: "3", type: "earn" as const,   icon: "🎉", reason: "Community BBQ Attendance",       points: 75,   time: "May 30" },
  { id: "4", type: "redeem" as const, icon: "🎁", reason: "Redeemed: Amazon Gift Card",     points: 1000, time: "May 28" },
  { id: "5", type: "earn" as const,   icon: "🤝", reason: "Referral Bonus — Unit 2C Lease", points: 500,  time: "May 20" },
  { id: "6", type: "earn" as const,   icon: "📊", reason: "Monthly Survey Completed",       points: 50,   time: "May 1" },
];

export const DEMO_EARN_RULES = [
  // Recurring
  { id: "r1", event_key: "rent_on_time",     name: "On-Time Rent Payment",       description: "Paid by the 1st earns max points; paid by the 3rd earns half",   points: 150,  category: "recurring",  frequency: "monthly",       icon: "💰", completed: true  },
  { id: "r2", event_key: "survey",           name: "Monthly Satisfaction Survey", description: "2-minute survey about your living experience",                   points: 50,   category: "recurring",  frequency: "monthly",       icon: "📊", completed: false },
  { id: "r3", event_key: "maintenance_app",  name: "App Maintenance Request",    description: "Submit via app instead of text/call to earn points",              points: 25,   category: "recurring",  frequency: "per request",   icon: "📋", completed: false },
  // One-time
  { id: "o1", event_key: "lease_renewal",    name: "Lease Renewal Bonus",        description: "Renew for 12 months+ and earn a massive point bonus — renew early for 10% more!", points: 2500, category: "onetime", frequency: "one-time", icon: "🔄", completed: false, urgent: true },
  { id: "o2", event_key: "referral_signed",  name: "Resident Referral",          description: "Refer a friend who signs a lease — you both earn points",         points: 500,  category: "onetime",    frequency: "per lease",     icon: "🤝", completed: false },
  { id: "o3", event_key: "review_submitted", name: "Leave a Google Review",      description: "Honest review of the property on Google or Yelp",                 points: 300,  category: "onetime",    frequency: "per platform",  icon: "⭐", completed: false },
  // Community
  { id: "c1", event_key: "event_attendance", name: "Attend Community Events",    description: "Check in at property-hosted events (BBQs, movie nights, etc.)",   points: 75,   category: "community",  frequency: "per event",     icon: "🎉", completed: false },
  { id: "c2", event_key: "sustainability",   name: "Green Behavior Challenge",   description: "Participate in monthly sustainability challenges",                 points: 100,  category: "community",  frequency: "monthly",       icon: "♻️", completed: false },
  { id: "c3", event_key: "social_share",     name: "Share on Social Media",      description: "Post about your home using #StayPoints tag",                      points: 50,   category: "community",  frequency: "per post",      icon: "📸", completed: false },
];

export const DEMO_REWARDS = [
  { id: "rw1", name: "Amazon Gift Card",         description: "Digital code delivered instantly",               points_cost: 1000, icon: "🛒", category: "gift_card"  },
  { id: "rw2", name: "DoorDash Credit $10",      description: "$10 delivery credit",                            points_cost: 500,  icon: "🍕", category: "gift_card"  },
  { id: "rw3", name: "Movie Night Bundle",       description: "2 AMC tickets + popcorn",                        points_cost: 750,  icon: "🎬", category: "experience" },
  { id: "rw4", name: "Starbucks $15",            description: "Mobile card, instant delivery",                  points_cost: 750,  icon: "☕", category: "gift_card"  },
  { id: "rw5", name: "One Month Rent Credit",    description: "Apply points to rent — up to $500 value",        points_cost: 5000, icon: "🏠", category: "rent_credit", featured: true },
  { id: "rw6", name: "Pool Cabana for a Day",    description: "Private cabana reservation, up to 6 guests",     points_cost: 1500, icon: "🏊", category: "amenity"    },
  { id: "rw7", name: "Guest Gym Pass ×5",        description: "Bring guests to the resident fitness center",    points_cost: 400,  icon: "🏋️", category: "amenity"    },
  { id: "rw8", name: "Game Room Priority Booking", description: "Skip the waitlist for weekend booking",        points_cost: 200,  icon: "🎮", category: "amenity"    },
];

export const DEMO_LEADERBOARD = [
  { id: "lb1", display_name: "James K.",   initials: "JK", unit_number: "1A", tier: "platinum", points: 7100, rank: 1, isYou: false },
  { id: "lb2", display_name: "Sarah A.",   initials: "SA", unit_number: "2C", tier: "gold",     points: 5420, rank: 2, isYou: false },
  { id: "lb3", display_name: "Priya L.",   initials: "PL", unit_number: "3F", tier: "gold",     points: 4980, rank: 3, isYou: false },
  { id: "lb4", display_name: "Derek W.",   initials: "DW", unit_number: "5B", tier: "gold",     points: 4850, rank: 4, isYou: false },
  { id: "lb5", display_name: "Lisa M.",    initials: "LM", unit_number: "2A", tier: "silver",   points: 4820, rank: 5, isYou: false },
  { id: "lb6", display_name: "Ramon T.",   initials: "RT", unit_number: "6D", tier: "silver",   points: 4610, rank: 6, isYou: false },
  { id: "lb7", display_name: "Marcus R.",  initials: "MR", unit_number: "4B", tier: "gold",     points: 4280, rank: 7, isYou: true  },
  { id: "lb8", display_name: "Karen C.",   initials: "KC", unit_number: "7A", tier: "bronze",   points: 3980, rank: 8, isYou: false },
  { id: "lb9", display_name: "Brian O.",   initials: "BO", unit_number: "1D", tier: "bronze",   points: 3640, rank: 9, isYou: false },
  { id: "lb10", display_name: "Nina T.",   initials: "NT", unit_number: "8C", tier: "bronze",   points: 3200, rank: 10, isYou: false },
];

export const DEMO_MANAGER = {
  name: "Jordan Wells",
  initials: "JW",
  portfolio: "Oakwood Properties Group",
  stats: {
    retention_rate: 87,
    points_issued_mtd: 124000,
    active_residents: 142,
    engagement_pct: 68,
    renewals_this_quarter: 31,
  },
  properties: [
    { id: "p1", name: "Oakwood Residences", detail: "142 units · 98% occupied", retention: 92, status: "good" as const },
    { id: "p2", name: "Maple Heights",      detail: "86 units · 94% occupied",  retention: 88, status: "good" as const },
    { id: "p3", name: "River Commons",      detail: "64 units · 89% occupied",  retention: 74, status: "warn" as const },
    { id: "p4", name: "Birch Park Flats",   detail: "52 units · 81% occupied",  retention: 61, status: "bad"  as const },
  ],
  at_risk: [
    { id: "ar1", display_name: "Tom K.",   unit_number: "3B", initials: "TK", risk_reason: "Lease expires in 15 days · 0 pts this month",    severity: "high"   as const },
    { id: "ar2", display_name: "Aisha V.", unit_number: "6A", initials: "AV", risk_reason: "2 late payments · Low app engagement",           severity: "high"   as const },
    { id: "ar3", display_name: "Mark N.",  unit_number: "8D", initials: "MN", risk_reason: "Lease expires in 42 days",                       severity: "medium" as const },
    { id: "ar4", display_name: "Sofia L.", unit_number: "2E", initials: "SL", risk_reason: "No events attended · 1 open complaint",          severity: "medium" as const },
  ],
  campaigns: [
    { id: "c1", name: "Summer Renewal Bonus",        description: "+500 bonus pts for renewals signed before July 31 · 18 of 34 enrolled", icon: "🔄", status: "active" as const, end_date: "Jul 31" },
    { id: "c2", name: "Community BBQ Check-In",      description: "+100 pts for attending June 15 BBQ · 47 residents checked in",          icon: "🎉", status: "active" as const, end_date: "Jun 15" },
    { id: "c3", name: "Referral Double Points",      description: "Referral bonus doubled to 1,000 pts through June · 3 qualified so far",  icon: "🤝", status: "draft"  as const, end_date: ""       },
  ],
};

export const TIER_CONFIG = {
  bronze:   { icon: "🥉", label: "Bronze",   next: "Silver",   threshold: 2500, className: "tier-bronze"   },
  silver:   { icon: "🥈", label: "Silver",   next: "Gold",     threshold: 5000, className: "tier-silver"   },
  gold:     { icon: "🥇", label: "Gold",     next: "Platinum", threshold: 7500, className: "tier-gold"     },
  platinum: { icon: "💎", label: "Platinum", next: null,       threshold: null, className: "tier-platinum" },
};

export const EARN_CATEGORY_LABELS: Record<string, string> = {
  recurring:  "🔁 Recurring Monthly",
  onetime:    "🎯 Big One-Time Bonuses",
  community:  "🌆 Community Engagement",
  referral:   "🤝 Referrals",
};
