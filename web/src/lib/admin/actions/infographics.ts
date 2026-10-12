'use server';

import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/admin/auth';
import { checked, dbError, FormError, handle, id, int, required, text, type FormResult } from '@/lib/admin/form';

export async function saveInfographic(_prev: FormResult, form: FormData): Promise<FormResult> {
  const { db } = await requireAdmin();
  const result = await handle(async () => {
    const image = text(form, 'image');
    if (!image) throw new FormError('กรุณาอัปโหลดภาพ');
    const row = {
      title: required(form, 'title', 'ชื่อเรื่อง'),
      image,
      sort_order: int(form, 'sort_order', 'ลำดับ', { min: 0, max: 9999 }) ?? 0,
      is_published: checked(form, 'is_published'),
    };
    const infoId = id(form);
    const { error } = infoId
      ? await db.from('infographics').update(row).eq('id', infoId)
      : await db.from('infographics').insert(row);
    return error ? dbError(error, 'บันทึก') : null;
  });
  if (result) return result;
  updateTag('infographics');
  redirect('/admin/infographics?saved=1');
}

export async function deleteInfographic(form: FormData) {
  const { db } = await requireAdmin();
  const infoId = id(form);
  if (infoId) {
    const { error } = await db.from('infographics').delete().eq('id', infoId);
    if (error) throw new Error(`ลบไม่สำเร็จ: ${error.message}`);
    updateTag('infographics');
  }
  redirect('/admin/infographics?deleted=1');
}
