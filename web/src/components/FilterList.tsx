'use client';

import { useSearchParams } from 'next/navigation';
import { Fragment, useMemo, useState, type ReactNode } from 'react';

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
  initial = 'all',
}: Props & { initial?: string }) {
  const [cat, setCat] = useState(initial);
  const [q, setQ] = useState('');

  const visible = useMemo(() => {
    const t = q.trim().toLowerCase();
    return new Set(
      items
        .filter((it) => (cat === 'all' || it.cats.includes(cat)) && (!t || it.text.toLowerCase().includes(t)))
        .map((it) => it.key),
    );
  }, [items, cat, q]);

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
              onClick={() => setCat(ch.value)}
            >
              {ch.label}
            </button>
          ))}
        </div>
        <label className="search">
          <Icon name="search" />
          <input type="search" placeholder={searchPlaceholder} aria-label={searchPlaceholder} value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>
      <p className="result-note" aria-live="polite">แสดง {visible.size} รายการ</p>
      <div className={listClassName}>
        {items.map((it) => visible.has(it.key) && <Fragment key={it.key}>{it.node}</Fragment>)}
        {visible.size === 0 && (
          <div className="empty">
            <Icon name="search" />
            {emptyText}
          </div>
        )}
      </div>
    </>
  );
}
