-- ที่อยู่/เว็บไซต์โรงเรียน (จากหน้าเครือข่ายของเว็บเดิม) และอินโฟกราฟิกในหน้าเกร็ดน่ารู้

alter table public.libraries
  add column address text not null default '',
  add column website text not null default '';

-- ---------- infographics: ภาพเกร็ดน่ารู้ ----------
create table public.infographics (
  id bigint generated always as identity primary key,
  title text not null check (length(title) between 1 and 200),
  image text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index infographics_sort_idx on public.infographics (sort_order, id);

create trigger infographics_updated_at before update on public.infographics
  for each row execute function public.set_updated_at();

revoke all on public.infographics from anon, authenticated;
grant select on public.infographics to anon, authenticated;
grant insert, update, delete on public.infographics to authenticated;

alter table public.infographics enable row level security;

create policy "Published infographics are public" on public.infographics
  for select to anon, authenticated
  using (is_published or (select private.is_admin()));
create policy "Admins can insert infographics" on public.infographics
  for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can update infographics" on public.infographics
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete infographics" on public.infographics
  for delete to authenticated using ((select private.is_admin()));
