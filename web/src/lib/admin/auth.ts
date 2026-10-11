// Data Access Layer ของหลังบ้าน: ทุกหน้าและทุก Server Action เรียก requireAdmin() ก่อนแตะข้อมูล
import 'server-only';

import { redirect } from 'next/navigation';

import { createSessionClient } from '@/lib/supabase/server';

export async function requireAdmin() {
  const db = await createSessionClient();
  const { data } = await db.auth.getClaims();
  const claims = data?.claims;
  if (!claims) redirect('/admin/login');
  // สิทธิ์อยู่ใน app_metadata (ผู้ใช้แก้เองไม่ได้) และ RLS ตรวจซ้ำที่ฐานข้อมูล
  if (claims.app_metadata?.role !== 'admin') redirect('/admin/login?error=forbidden');
  return { db, email: typeof claims.email === 'string' ? claims.email : '' };
}
