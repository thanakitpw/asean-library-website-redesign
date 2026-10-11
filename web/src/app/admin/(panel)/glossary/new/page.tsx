import type { Metadata } from 'next';

import { PageHead } from '@/components/admin/PageHead';
import { TermForm } from '@/components/admin/TermForm';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'เพิ่มคำศัพท์' };

export default async function Page() {
  await requireAdmin();
  return (
    <>
      <PageHead title="เพิ่มคำศัพท์" back={{ href: '/admin/glossary', label: 'เกร็ดน่ารู้ทั้งหมด' }} />
      <TermForm term={null} />
    </>
  );
}
