import type { Library, PubDate, Zone } from '@/lib/types';

const SHORT = new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' });
const LONG = new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Bangkok' });

/** "25 ส.ค. 2568" หรือ "พ.ศ. 2565" เมื่อรู้แค่ปี */
export function thaiDate(d: PubDate, style: 'short' | 'long' = 'short') {
  const date = new Date(d.iso);
  if (d.precision === 'year') return `พ.ศ. ${date.getUTCFullYear() + 543}`;
  return (style === 'long' ? LONG : SHORT).format(date);
}

export const ZONES: { slug: Zone; name: string; label: string; provinces: number }[] = [
  { slug: 'north', name: 'ภาคเหนือ', label: 'ภาคเหนือ', provinces: 16 },
  { slug: 'northeast', name: 'ภาคตะวันออกเฉียงเหนือ', label: 'ภาคอีสาน', provinces: 20 },
  { slug: 'central', name: 'ภาคกลาง', label: 'ภาคกลาง', provinces: 15 },
  { slug: 'east', name: 'ภาคตะวันออก', label: 'ภาคตะวันออก', provinces: 7 },
  { slug: 'west', name: 'ภาคตะวันตก', label: 'ภาคตะวันตก', provinces: 5 },
  { slug: 'south', name: 'ภาคใต้', label: 'ภาคใต้', provinces: 14 },
];

// ในฐานข้อมูลยังเก็บ 5 ภาค (จังหวัดเหล่านี้อยู่ในภาคเหนือ/ภาคกลาง) จึงแยกภาคตะวันตกตอนแสดงผล
const WEST_PROVINCES = ['ตาก', 'กาญจนบุรี', 'ราชบุรี', 'เพชรบุรี', 'ประจวบคีรีขันธ์'];

export const zoneOf = (l: Pick<Library, 'region' | 'province'>): Zone =>
  WEST_PROVINCES.includes(l.province) ? 'west' : l.region;

export const zoneName = (z: Zone) => ZONES.find((x) => x.slug === z)!.name;

export const TOTAL_PROVINCES = 77;
