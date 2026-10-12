import type { Metadata } from 'next';

import { InfographicForm } from '@/components/admin/InfographicForm';
import { PageHead } from '@/components/admin/PageHead';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'เพิ่มอินโฟกราฟิก' };

export default async function Page() {
  const { db } = await requireAdmin();
  const { data } = await db.from('infographics').select('sort_order').order('sort_order', { ascending: false }).limit(1);
  return (
    <>
      <PageHead title="เพิ่มอินโฟกราฟิก" back={{ href: '/admin/infographics', label: 'อินโฟกราฟิกทั้งหมด' }} />
      <InfographicForm item={null} nextOrder={(data?.[0]?.sort_order ?? 0) + 1} />
    </>
  );
}
