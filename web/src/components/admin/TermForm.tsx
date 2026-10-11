'use client';

import { saveTerm } from '@/lib/admin/actions/glossary';
import type { Tables } from '@/lib/database.types';
import { GLOSSARY_GROUPS } from '@/lib/taxonomy';

import { AdminForm } from './AdminForm';
import { Field, Section } from './Field';

export function TermForm({ term }: { term: Tables<'glossary_terms'> | null }) {
  return (
    <AdminForm action={saveTerm} cancelHref="/admin/glossary" layout="a-single" submitLabel={term ? 'บันทึกการแก้ไข' : 'เพิ่ม'}>
      {term && <input type="hidden" name="id" value={term.id} />}
      <Section title="คำศัพท์">
        <div className="a-grid2">
          <Field label="ตัวย่อ" htmlFor="abbr" required hint="แสดงตัวใหญ่บนการ์ด เช่น ARF">
            <input id="abbr" name="abbr" type="text" required defaultValue={term?.abbr} />
          </Field>
          <Field label="ชื่อที่แสดง" htmlFor="name" required hint="เช่น AMM-PMC">
            <input id="name" name="name" type="text" required defaultValue={term?.name} />
          </Field>
        </div>
        <Field label="ชื่อเต็ม (ภาษาอังกฤษ)" htmlFor="full_name" required>
          <input id="full_name" name="full_name" type="text" required defaultValue={term?.full_name} />
        </Field>
        <Field label="คำอธิบาย" htmlFor="definition" required>
          <textarea id="definition" name="definition" rows={4} required defaultValue={term?.definition} />
        </Field>
        <Field label="กลุ่ม" required>
          <div className="a-checks">
            {GLOSSARY_GROUPS.map((g) => (
              <label key={g.slug} className="a-check">
                <input type="checkbox" name="groups" value={g.slug} defaultChecked={term?.groups.includes(g.slug)} /> {g.name}
              </label>
            ))}
          </div>
        </Field>
        <Field label="slug" htmlFor="slug" hint="ใช้อ้างอิงจากบทความ เว้นว่างได้ ระบบตั้งให้เอง">
          <input id="slug" name="slug" type="text" pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={term?.slug} />
        </Field>
      </Section>
    </AdminForm>
  );
}
