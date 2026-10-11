'use server';

import { supabase } from '@/lib/supabase/public';

export type ContactValues = Record<'topic' | 'name' | 'org' | 'email' | 'tel' | 'province' | 'message', string>;

export type ContactState =
  | { status: 'idle' }
  | { status: 'sent' }
  | { status: 'error'; message: string; values: ContactValues };

const TOPICS = ['visit', 'info', 'event', 'other'];
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** บันทึกข้อความจากฟอร์มติดต่อลงตาราง contact_messages */
export async function sendContactMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  const get = (k: string) => String(form.get(k) ?? '').trim();
  const values: ContactValues = {
    topic: get('topic'),
    name: get('name'),
    org: get('org'),
    email: get('email'),
    tel: get('tel'),
    province: get('province'),
    message: get('message'),
  };
  const fail = (message: string): ContactState => ({ status: 'error', message, values });

  // ช่องดักบอท ผู้ใช้จริงมองไม่เห็นช่องนี้
  if (get('website')) return { status: 'sent' };

  if (!TOPICS.includes(values.topic)) return fail('กรุณาเลือกเรื่องที่ต้องการติดต่อ');
  if (!values.name || values.name.length > 200) return fail('กรุณากรอกชื่อ-นามสกุล');
  if (!EMAIL.test(values.email) || values.email.length > 320) return fail('รูปแบบอีเมลไม่ถูกต้อง');
  if (!values.message || values.message.length > 5000) return fail('กรุณากรอกข้อความ (ไม่เกิน 5,000 ตัวอักษร)');
  if (values.org.length > 200 || values.tel.length > 40 || values.province.length > 100)
    return fail('ข้อมูลบางช่องยาวเกินไป');
  if (form.get('consent') !== 'on') return fail('กรุณายินยอมให้เก็บข้อมูลเพื่อติดต่อกลับ');

  const { error } = await supabase()
    .from('contact_messages')
    .insert({
      topic: values.topic,
      name: values.name,
      email: values.email,
      message: values.message,
      org: values.org || null,
      tel: values.tel || null,
      province: values.province || null,
    });
  if (error) {
    console.error('contact_messages insert failed', error);
    return fail('ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือติดต่อทางโทรศัพท์');
  }
  return { status: 'sent' };
}
