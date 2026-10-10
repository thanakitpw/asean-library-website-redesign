import type { GlossaryGroup, Term } from '@/lib/types';

export const GLOSSARY_GROUPS: { slug: GlossaryGroup; name: string }[] = [
  { slug: 'meet', name: 'การประชุม' },
  { slug: 'pillar', name: 'ประชาคมอาเซียน' },
  { slug: 'coop', name: 'ความร่วมมือ' },
];

export const GLOSSARY: Term[] = [
  { slug: 'retreat', abbr: 'Retreat', name: 'Retreat', full: "ASEAN Foreign Ministers' Retreat", groups: ['meet'],
    definition: 'การประชุมอย่างไม่เป็นทางการของรัฐมนตรีต่างประเทศอาเซียน จัดขึ้นเพื่อหารือประเด็นสำคัญของภูมิภาคอย่างเปิดกว้าง โดยไม่มีวาระที่เป็นทางการ' },
  { slug: 'amm-pmc', abbr: 'AMM', name: 'AMM-PMC', full: 'ASEAN Ministerial Meeting / Post Ministerial Conferences', groups: ['meet'],
    definition: 'การประชุมรัฐมนตรีต่างประเทศอาเซียน และการประชุมกับประเทศคู่เจรจาที่จัดต่อเนื่องกัน' },
  { slug: 'jcm', abbr: 'JCM', name: 'JCM', full: 'ASEAN Joint Consultative Meeting', groups: ['meet'],
    definition: 'การประชุมหารือร่วมของเจ้าหน้าที่อาวุโสจากทั้ง 3 เสาของอาเซียน เพื่อประสานงานข้ามสาขา' },
  { slug: 'som', abbr: 'SOM', name: 'SOM', full: "Senior Officials' Meeting", groups: ['meet'],
    definition: 'การประชุมเจ้าหน้าที่อาวุโส จัดก่อนการประชุมระดับรัฐมนตรีเพื่อเตรียมประเด็นหารือ' },
  { slug: 'arf', abbr: 'ARF', name: 'ARF', full: 'ASEAN Regional Forum', groups: ['meet'],
    definition: 'เวทีหารือด้านการเมืองและความมั่นคงในภูมิภาคเอเชีย-แปซิฟิก ประชุมครั้งแรกที่กรุงเทพฯ ปี 2537' },
  { slug: 'eas', abbr: 'EAS', name: 'EAS', full: 'East Asia Summit', groups: ['meet'],
    definition: 'การประชุมสุดยอดเอเชียตะวันออก เวทีหารือระดับผู้นำระหว่างอาเซียนกับประเทศสำคัญในภูมิภาค' },
  { slug: 'apsc', abbr: 'APSC', name: 'APSC', full: 'ASEAN Political-Security Community', groups: ['pillar'],
    definition: 'ประชาคมการเมืองและความมั่นคงอาเซียน หนึ่งใน 3 เสาหลักของประชาคมอาเซียน' },
  { slug: 'aec', abbr: 'AEC', name: 'AEC', full: 'ASEAN Economic Community', groups: ['pillar'],
    definition: 'ประชาคมเศรษฐกิจอาเซียน มุ่งสู่ตลาดและฐานการผลิตเดียว' },
  { slug: 'ascc', abbr: 'ASCC', name: 'ASCC', full: 'ASEAN Socio-Cultural Community', groups: ['pillar'],
    definition: 'ประชาคมสังคมและวัฒนธรรมอาเซียน ยึดประชาชนเป็นศูนย์กลาง' },
  { slug: 'rcep', abbr: 'RCEP', name: 'RCEP', full: 'Regional Comprehensive Economic Partnership', groups: ['coop'],
    definition: 'ความตกลงหุ้นส่วนทางเศรษฐกิจระดับภูมิภาค ระหว่างอาเซียนกับประเทศคู่ค้าสำคัญ' },
  { slug: 'acai', abbr: 'ACAI', name: 'ACAI', full: 'ASEAN Centre for Active Ageing and Innovation', groups: ['coop'],
    definition: 'ศูนย์อาเซียนเพื่อผู้สูงวัยอย่างมีศักยภาพและนวัตกรรม ตั้งอยู่ในประเทศไทย' },
  { slug: 'marine-debris', abbr: 'SEA', name: 'Marine Debris', full: 'ASEAN Framework of Action on Marine Debris', groups: ['coop'],
    definition: 'กรอบปฏิบัติการอาเซียนว่าด้วยการจัดการขยะทะเล' },
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
