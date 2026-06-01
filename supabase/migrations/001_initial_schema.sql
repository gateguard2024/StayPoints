-- ═══════════════════════════════════════════════════════
-- StayPoints — Initial Database Schema
-- Version: 2026.1.0
-- ═══════════════════════════════════════════════════════

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── Properties ──────────────────────────────────────────
create table public.properties (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  address         text not null,
  unit_count      int  not null default 0,
  manager_clerk_user_id text not null,
  created_at      timestamptz not null default now()
);

-- ── Residents ───────────────────────────────────────────
create table public.residents (
  id                  uuid primary key default gen_random_uuid(),
  clerk_user_id       text not null unique,
  property_id         uuid not null references public.properties(id),
  unit_number         text not null,
  display_name        text not null,
  initials            text not null,
  email               text not null,
  phone               text,
  tier                text not null default 'bronze'
                        check (tier in ('bronze','silver','gold','platinum')),
  points_balance      int  not null default 0,
  lifetime_points     int  not null default 0,
  current_streak      int  not null default 0,
  longest_streak      int  not null default 0,
  lease_start_date    date not null,
  lease_end_date      date not null,
  is_at_risk          boolean not null default false,
  risk_reason         text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index idx_residents_clerk_user_id on public.residents(clerk_user_id);
create index idx_residents_property_id on public.residents(property_id);

-- ── Point Rules ─────────────────────────────────────────
create table public.point_rules (
  id          uuid primary key default gen_random_uuid(),
  event_key   text not null unique,
  name        text not null,
  description text not null,
  points      int  not null,
  category    text not null default 'recurring'
                check (category in ('recurring','onetime','community','referral')),
  frequency   text not null default 'monthly',
  icon        text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Seed default point rules
insert into public.point_rules (event_key, name, description, points, category, frequency, icon) values
  ('rent_on_time',      'On-Time Rent Payment',       'Paid by the 1st earns max points',                150, 'recurring',  'monthly',      '💰'),
  ('survey_completed',  'Monthly Satisfaction Survey', '2-minute survey about your living experience',    50,  'recurring',  'monthly',      '📊'),
  ('maintenance_app',   'App Maintenance Request',     'Submit via app instead of text/call',             25,  'recurring',  'per request',  '📋'),
  ('lease_renewal',     'Lease Renewal Bonus',         'Renew for 12 months+ and earn a big bonus',       2500,'onetime',   'one-time',     '🔄'),
  ('referral_signed',   'Resident Referral',           'Refer a friend who signs a lease',                500, 'referral',   'per lease',    '🤝'),
  ('review_submitted',  'Leave a Google Review',       'Honest review on Google or Yelp',                 300, 'onetime',    'per platform', '⭐'),
  ('event_attendance',  'Attend Community Event',      'Check in at property-hosted events',              75,  'community',  'per event',    '🎉'),
  ('sustainability',    'Green Behavior Challenge',    'Participate in monthly sustainability challenges', 100, 'community',  'monthly',      '♻️'),
  ('social_share',      'Share on Social Media',       'Post about your home using #StayPoints tag',      50,  'community',  'per post',     '📸');

-- ── Point Transactions ──────────────────────────────────
create table public.point_transactions (
  id          uuid primary key default gen_random_uuid(),
  resident_id uuid not null references public.residents(id) on delete cascade,
  points      int  not null,
  type        text not null check (type in ('earn','redeem','adjust')),
  reason      text not null,
  icon        text,
  metadata    jsonb,
  created_at  timestamptz not null default now()
);

create index idx_txn_resident_id on public.point_transactions(resident_id);
create index idx_txn_created_at  on public.point_transactions(created_at desc);

-- ── Rewards ─────────────────────────────────────────────
create table public.rewards (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text not null,
  points_cost int  not null,
  icon        text,
  category    text not null default 'gift_card'
                check (category in ('gift_card','rent_credit','amenity','experience')),
  is_active   boolean not null default true,
  stock       int,
  created_at  timestamptz not null default now()
);

insert into public.rewards (name, description, points_cost, icon, category) values
  ('Amazon Gift Card',       'Digital code delivered instantly',         1000, '🛒', 'gift_card'),
  ('DoorDash Credit $10',    '$10 delivery credit',                      500,  '🍕', 'gift_card'),
  ('Movie Night Bundle',     '2 AMC tickets + popcorn',                  750,  '🎬', 'experience'),
  ('Starbucks $15',          'Mobile card, instant delivery',            750,  '☕', 'gift_card'),
  ('One Month Rent Credit',  'Apply points directly to rent (up to $500)', 5000, '🏠', 'rent_credit'),
  ('Pool Cabana for a Day',  'Private cabana, up to 6 guests',           1500, '🏊', 'amenity'),
  ('Guest Gym Pass ×5',      'Bring guests to the fitness center',       400,  '🏋️', 'amenity'),
  ('Game Room Priority Booking', 'Skip the waitlist for weekend booking', 200, '🎮', 'amenity');

-- ── Campaigns ───────────────────────────────────────────
create table public.campaigns (
  id            uuid primary key default gen_random_uuid(),
  property_id   uuid not null references public.properties(id) on delete cascade,
  name          text not null,
  description   text,
  icon          text,
  status        text not null default 'draft'
                  check (status in ('draft','active','ended')),
  start_date    date,
  end_date      date,
  bonus_points  int  not null default 0,
  target_event  text references public.point_rules(event_key),
  created_at    timestamptz not null default now()
);

-- ── Views ───────────────────────────────────────────────

-- Monthly leaderboard
create or replace view public.leaderboard_monthly as
select
  r.id,
  r.clerk_user_id,
  r.display_name,
  r.initials,
  r.unit_number,
  r.tier,
  coalesce(sum(t.points) filter (where t.type = 'earn' and t.created_at >= date_trunc('month', now())), 0)::int as points,
  rank() over (order by coalesce(sum(t.points) filter (where t.type = 'earn' and t.created_at >= date_trunc('month', now())), 0) desc)::int as rank
from public.residents r
left join public.point_transactions t on t.resident_id = r.id
group by r.id, r.clerk_user_id, r.display_name, r.initials, r.unit_number, r.tier;

-- Portfolio stats (aggregated across all properties)
create or replace view public.portfolio_stats as
select
  round(
    count(*) filter (where lease_end_date > now() + interval '60 days')::numeric /
    nullif(count(*), 0) * 100
  )::int as retention_rate,
  coalesce(sum(t.points) filter (where t.type = 'earn' and t.created_at >= date_trunc('month', now())), 0)::int as points_issued_mtd,
  count(*)::int as active_residents,
  round(count(distinct r2.id)::numeric / nullif(count(distinct r.id), 0) * 100)::int as engagement_pct,
  0::int as renewals_this_quarter
from public.residents r
left join public.point_transactions t on t.resident_id = r.id
left join public.residents r2 on r2.id = r.id
  and exists (select 1 from public.point_transactions t2 where t2.resident_id = r2.id and t2.created_at > now() - interval '30 days');

-- ── Functions ───────────────────────────────────────────

create or replace function public.increment_points_balance(p_resident_id uuid, p_points int)
returns void language plpgsql security definer as $$
begin
  update public.residents
  set
    points_balance  = points_balance + p_points,
    lifetime_points = case when p_points > 0 then lifetime_points + p_points else lifetime_points end,
    updated_at      = now()
  where id = p_resident_id;
end;
$$;

create or replace function public.update_resident_tier(p_resident_id uuid)
returns void language plpgsql security definer as $$
declare
  v_balance int;
  v_tier text;
begin
  select points_balance into v_balance from public.residents where id = p_resident_id;

  v_tier := case
    when v_balance >= 7500 then 'platinum'
    when v_balance >= 5000 then 'gold'
    when v_balance >= 2500 then 'silver'
    else 'bronze'
  end;

  update public.residents set tier = v_tier, updated_at = now() where id = p_resident_id;
end;
$$;

-- ── RLS ─────────────────────────────────────────────────

alter table public.residents         enable row level security;
alter table public.point_transactions enable row level security;
alter table public.rewards            enable row level security;
alter table public.campaigns          enable row level security;

-- Residents can only see/edit their own row
create policy "residents_self"
  on public.residents for all
  using (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Transactions: residents see their own; service role sees all
create policy "transactions_self"
  on public.point_transactions for select
  using (
    resident_id in (
      select id from public.residents
      where clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

-- Rewards: public read, service role write
create policy "rewards_read"
  on public.rewards for select using (is_active = true);

-- Campaigns: public read for active
create policy "campaigns_read"
  on public.campaigns for select using (status = 'active');
