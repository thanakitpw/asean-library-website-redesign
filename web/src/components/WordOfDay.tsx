'use client';

import Link from 'next/link';
import { useState } from 'react';

import type { Term } from '@/lib/types';

import { Icon } from './Icon';

/** การ์ด “คำศัพท์วันนี้” พร้อมปุ่มสุ่มคำ */
export function WordOfDay({ terms, moreHref }: { terms: Term[]; moreHref: string }) {
  const [n, setN] = useState(0);
  const t = terms[n];
  const shuffle = () => setN((cur) => (cur + 1 + Math.floor(Math.random() * (terms.length - 1))) % terms.length);

  return (
    <div className="wotd">
      <div>
        <span className="lbl"><Icon name="sparkles" /> คำศัพท์วันนี้</span>
        <div className="term" aria-live="polite">{t.name}</div>
        <div className="full">{t.full}</div>
        <p className="def">{t.definition}</p>
      </div>
      <div className="acts">
        <button type="button" className="btn btn-dark" onClick={shuffle}><Icon name="refresh" /> สุ่มคำใหม่</button>
        <Link className="btn btn-outline" href={moreHref}>อ่านเพิ่มเติม</Link>
      </div>
    </div>
  );
}
