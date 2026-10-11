'use server';

import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/admin/auth';
import { text, type FormResult } from '@/lib/admin/form';
import { createSessionClient } from '@/lib/supabase/server';

export async function signIn(_prev: FormResult, form: FormData): Promise<FormResult> {
  const email = text(form, 'email');
  const password = String(form.get('password') ?? '');
  if (!email || !password) return { error: 'กรุณากรอกอีเมลและรหัสผ่าน' };

  const db = await createSessionClient();
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    if (error?.status === 429) return { error: 'ลองเข้าสู่ระบบหลายครั้งเกินไป กรุณารอสักครู่' };
    return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
  }
  if (data.user.app_metadata?.role !== 'admin') {
    await db.auth.signOut();
    return { error: 'บัญชีนี้ยังไม่ได้รับสิทธิ์ผู้ดูแลระบบ กรุณาติดต่อผู้ดูแล' };
  }
  redirect('/admin');
}

export async function signOut() {
  const db = await createSessionClient();
  await db.auth.signOut();
  redirect('/admin/login');
}

export async function changePassword(_prev: FormResult, form: FormData): Promise<FormResult> {
  const { db } = await requireAdmin();
  const password = String(form.get('password') ?? '');
  if (password.length < 10) return { error: 'รหัสผ่านต้องยาวอย่างน้อย 10 ตัวอักษร' };
  if (password !== String(form.get('confirm') ?? '')) return { error: 'รหัสผ่านทั้งสองช่องไม่ตรงกัน' };
  const { error } = await db.auth.updateUser({ password });
  if (error) {
    console.error('admin: change password', error);
    return { error: error.code === 'same_password' ? 'รหัสผ่านใหม่ต้องไม่ซ้ำรหัสเดิม' : 'เปลี่ยนรหัสผ่านไม่สำเร็จ กรุณาลองใหม่' };
  }
  redirect('/admin/account?saved=1');
}
