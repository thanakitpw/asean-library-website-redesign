-- ตารางเนื้อหาของเว็บไซต์โครงการห้องสมุดอาเซียน ให้ตรงกับ src/lib/types.ts
-- เว็บอ่านด้วย publishable key (role anon) ได้เฉพาะ SELECT แถวที่เผยแพร่แล้ว
-- การแก้ไขเนื้อหาทำผ่าน Supabase dashboard / หลังบ้าน (ยังไม่มี policy สำหรับเขียน)

-- ---------- posts: ข่าว + บทความ ----------
create table public.posts (
  id bigint generated always as identity primary key,
  type text not null check (type in ('news', 'article')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  excerpt text,
  published_on date not null,
  published_precision text not null default 'day' check (published_precision in ('day', 'year')),
  cover text,
  icon text,
  tone text check (tone in ('navy', 'green', 'gold', 'blue')),
  body_html text, -- ต้อง sanitize ก่อนบันทึก เพราะหน้าเว็บแสดงด้วย dangerouslySetInnerHTML
  gallery text[] not null default '{}',
  views integer not null default 0 check (views >= 0),
  is_sample boolean not null default false,
  is_published boolean not null default true,
  -- เฉพาะข่าว
  news_category text check (news_category in ('opening', 'activity')),
  library_no smallint,
  province text,
  school text,
  ceremony_on date,
  ceremony_precision text check (ceremony_precision in ('day', 'year')),
  -- เฉพาะบทความ
  categories text[] not null default '{}'
    check (categories <@ array['about', 'apsc', 'aec', 'ascc', 'ext', 'move']),
  reading_minutes smallint check (reading_minutes > 0),
  audience text,
  related_terms text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (type, slug),
  check (
    (type = 'news' and news_category is not null and categories = '{}')
    or (type = 'article' and news_category is null and cardinality(categories) > 0)
  ),
  check ((ceremony_on is null) = (ceremony_precision is null))
);

create index posts_listing_idx on public.posts (type, published_on desc) where is_published;

-- ---------- libraries: ห้องสมุด 77 แห่ง ----------
create table public.libraries (
  id bigint generated always as identity primary key,
  no smallint unique check (no between 1 and 77), -- ลำดับแห่งที่ (ข้อมูลเดิมบางแห่งไม่มี)
  province text not null unique,
  region text not null check (region in ('north', 'northeast', 'central', 'east', 'south')),
  opened_year_be smallint not null check (opened_year_be between 2550 and 2600),
  school text not null default '',
  tel text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- glossary_terms: เกร็ดน่ารู้ ----------
create table public.glossary_terms (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  abbr text not null,
  name text not null,
  full_name text not null,
  definition text not null,
  groups text[] not null default '{}' check (groups <@ array['meet', 'pillar', 'coop']),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- albums + album_photos: คลังภาพ ----------
create table public.albums (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  category text not null check (category in ('opening', 'activity', 'library')),
  taken_on date,
  taken_precision text check (taken_precision in ('day', 'year')),
  place text,
  place_icon text,
  sort_order integer not null default 0, -- เรียงจากน้อยไปมาก
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((taken_on is null) = (taken_precision is null))
);

create table public.album_photos (
  id bigint generated always as identity primary key,
  album_id bigint not null references public.albums (id) on delete cascade,
  src text not null,
  caption text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index album_photos_album_id_idx on public.album_photos (album_id, sort_order);

-- ---------- contact_messages: ฟอร์มติดต่อ ----------
create table public.contact_messages (
  id bigint generated always as identity primary key,
  topic text not null check (topic in ('visit', 'info', 'event', 'other')),
  name text not null check (char_length(name) between 1 and 200),
  org text check (char_length(org) <= 200),
  email text not null check (char_length(email) <= 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  tel text check (char_length(tel) <= 40),
  province text check (char_length(province) <= 100),
  message text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now()
);

-- ---------- updated_at ----------
create function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

revoke execute on function public.set_updated_at() from public, anon, authenticated;

create trigger posts_updated_at before update on public.posts
  for each row execute function public.set_updated_at();
create trigger libraries_updated_at before update on public.libraries
  for each row execute function public.set_updated_at();
create trigger glossary_terms_updated_at before update on public.glossary_terms
  for each row execute function public.set_updated_at();
create trigger albums_updated_at before update on public.albums
  for each row execute function public.set_updated_at();

-- ---------- สิทธิ์ + RLS ----------
-- โปรเจกต์นี้ให้สิทธิ์ทุกอย่างกับ anon/authenticated เป็นค่าเริ่มต้น จึงถอนออกแล้วให้เท่าที่ใช้
revoke all on public.posts, public.libraries, public.glossary_terms, public.albums,
  public.album_photos, public.contact_messages from anon, authenticated;

grant select on public.posts, public.libraries, public.glossary_terms, public.albums,
  public.album_photos to anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;

alter table public.posts enable row level security;
alter table public.libraries enable row level security;
alter table public.glossary_terms enable row level security;
alter table public.albums enable row level security;
alter table public.album_photos enable row level security;
alter table public.contact_messages enable row level security;

create policy "Published posts are public" on public.posts
  for select to anon, authenticated using (is_published);

create policy "Libraries are public" on public.libraries
  for select to anon, authenticated using (true);

create policy "Glossary is public" on public.glossary_terms
  for select to anon, authenticated using (true);

create policy "Published albums are public" on public.albums
  for select to anon, authenticated using (is_published);

create policy "Photos of published albums are public" on public.album_photos
  for select to anon, authenticated
  using (exists (select 1 from public.albums a where a.id = album_id and a.is_published));

-- ส่งข้อความได้ แต่อ่านกลับไม่ได้ (อ่านผ่าน dashboard เท่านั้น)
create policy "Anyone can send a contact message" on public.contact_messages
  for insert to anon, authenticated with check (true);
