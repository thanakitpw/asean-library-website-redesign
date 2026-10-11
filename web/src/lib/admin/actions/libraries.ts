'use server';

import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/admin/auth';
import { dbError, FormError, handle, id, int, oneOf, required, text, type FormResult } from '@/lib/admin/form';

const REGIONS = ['north', 'northeast', 'central', 'east', 'south'] as const;

export async function saveLibrary(_prev: FormResult, form: FormData): Promise<FormResult> {
  const { db } = await requireAdmin();
  const result = await handle(async () => {
    const year = int(form, 'opened_year_be', 'ปีที่เปิด (พ.ศ.)', { min: 2550, max: 2600 });
    if (!year) throw new FormError('กรุณากรอกปีที่เปิด (พ.ศ.)');
    const row = {
      no: int(form, 'no', 'ลำดับแห่งที่', { min: 1, max: 77 }),
      province: required(form, 'province', 'จังหวัด'),
      region: oneOf(form, 'region', REGIONS, 'ภาค'),
      opened_year_be: year,
      school: text(form, 'school'),
      tel: text(form, 'tel'),
    };
    const libId = id(form);
    const { error } = libId
      ? await db.from('libraries').update(row).eq('id', libId)
      : await db.from('libraries').insert(row);
    return error ? dbError(error, 'บันทึก') : null;
  });
  if (result) return result;
  updateTag('libraries');
  redirect('/admin/libraries?saved=1');
}

export async function deleteLibrary(form: FormData) {
  const { db } = await requireAdmin();
  const libId = id(form);
  if (libId) {
    const { error } = await db.from('libraries').delete().eq('id', libId);
    if (error) throw new Error(`ลบไม่สำเร็จ: ${error.message}`);
    updateTag('libraries');
  }
  redirect('/admin/libraries?deleted=1');
}
