'use client';

import { saveAlbum } from '@/lib/admin/actions/albums';
import { ALBUM_CATEGORY, COVER_ICONS } from '@/lib/admin/labels';
import type { Tables } from '@/lib/database.types';

import { AdminForm } from './AdminForm';
import { Field, Section } from './Field';
import { ImageField } from './ImageField';

type Album = Tables<'albums'> & { album_photos: { src: string; caption: string }[] };

export function AlbumForm({ album, nextOrder }: { album: Album | null; nextOrder: number }) {
  return (
    <AdminForm action={saveAlbum} cancelHref="/admin/albums" submitLabel={album ? 'บันทึกการแก้ไข' : 'เพิ่ม'}>
      {album && <input type="hidden" name="id" value={album.id} />}
      <div className="col">
        <Section title="รูปในอัลบั้ม">
          <ImageField
            name="photo_src"
            captionName="photo_caption"
            folder="albums"
            multiple
            initial={album?.album_photos ?? []}
          />
          <span className="hint" style={{ fontSize: 12.5, color: 'var(--text-3)' }}>
            รูปแรกใช้เป็นภาพปกของอัลบั้ม ใช้ปุ่มลูกศรบนรูปเพื่อเรียงลำดับ
          </span>
        </Section>
      </div>
      <div className="col">
        <Section title="ข้อมูลอัลบั้ม">
          <Field label="ชื่ออัลบั้ม" htmlFor="title" required>
            <input id="title" name="title" type="text" required defaultValue={album?.title} />
          </Field>
          <Field label="หมวด" htmlFor="category" required>
            <select id="category" name="category" defaultValue={album?.category ?? 'opening'}>
              {Object.entries(ALBUM_CATEGORY).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </Field>
          <div className="a-grid2">
            <Field label="วันที่" htmlFor="taken_on">
              <input id="taken_on" name="taken_on" type="date" defaultValue={album?.taken_on ?? ''} />
            </Field>
            <Field label="แสดงเป็น" htmlFor="taken_precision">
              <select id="taken_precision" name="taken_precision" defaultValue={album?.taken_precision ?? 'day'}>
                <option value="day">วันที่เต็ม</option>
                <option value="year">เฉพาะปี</option>
              </select>
            </Field>
          </div>
          <Field label="สถานที่ / คำอธิบายสั้น" htmlFor="place">
            <input id="place" name="place" type="text" defaultValue={album?.place ?? ''} />
          </Field>
          <Field label="ไอคอนหน้าสถานที่" htmlFor="place_icon" hint="เว้นว่าง = หมุดแผนที่">
            <select id="place_icon" name="place_icon" defaultValue={album?.place_icon ?? ''}>
              <option value="">—</option>
              {COVER_ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </Field>
          <Field label="ลำดับการแสดง" htmlFor="sort_order" hint="เลขน้อยแสดงก่อน">
            <input id="sort_order" name="sort_order" type="number" min={0} defaultValue={album?.sort_order ?? nextOrder} />
          </Field>
          <label className="a-check">
            <input type="checkbox" name="is_published" defaultChecked={album?.is_published ?? true} /> เผยแพร่บนหน้าเว็บ
          </label>
          <Field label="slug" htmlFor="slug" hint="เว้นว่างได้ ระบบตั้งให้เอง">
            <input id="slug" name="slug" type="text" pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={album?.slug} />
          </Field>
        </Section>
      </div>
    </AdminForm>
  );
}
