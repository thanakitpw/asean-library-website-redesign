import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import { Icon } from '@/components/Icon';
import { LibraryFinder, LibraryFinderView } from '@/components/LibraryFinder';
import { PageHero } from '@/components/PageHero';
import { getLibraries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'เครือข่ายห้องสมุดอาเซียน 77 แห่ง',
  description: 'ค้นหาห้องสมุดอาเซียน 77 แห่งในโรงเรียนครบทั้ง 77 จังหวัด ดูชื่อโรงเรียน เบอร์ติดต่อ และปีที่เปิด',
};

export default async function NetworkPage() {
  const libraries = await getLibraries();
  return (
    <>
      <PageHero
        tag="1 จังหวัด · 1 โรงเรียน · 1 ห้องสมุดอาเซียน"
        title="ค้นหาห้องสมุดอาเซียนใกล้บ้านคุณ"
        lead="ห้องสมุดอาเซียน 77 แห่งในโรงเรียนครบทั้ง 77 จังหวัด เปิดให้นักเรียน ครู และชุมชนเข้าใช้บริการ"
        crumbs={[{ label: 'เกี่ยวกับ', href: '/about' }, { label: 'เครือข่ายห้องสมุด' }]}
      />
      <section className="page-body tint" style={{ paddingBottom: 72 }}>
        <div className="container lift">
          <Suspense fallback={<LibraryFinderView libraries={libraries} />}>
            <LibraryFinder libraries={libraries} />
          </Suspense>
        </div>
      </section>
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>อยากพาเด็ก ๆ ไปใช้ห้องสมุดอาเซียน?</h2>
              <p>ห้องสมุดตั้งอยู่ในโรงเรียน กรุณาติดต่อโรงเรียนล่วงหน้าเพื่อสอบถามวันและเวลาเปิดให้บริการ หรือติดต่อกรมอาเซียนเพื่อขอศึกษาดูงาน</p>
            </div>
            <div className="acts"><Link className="btn btn-gold" href="/contact">ขอศึกษาดูงาน <Icon name="arrow" /></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
