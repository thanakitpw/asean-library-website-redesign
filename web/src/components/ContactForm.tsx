'use client';

import { useState } from 'react';

import { Icon } from './Icon';

const TOPICS = [
  { value: 'visit', label: 'ขอศึกษาดูงาน' },
  { value: 'info', label: 'สอบถามข้อมูลโครงการ' },
  { value: 'event', label: 'จัดกิจกรรมร่วมกัน' },
  { value: 'other', label: 'อื่น ๆ' },
];

/** ยังไม่ส่งข้อมูลจริง — จะต่อกับ Server Action + ฐานข้อมูล/อีเมลในขั้นถัดไป */
export function ContactForm({ provinces }: { provinces: string[] }) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!e.currentTarget.reportValidity()) return;
        setSent(true);
        e.currentTarget.reset();
      }}
    >
      <h2>ส่งข้อความถึงเรา</h2>
      <p>เจ้าหน้าที่จะติดต่อกลับทางอีเมลหรือโทรศัพท์</p>
      <div className="fgrid">
        <div className="field full">
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-2)' }}>เรื่องที่ต้องการติดต่อ</span>
          <div className="topics" role="radiogroup" aria-label="เรื่องที่ต้องการติดต่อ">
            {TOPICS.map((t, n) => (
              <label key={t.value}>
                <input type="radio" name="topic" value={t.value} defaultChecked={n === 0} />
                <span>{t.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-name">ชื่อ-นามสกุล <i>*</i></label>
          <input id="f-name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="f-org">โรงเรียน / หน่วยงาน</label>
          <input id="f-org" name="org" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="f-email">อีเมล <i>*</i></label>
          <input id="f-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="f-tel">เบอร์โทรศัพท์</label>
          <input id="f-tel" name="tel" type="tel" autoComplete="tel" />
        </div>
        <div className="field full">
          <label htmlFor="f-prov">จังหวัด</label>
          <select id="f-prov" name="province" defaultValue="">
            <option value="">เลือกจังหวัด</option>
            {provinces.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="field full">
          <label htmlFor="f-msg">ข้อความ <i>*</i></label>
          <textarea id="f-msg" name="message" required placeholder="เช่น ต้องการพานักเรียน 40 คนไปศึกษาดูงานห้องสมุดอาเซียนช่วงเดือน..." />
        </div>
        <label className="consent">
          <input type="checkbox" required /> ยินยอมให้กรมอาเซียนเก็บและใช้ข้อมูลข้างต้นเพื่อติดต่อกลับตามนโยบายคุ้มครองข้อมูลส่วนบุคคล
        </label>
      </div>
      <button className="btn btn-navy" type="submit"><Icon name="send" /> ส่งข้อความ</button>
      <div className={sent ? 'sent show' : 'sent'} role="status">
        {sent && <><Icon name="check" /> ได้รับข้อความแล้ว ขอบคุณที่ติดต่อเรา (ตัวอย่าง: ยังไม่ได้ส่งจริง)</>}
      </div>
    </form>
  );
}
