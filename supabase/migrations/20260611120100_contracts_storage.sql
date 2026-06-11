-- Private 'contracts' storage bucket for signed PDFs.
-- Uploads happen ONLY from the sign-contract edge function (service role, which
-- bypasses RLS) — so there is no public/authenticated insert policy. Admins may
-- read, to mint signed URLs in the dashboard. Idempotent.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'contracts',
  'contracts',
  false,
  20971520, -- 20 MB
  array['application/pdf']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Only admins may read signed contract PDFs (needed for signed URLs in admin).
drop policy if exists "contracts bucket admin read" on storage.objects;
create policy "contracts bucket admin read"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'contracts'
    and exists (select 1 from public.admins a where a.id = (select auth.uid()))
  );
