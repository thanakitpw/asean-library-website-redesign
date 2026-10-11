-- สิทธิ์หลังบ้าน: ผู้ใช้ที่ app_metadata.role = 'admin' เพิ่ม/แก้/ลบเนื้อหาได้
-- ให้สิทธิ์ admin ด้วย SQL (ผู้ใช้แก้ app_metadata เองไม่ได้):
--   update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}' where email = '...';

-- schema นี้ไม่เปิดผ่าน Data API จึงเรียก function ผ่าน RPC ไม่ได้
create schema if not exists private;
grant usage on schema private to anon, authenticated;

create function private.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke execute on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

-- ---------- ตารางเนื้อหา ----------
grant insert, update, delete on public.posts, public.libraries, public.glossary_terms, public.albums,
  public.album_photos to authenticated;
grant select, delete on public.contact_messages to authenticated;

-- admin เห็นรายการที่ยังไม่เผยแพร่ด้วย
drop policy "Published posts are public" on public.posts;
create policy "Published posts are public, admins see all" on public.posts
  for select to anon, authenticated using (is_published or (select private.is_admin()));

drop policy "Published albums are public" on public.albums;
create policy "Published albums are public, admins see all" on public.albums
  for select to anon, authenticated using (is_published or (select private.is_admin()));

drop policy "Photos of published albums are public" on public.album_photos;
create policy "Photos of published albums are public, admins see all" on public.album_photos
  for select to anon, authenticated
  using (
    (select private.is_admin())
    or exists (select 1 from public.albums a where a.id = album_id and a.is_published)
  );

-- insert / update / delete สำหรับ admin เท่านั้น
do $$
declare
  t text;
begin
  foreach t in array array['posts', 'libraries', 'glossary_terms', 'albums', 'album_photos'] loop
    execute format(
      'create policy "Admins can insert" on public.%I for insert to authenticated with check ((select private.is_admin()))', t);
    execute format(
      'create policy "Admins can update" on public.%I for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()))', t);
    execute format(
      'create policy "Admins can delete" on public.%I for delete to authenticated using ((select private.is_admin()))', t);
  end loop;
end;
$$;

create policy "Admins can read contact messages" on public.contact_messages
  for select to authenticated using ((select private.is_admin()));
create policy "Admins can delete contact messages" on public.contact_messages
  for delete to authenticated using ((select private.is_admin()));

-- ---------- Storage: รูปที่อัปโหลดจากหลังบ้าน ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do nothing;

-- bucket เป็น public อ่านผ่าน URL ได้เลย; policy ข้างล่างคุมการอัปโหลด/ลบ
create policy "Admins can read media" on storage.objects
  for select to authenticated using (bucket_id = 'media' and (select private.is_admin()));
create policy "Admins can upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and (select private.is_admin()));
create policy "Admins can update media" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (select private.is_admin()))
  with check (bucket_id = 'media' and (select private.is_admin()));
create policy "Admins can delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and (select private.is_admin()));
