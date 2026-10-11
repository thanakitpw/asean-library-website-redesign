// ชั้นอ่านข้อมูลของทั้งเว็บ — อ่านจาก Supabase (ตารางใน supabase/migrations)
// ข้อมูลถูก cache ตาม cacheLife; หลังแก้ข้อมูลในหลังบ้าน เรียก
// revalidateTag('news' | 'articles' | 'libraries' | 'glossary' | 'albums') เพื่อให้เห็นทันที
import { cacheLife, cacheTag } from 'next/cache';

import type { IconName } from '@/components/icon-sprite';
import type { Tables } from '@/lib/database.types';
import { supabase } from '@/lib/supabase/public';
import { ARTICLE_CATEGORIES } from '@/lib/taxonomy';
import type {
  Album,
  AlbumCategory,
  ArticleCategory,
  ArticlePost,
  GlossaryGroup,
  Library,
  NewsCategory,
  NewsPost,
  PubDate,
  Term,
  Tone,
} from '@/lib/types';

type PostRow = Tables<'posts'>;

function must<T>(res: { data: T | null; error: { message: string } | null }, what: string): T {
  if (res.error) throw new Error(`อ่าน ${what} จาก Supabase ไม่สำเร็จ: ${res.error.message}`);
  return res.data as T;
}

const pubDate = (iso: string | null, precision: string | null): PubDate | undefined =>
  iso ? { iso, precision: precision === 'year' ? 'year' : 'day' } : undefined;

const opt = <T>(v: T | null) => v ?? undefined;

function postBase(r: PostRow) {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: opt(r.excerpt),
    publishedAt: pubDate(r.published_on, r.published_precision)!,
    cover: opt(r.cover),
    icon: opt(r.icon) as IconName | undefined,
    tone: opt(r.tone) as Tone | undefined,
    bodyHtml: opt(r.body_html),
    gallery: r.gallery.length ? r.gallery : undefined,
    views: r.views > 0 ? r.views : undefined,
    sample: r.is_sample || undefined,
  };
}

const toNews = (r: PostRow): NewsPost => ({
  ...postBase(r),
  type: 'news',
  category: r.news_category as NewsCategory,
  province: opt(r.province),
  libraryNo: opt(r.library_no),
  school: opt(r.school),
  ceremonyDate: pubDate(r.ceremony_on, r.ceremony_precision),
});

const toArticle = (r: PostRow): ArticlePost => ({
  ...postBase(r),
  type: 'article',
  categories: r.categories as ArticleCategory[],
  readingMinutes: opt(r.reading_minutes),
  audience: opt(r.audience),
  relatedTerms: r.related_terms.length ? r.related_terms : undefined,
});

/** ใหม่ก่อน; วันเดียวกันเรียงตามลำดับที่เพิ่ม */
const posts = (type: 'news' | 'article') =>
  supabase()
    .from('posts')
    .select('*')
    .eq('type', type)
    .order('published_on', { ascending: false })
    .order('id', { ascending: true });

// ---------- news ----------
export async function getNews(): Promise<NewsPost[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('news');
  return must(await posts('news'), 'ข่าว').map(toNews);
}

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('news');
  const row = must(
    await supabase().from('posts').select('*').eq('type', 'news').eq('slug', slug).maybeSingle(),
    `ข่าว ${slug}`,
  );
  return row ? toNews(row) : null;
}

/** ข่าวก่อนหน้า/ถัดไปตามลำดับเวลา */
export async function getNewsNeighbors(slug: string) {
  const all = await getNews();
  const i = all.findIndex((n) => n.slug === slug);
  return { newer: i > 0 ? all[i - 1] : null, older: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
}

// ---------- articles ----------
export async function getArticles(): Promise<ArticlePost[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('articles');
  return must(await posts('article'), 'บทความ').map(toArticle);
}

export async function getArticle(slug: string): Promise<ArticlePost | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('articles');
  const row = must(
    await supabase().from('posts').select('*').eq('type', 'article').eq('slug', slug).maybeSingle(),
    `บทความ ${slug}`,
  );
  return row ? toArticle(row) : null;
}

export async function getArticleNeighbors(slug: string) {
  const all = await getArticles();
  const i = all.findIndex((a) => a.slug === slug);
  return { newer: i > 0 ? all[i - 1] : null, older: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
}

export async function getArticleCategories() {
  return ARTICLE_CATEGORIES;
}

export function articleCategory(slug: ArticleCategory) {
  return ARTICLE_CATEGORIES.find((c) => c.slug === slug)!;
}

// ---------- libraries ----------
export async function getLibraries(): Promise<Library[]> {
  'use cache';
  cacheLife('days');
  cacheTag('libraries');
  const rows = must(await supabase().from('libraries').select('*').order('id'), 'ห้องสมุด');
  return rows.map((r) => ({
    no: r.no,
    province: r.province,
    region: r.region as Library['region'],
    year: String(r.opened_year_be),
    school: r.school,
    tel: r.tel,
  }));
}

// ---------- glossary ----------
export async function getGlossary(): Promise<Term[]> {
  'use cache';
  cacheLife('days');
  cacheTag('glossary');
  const rows = must(await supabase().from('glossary_terms').select('*').order('id'), 'คำศัพท์');
  return rows.map((r) => ({
    slug: r.slug,
    abbr: r.abbr,
    name: r.name,
    full: r.full_name,
    definition: r.definition,
    groups: r.groups as GlossaryGroup[],
  }));
}

// ---------- albums ----------
export async function getAlbums(): Promise<Album[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('albums');
  const rows = must(
    await supabase()
      .from('albums')
      .select('*, album_photos(src, caption, sort_order)')
      .order('sort_order')
      .order('id')
      .order('sort_order', { referencedTable: 'album_photos' }),
    'คลังภาพ',
  );
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    category: r.category as AlbumCategory,
    date: pubDate(r.taken_on, r.taken_precision),
    place: opt(r.place),
    placeIcon: opt(r.place_icon) as IconName | undefined,
    photos: r.album_photos.map((p) => ({ src: p.src, caption: p.caption })),
  }));
}
