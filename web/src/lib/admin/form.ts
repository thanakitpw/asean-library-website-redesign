// อ่านค่าจาก FormData ของฟอร์มหลังบ้าน + แปลง error จากฐานข้อมูลเป็นข้อความไทย
import 'server-only';

import sanitizeHtml from 'sanitize-html';

/** ผลของ Server Action ในหลังบ้าน: null = ยังไม่ส่ง / สำเร็จแล้ว redirect ไปแล้ว */
export type FormResult = { error: string } | null;

export class FormError extends Error {}

export const text = (f: FormData, k: string) => String(f.get(k) ?? '').trim();
export const optText = (f: FormData, k: string) => text(f, k) || null;
export const list = (f: FormData, k: string) => f.getAll(k).map((v) => String(v).trim()).filter(Boolean);
export const checked = (f: FormData, k: string) => f.get(k) === 'on';

export function required(f: FormData, k: string, label: string) {
  const v = text(f, k);
  if (!v) throw new FormError(`กรุณากรอก${label}`);
  return v;
}

export function int(f: FormData, k: string, label: string, { min, max }: { min?: number; max?: number } = {}) {
  const v = text(f, k);
  if (!v) return null;
  const n = Number(v);
  if (!Number.isInteger(n) || (min !== undefined && n < min) || (max !== undefined && n > max)) {
    throw new FormError(`${label}ต้องเป็นตัวเลข${min !== undefined && max !== undefined ? ` ${min}–${max}` : ''}`);
  }
  return n;
}

export function date(f: FormData, k: string, label: string) {
  const v = text(f, k);
  if (!v) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(Date.parse(v))) throw new FormError(`${label}ไม่ถูกต้อง`);
  return v;
}

export function oneOf<T extends string>(f: FormData, k: string, allowed: readonly T[], label: string): T {
  const v = text(f, k) as T;
  if (!allowed.includes(v)) throw new FormError(`กรุณาเลือก${label}`);
  return v;
}

/** slug ว่าง = สร้างให้อัตโนมัติ เช่น news-20261011-k3x9 */
export function slug(f: FormData, k: string, prefix: string) {
  const v = text(f, k).toLowerCase();
  if (!v) {
    const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `${prefix}-${d}-${Math.random().toString(36).slice(2, 6)}`;
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(v)) {
    throw new FormError('slug ใช้ได้เฉพาะ a-z, 0-9 และขีด - คั่น เช่น opening-78-pattani');
  }
  return v;
}

export function id(f: FormData) {
  const v = text(f, 'id');
  return v ? Number(v) : null;
}

/** HTML จาก editor — เหลือเฉพาะแท็กที่หน้าเว็บรองรับ */
export function cleanHtml(html: string) {
  const out = sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'h2', 'h3', 'strong', 'b', 'em', 'i', 'u', 's', 'a', 'ul', 'ol', 'li', 'blockquote', 'hr'],
    allowedAttributes: { a: ['href', 'target', 'rel'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: attribs.target === '_blank' ? { ...attribs, rel: 'noopener noreferrer' } : attribs,
      }),
    },
  }).trim();
  return out === '<p></p>' ? '' : out;
}

/** แปลง error จาก Postgres/PostgREST เป็นข้อความที่ผู้ดูแลเข้าใจ */
export function dbError(error: { code?: string; message: string }, what: string): FormResult {
  console.error(`admin: ${what}`, error);
  if (error.code === '23505') return { error: 'มีข้อมูลนี้อยู่แล้ว (slug, ลำดับ หรือจังหวัดซ้ำ)' };
  if (error.code === '23514') return { error: 'ข้อมูลบางช่องไม่ถูกต้องตามรูปแบบที่กำหนด' };
  if (error.code === '42501') return { error: 'บัญชีนี้ไม่มีสิทธิ์แก้ไขข้อมูล' };
  return { error: `${what}ไม่สำเร็จ กรุณาลองใหม่` };
}

/** รัน action แล้วแปลง FormError เป็นข้อความ (redirect ของ Next ส่งต่อตามปกติ) */
export async function handle(run: () => Promise<FormResult>): Promise<FormResult> {
  try {
    return await run();
  } catch (e) {
    if (e instanceof FormError) return { error: e.message };
    throw e;
  }
}
