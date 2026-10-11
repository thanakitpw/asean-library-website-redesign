import Link from 'next/link';
import { Suspense } from 'react';

import { AdminNav, AdminNavView } from '@/components/admin/AdminNav';
import { Icon } from '@/components/Icon';
import { requireAdmin } from '@/lib/admin/auth';
import { signOut } from '@/lib/admin/actions/auth';

// หน้าในกลุ่มนี้อ่าน session ทุกครั้ง จึงไม่ต้องการ instant navigation
export const instant = false;

export default function PanelLayout({ children }: LayoutProps<'/admin'>) {
  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-brand">
          <Icon name="library" />
          <span>ห้องสมุดอาเซียน<small>ระบบจัดการเนื้อหา</small></span>
        </div>
        <Suspense fallback={<AdminNavView pathname={null} />}>
          <AdminNav />
        </Suspense>
        <hr />
        <Link href="/admin/account"><Icon name="key" /> เปลี่ยนรหัสผ่าน</Link>
        <a href="/" target="_blank" rel="noreferrer"><Icon name="eye" /> ดูหน้าเว็บ</a>
        <form action={signOut}>
          <button type="submit"><Icon name="logout" /> ออกจากระบบ</button>
        </form>
        <div className="adm-user">
          <Suspense fallback={null}>
            <SignedInAs />
          </Suspense>
        </div>
      </aside>
      <main className="adm-main">
        <Suspense fallback={<p className="a-loading">กำลังโหลด…</p>}>{children}</Suspense>
      </main>
    </div>
  );
}

async function SignedInAs() {
  const { email } = await requireAdmin();
  return <>เข้าสู่ระบบเป็น<br />{email}</>;
}
