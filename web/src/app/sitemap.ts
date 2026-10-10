import type { MetadataRoute } from 'next';

import { getArticles, getNews } from '@/lib/content';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asean-library-redesign.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, articles] = await Promise.all([getNews(), getArticles()]);
  const pages = ['', '/about', '/network', '/news', '/learn', '/tips', '/gallery', '/contact'];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}` })),
    ...news.map((n) => ({ url: `${BASE}/news/${n.slug}`, lastModified: n.publishedAt.iso })),
    ...articles.map((a) => ({ url: `${BASE}/learn/${a.slug}`, lastModified: a.publishedAt.iso })),
  ];
}
