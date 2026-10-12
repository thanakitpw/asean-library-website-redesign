import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { InfographicForm } from '@/components/admin/InfographicForm';
import { PageHead } from '@/components/admin/PageHead';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'แก้ไขอินโฟกราฟิก' };

export default async function Page({ params }: PageProps<'/admin/infographics/[id]'>) {
  const { db } = await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const { data } = await db.from('infographics').select('*').eq('id', id).maybeSingle();
  if (!data) notFound();
  return (
    <>
      <PageHead title={`แก้ไขอินโฟกราฟิก · ${data.title}`} back={{ href: '/admin/infographics', label: 'อินโฟกราฟิกทั้งหมด' }} />
      <InfographicForm item={data} nextOrder={data.sort_order} />
    </>
  );
}
