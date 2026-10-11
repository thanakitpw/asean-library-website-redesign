'use client';

import { changePassword } from '@/lib/admin/actions/auth';

import { AdminForm } from './AdminForm';
import { Field, Section } from './Field';

export function PasswordForm() {
  return (
    <AdminForm action={changePassword} cancelHref="/admin" layout="a-single" submitLabel="เปลี่ยนรหัสผ่าน">
      <Section title="รหัสผ่านใหม่">
        <Field label="รหัสผ่านใหม่" htmlFor="password" required hint="อย่างน้อย 10 ตัวอักษร">
          <input id="password" name="password" type="password" minLength={10} required autoComplete="new-password" />
        </Field>
        <Field label="ยืนยันรหัสผ่านใหม่" htmlFor="confirm" required>
          <input id="confirm" name="confirm" type="password" minLength={10} required autoComplete="new-password" />
        </Field>
      </Section>
    </AdminForm>
  );
}
