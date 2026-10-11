import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AlbumForm } from '@/components/admin/AlbumForm';
import { PageHead } from '@/components/admin/PageHead';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'แก้ไขอัลบั้ม' };

export default async function Page({ params }: PageProps<'/admin/albums/[id]'>) {
  const { db } = await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const { data } = await db
    .from('albums')
    .select('*, album_photos(src, caption, sort_order)')
    .eq('id', id)
    .order('sort_order', { referencedTable: 'album_photos' })
    .maybeSingle();
  if (!data) notFound();
  return (
    <>
      <PageHead title={`แก้ไขอัลบั้ม · ${data.title}`} back={{ href: '/admin/albums', label: 'คลังภาพทั้งหมด' }} />
      <AlbumForm album={data} nextOrder={data.sort_order} />
    </>
  );
}
