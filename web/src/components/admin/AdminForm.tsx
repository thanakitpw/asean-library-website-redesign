'use client';

import Link from 'next/link';
import { startTransition, useActionState, useEffect, type ReactNode } from 'react';

import type { FormResult } from '@/lib/admin/form';

type Action = (prev: FormResult, form: FormData) => Promise<FormResult>;

/**
 * ฟอร์มหลังบ้าน: ส่งผ่าน onSubmit แทน action prop เพื่อไม่ให้ React ล้างค่าที่กรอกไว้
 * เมื่อบันทึกไม่ผ่าน (action สำเร็จแล้วจะ redirect ไปหน้ารายการเอง)
 */
export function AdminForm({
  action,
  cancelHref,
  children,
  layout = 'a-form',
  submitLabel = 'บันทึก',
}: {
  action: Action;
  cancelHref: string;
  children: ReactNode;
  layout?: string;
  submitLabel?: string;
}) {
  const [state, dispatch, pending] = useActionState(action, null);

  useEffect(() => {
    if (state?.error) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => dispatch(data));
      }}
    >
      {state?.error && <div className="a-alert err" role="alert">{state.error}</div>}
      <div className={layout}>{children}</div>
      <div className="a-actions">
        <span className="spacer" />
        <Link className="a-btn" href={cancelHref}>ยกเลิก</Link>
        <button className="a-btn primary" type="submit" disabled={pending}>
          {pending ? 'กำลังบันทึก…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
