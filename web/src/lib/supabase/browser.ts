// client ฝั่ง browser ใช้ session จาก cookie เดียวกับ server (ใช้ตอนอัปโหลดรูปในหลังบ้าน)
import { createBrowserClient } from '@supabase/ssr';

import type { Database } from '@/lib/database.types';

import { supabaseEnv } from './env';

export function createBrowserSupabase() {
  const { url, key } = supabaseEnv();
  return createBrowserClient<Database>(url, key);
}
