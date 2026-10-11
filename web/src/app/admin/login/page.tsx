import type { Metadata } from 'next';
import { Suspense } from 'react';

import { LoginForm, LoginFormView } from '@/components/admin/LoginForm';

export const metadata: Metadata = { title: 'เข้าสู่ระบบ' };

export default function LoginPage() {
  return (
    <div className="adm a-login">
      <Suspense fallback={<LoginFormView />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
