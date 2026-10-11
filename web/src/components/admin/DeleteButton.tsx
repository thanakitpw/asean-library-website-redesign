'use client';

import { useFormStatus } from 'react-dom';

import { Icon } from '@/components/Icon';

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button className="a-btn danger sm" type="submit" disabled={pending}>
      <Icon name="trash" /> {pending ? 'กำลังลบ…' : label}
    </button>
  );
}

/** ปุ่มลบ ถามยืนยันก่อนส่ง */
export function DeleteButton({
  action,
  fields,
  confirmText,
  label = 'ลบ',
}: {
  action: (form: FormData) => Promise<void>;
  fields: Record<string, string | number>;
  confirmText: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      style={{ display: 'inline' }}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      {Object.entries(fields).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      <Submit label={label} />
    </form>
  );
}
