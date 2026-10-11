import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageHead } from '@/components/admin/PageHead';
import { TermForm } from '@/components/admin/TermForm';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'แก้ไขคำศัพท์' };

export default async function Page({ params }: PageProps<'/admin/glossary/[id]'>) {
  const { db } = await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const { data } = await db.from('glossary_terms').select('*').eq('id', id).maybeSingle();
  if (!data) notFound();
  return (
    <>
      <PageHead title={`แก้ไขคำศัพท์ · ${data.name}`} back={{ href: '/admin/glossary', label: 'เกร็ดน่ารู้ทั้งหมด' }} />
      <TermForm term={data} />
    </>
  );
}
