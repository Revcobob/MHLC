-- Storage buckets for the MHLC CMS.
-- All are public-read; writes require service-role (the Next.js server).
-- Files for unpublished rows are reachable by direct URL but never linked
-- from the public site. This is acceptable for the campaign content.

insert into storage.buckets (id, name, public) values
  ('letters',    'letters',    true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values
  ('documents',  'documents',  true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values
  ('media',      'media',      true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values
  ('thumbnails', 'thumbnails', true) on conflict (id) do nothing;

-- Public READ on objects in those buckets.
-- Postgres has no "create policy if not exists" — drop-then-create instead.
drop policy if exists "Public read letters"    on storage.objects;
create policy "Public read letters"
  on storage.objects for select to anon
  using (bucket_id = 'letters');

drop policy if exists "Public read documents"  on storage.objects;
create policy "Public read documents"
  on storage.objects for select to anon
  using (bucket_id = 'documents');

drop policy if exists "Public read media"      on storage.objects;
create policy "Public read media"
  on storage.objects for select to anon
  using (bucket_id = 'media');

drop policy if exists "Public read thumbnails" on storage.objects;
create policy "Public read thumbnails"
  on storage.objects for select to anon
  using (bucket_id = 'thumbnails');

-- Writes (insert/update/delete) on storage.objects remain restricted to
-- service_role automatically — we never grant write policies to anon.
