import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHead } from '@/components/admin/PageHead';
import { requireAdmin } from '@/lib/admin/auth';
import { TOPIC, when } from '@/lib/admin/labels';

export const metadata: Metadata = { title: 'ภาพรวม' };

export default async function AdminHome() {
  const { db } = await requireAdmin();
  const count = (table: 'libraries' | 'glossary_terms' | 'albums' | 'contact_messages') =>
    db.from(table).select('id', { count: 'exact', head: true });
  const [news, articles, drafts, libraries, terms, albums, messages, latest] = await Promise.all([
    db.from('posts').select('id', { count: 'exact', head: true }).eq('type', 'news'),
    db.from('posts').select('id', { count: 'exact', head: true }).eq('type', 'article'),
    db.from('posts').select('id', { count: 'exact', head: true }).eq('is_published', false),
    count('libraries'),
    count('glossary_terms'),
    count('albums'),
    count('contact_messages'),
    db.from('contact_messages').select('id, name, topic, created_at').order('created_at', { ascending: false }).limit(5),
  ]);

  const stats = [
    { href: '/admin/news', n: news.count, label: 'ข่าว' },
    { href: '/admin/articles', n: articles.count, label: 'บทความ' },
    { href: '/admin/libraries', n: libraries.count, label: 'ห้องสมุด' },
    { href: '/admin/glossary', n: terms.count, label: 'คำศัพท์เกร็ดน่ารู้' },
    { href: '/admin/albums', n: albums.count, label: 'อัลบั้มภาพ' },
    { href: '/admin/messages', n: messages.count, label: 'ข้อความติดต่อ' },
  ];

  return (
    <>
      <PageHead title="ภาพรวม" desc={drafts.count ? `มีฉบับร่างที่ยังไม่เผยแพร่ ${drafts.count} รายการ` : 'จัดการเนื้อหาบนเว็บไซต์โครงการห้องสมุดอาเซียน'}>
        <Link className="a-btn primary" href="/admin/news/new">+ เพิ่มข่าว</Link>
        <Link className="a-btn" href="/admin/articles/new">+ เพิ่มบทความ</Link>
      </PageHead>
      <div className="a-stats">
        {stats.map((s) => (
          <Link key={s.href} className="a-stat" href={s.href}>
            <b>{s.n ?? '–'}</b>
            <span>{s.label}</span>
          </Link>
        ))}
      </div>
      <section className="a-card">
        <div className="adm-head" style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 17, color: 'var(--navy-900)' }}>ข้อความติดต่อล่าสุด</h2>
          <Link className="a-btn sm" href="/admin/messages">ดูทั้งหมด</Link>
        </div>
        {latest.data?.length ? (
          <table className="a-table">
            <tbody>
              {latest.data.map((m) => (
                <tr key={m.id}>
                  <td className="t-title">{m.name}</td>
                  <td>{TOPIC[m.topic] ?? m.topic}</td>
                  <td className="muted">{when(m.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="a-empty">ยังไม่มีข้อความ</p>
        )}
      </section>
    </>
  );
}
