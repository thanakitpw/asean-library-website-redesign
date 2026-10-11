import Link from 'next/link';

import { Icon } from '@/components/Icon';
import { deletePost } from '@/lib/admin/actions/posts';
import { requireAdmin } from '@/lib/admin/auth';
import { dbDate, NEWS_CATEGORY } from '@/lib/admin/labels';
import { ARTICLE_CATEGORIES } from '@/lib/taxonomy';

import { DeleteButton } from './DeleteButton';
import { Flash, PageHead } from './PageHead';

type SP = Promise<Record<string, string | string[] | undefined>>;

const CAT = Object.fromEntries(ARTICLE_CATEGORIES.map((c) => [c.slug, c.short]));

export async function PostList({ type, searchParams }: { type: 'news' | 'article'; searchParams: SP }) {
  const { db } = await requireAdmin();
  const sp = await searchParams;
  const q = typeof sp.q === 'string' ? sp.q.trim() : '';
  const isNews = type === 'news';
  const base = isNews ? '/admin/news' : '/admin/articles';
  const publicBase = isNews ? '/news' : '/learn';

  let query = db
    .from('posts')
    .select('id, slug, title, published_on, published_precision, news_category, categories, is_published, is_sample')
    .eq('type', type)
    .order('published_on', { ascending: false })
    .order('id', { ascending: false });
  if (q) query = query.ilike('title', `%${q.replace(/[%_]/g, '\\$&')}%`);
  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (
    <>
      <PageHead title={isNews ? 'ข่าว' : 'บทความ'} desc={`${data.length} รายการ${q ? ` ที่ตรงกับ “${q}”` : ''}`}>
        <Link className="a-btn primary" href={`${base}/new`}><Icon name="plus" /> เพิ่ม{isNews ? 'ข่าว' : 'บทความ'}</Link>
      </PageHead>
      <Flash searchParams={searchParams} />
      <form className="a-tools" role="search">
        <input type="search" name="q" defaultValue={q} placeholder="ค้นหาจากหัวข้อ" aria-label="ค้นหา" />
        <button className="a-btn" type="submit"><Icon name="search" /> ค้นหา</button>
        {q && <Link className="a-btn" href={base}>ล้าง</Link>}
      </form>
      <div className="a-table-wrap">
        {data.length === 0 ? (
          <p className="a-empty">ไม่พบรายการ</p>
        ) : (
          <table className="a-table">
            <thead>
              <tr>
                <th>หัวข้อ</th>
                <th>{isNews ? 'ประเภท' : 'หมวด'}</th>
                <th>วันที่</th>
                <th>สถานะ</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id}>
                  <td className="t-title"><Link href={`${base}/${p.id}`}>{p.title}</Link></td>
                  <td>
                    {isNews
                      ? NEWS_CATEGORY[p.news_category ?? ''] ?? '–'
                      : p.categories.map((c) => CAT[c] ?? c).join(', ')}
                  </td>
                  <td className="muted" style={{ whiteSpace: 'nowrap' }}>{dbDate(p.published_on, p.published_precision)}</td>
                  <td>
                    {p.is_published ? <span className="a-badge green">เผยแพร่</span> : <span className="a-badge gray">ฉบับร่าง</span>}{' '}
                    {p.is_sample && <span className="a-badge gold">ตัวอย่าง</span>}
                  </td>
                  <td className="t-actions">
                    {p.is_published && (
                      <a className="a-btn sm" href={`${publicBase}/${p.slug}`} target="_blank" rel="noreferrer"><Icon name="eye" /> ดู</a>
                    )}
                    <Link className="a-btn sm" href={`${base}/${p.id}`}><Icon name="pencil" /> แก้ไข</Link>
                    <DeleteButton
                      action={deletePost}
                      fields={{ id: p.id, type }}
                      confirmText={`ลบ “${p.title}” ? ลบแล้วกู้คืนไม่ได้`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
