// client สำหรับหน้าเว็บสาธารณะ: publishable key ไม่มี session (role anon) อ่านได้ตาม RLS
// ไม่อ่าน cookie จึงใช้ภายใน 'use cache' ได้
import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/lib/database.types';

import { supabaseEnv } from './env';

let client: ReturnType<typeof createClient<Database>> | undefined;

export function supabase() {
  const { url, key } = supabaseEnv();
  client ??= createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
