import type { Metadata } from 'next';

import { LibraryForm } from '@/components/admin/LibraryForm';
import { PageHead } from '@/components/admin/PageHead';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'เพิ่มห้องสมุด' };

export default async function Page() {
  await requireAdmin();
  return (
    <>
      <PageHead title="เพิ่มห้องสมุด" back={{ href: '/admin/libraries', label: 'ห้องสมุดทั้งหมด' }} />
      <LibraryForm lib={null} />
    </>
  );
}
