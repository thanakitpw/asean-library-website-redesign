'use client';

import { useActionState } from 'react';

import { sendContactMessage, type ContactState } from '@/app/(site)/contact/actions';

import { Icon } from './Icon';

const TOPICS = [
  { value: 'visit', label: 'ขอศึกษาดูงาน' },
  { value: 'info', label: 'สอบถามข้อมูลโครงการ' },
  { value: 'event', label: 'จัดกิจกรรมร่วมกัน' },
  { value: 'other', label: 'อื่น ๆ' },
];

/** บันทึกลงตาราง contact_messages ใน Supabase (ดูได้ใน dashboard) */
export function ContactForm({ provinces }: { provinces: string[] }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContactMessage, { status: 'idle' });
  // ถ้าส่งไม่สำเร็จ คงค่าที่กรอกไว้ (React ล้างฟอร์มให้หลัง action ทุกครั้ง)
  const v = state.status === 'error' ? state.values : undefined;

  return (
    <form className="form" action={action}>
      <h2>ส่งข้อความถึงเรา</h2>
      <p>เจ้าหน้าที่จะติดต่อกลับทางอีเมลหรือโทรศัพท์</p>
      <div className="fgrid">
        <div className="field full">
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-2)' }}>เรื่องที่ต้องการติดต่อ</span>
          <div className="topics" role="radiogroup" aria-label="เรื่องที่ต้องการติดต่อ">
            {TOPICS.map((t, n) => (
              <label key={t.value}>
                <input type="radio" name="topic" value={t.value} defaultChecked={v ? v.topic === t.value : n === 0} />
                <span>{t.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-name">ชื่อ-นามสกุล <i>*</i></label>
          <input id="f-name" name="name" required maxLength={200} autoComplete="name" defaultValue={v?.name} />
        </div>
        <div className="field">
          <label htmlFor="f-org">โรงเรียน / หน่วยงาน</label>
          <input id="f-org" name="org" maxLength={200} autoComplete="organization" defaultValue={v?.org} />
        </div>
        <div className="field">
          <label htmlFor="f-email">อีเมล <i>*</i></label>
          <input id="f-email" name="email" type="email" required maxLength={320} autoComplete="email" defaultValue={v?.email} />
        </div>
        <div className="field">
          <label htmlFor="f-tel">เบอร์โทรศัพท์</label>
          <input id="f-tel" name="tel" type="tel" maxLength={40} autoComplete="tel" defaultValue={v?.tel} />
        </div>
        <div className="field full">
          <label htmlFor="f-prov">จังหวัด</label>
          <select id="f-prov" name="province" defaultValue={v?.province ?? ''}>
            <option value="">เลือกจังหวัด</option>
            {provinces.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="field full">
          <label htmlFor="f-msg">ข้อความ <i>*</i></label>
          <textarea id="f-msg" name="message" required maxLength={5000} defaultValue={v?.message} placeholder="เช่น ต้องการพานักเรียน 40 คนไปศึกษาดูงานห้องสมุดอาเซียนช่วงเดือน..." />
        </div>
        <label className="consent">
          <input type="checkbox" name="consent" required defaultChecked={!!v} /> ยินยอมให้กรมอาเซียนเก็บและใช้ข้อมูลข้างต้นเพื่อติดต่อกลับตามนโยบายคุ้มครองข้อมูลส่วนบุคคล
        </label>
      </div>
      <label className="hp" aria-hidden="true">
        เว็บไซต์ <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="btn btn-navy" type="submit" disabled={pending}>
        <Icon name="send" /> {pending ? 'กำลังส่ง…' : 'ส่งข้อความ'}
      </button>
      <div className={`sent${state.status !== 'idle' ? ' show' : ''}${state.status === 'error' ? ' err' : ''}`} role="status">
        {state.status === 'sent' && <><Icon name="check" /> ได้รับข้อความแล้ว ขอบคุณที่ติดต่อเรา เจ้าหน้าที่จะติดต่อกลับโดยเร็ว</>}
        {state.status === 'error' && state.message}
      </div>
    </form>
  );
}
