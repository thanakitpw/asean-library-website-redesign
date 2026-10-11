'use server';

import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/admin/auth';
import { dbError, FormError, handle, id, list, required, slug, type FormResult } from '@/lib/admin/form';

const GROUPS = ['meet', 'pillar', 'coop'];

export async function saveTerm(_prev: FormResult, form: FormData): Promise<FormResult> {
  const { db } = await requireAdmin();
  const result = await handle(async () => {
    const groups = list(form, 'groups');
    if (!groups.length) throw new FormError('กรุณาเลือกกลุ่มอย่างน้อย 1 กลุ่ม');
    if (groups.some((g) => !GROUPS.includes(g))) throw new FormError('กลุ่มไม่ถูกต้อง');
    const row = {
      slug: slug(form, 'slug', 'term'),
      abbr: required(form, 'abbr', 'ตัวย่อ'),
      name: required(form, 'name', 'ชื่อที่แสดง'),
      full_name: required(form, 'full_name', 'ชื่อเต็ม'),
      definition: required(form, 'definition', 'คำอธิบาย'),
      groups,
    };
    const termId = id(form);
    const { error } = termId
      ? await db.from('glossary_terms').update(row).eq('id', termId)
      : await db.from('glossary_terms').insert(row);
    return error ? dbError(error, 'บันทึก') : null;
  });
  if (result) return result;
  updateTag('glossary');
  // บทความอ้างคำศัพท์ด้วย slug
  updateTag('articles');
  redirect('/admin/glossary?saved=1');
}

export async function deleteTerm(form: FormData) {
  const { db } = await requireAdmin();
  const termId = id(form);
  if (termId) {
    const { error } = await db.from('glossary_terms').delete().eq('id', termId);
    if (error) throw new Error(`ลบไม่สำเร็จ: ${error.message}`);
    updateTag('glossary');
  }
  redirect('/admin/glossary?deleted=1');
}
