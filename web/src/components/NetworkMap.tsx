'use client';

import Image from 'next/image';

import type { Zone } from '@/lib/types';

// แผนที่ภาคจากหน้า “เครือข่ายห้องสมุดอาเซียน” ของเว็บเดิม: ตำแหน่งชิ้นแผนที่อิงพื้นที่ 500×900
// ภาคกลางกับภาคตะวันออกเป็นคนละชิ้น แต่เว็บนี้รวมเป็นภาคเดียว (zoneOf)
const PIECES: { id: number; zone: Zone; label: string; x: number; y: number; w: number; h: number }[] = [
  { id: 1, zone: 'north', label: 'ภาคเหนือ', x: 0, y: 0, w: 250, h: 323 },
  { id: 3, zone: 'northeast', label: 'ภาคตะวันออกเฉียงเหนือ', x: 199, y: 118, w: 270, h: 255.5 },
  { id: 2, zone: 'central', label: 'ภาคกลาง', x: 45, y: 280, w: 190, h: 274 },
  { id: 4, zone: 'central', label: 'ภาคตะวันออก', x: 197, y: 351, w: 118, h: 166.5 },
  { id: 6, zone: 'south', label: 'ภาคใต้', x: 34, y: 548, w: 217, h: 278 },
];

// เลขกำกับจังหวัดเล็ก ๆ ในภาคกลางบนแผนที่
const CENTRAL_KEY = ['กรุงเทพมหานคร', 'นนทบุรี', 'ปทุมธานี', 'นครปฐม', 'สมุทรปราการ', 'สมุทรสาคร', 'สมุทรสงคราม', 'พระนครศรีอยุธยา', 'อ่างทอง', 'สิงห์บุรี'];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function NetworkMap({ active, onPick }: { active: Zone | 'all'; onPick: (z: Zone) => void }) {
  return (
    <div className="netmap" role="group" aria-label="แผนที่เลือกภาค">
      {PIECES.map((p) => (
        <button
          key={p.id}
          type="button"
          className={active === p.zone ? 'piece on' : 'piece'}
          style={{ left: pct(p.x, 500), top: pct(p.y, 900), width: pct(p.w, 500), zIndex: p.id === 2 ? 1 : undefined }}
          aria-pressed={active === p.zone}
          aria-label={`ดูห้องสมุด${p.label}`}
          onClick={() => onPick(p.zone)}
        >
          <Image src={`/images/map/region-${p.id}.png`} alt="" width={p.w * 2} height={p.h * 2} sizes="(max-width: 860px) 60vw, 240px" />
          <Image className="hl" src={`/images/map/region-${p.id}-hover.png`} alt="" width={p.w * 2} height={p.h * 2} sizes="(max-width: 860px) 60vw, 240px" />
        </button>
      ))}
      <ol className="key">
        {CENTRAL_KEY.map((name) => <li key={name}>{name}</li>)}
      </ol>
    </div>
  );
}
