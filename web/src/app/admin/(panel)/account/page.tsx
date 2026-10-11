import type { Metadata } from 'next';

import { PageHead } from '@/components/admin/PageHead';
import { PasswordForm } from '@/components/admin/PasswordForm';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'เปลี่ยนรหัสผ่าน' };

export default async function Page({ searchParams }: PageProps<'/admin/account'>) {
  const { email } = await requireAdmin();
  const saved = (await searchParams).saved;
  return (
    <>
      <PageHead title="เปลี่ยนรหัสผ่าน" desc={email} />
      {saved && <div className="a-alert ok" role="status">เปลี่ยนรหัสผ่านเรียบร้อย</div>}
      <PasswordForm />
    </>
  );
}
