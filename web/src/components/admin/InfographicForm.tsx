'use client';

import { saveInfographic } from '@/lib/admin/actions/infographics';
import type { Tables } from '@/lib/database.types';

import { AdminForm } from './AdminForm';
import { Field, Section } from './Field';
import { ImageField } from './ImageField';

export function InfographicForm({ item, nextOrder }: { item: Tables<'infographics'> | null; nextOrder: number }) {
  return (
    <AdminForm action={saveInfographic} cancelHref="/admin/infographics" layout="a-single" submitLabel={item ? 'บันทึกการแก้ไข' : 'เพิ่ม'}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <Section title="อินโฟกราฟิก">
        <Field label="ชื่อเรื่อง" htmlFor="title" required hint="แสดงใต้ภาพในหน้าเกร็ดน่ารู้">
          <input id="title" name="title" type="text" required defaultValue={item?.title} />
        </Field>
        <Field label="ภาพ" required>
          <ImageField name="image" folder="tips" initial={item ? [{ src: item.image, caption: '' }] : []} />
        </Field>
        <div className="a-grid2">
          <Field label="ลำดับ" htmlFor="sort_order" hint="เลขน้อยแสดงก่อน">
            <input id="sort_order" name="sort_order" type="number" min={0} max={9999} defaultValue={item?.sort_order ?? nextOrder} />
          </Field>
          <Field label="การเผยแพร่">
            <label className="a-check">
              <input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} /> แสดงบนหน้าเว็บ
            </label>
          </Field>
        </div>
      </Section>
    </AdminForm>
  );
}
