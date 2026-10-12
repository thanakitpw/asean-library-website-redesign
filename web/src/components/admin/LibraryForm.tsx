'use client';

import { saveLibrary } from '@/lib/admin/actions/libraries';
import { REGION_LABEL } from '@/lib/admin/labels';
import type { Tables } from '@/lib/database.types';

import { AdminForm } from './AdminForm';
import { Field, Section } from './Field';

export function LibraryForm({ lib }: { lib: Tables<'libraries'> | null }) {
  return (
    <AdminForm action={saveLibrary} cancelHref="/admin/libraries" layout="a-single" submitLabel={lib ? 'บันทึกการแก้ไข' : 'เพิ่ม'}>
      {lib && <input type="hidden" name="id" value={lib.id} />}
      <Section title="ข้อมูลห้องสมุด">
        <div className="a-grid2">
          <Field label="จังหวัด" htmlFor="province" required hint="1 จังหวัดมีได้ 1 ห้องสมุด">
            <input id="province" name="province" type="text" required defaultValue={lib?.province} />
          </Field>
          <Field label="ภาค" htmlFor="region" required>
            <select id="region" name="region" required defaultValue={lib?.region ?? ''}>
              <option value="" disabled>เลือกภาค</option>
              {Object.entries(REGION_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </Field>
          <Field label="ลำดับแห่งที่" htmlFor="no" hint="เว้นว่างได้ถ้าไม่ทราบ">
            <input id="no" name="no" type="number" min={1} max={77} defaultValue={lib?.no ?? ''} />
          </Field>
          <Field label="ปีที่เปิด (พ.ศ.)" htmlFor="opened_year_be" required>
            <input id="opened_year_be" name="opened_year_be" type="number" min={2550} max={2600} required defaultValue={lib?.opened_year_be ?? ''} />
          </Field>
        </div>
        <Field label="โรงเรียน" htmlFor="school">
          <input id="school" name="school" type="text" defaultValue={lib?.school} />
        </Field>
        <Field label="เบอร์โทรศัพท์" htmlFor="tel">
          <input id="tel" name="tel" type="text" defaultValue={lib?.tel} />
        </Field>
        <Field label="ที่อยู่และช่องทางติดต่อ" htmlFor="address" hint="แสดงตามบรรทัดที่พิมพ์ เช่น ที่อยู่ / อีเมล / Facebook">
          <textarea id="address" name="address" rows={4} defaultValue={lib?.address} />
        </Field>
        <Field label="เว็บไซต์โรงเรียน" htmlFor="website">
          <input id="website" name="website" type="url" placeholder="https://" defaultValue={lib?.website} />
        </Field>
      </Section>
    </AdminForm>
  );
}
