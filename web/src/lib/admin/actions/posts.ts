'use server';

import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/admin/auth';
import {
  checked,
  cleanHtml,
  date,
  dbError,
  FormError,
  handle,
  id,
  int,
  list,
  oneOf,
  optText,
  required,
  slug,
  type FormResult,
} from '@/lib/admin/form';
import type { TablesInsert } from '@/lib/database.types';

const PRECISION = ['day', 'year'] as const;
const TONES = ['navy', 'green', 'gold', 'blue'] as const;
const CATEGORIES = ['about', 'apsc', 'aec', 'ascc', 'ext', 'move'] as const;

const ADMIN_PATH = { news: '/admin/news', article: '/admin/articles' } as const;
const TAG = { news: 'news', article: 'articles' } as const;

export async function savePost(_prev: FormResult, form: FormData): Promise<FormResult> {
  const { db } = await requireAdmin();
  const type = form.get('type') === 'article' ? 'article' : 'news';

  const result = await handle(async () => {
    const tone = optText(form, 'tone');
    if (tone && !TONES.includes(tone as (typeof TONES)[number])) throw new FormError('สีไม่ถูกต้อง');
    const publishedOn = date(form, 'published_on', 'วันที่เผยแพร่');
    if (!publishedOn) throw new FormError('กรุณาเลือกวันที่เผยแพร่');

    const row: TablesInsert<'posts'> = {
      type,
      title: required(form, 'title', 'หัวข้อ'),
      slug: slug(form, 'slug', type),
      excerpt: optText(form, 'excerpt'),
      published_on: publishedOn,
      published_precision: oneOf(form, 'published_precision', PRECISION, 'ความละเอียดของวันที่'),
      cover: optText(form, 'cover'),
      icon: optText(form, 'icon'),
      tone,
      body_html: cleanHtml(String(form.get('body_html') ?? '')) || null,
      gallery: list(form, 'gallery'),
      is_sample: checked(form, 'is_sample'),
      is_published: checked(form, 'is_published'),
    };

    if (type === 'news') {
      const ceremony = date(form, 'ceremony_on', 'วันที่ส่งมอบ');
      Object.assign(row, {
        news_category: oneOf(form, 'news_category', ['opening', 'activity'] as const, 'ประเภทข่าว'),
        library_no: int(form, 'library_no', 'ห้องสมุดแห่งที่', { min: 1, max: 77 }),
        province: optText(form, 'province'),
        school: optText(form, 'school'),
        ceremony_on: ceremony,
        ceremony_precision: ceremony ? oneOf(form, 'ceremony_precision', PRECISION, 'ความละเอียดของวันที่ส่งมอบ') : null,
        categories: [],
      });
    } else {
      const categories = list(form, 'categories');
      if (!categories.length) throw new FormError('กรุณาเลือกหมวดอย่างน้อย 1 หมวด');
      if (categories.some((c) => !CATEGORIES.includes(c as (typeof CATEGORIES)[number]))) throw new FormError('หมวดไม่ถูกต้อง');
      Object.assign(row, {
        news_category: null,
        categories,
        reading_minutes: int(form, 'reading_minutes', 'เวลาอ่าน', { min: 1, max: 120 }),
        audience: optText(form, 'audience'),
        related_terms: list(form, 'related_terms'),
      });
    }

    const postId = id(form);
    const { error } = postId
      ? await db.from('posts').update(row).eq('id', postId).eq('type', type)
      : await db.from('posts').insert(row);
    if (error) return dbError(error, 'บันทึก');
    return null;
  });

  if (result) return result;
  updateTag(TAG[type]);
  redirect(`${ADMIN_PATH[type]}?saved=1`);
}

export async function deletePost(form: FormData) {
  const { db } = await requireAdmin();
  const type = form.get('type') === 'article' ? 'article' : 'news';
  const postId = id(form);
  if (postId) {
    const { error } = await db.from('posts').delete().eq('id', postId).eq('type', type);
    if (error) throw new Error(`ลบไม่สำเร็จ: ${error.message}`);
    updateTag(TAG[type]);
  }
  redirect(`${ADMIN_PATH[type]}?deleted=1`);
}
