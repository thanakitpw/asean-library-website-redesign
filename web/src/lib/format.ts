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
  { slug: 'north', name: 'ภาคเหนือ', label: 'ภาคเหนือ', provinces: 17 },
  { slug: 'northeast', name: 'ภาคตะวันออกเฉียงเหนือ', label: 'ภาคอีสาน', provinces: 20 },
  { slug: 'central', name: 'ภาคกลางและตะวันออก', label: 'กลางและตะวันออก', provinces: 26 },
  { slug: 'south', name: 'ภาคใต้', label: 'ภาคใต้', provinces: 14 },
];

export const zoneOf = (l: Pick<Library, 'region'>): Zone => (l.region === 'east' ? 'central' : l.region);

export const zoneName = (z: Zone) => ZONES.find((x) => x.slug === z)!.name;

export const TOTAL_PROVINCES = 77;
