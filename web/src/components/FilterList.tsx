'use client';

import { useSearchParams } from 'next/navigation';
import { Fragment, useMemo, useRef, useState, type ReactNode } from 'react';

import { Icon } from './Icon';

export type FilterItem = {
  key: string;
  cats: string[];
  /** ข้อความสำหรับค้นหา */
  text: string;
  node: ReactNode;
};

type Props = {
  label: string;
  chips: { value: string; label: string }[];
  items: FilterItem[];
  listClassName: string;
  searchPlaceholder: string;
  emptyText: string;
  /** จำนวนต่อหน้า (ไม่ใส่ = แสดงทั้งหมด) */
  pageSize?: number;
};

/** ตัวกรองหมวด + ช่องค้นหา; อ่านหมวดเริ่มต้นจาก ?c= */
export function FilterList(props: Props) {
  const c = useSearchParams().get('c');
  const initial = c && props.chips.some((x) => x.value === c) ? c : 'all';
  // key ทำให้เปลี่ยนหมวดตามลิงก์ ?c= ใหม่ได้แม้อยู่หน้าเดิม
  return <FilterListView key={initial} {...props} initial={initial} />;
}

export function FilterListView({
  label,
  chips,
  items,
  listClassName,
  searchPlaceholder,
  emptyText,
  pageSize,
  initial = 'all',
}: Props & { initial?: string }) {
  const [cat, setCat] = useState(initial);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const top = useRef<HTMLParagraphElement>(null);

  const visible = useMemo(() => {
    const t = q.trim().toLowerCase();
    return new Set(
      items
        .filter((it) => (cat === 'all' || it.cats.includes(cat)) && (!t || it.text.toLowerCase().includes(t)))
        .map((it) => it.key),
    );
  }, [items, cat, q]);

  const matched = items.filter((it) => visible.has(it.key));
  const pages = pageSize ? Math.max(1, Math.ceil(matched.length / pageSize)) : 1;
  const current = Math.min(page, pages);
  const shown = pageSize ? matched.slice((current - 1) * pageSize, current * pageSize) : matched;
  const go = (n: number) => {
    setPage(n);
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="toolbar">
        <div className="chips" role="group" aria-label={label}>
          {[{ value: 'all', label: 'ทั้งหมด' }, ...chips].map((ch) => (
            <button
              key={ch.value}
              type="button"
              className={cat === ch.value ? 'chip on' : 'chip'}
              aria-pressed={cat === ch.value}
              onClick={() => {
                setCat(ch.value);
                setPage(1);
              }}
            >
              {ch.label}
            </button>
          ))}
        </div>
        <label className="search">
          <Icon name="search" />
          <input type="search" placeholder={searchPlaceholder} aria-label={searchPlaceholder} value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        </label>
      </div>
      <p className="result-note" aria-live="polite" ref={top}>
        {pages > 1 ? `ทั้งหมด ${visible.size} รายการ · หน้า ${current} จาก ${pages}` : `แสดง ${visible.size} รายการ`}
      </p>
      <div className={listClassName}>
        {shown.map((it) => <Fragment key={it.key}>{it.node}</Fragment>)}
        {visible.size === 0 && (
          <div className="empty">
            <Icon name="search" />
            {emptyText}
          </div>
        )}
      </div>
      {pages > 1 && (
        <nav className="pager" aria-label="เลือกหน้า">
          <button type="button" disabled={current === 1} onClick={() => go(current - 1)} aria-label="หน้าก่อนหน้า">
            <Icon name="chev-l" />
          </button>
          {pageList(current, pages).map((n, i) =>
            n === 0 ? (
              <span key={`gap-${i}`} className="gap">…</span>
            ) : (
              <button key={n} type="button" className={n === current ? 'on' : undefined} aria-current={n === current ? 'page' : undefined} onClick={() => go(n)}>
                {n}
              </button>
            ),
          )}
          <button type="button" disabled={current === pages} onClick={() => go(current + 1)} aria-label="หน้าถัดไป">
            <Icon name="chev-r" />
          </button>
        </nav>
      )}
    </>
  );
}

/** เลขหน้าที่จะแสดง: หน้าแรก หน้าสุดท้าย และรอบหน้าปัจจุบัน (0 = …) */
function pageList(current: number, pages: number): number[] {
  const keep = new Set([1, pages, current - 1, current, current + 1].filter((n) => n >= 1 && n <= pages));
  const out: number[] = [];
  [...keep].sort((a, b) => a - b).forEach((n, i, arr) => {
    if (i > 0 && n - arr[i - 1] > 1) out.push(0);
    out.push(n);
  });
  return out;
}
