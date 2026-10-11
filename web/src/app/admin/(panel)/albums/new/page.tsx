import type { Metadata } from 'next';

import { AlbumForm } from '@/components/admin/AlbumForm';
import { PageHead } from '@/components/admin/PageHead';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'เพิ่มอัลบั้ม' };

export default async function Page() {
  const { db } = await requireAdmin();
  // อัลบั้มใหม่ขึ้นก่อนสุด
  const { data } = await db.from('albums').select('sort_order').order('sort_order').limit(1).maybeSingle();
  return (
    <>
      <PageHead title="เพิ่มอัลบั้ม" back={{ href: '/admin/albums', label: 'คลังภาพทั้งหมด' }} />
      <AlbumForm album={null} nextOrder={Math.max(0, (data?.sort_order ?? 10) - 10)} />
    </>
  );
}
