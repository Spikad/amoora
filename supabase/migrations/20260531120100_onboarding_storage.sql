-- ============================================================================
-- Amoora — private storage bucket for onboarding uploads (logo, menu, photos)
-- Public (anon) intake form may UPLOAD; only admins may READ (via signed URLs).
-- ============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'onboarding',
  'onboarding',
  false,
  10485760, -- 10 MB
  array['image/png','image/jpeg','image/jpg','image/webp','image/svg+xml','application/pdf']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Allow the public intake form (anon + authenticated) to upload into the bucket.
drop policy if exists "onboarding bucket uploads" on storage.objects;
create policy "onboarding bucket uploads"
  on storage.objects
  for insert
  to anon, authenticated
  with check ( bucket_id = 'onboarding' );

-- Only admins may read objects (needed to mint signed URLs in the dashboard).
drop policy if exists "onboarding bucket admin read" on storage.objects;
create policy "onboarding bucket admin read"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'onboarding'
    and exists (select 1 from public.admins a where a.id = (select auth.uid()))
  );
