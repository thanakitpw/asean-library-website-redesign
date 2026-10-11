import { Suspense, type ReactNode } from 'react';

import { HeaderView, SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

/** โครงหน้าเว็บสาธารณะ ใช้ใน app/(site)/layout.tsx และหน้า 404 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">ข้ามไปยังเนื้อหาหลัก</a>
      <Suspense fallback={<HeaderView pathname={null} />}>
        <SiteHeader />
      </Suspense>
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
