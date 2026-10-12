-- ไฟล์ PDF ประกอบบทความ (เว็บเดิมแนบ PDF ไว้ทุกบทความ บางไฟล์ใหญ่กว่า 10 MB จึงแยก bucket)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documents', 'documents', true, 52428800, array['application/pdf'])
on conflict (id) do nothing;

create policy "Admins can read documents" on storage.objects
  for select to authenticated using (bucket_id = 'documents' and (select private.is_admin()));
create policy "Admins can upload documents" on storage.objects
  for insert to authenticated with check (bucket_id = 'documents' and (select private.is_admin()));
create policy "Admins can update documents" on storage.objects
  for update to authenticated
  using (bucket_id = 'documents' and (select private.is_admin()))
  with check (bucket_id = 'documents' and (select private.is_admin()));
create policy "Admins can delete documents" on storage.objects
  for delete to authenticated using (bucket_id = 'documents' and (select private.is_admin()));
