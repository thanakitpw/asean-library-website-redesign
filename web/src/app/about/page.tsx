import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/icon-sprite';
import { PageHero, SectionHead } from '@/components/PageHero';
import { getLibraries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'เกี่ยวกับโครงการ',
  description: 'ที่มา วัตถุประสงค์ และเส้นทางของโครงการ 1 จังหวัด 1 โรงเรียน 1 ห้องสมุดอาเซียน โดยกรมอาเซียน กระทรวงการต่างประเทศ',
};

const OBJECTIVES = [
  { title: 'เข้าถึงข้อมูลอาเซียน', text: 'ให้นักเรียนและประชาชนเข้าถึงข้อมูลเกี่ยวกับอาเซียน และเข้าใจโอกาสและความท้าทายของประชาคมอาเซียน' },
  { title: 'ศูนย์การเรียนรู้ที่ยั่งยืน', text: 'เป็นศูนย์การเรียนรู้และจัดกิจกรรมเกี่ยวกับอาเซียนสำหรับเยาวชน ครู และชุมชนในพื้นที่อย่างต่อเนื่อง' },
  { title: 'ทุกภาคส่วนมีส่วนร่วม', text: 'ส่งเสริมให้ทุกภาคส่วนร่วมสร้างประชาคมอาเซียนที่มีประชาชนเป็นศูนย์กลาง ไม่ทิ้งใครไว้ข้างหลัง และมองไปข้างหน้า' },
];

const KIT: { icon: IconName; title: string; text: string }[] = [
  { icon: 'board', title: 'บอร์ดนิทรรศการ', text: 'นิทรรศการอาเซียนถาวร พร้อมชั้นหนังสือ โต๊ะ เก้าอี้' },
  { icon: 'monitor', title: 'คอมพิวเตอร์', text: 'โปรแกรมความรู้อาเซียนและทักษะภาษาอังกฤษ' },
  { icon: 'tv', title: 'จอสัมผัส', text: 'เชื่อมจานดาวเทียม รับชมรายการการศึกษาทางไกล' },
  { icon: 'book', title: 'หนังสืออาเซียน', text: 'ประวัติศาสตร์ สังคม วัฒนธรรม ภาษาของประเทศสมาชิก' },
  { icon: 'lang', title: 'หนังสือภาษาอังกฤษ', text: 'สำหรับนักเรียนประถมและมัธยม' },
];

const TIMELINE = [
  { y: '2557', title: 'เริ่มโครงการ', text: 'ห้องสมุดอาเซียนแห่งแรก ณ โรงเรียนบ้านห้วยมาลัย จังหวัดกาญจนบุรี' },
  { y: '2560', title: 'ขยายสู่ทุกภูมิภาค', text: 'ส่งมอบห้องสมุดเพิ่มในภาคเหนือ อีสาน ตะวันออก และใต้ รวมกว่า 40 แห่ง' },
  { y: '2564', title: 'ครบ 58 จังหวัด', text: 'ณ เดือนมกราคม 2564 ส่งมอบห้องสมุดแล้ว 58 แห่งใน 58 จังหวัด' },
  { y: '2568', title: 'แห่งที่ 76 · นราธิวาส', text: 'ส่งมอบห้องสมุด ณ โรงเรียนนราธิวาส เมื่อ 19 สิงหาคม 2568' },
  { y: '2569', title: 'ครบ 77 จังหวัด', text: 'ห้องสมุดอาเซียนแห่งที่ 77 ทำให้โครงการครอบคลุมทุกจังหวัดของประเทศไทย', hl: true },
];

const WHO: { icon: IconName; text: string }[] = [
  { icon: 'grad', text: 'เยาวชน นักเรียน และนักศึกษา' },
  { icon: 'school', text: 'ครูและบุคลากรทางการศึกษา' },
  { icon: 'users', text: 'ชุมชนและประชาชนทั่วไป' },
  { icon: 'building', text: 'หน่วยงานรัฐและเอกชนที่สนใจศึกษาดูงาน' },
];

export default async function AboutPage() {
  const libraries = await getLibraries();
  return (
    <>
      <PageHero
        tag="ที่มาของห้องสมุดอาเซียน"
        tagIcon="library"
        title="1 จังหวัด 1 โรงเรียน 1 ห้องสมุดอาเซียน"
        lead="โครงการของกรมอาเซียน กระทรวงการต่างประเทศ เพื่อประชาชนและเยาวชนไทย เริ่มต้นปี 2557 และส่งมอบครบ 77 จังหวัดในปี 2569"
        crumbs={[{ label: 'เกี่ยวกับ' }]}
      />

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container intro">
          <div className="pic">
            <Image src="/images/lib-interior.jpg" alt="ภายในห้องสมุดอาเซียน" width={600} height={450} sizes="(max-width: 1100px) 100vw, 590px" preload />
            <div className="badge"><b>2557</b><span>ปีที่เริ่มโครงการ</span></div>
          </div>
          <div>
            <span className="sec-head" style={{ display: 'block', margin: 0, textAlign: 'left' }}>
              <span className="tag"><Icon name="flag" /> ที่มา</span>
            </span>
            <h2>เตรียมเยาวชนและชุมชนไทยให้พร้อมสู่ประชาคมอาเซียน</h2>
            <p>
              ในปี 2557 กระทรวงการต่างประเทศ โดยกรมอาเซียน ได้ริเริ่มโครงการ “1 จังหวัด 1 โรงเรียน 1 ห้องสมุดอาเซียน
              เพื่อประชาชนและเยาวชนไทย” เพื่อเตรียมความพร้อมให้เยาวชน ประชาชน และชุมชนท้องถิ่นเข้าสู่ประชาคมอาเซียน
            </p>
            <p>
              โครงการคัดเลือกโรงเรียนระดับประถมและมัธยมที่เหมาะสมในแต่ละจังหวัด รวมถึงโรงเรียนในพื้นที่ห่างไกลและพื้นที่ชายแดน
              แล้วจัดตั้งห้องสมุดอาเซียนที่มีทั้งหนังสือ สื่อการสอน บอร์ดนิทรรศการ และอุปกรณ์การเรียนรู้
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
              <Link className="btn btn-navy" href="/network">ดูห้องสมุดทั้ง {libraries.length} แห่ง <Icon name="arrow" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <SectionHead tag="วัตถุประสงค์" icon="sparkles" tone="green" title="ห้องสมุดอาเซียนมีไว้เพื่ออะไร" />
          <div className="objectives">
            {OBJECTIVES.map((o) => (
              <div key={o.title} className="obj"><h3>{o.title}</h3><p>{o.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead tag="ภายในห้องสมุด" icon="book" tone="gold" title="ในห้องสมุดอาเซียนมีอะไรบ้าง" lead="ทุกแห่งได้รับมอบชุดสื่อและอุปกรณ์มาตรฐานเดียวกัน" />
          <div className="kit">
            {KIT.map((k) => (
              <div key={k.title}><div className="ic"><Icon name={k.icon} /></div><b>{k.title}</b><span>{k.text}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <SectionHead tag="เส้นทางโครงการ" icon="clock" title="จากแห่งแรกสู่ครบ 77 จังหวัด" />
          <div className="timeline">
            {TIMELINE.map((t) => (
              <div key={t.y} className={t.hl ? 'tl hl' : 'tl'}>
                <div className="y">{t.y}</div>
                <div className="c"><b>{t.title}</b><p>{t.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead tag="กลุ่มเป้าหมาย" icon="users" tone="green" title="ห้องสมุดนี้เปิดให้ใคร" />
          <div className="who">
            {WHO.map((w) => (
              <div key={w.text}><Icon name={w.icon} /><b>{w.text}</b></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>ค้นหาห้องสมุดอาเซียนในจังหวัดของคุณ</h2>
              <p>ดูรายชื่อโรงเรียน เบอร์ติดต่อ และข่าวพิธีเปิดของห้องสมุดทั้ง {libraries.length} แห่ง</p>
            </div>
            <div className="acts">
              <Link className="btn btn-gold" href="/network">ค้นหาห้องสมุด <Icon name="arrow" /></Link>
              <Link className="btn btn-ghost" href="/contact">ติดต่อเรา</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
