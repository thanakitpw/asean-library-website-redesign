// ต่ออายุ session ของ Supabase และกันคนที่ยังไม่ล็อกอินออกจากหลังบ้าน
// เป็นแค่ด่านแรก หน้าและ Server Action ทุกตัวตรวจสิทธิ์ซ้ำผ่าน requireAdmin()
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { supabaseEnv } from '@/lib/supabase/env';

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { url, key } = supabaseEnv();

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(toSet, headers) {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const isLogin = request.nextUrl.pathname === '/admin/login';

  if (!data?.claims && !isLogin) {
    const to = request.nextUrl.clone();
    to.pathname = '/admin/login';
    to.search = '';
    return NextResponse.redirect(to);
  }
  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
