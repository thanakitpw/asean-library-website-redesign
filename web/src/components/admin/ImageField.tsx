'use client';

import { useId, useRef, useState } from 'react';

import { Icon } from '@/components/Icon';
import { createBrowserSupabase } from '@/lib/supabase/browser';

const MAX_MB = 10;
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

type Item = { src: string; caption: string };

/**
 * อัปโหลดรูปขึ้น Supabase Storage (bucket media) จาก browser โดยตรง แล้วส่ง URL ไปกับฟอร์มเป็น hidden input
 * - multiple=false: รูปเดียว (รูปปก)
 * - captionName: มีช่องคำบรรยายใต้แต่ละรูป (คลังภาพ)
 */
export function ImageField({
  name,
  captionName,
  folder,
  initial = [],
  multiple = false,
}: {
  name: string;
  captionName?: string;
  folder: string;
  initial?: Item[];
  multiple?: boolean;
}) {
  const [items, setItems] = useState<Item[]>(initial);
  const [busy, setBusy] = useState(0);
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const inputId = useId();

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setError('');
    const list = Array.from(multiple ? files : [files[0]]);
    const bad = list.find((f) => !TYPES.includes(f.type) || f.size > MAX_MB * 1024 * 1024);
    if (bad) {
      setError(`${bad.name}: รองรับ JPG, PNG, WebP, GIF ขนาดไม่เกิน ${MAX_MB} MB`);
      return;
    }

    const supabase = createBrowserSupabase();
    setBusy((n) => n + list.length);
    const uploaded: Item[] = [];
    for (const file of list) {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${folder}/${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
      const { error: err } = await supabase.storage
        .from('media')
        .upload(path, file, { contentType: file.type, cacheControl: '31536000' });
      setBusy((n) => n - 1);
      if (err) {
        setError(`อัปโหลด ${file.name} ไม่สำเร็จ: ${err.message}`);
        continue;
      }
      const caption = captionName ? file.name.replace(/\.[^.]+$/, '') : '';
      uploaded.push({ src: supabase.storage.from('media').getPublicUrl(path).data.publicUrl, caption });
    }
    setItems((cur) => (multiple ? [...cur, ...uploaded] : uploaded.slice(-1)));
    if (input.current) input.current.value = '';
  }

  const move = (i: number, d: -1 | 1) =>
    setItems((cur) => {
      const j = i + d;
      if (j < 0 || j >= cur.length) return cur;
      const next = [...cur];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const showDrop = multiple || items.length === 0;

  return (
    <div className="a-field">
      {items.length > 0 && (
        <div className={multiple ? 'a-imgs' : 'a-cover'}>
          {items.map((it, i) => (
            <div className="a-img" key={it.src}>
              {/* eslint-disable-next-line @next/next/no-img-element -- พรีวิวในหลังบ้าน */}
              <img src={it.src} alt={it.caption || `รูปที่ ${i + 1}`} />
              <input type="hidden" name={name} value={it.src} />
              <div className="ctl">
                {multiple && i > 0 && (
                  <button type="button" onClick={() => move(i, -1)} aria-label="เลื่อนขึ้น"><Icon name="chev-l" /></button>
                )}
                {multiple && i < items.length - 1 && (
                  <button type="button" onClick={() => move(i, 1)} aria-label="เลื่อนลง"><Icon name="chev-r" /></button>
                )}
                <button type="button" onClick={() => setItems((cur) => cur.filter((_, k) => k !== i))} aria-label="ลบรูป">
                  <Icon name="close" />
                </button>
              </div>
              {captionName && (
                <input
                  type="text"
                  name={captionName}
                  value={it.caption}
                  placeholder="คำบรรยายรูป"
                  aria-label={`คำบรรยายรูปที่ ${i + 1}`}
                  onChange={(e) =>
                    setItems((cur) => cur.map((x, k) => (k === i ? { ...x, caption: e.target.value } : x)))
                  }
                />
              )}
            </div>
          ))}
        </div>
      )}

      {showDrop && (
        <label className="a-drop" htmlFor={inputId}>
          <Icon name="upload" />
          {busy > 0 ? `กำลังอัปโหลด ${busy} รูป…` : multiple ? 'เลือกรูป (เลือกได้หลายรูป)' : 'เลือกรูป'}
          <span>JPG, PNG, WebP ไม่เกิน {MAX_MB} MB</span>
        </label>
      )}
      {!multiple && items.length > 0 && (
        <div style={{ display: 'flex', gap: 8 }}>
          <label className="a-btn sm" htmlFor={inputId}><Icon name="upload" /> เปลี่ยนรูป</label>
          <button type="button" className="a-btn sm danger" onClick={() => setItems([])}>
            <Icon name="trash" /> เอารูปออก
          </button>
        </div>
      )}
      <input
        ref={input}
        id={inputId}
        type="file"
        accept={TYPES.join(',')}
        multiple={multiple}
        hidden
        onChange={(e) => upload(e.target.files)}
      />
      {error && <span className="hint" style={{ color: '#B42318' }}>{error}</span>}
    </div>
  );
}
