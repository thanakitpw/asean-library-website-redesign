import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LibraryForm } from '@/components/admin/LibraryForm';
import { PageHead } from '@/components/admin/PageHead';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'แก้ไขห้องสมุด' };

export default async function Page({ params }: PageProps<'/admin/libraries/[id]'>) {
  const { db } = await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const { data } = await db.from('libraries').select('*').eq('id', id).maybeSingle();
  if (!data) notFound();
  return (
    <>
      <PageHead title={`แก้ไขห้องสมุด · ${data.province}`} back={{ href: '/admin/libraries', label: 'ห้องสมุดทั้งหมด' }} />
      <LibraryForm lib={data} />
    </>
  );
}
