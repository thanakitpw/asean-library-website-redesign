'use client';

import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';

import { Icon } from './Icon';

type Shot = { src: string; caption: string };

/**
 * เปิดภาพใหญ่เมื่อคลิกลิงก์ที่มี data-lightbox ภายใน children
 * (ลิงก์ยังชี้ไปที่ไฟล์ภาพ จึงใช้งานได้แม้ JS ยังไม่โหลด)
 */
export function Lightbox({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [shots, setShots] = useState<Shot[]>([]);
  const [i, setI] = useState<number | null>(null);

  const collect = () =>
    Array.from(root.current?.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]') ?? []).map((a) => ({
      src: a.getAttribute('href') ?? '',
      caption: a.dataset.caption ?? '',
    }));

  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-lightbox]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const list = collect();
    opener.current = a;
    setShots(list);
    setI(Math.max(0, list.findIndex((s) => s.src === a.getAttribute('href'))));
  };

  const close = useCallback(() => {
    setI(null);
    opener.current?.focus();
  }, []);
  const step = useCallback((d: number) => setI((n) => (n === null ? n : (n + d + shots.length) % shots.length)), [shots.length]);

  useEffect(() => {
    if (i === null) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [i, close, step]);

  const shot = i === null ? null : shots[i];
  return (
    <div ref={root} onClick={onClick}>
      {children}
      {shot && (
        <div className="lightbox open" role="dialog" aria-modal="true" aria-label={shot.caption} onClick={(e) => e.target === e.currentTarget && close()}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ภาพขนาดเต็มตามสัดส่วนจริง */}
          <img src={shot.src} alt={shot.caption} />
          <div className="cap">{shot.caption} ({i! + 1}/{shots.length})</div>
          <button ref={closeBtn} className="x" aria-label="ปิด" onClick={close}><Icon name="x" /></button>
          {shots.length > 1 && (
            <>
              <button className="prev" aria-label="ภาพก่อนหน้า" onClick={() => step(-1)}><Icon name="chev-r" /></button>
              <button className="next" aria-label="ภาพถัดไป" onClick={() => step(1)}><Icon name="chev-r" /></button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
