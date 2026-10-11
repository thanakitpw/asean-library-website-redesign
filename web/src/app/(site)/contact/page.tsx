import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { CONTACT, SOCIAL } from '@/components/nav';
import { PageHero, SectionHead } from '@/components/PageHero';
import { getLibraries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description: 'ติดต่อโครงการห้องสมุดอาเซียน กรมอาเซียน กระทรวงการต่างประเทศ เพื่อสอบถามข้อมูล ขอศึกษาดูงาน หรือจัดกิจกรรมร่วมกัน',
};

const FAQ = [
  {
    q: 'ประชาชนทั่วไปเข้าใช้ห้องสมุดอาเซียนได้หรือไม่',
    a: (
      <>
        ได้ ห้องสมุดอาเซียนเปิดให้ชุมชนและประชาชนทั่วไปเข้าใช้บริการ เนื่องจากห้องสมุดตั้งอยู่ในโรงเรียน
        กรุณาติดต่อโรงเรียนล่วงหน้าเพื่อสอบถามวันและเวลาเปิด ดูเบอร์โทรของแต่ละโรงเรียนได้ที่หน้า{' '}
        <Link href="/network" style={{ color: 'var(--navy)', fontWeight: 500 }}>เครือข่ายห้องสมุด</Link>
      </>
    ),
  },
  { q: 'ขอศึกษาดูงานห้องสมุดอาเซียนต้องทำอย่างไร', a: 'กรอกแบบฟอร์มด้านบนโดยเลือกหัวข้อ “ขอศึกษาดูงาน” พร้อมระบุจำนวนผู้เข้าร่วมและช่วงเวลาที่สะดวก เจ้าหน้าที่จะประสานกับโรงเรียนให้' },
  { q: 'โรงเรียนของเราต้องการเป็นห้องสมุดอาเซียนได้หรือไม่', a: 'โครงการจัดตั้งห้องสมุดอาเซียนจังหวัดละ 1 แห่ง ซึ่งครบทั้ง 77 จังหวัดแล้ว โรงเรียนที่สนใจร่วมกิจกรรมหรือรับสื่อความรู้เกี่ยวกับอาเซียนสามารถติดต่อกรมอาเซียนได้' },
  {
    q: 'ติดตามข่าวพิธีเปิดและกิจกรรมได้ที่ไหน',
    a: (
      <>
        ดูได้ที่หน้า <Link href="/news" style={{ color: 'var(--navy)', fontWeight: 500 }}>ข่าวสาร</Link> และเพจ Facebook ASEAN Thailand ของกรมอาเซียน
      </>
    ),
  },
];

export default async function ContactPage() {
  const libraries = await getLibraries();
  const provinces = [...new Set(libraries.map((l) => l.province))].sort((a, b) => a.localeCompare(b, 'th'));

  return (
    <>
      <PageHero
        tint
        tag="ติดต่อเรา"
        tagIcon="phone"
        title="ติดต่อโครงการห้องสมุดอาเซียน"
        lead="สอบถามข้อมูลโครงการ ขอศึกษาดูงาน หรือเสนอจัดกิจกรรมส่งเสริมความรู้เกี่ยวกับอาเซียน"
        crumbs={[{ label: 'ติดต่อ' }]}
      />
      <section className="page-body tint">
        <div className="container contact-grid">
          <div className="c-cards">
            <div className="c-card">
              <div className="ic"><Icon name="pin" /></div>
              <div><small>ที่อยู่</small><b>{CONTACT.org}<br />{CONTACT.address}</b></div>
            </div>
            <div className="c-card">
              <div className="ic"><Icon name="phone" /></div>
              <div>
                <small>โทรศัพท์</small><b><a href={CONTACT.tel}>{CONTACT.phone}</a></b>
                <small style={{ marginTop: 4 }}>{CONTACT.hours}</small>
              </div>
            </div>
            <div className="c-card">
              <div className="ic"><Icon name="globe" /></div>
              <div>
                <small>เว็บไซต์และโซเชียล</small><b>{CONTACT.website}</b>
                <div className="share" style={{ marginTop: 10, paddingTop: 0, border: 0 }}>
                  <a href={SOCIAL.facebook} aria-label="Facebook ASEAN Thailand"><Icon name="fb" /></a>
                  <a href={SOCIAL.x} aria-label="X ASEAN_THAILAND"><Icon name="x" /></a>
                  <a href={SOCIAL.instagram} aria-label="Instagram aseanthailand"><Icon name="ig" /></a>
                </div>
              </div>
            </div>
            <div className="map">
              <div>
                <div className="pinbig"><Icon name="pin" /></div>
                <b>กระทรวงการต่างประเทศ ถนนศรีอยุธยา</b>
                <br />
                <a
                  className="link-more"
                  style={{ marginTop: 12 }}
                  href={`https://maps.google.com/?q=${encodeURIComponent('กระทรวงการต่างประเทศ ถนนศรีอยุธยา')}`}
                >
                  เปิดใน Google Maps <Icon name="arrow" />
                </a>
              </div>
            </div>
          </div>
          <ContactForm provinces={provinces} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead tag="คำถามที่พบบ่อย" icon="bulb" title="ก่อนติดต่อ ลองดูคำตอบเหล่านี้" />
          <div className="faq">
            {FAQ.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q} <Icon name="chev-r" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
