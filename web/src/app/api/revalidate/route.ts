// ล้าง cache ข้อมูลทันที หลังแก้ข้อมูลใน Supabase โดยตรง (ไม่ผ่านหลังบ้าน)
//   curl -X POST https://<host>/api/revalidate -H "x-revalidate-secret: $REVALIDATE_SECRET"
//   ส่ง body {"tags":["news"]} เพื่อล้างเฉพาะบางหมวด; ไม่ส่ง = ล้างทุกหมวด
import { revalidatePath, revalidateTag } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';

const TAGS = ['news', 'articles', 'libraries', 'glossary', 'albums', 'infographics'] as const;

function authorized(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = req.headers.get('x-revalidate-secret');
  if (!secret || !given) return false;
  const a = Buffer.from(secret);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  if (!authorized(req)) return Response.json({ ok: false }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as { tags?: unknown };
  const asked = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === 'string') : [];
  const tags = asked.length ? TAGS.filter((t) => asked.includes(t)) : [...TAGS];

  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  revalidatePath('/', 'layout');

  return Response.json({ ok: true, tags });
}
