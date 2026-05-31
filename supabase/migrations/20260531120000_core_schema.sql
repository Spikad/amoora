-- ============================================================================
-- Amoora — core schema: leads, onboarding_submissions, admins
-- Lock-down RLS: NO anonymous access to any table. Public form writes go
-- through Edge Functions using the service role (which bypasses RLS).
-- Authenticated reads/updates are restricted to users listed in `admins`.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- leads
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  source          text not null check (source in ('contact_form','email_cta','calculator','newsletter')),
  name            text,
  email           text,
  phone           text,
  restaurant_name text,
  city            text,
  plan_interest   text,
  message         text,
  status          text not null default 'new' check (status in ('new','contacted','booked','won','lost')),
  notes           text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);
create index if not exists leads_source_idx      on public.leads (source);

-- ---------------------------------------------------------------------------
-- onboarding_submissions
-- ---------------------------------------------------------------------------
create table if not exists public.onboarding_submissions (
  id                       uuid primary key default gen_random_uuid(),
  created_at               timestamptz not null default now(),
  status                   text not null default 'received' check (status in ('received','in_progress','live')),

  -- A. Restaurant
  restaurant_name          text,
  org_nr                   text,
  contact_person           text,
  contact_role             text,
  email                    text,
  phone                    text,
  address                  text,
  postal_code              text,
  city                     text,
  plan                     text,
  addons                   jsonb default '[]'::jsonb,

  -- B. Brand
  logo_url                 text,
  brand_color              text,
  use_default_colors       boolean default false,
  photo_urls               jsonb default '[]'::jsonb,
  brand_notes              text,

  -- C. Domain & online
  domain_choice            text,            -- 'own' | 'subdomain'
  domain_value             text,
  existing_web             text,
  social                   jsonb default '{}'::jsonb,  -- {instagram, facebook, tiktok}

  -- D. Menu
  menu_link                text,
  menu_urls                jsonb default '[]'::jsonb,
  menu_notes               text,

  -- E. Operations
  opening_hours            jsonb default '{}'::jsonb,  -- {mon:"…", ...}
  offer_pickup             boolean default false,
  offer_delivery           boolean default false,
  delivery_radius          text,
  vat_handling             text,
  terminal_delivery_address text,

  -- F. Payment
  has_stripe               text,            -- 'yes' | 'no' | 'setup_for_me'
  klarna_interest          boolean default false,
  payout_notes             text,

  -- G. Other
  other                    text
);

create index if not exists onboarding_created_at_idx on public.onboarding_submissions (created_at desc);
create index if not exists onboarding_status_idx     on public.onboarding_submissions (status);

-- ---------------------------------------------------------------------------
-- admins — allowlist for the dashboard. id == auth.users.id
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.leads                  enable row level security;
alter table public.onboarding_submissions enable row level security;
alter table public.admins                 enable row level security;

-- admins: an authenticated user may read ONLY their own admin row.
-- (This row is what the policies below use to decide admin-ness.)
drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row"
  on public.admins
  for select
  to authenticated
  using ( id = (select auth.uid()) );

-- leads: admin-only select + update. No insert/delete for anon/authenticated.
drop policy if exists "leads admin select" on public.leads;
create policy "leads admin select"
  on public.leads
  for select
  to authenticated
  using ( exists (select 1 from public.admins a where a.id = (select auth.uid())) );

drop policy if exists "leads admin update" on public.leads;
create policy "leads admin update"
  on public.leads
  for update
  to authenticated
  using      ( exists (select 1 from public.admins a where a.id = (select auth.uid())) )
  with check ( exists (select 1 from public.admins a where a.id = (select auth.uid())) );

-- onboarding_submissions: admin-only select + update.
drop policy if exists "onboarding admin select" on public.onboarding_submissions;
create policy "onboarding admin select"
  on public.onboarding_submissions
  for select
  to authenticated
  using ( exists (select 1 from public.admins a where a.id = (select auth.uid())) );

drop policy if exists "onboarding admin update" on public.onboarding_submissions;
create policy "onboarding admin update"
  on public.onboarding_submissions
  for update
  to authenticated
  using      ( exists (select 1 from public.admins a where a.id = (select auth.uid())) )
  with check ( exists (select 1 from public.admins a where a.id = (select auth.uid())) );

-- ============================================================================
-- Data API grants — expose to `authenticated` only (NEVER `anon`).
-- The anon role gets NO table privileges; public writes go via Edge Functions.
-- ============================================================================
revoke all on public.leads                  from anon;
revoke all on public.onboarding_submissions from anon;
revoke all on public.admins                 from anon;

grant select, update on public.leads                  to authenticated;
grant select, update on public.onboarding_submissions to authenticated;
grant select          on public.admins                 to authenticated;
