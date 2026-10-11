// ข้อมูลอ้างอิงที่ผูกกับโค้ด (ชนิดข้อมูล ไอคอน สี) — ไม่อยู่ในฐานข้อมูล
// ถ้าเพิ่มหมวด ต้องแก้ check constraint ใน supabase/migrations ด้วย
import type { ArticleCategory, CategoryInfo, GlossaryGroup } from '@/lib/types';

export const ARTICLE_CATEGORIES: CategoryInfo<ArticleCategory>[] = [
  { slug: 'about', name: 'เกี่ยวกับอาเซียน', short: 'เกี่ยวกับอาเซียน', desc: 'ประวัติ กฎบัตร และ 10 ประเทศสมาชิก', icon: 'globe', tone: 'navy' },
  { slug: 'apsc', name: 'เสาการเมืองและความมั่นคง', short: 'การเมืองและความมั่นคง', desc: 'APSC ภูมิภาคที่สงบสุขและมีเสถียรภาพ', icon: 'shield', tone: 'navy' },
  { slug: 'aec', name: 'เสาเศรษฐกิจ', short: 'เศรษฐกิจ', desc: 'AEC ตลาดและฐานการผลิตเดียว', icon: 'trend', tone: 'green' },
  { slug: 'ascc', name: 'เสาสังคมและวัฒนธรรม', short: 'สังคมและวัฒนธรรม', desc: 'ASCC ประชาชนเป็นศูนย์กลาง', icon: 'heart', tone: 'gold' },
  { slug: 'ext', name: 'อาเซียนกับภาคีภายนอก', short: 'ภาคีภายนอก', desc: 'ความร่วมมือกับประเทศคู่เจรจา', icon: 'handshake', tone: 'blue' },
  { slug: 'move', name: 'ก้าวไปกับอาเซียน', short: 'ก้าวไปกับอาเซียน', desc: 'เตรียมเยาวชนไทยสู่ประชาคมอาเซียน', icon: 'footprints', tone: 'gold' },
];

export const GLOSSARY_GROUPS: { slug: GlossaryGroup; name: string }[] = [
  { slug: 'meet', name: 'การประชุม' },
  { slug: 'pillar', name: 'ประชาคมอาเซียน' },
  { slug: 'coop', name: 'ความร่วมมือ' },
];

export const DIAL_CODES: { country: string; code: string }[] = [
  { country: 'ไทย', code: '+66' },
  { country: 'บรูไนดารุสซาลาม', code: '+673' },
  { country: 'กัมพูชา', code: '+855' },
  { country: 'อินโดนีเซีย', code: '+62' },
  { country: 'สปป.ลาว', code: '+856' },
  { country: 'มาเลเซีย', code: '+60' },
  { country: 'เมียนมา', code: '+95' },
  { country: 'ฟิลิปปินส์', code: '+63' },
  { country: 'สิงคโปร์', code: '+65' },
  { country: 'เวียดนาม', code: '+84' },
];

export const MEMBER_COUNTRIES: { code: string; th: string; en: string }[] = [
  { code: 'TH', th: 'ไทย', en: 'Thailand' },
  { code: 'BN', th: 'บรูไน', en: 'Brunei' },
  { code: 'KH', th: 'กัมพูชา', en: 'Cambodia' },
  { code: 'ID', th: 'อินโดนีเซีย', en: 'Indonesia' },
  { code: 'LA', th: 'ลาว', en: 'Lao PDR' },
  { code: 'MY', th: 'มาเลเซีย', en: 'Malaysia' },
  { code: 'MM', th: 'เมียนมา', en: 'Myanmar' },
  { code: 'PH', th: 'ฟิลิปปินส์', en: 'Philippines' },
  { code: 'SG', th: 'สิงคโปร์', en: 'Singapore' },
  { code: 'VN', th: 'เวียดนาม', en: 'Viet Nam' },
];
