import type { Metadata } from 'next';
import Link from 'next/link';

import { Icon } from '@/components/Icon';
import { CONTACT, SOCIAL } from '@/components/nav';

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description: 'ที่อยู่ แผนที่ เบอร์โทรศัพท์ และช่องทางติดต่อโครงการห้องสมุดอาเซียน กรมอาเซียน กระทรวงการต่างประเทศ',
};

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.2624071987907!2d100.52265621414314!3d13.763042900742548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2994beb8d7399%3A0x3af06b6c03b3fef4!2z4LiB4Lij4Liw4LiX4Lij4Lin4LiH4LiB4Liy4Lij4LiV4LmI4Liy4LiH4Lib4Lij4Liw4LmA4LiX4Lio!5e0!3m2!1sth!2sth!4v1605342378523!5m2!1sth!2sth';

export default function ContactPage() {
  return (
    <section className="contact-page">
      <div className="container">
        <nav className="crumb" aria-label="breadcrumb">
          <Link href="/">หน้าแรก</Link>
          <Icon name="chev-r" />
          <span aria-current="page">ติดต่อเรา</span>
        </nav>
        <h1>ติดต่อเรา</h1>
        <iframe
          className="contact-map"
          src={MAP_EMBED}
          title="แผนที่กระทรวงการต่างประเทศ ถนนศรีอยุธยา"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="contact-info">
          <Icon name="pin" />
          <div>
            <address>ที่อยู่ {CONTACT.address}</address>
            <p><b>โทรศัพท์</b> <a href={CONTACT.tel}>{CONTACT.phone}</a></p>
            <p><b>Website</b> <a href={`https://${CONTACT.website}`} target="_blank" rel="noopener">{CONTACT.website}</a></p>
            <ul>
              <li><a href={SOCIAL.facebook} target="_blank" rel="noopener"><span className="soc fb"><Icon name="fb" /></span>: ASEAN Thailand</a></li>
              <li><a href={SOCIAL.x} target="_blank" rel="noopener"><span className="soc x"><Icon name="x" /></span>: ASEAN_THAILAND</a></li>
              <li><a href={SOCIAL.instagram} target="_blank" rel="noopener"><span className="soc ig"><Icon name="ig" /></span>: aseanthailand</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
