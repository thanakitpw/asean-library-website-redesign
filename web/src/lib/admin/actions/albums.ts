'use server';

import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/admin/auth';
import { checked, date, dbError, FormError, handle, id, int, oneOf, optText, required, slug, type FormResult } from '@/lib/admin/form';

export async function saveAlbum(_prev: FormResult, form: FormData): Promise<FormResult> {
  const { db } = await requireAdmin();
  const result = await handle(async () => {
    const takenOn = date(form, 'taken_on', 'วันที่');
    const srcs = form.getAll('photo_src').map(String);
    const captions = form.getAll('photo_caption').map(String);
    const photos = srcs
      .map((src, i) => ({ src: src.trim(), caption: (captions[i] ?? '').trim() }))
      .filter((p) => p.src);
    if (!photos.length) throw new FormError('กรุณาเพิ่มรูปอย่างน้อย 1 รูป');

    const row = {
      slug: slug(form, 'slug', 'album'),
      title: required(form, 'title', 'ชื่ออัลบั้ม'),
      category: oneOf(form, 'category', ['opening', 'activity', 'library'] as const, 'หมวด'),
      taken_on: takenOn,
      taken_precision: takenOn ? oneOf(form, 'taken_precision', ['day', 'year'] as const, 'ความละเอียดของวันที่') : null,
      place: optText(form, 'place'),
      place_icon: optText(form, 'place_icon'),
      sort_order: int(form, 'sort_order', 'ลำดับ', { min: 0, max: 100000 }) ?? 0,
      is_published: checked(form, 'is_published'),
    };

    let albumId = id(form);
    if (albumId) {
      const { error } = await db.from('albums').update(row).eq('id', albumId);
      if (error) return dbError(error, 'บันทึก');
    } else {
      const { data, error } = await db.from('albums').insert(row).select('id').single();
      if (error) return dbError(error, 'บันทึก');
      albumId = data.id;
    }

    // แทนรูปทั้งชุด: เพิ่มชุดใหม่ก่อน แล้วค่อยลบชุดเดิม (ถ้าเพิ่มไม่สำเร็จ รูปเดิมยังอยู่)
    const { data: old, error: readError } = await db.from('album_photos').select('id').eq('album_id', albumId);
    if (readError) return dbError(readError, 'บันทึกรูป');
    const { error: insertError } = await db
      .from('album_photos')
      .insert(photos.map((p, i) => ({ album_id: albumId, src: p.src, caption: p.caption, sort_order: (i + 1) * 10 })));
    if (insertError) return dbError(insertError, 'บันทึกรูป');
    if (old.length) {
      const { error: deleteError } = await db.from('album_photos').delete().in('id', old.map((o) => o.id));
      if (deleteError) return dbError(deleteError, 'ลบรูปเดิม');
    }
    return null;
  });
  if (result) return result;
  updateTag('albums');
  redirect('/admin/albums?saved=1');
}

export async function deleteAlbum(form: FormData) {
  const { db } = await requireAdmin();
  const albumId = id(form);
  if (albumId) {
    const { error } = await db.from('albums').delete().eq('id', albumId);
    if (error) throw new Error(`ลบไม่สำเร็จ: ${error.message}`);
    updateTag('albums');
  }
  redirect('/admin/albums?deleted=1');
}

