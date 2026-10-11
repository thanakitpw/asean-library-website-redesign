// อ้างชื่อเต็มตรง ๆ เพื่อให้ Next.js แทนค่า NEXT_PUBLIC_* ตอน build ได้ (ฝั่ง browser)
export function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error('ยังไม่ได้ตั้งค่า NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (ดู .env.example)');
  }
  return { url, key };
}
