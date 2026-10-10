// ชั้นอ่านข้อมูลของทั้งเว็บ — ตอนนี้อ่านจากไฟล์ใน src/lib/data/
// ตอนผูกฐานข้อมูล ให้เปลี่ยนเฉพาะตัวฟังก์ชันในไฟล์นี้ (signature เดิม) แล้วเรียก
// revalidateTag('news' | 'articles' | 'libraries' | 'glossary' | 'albums') หลังแก้ข้อมูลในหลังบ้าน
import { cacheLife, cacheTag } from 'next/cache';

import { ALBUMS } from '@/lib/data/albums';
import { ARTICLE_CATEGORIES, ARTICLES } from '@/lib/data/articles';
import { GLOSSARY } from '@/lib/data/glossary';
import LIBRARIES from '@/lib/data/libraries.json';
import { NEWS } from '@/lib/data/news';
import type { Album, ArticleCategory, ArticlePost, Library, NewsPost, Term } from '@/lib/types';

const newestFirst = <T extends { publishedAt: { iso: string } }>(a: T, b: T) =>
  b.publishedAt.iso.localeCompare(a.publishedAt.iso);

// ---------- news ----------
export async function getNews(): Promise<NewsPost[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('news');
  return [...NEWS].sort(newestFirst);
}

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('news');
  return NEWS.find((n) => n.slug === slug) ?? null;
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
  return [...ARTICLES].sort(newestFirst);
}

export async function getArticle(slug: string): Promise<ArticlePost | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('articles');
  return ARTICLES.find((a) => a.slug === slug) ?? null;
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
  return LIBRARIES as Library[];
}

// ---------- glossary ----------
export async function getGlossary(): Promise<Term[]> {
  'use cache';
  cacheLife('days');
  cacheTag('glossary');
  return GLOSSARY;
}

// ---------- albums ----------
export async function getAlbums(): Promise<Album[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('albums');
  return ALBUMS;
}
