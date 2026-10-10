import Link from 'next/link';

import { Icon } from '@/components/Icon';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center', maxWidth: 640 }}>
        <div className="sec-head">
          <span className="tag"><Icon name="search" /> 404</span>
          <h2>ไม่พบหน้าที่คุณต้องการ</h2>
          <p>หน้านี้อาจถูกย้ายหรือลบไปแล้ว ลองกลับไปหน้าแรกหรือค้นหาห้องสมุดใกล้บ้าน</p>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn btn-navy" href="/">กลับหน้าแรก</Link>
          <Link className="btn btn-gold" href="/network">ค้นหาห้องสมุด <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>
  );
}
