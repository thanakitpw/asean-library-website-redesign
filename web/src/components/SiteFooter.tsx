import Image from 'next/image';
import Link from 'next/link';

import { ARTICLE_CATEGORIES } from '@/lib/taxonomy';

import { Icon } from './Icon';
import { CONTACT, SOCIAL } from './nav';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div>
            <Link className="brand" href="/">
              <Image src="/images/logo-asean-library.png" alt="" width={56} height={56} />
              <span>
                <b>ห้องสมุดอาเซียน</b>
                <small>กรมอาเซียน กระทรวงการต่างประเทศ</small>
              </span>
            </Link>
            <p>
              โครงการ “1 จังหวัด 1 โรงเรียน 1 ห้องสมุดอาเซียน เพื่อประชาชนและเยาวชนไทย”
              เตรียมความพร้อมเยาวชนและชุมชนไทยสู่ประชาคมอาเซียน ตั้งแต่ปี 2557
            </p>
            <div className="social">
              <a href={SOCIAL.facebook} aria-label="Facebook"><Icon name="fb" /></a>
              <a href={SOCIAL.x} aria-label="X"><Icon name="x" /></a>
              <a href={SOCIAL.instagram} aria-label="Instagram"><Icon name="ig" /></a>
            </div>
          </div>
          <div>
            <h4>เมนู</h4>
            <ul>
              <li><Link href="/">หน้าแรก</Link></li>
              <li><Link href="/about">เกี่ยวกับโครงการ</Link></li>
              <li><Link href="/network">เครือข่ายห้องสมุด 77 แห่ง</Link></li>
              <li><Link href="/news">ข่าวสาร</Link></li>
              <li><Link href="/tips">เกร็ดน่ารู้</Link></li>
              <li><Link href="/gallery">คลังภาพ</Link></li>
              <li><Link href="/contact">ติดต่อ</Link></li>
            </ul>
          </div>
          <div>
            <h4>บทความ</h4>
            <ul>
              {ARTICLE_CATEGORIES.map((c) => (
                <li key={c.slug}><Link href={`/learn?c=${c.slug}#list`}>{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>ติดต่อ</h4>
            <ul className="contact">
              <li><Icon name="pin" /><span>{CONTACT.addressShort}</span></li>
              <li><Icon name="phone" /><a href={CONTACT.tel}>{CONTACT.phone}</a></li>
              <li><Icon name="globe" /><span>{CONTACT.website}</span></li>
              <li><Icon name="clock" /><span>{CONTACT.hours}</span></li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          © 2556–2569 กรมอาเซียน กระทรวงการต่างประเทศ · Department of ASEAN Affairs, Ministry of Foreign Affairs of the Kingdom of Thailand
        </div>
      </div>
    </footer>
  );
}
