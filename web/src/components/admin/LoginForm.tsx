'use client';

import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';

import { Icon } from '@/components/Icon';
import { signIn } from '@/lib/admin/actions/auth';

export function LoginForm() {
  return <LoginFormView forbidden={useSearchParams().get('error') === 'forbidden'} />;
}

export function LoginFormView({ forbidden = false }: { forbidden?: boolean }) {
  const [state, action, pending] = useActionState(signIn, null);
  const error = state?.error ?? (forbidden ? 'บัญชีนี้ยังไม่ได้รับสิทธิ์ผู้ดูแลระบบ' : '');

  return (
    <form action={action} className="a-card">
      <div>
        <h1>เข้าสู่ระบบหลังบ้าน</h1>
        <p>โครงการห้องสมุดอาเซียน กรมอาเซียน</p>
      </div>
      {error && <div className="a-alert err" role="alert" style={{ marginBottom: 0 }}>{error}</div>}
      <div className="a-field">
        <label htmlFor="email">อีเมล</label>
        <input id="email" name="email" type="email" required autoComplete="username" />
      </div>
      <div className="a-field">
        <label htmlFor="password">รหัสผ่าน</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <button className="a-btn primary" type="submit" disabled={pending}>
        <Icon name="key" /> {pending ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ'}
      </button>
    </form>
  );
}
