import { notFound } from 'next/navigation';

import { requireAdmin } from '@/lib/admin/auth';

import { PageHead } from './PageHead';
import { PostForm } from './PostForm';

/** หน้าเพิ่ม/แก้ไขข่าวหรือบทความ (id = null คือเพิ่มใหม่) */
export async function PostEditor({ type, id }: { type: 'news' | 'article'; id: string | null }) {
  const { db } = await requireAdmin();
  const isNews = type === 'news';
  const label = isNews ? 'ข่าว' : 'บทความ';

  let post = null;
  if (id !== null) {
    const n = Number(id);
    if (!Number.isInteger(n)) notFound();
    const { data } = await db.from('posts').select('*').eq('id', n).eq('type', type).maybeSingle();
    if (!data) notFound();
    post = data;
  }

  const [libraries, terms] = await Promise.all([
    isNews ? db.from('libraries').select('province').order('province') : null,
    isNews ? null : db.from('glossary_terms').select('slug, name').order('id'),
  ]);

  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok' }).format(new Date());

  return (
    <>
      <PageHead
        title={post ? `แก้ไข${label}` : `เพิ่ม${label}`}
        back={{ href: isNews ? '/admin/news' : '/admin/articles', label: `${label}ทั้งหมด` }}
      />
      <PostForm
        type={type}
        post={post}
        today={today}
        provinces={libraries?.data?.map((l) => l.province) ?? []}
        terms={terms?.data ?? []}
      />
    </>
  );
}
