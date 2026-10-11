// client ที่ใช้ session ของผู้ใช้จาก cookie (หลังบ้าน) — สร้างใหม่ทุก request
import 'server-only';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';

import { supabaseEnv } from './env';

export async function createSessionClient() {
  const store = await cookies();
  const { url, key } = supabaseEnv();
  return createServerClient<Database>(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(toSet) {
        try {
          toSet.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // เรียกจาก Server Component เขียน cookie ไม่ได้ — proxy.ts ต่ออายุ session ให้แล้ว
        }
      },
    },
  });
}
