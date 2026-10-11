// ข้อความที่ใช้แสดงในหลังบ้าน
import type { IconName } from '@/components/icon-sprite';

export const TOPIC: Record<string, string> = {
  visit: 'ขอศึกษาดูงาน',
  info: 'สอบถามข้อมูลโครงการ',
  event: 'จัดกิจกรรมร่วมกัน',
  other: 'อื่น ๆ',
};

export const REGION_LABEL: Record<string, string> = {
  north: 'ภาคเหนือ',
  northeast: 'ภาคตะวันออกเฉียงเหนือ',
  central: 'ภาคกลาง',
  east: 'ภาคตะวันออก',
  south: 'ภาคใต้',
};

export const ALBUM_CATEGORY: Record<string, string> = {
  opening: 'พิธีเปิด',
  activity: 'กิจกรรม',
  library: 'ภายในห้องสมุด',
};

export const NEWS_CATEGORY: Record<string, string> = { opening: 'พิธีเปิดห้องสมุด', activity: 'กิจกรรม' };

export const TONE_LABEL: Record<string, string> = { navy: 'น้ำเงิน', green: 'เขียว', gold: 'ทอง', blue: 'ฟ้า' };

/** ไอคอนที่ใช้แทนรูปปกได้ */
export const COVER_ICONS: IconName[] = [
  'library', 'book', 'school', 'users', 'globe', 'flag', 'shield', 'trend', 'heart', 'handshake',
  'footprints', 'bulb', 'sparkles', 'grad', 'board', 'link', 'images',
];

export const when = (iso: string) =>
  new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Bangkok' }).format(new Date(iso));

/** วันที่ในฐานข้อมูล (YYYY-MM-DD) เป็นวันที่ไทยแบบสั้น หรือแค่ พ.ศ. */
export function dbDate(iso: string | null, precision: string | null) {
  if (!iso) return '–';
  const d = new Date(`${iso}T00:00:00+07:00`);
  if (precision === 'year') return `พ.ศ. ${d.getFullYear() + 543}`;
  return new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeZone: 'Asia/Bangkok' }).format(d);
}
