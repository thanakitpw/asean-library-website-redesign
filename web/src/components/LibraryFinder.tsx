'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { TOTAL_PROVINCES, ZONES, zoneName, zoneOf } from '@/lib/format';
import type { Library, Zone } from '@/lib/types';

import { Icon } from './Icon';
import { NetworkMap } from './NetworkMap';

type Sort = 'new' | 'old' | 'name';

/** อ่านคำค้นเริ่มต้นจาก ?q= (เช่น ลิงก์จากหน้าข่าว) */
export function LibraryFinder({ libraries }: { libraries: Library[] }) {
  const q = useSearchParams().get('q') ?? '';
  return <LibraryFinderView key={q} libraries={libraries} initialQuery={q} />;
}

export function LibraryFinderView({ libraries, initialQuery = '' }: { libraries: Library[]; initialQuery?: string }) {
  const [zone, setZone] = useState<Zone | 'all'>('all');
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<Sort>('new');

  const counts = useMemo(() => {
    const m = new Map<Zone, number>();
    for (const l of libraries) m.set(zoneOf(l), (m.get(zoneOf(l)) ?? 0) + 1);
    return m;
  }, [libraries]);

  const rows = useMemo(() => {
    const t = query.trim().toLowerCase();
    const r = libraries.filter(
      (l) => (zone === 'all' || zoneOf(l) === zone) && (!t || `${l.province} ${l.school}`.toLowerCase().includes(t)),
    );
    if (sort === 'name') return r.sort((a, b) => a.province.localeCompare(b.province, 'th'));
    const dir = sort === 'new' ? -1 : 1;
    return r.sort((a, b) => dir * (Number(a.year) - Number(b.year) || (a.no ?? 0) - (b.no ?? 0)));
  }, [libraries, zone, query, sort]);

  return (
    <>
      <div className="progress has-map">
        <NetworkMap active={zone} onPick={(z) => setZone(zone === z ? 'all' : z)} />
        <div className="side">
          <p className="map-hint"><Icon name="pin" /> คลิกเลือกภาคบนแผนที่ หรือกดปุ่มด้านล่าง เพื่อดูห้องสมุดในภาคนั้น</p>
          <div className="big">
            <b>
              {libraries.length}
              <span style={{ fontSize: 24, color: 'var(--text-3)', fontWeight: 500 }}> / {TOTAL_PROVINCES}</span>
            </b>
            <span>จังหวัดมีห้องสมุดอาเซียนแล้ว</span>
          </div>
          <div className="regions" role="group" aria-label="กรองตามภาค">
            {ZONES.map((z) => {
              const have = counts.get(z.slug) ?? 0;
              const on = zone === z.slug;
              return (
                <button
                  key={z.slug}
                  type="button"
                  className={`region r-${z.slug}${on ? ' on' : ''}`}
                  aria-pressed={on}
                  onClick={() => setZone(on ? 'all' : z.slug)}
                >
                  <b>{have}</b>
                  <span>{z.label} · {z.provinces} จังหวัด</span>
                  <div className="bar"><i style={{ width: `${Math.round((have / z.provinces) * 100)}%` }} /></div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="toolbar" style={{ marginTop: 36 }}>
        <label className="search" style={{ flex: 1, maxWidth: 520 }}>
          <Icon name="search" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="พิมพ์ชื่อจังหวัดหรือโรงเรียน เช่น เชียงใหม่"
            aria-label="ค้นหาห้องสมุด"
          />
        </label>
        <label className="search" style={{ minWidth: 0, paddingRight: 8 }}>
          <span style={{ fontSize: 14, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>เรียงตาม</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            style={{ border: 0, font: 'inherit', fontSize: 15, background: 'none', color: 'var(--navy)', fontWeight: 500, cursor: 'pointer', outline: 0 }}
          >
            <option value="new">เปิดล่าสุด</option>
            <option value="old">เปิดก่อน</option>
            <option value="name">ชื่อจังหวัด ก–ฮ</option>
          </select>
        </label>
      </div>
      <p className="result-note" aria-live="polite" style={{ marginTop: -12 }}>
        พบ {rows.length} แห่ง{zone !== 'all' && ` ใน${zoneName(zone)}`}
      </p>

      <div className="libs">
        {rows.map((l) => (
          <article className="lib" key={`${l.province}-${l.no ?? l.year}`}>
            <div className="top">
              {l.no ? (
                <div className={l.no === 77 ? 'no new' : 'no'}>{l.no}</div>
              ) : (
                <div className="no na">ปี {l.year.slice(2)}</div>
              )}
              <div>
                <div className="prov">{l.province}</div>
                <div className="reg">{zoneName(zoneOf(l))} · พ.ศ. {l.year}</div>
              </div>
            </div>
            <div className="school">
              <Icon name="school" />
              <span>{l.school || <span style={{ color: 'var(--text-3)' }}>รอข้อมูลโรงเรียนจากกรมอาเซียน</span>}</span>
            </div>
            {l.address && (
              <div className="addr">
                <Icon name="pin" />
                <span>{l.address}</span>
              </div>
            )}
            {l.website && (
              <a className="addr web" href={l.website} target="_blank" rel="noopener">
                <Icon name="globe" />
                <span>{l.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            <div className="row">
              {l.tel ? (
                <a href={`tel:${l.tel.replace(/[^\d+]/g, '')}`}><Icon name="phone" /> {l.tel}</a>
              ) : (
                <span>เปิดเมื่อ พ.ศ. {l.year}</span>
              )}
              <Link href={l.newsSlug ? `/news/${l.newsSlug}` : '/news?c=opening'}>ข่าวพิธีเปิด <Icon name="chev-r" /></Link>
            </div>
          </article>
        ))}
        {rows.length === 0 && (
          <div className="empty">
            <Icon name="search" />
            ไม่พบห้องสมุดที่ตรงกับคำค้น ลองพิมพ์ชื่อจังหวัดหรือโรงเรียนอีกครั้ง
          </div>
        )}
      </div>
    </>
  );
}
