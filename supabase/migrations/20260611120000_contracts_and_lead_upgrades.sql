-- Contracts (digital signing) + lead upgrades (comments, manual leads) + realtime.
-- Public writes (sign flow) go through edge functions with the service role.
-- Admin reads/writes are RLS-gated via the public.admins allowlist (same pattern
-- as core_schema.sql). All statements idempotent.

-- ============================================================ contracts =====
create table if not exists public.contracts (
  id                              uuid primary key default gen_random_uuid(),
  created_at                      timestamptz not null default now(),
  lead_id                         uuid references public.leads (id) on delete set null,
  created_by                      text,                       -- admin email (closer)
  restaurant_name                 text,
  contact_name                    text,
  contact_email                   text,
  org_nr                          text,
  plan                            text check (plan in ('basic','growth','premium')),
  addons                          jsonb not null default '[]'::jsonb,
  setup_fee_ex_moms               numeric(12,2),
  monthly_fee_ex_moms             numeric(12,2) not null default 549,
  installments                    int not null default 1 check (installments in (1,2,3)),
  admin_fee_per_installment_ex_moms numeric(12,2) not null default 1000,
  payment_terms                   text check (payment_terms in ('bankgiro_14','bankgiro_7','klarna_7')),
  totals                          jsonb not null default '{}'::jsonb,   -- computed breakdown
  status                          text not null default 'sent'
                                    check (status in ('sent','viewed','signed','cancelled')),
  sign_token                      text not null unique,        -- random, unguessable
  sent_at                         timestamptz not null default now(),
  viewed_at                       timestamptz,
  signed_at                       timestamptz,
  signer_name                     text,
  signer_personnummer             text,                        -- SENSITIVE: never expose except signed PDF + admin detail
  signed_pdf_url                  text,                        -- storage path in private 'contracts' bucket
  onboarding_link_sent_at         timestamptz
);

create index if not exists contracts_created_at_idx on public.contracts (created_at desc);
create index if not exists contracts_status_idx     on public.contracts (status);
create index if not exists contracts_lead_id_idx    on public.contracts (lead_id);

-- ======================================================== lead_comments =====
create table if not exists public.lead_comments (
  id           uuid primary key default gen_random_uuid(),
  lead_id      uuid not null references public.leads (id) on delete cascade,
  created_at   timestamptz not null default now(),
  author_email text,
  body         text not null
);

create index if not exists lead_comments_lead_id_idx    on public.lead_comments (lead_id);
create index if not exists lead_comments_created_at_idx on public.lead_comments (created_at desc);

-- ========================================== leads: manual source + insert ===
-- Allow manually-added leads (admin '+' button) alongside the form sources.
alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads add  constraint leads_source_check
  check (source in ('contact_form','email_cta','calculator','newsletter','manual'));

-- =================================================================== RLS =====
alter table public.contracts     enable row level security;
alter table public.lead_comments enable row level security;

-- contracts: admins read + update (status changes/cancel). Inserts come from the
-- send-contract edge function via the service role, so no insert policy here.
drop policy if exists "contracts admin select" on public.contracts;
create policy "contracts admin select"
  on public.contracts
  for select
  to authenticated
  using ( exists (select 1 from public.admins a where a.id = (select auth.uid())) );

drop policy if exists "contracts admin update" on public.contracts;
create policy "contracts admin update"
  on public.contracts
  for update
  to authenticated
  using      ( exists (select 1 from public.admins a where a.id = (select auth.uid())) )
  with check ( exists (select 1 from public.admins a where a.id = (select auth.uid())) );

-- lead_comments: admins read + insert (added directly from the dashboard).
drop policy if exists "lead_comments admin select" on public.lead_comments;
create policy "lead_comments admin select"
  on public.lead_comments
  for select
  to authenticated
  using ( exists (select 1 from public.admins a where a.id = (select auth.uid())) );

drop policy if exists "lead_comments admin insert" on public.lead_comments;
create policy "lead_comments admin insert"
  on public.lead_comments
  for insert
  to authenticated
  with check ( exists (select 1 from public.admins a where a.id = (select auth.uid())) );

-- leads: admins may insert manual leads from the dashboard.
drop policy if exists "leads admin insert" on public.leads;
create policy "leads admin insert"
  on public.leads
  for insert
  to authenticated
  with check ( exists (select 1 from public.admins a where a.id = (select auth.uid())) );

-- ============================================================ Data API =======
revoke all on public.contracts     from anon;
revoke all on public.lead_comments from anon;

grant select, update         on public.contracts     to authenticated;
grant select, insert         on public.lead_comments to authenticated;
grant insert                  on public.leads          to authenticated; -- adds to existing select,update

-- ============================================================ Realtime =======
-- Required for postgres_changes subscriptions — without this, subscriptions are
-- silently dead. Guarded so re-running never errors.
do $$
begin
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and schemaname='public' and tablename='leads') then
    alter publication supabase_realtime add table public.leads;
  end if;
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and schemaname='public' and tablename='contracts') then
    alter publication supabase_realtime add table public.contracts;
  end if;
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and schemaname='public' and tablename='lead_comments') then
    alter publication supabase_realtime add table public.lead_comments;
  end if;
end $$;
