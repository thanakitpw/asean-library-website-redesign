import type { Metadata } from 'next';
import Link from 'next/link';

import { DeleteButton } from '@/components/admin/DeleteButton';
import { Flash, PageHead } from '@/components/admin/PageHead';
import { Icon } from '@/components/Icon';
import { deleteTerm } from '@/lib/admin/actions/glossary';
import { requireAdmin } from '@/lib/admin/auth';
import { GLOSSARY_GROUPS } from '@/lib/taxonomy';

export const metadata: Metadata = { title: 'เกร็ดน่ารู้' };

const GROUP = Object.fromEntries(GLOSSARY_GROUPS.map((g) => [g.slug, g.name]));

export default async function Page({ searchParams }: PageProps<'/admin/glossary'>) {
  const { db } = await requireAdmin();
  const { data, error } = await db.from('glossary_terms').select('*').order('id');
  if (error) throw new Error(error.message);

  return (
    <>
      <PageHead title="เกร็ดน่ารู้" desc={`คำศัพท์ ${data.length} คำ`}>
        <Link className="a-btn primary" href="/admin/glossary/new"><Icon name="plus" /> เพิ่มคำศัพท์</Link>
      </PageHead>
      <Flash searchParams={searchParams} />
      <div className="a-table-wrap">
        <table className="a-table">
          <thead><tr><th>คำ</th><th>ชื่อเต็ม</th><th>กลุ่ม</th><th /></tr></thead>
          <tbody>
            {data.map((t) => (
              <tr key={t.id}>
                <td className="t-title" style={{ minWidth: 120 }}><Link href={`/admin/glossary/${t.id}`}>{t.name}</Link></td>
                <td>{t.full_name}<div className="muted">{t.definition}</div></td>
                <td>{t.groups.map((g) => <span key={g} className="a-badge" style={{ marginRight: 4 }}>{GROUP[g] ?? g}</span>)}</td>
                <td className="t-actions">
                  <Link className="a-btn sm" href={`/admin/glossary/${t.id}`}><Icon name="pencil" /> แก้ไข</Link>
                  <DeleteButton action={deleteTerm} fields={{ id: t.id }} confirmText={`ลบคำว่า “${t.name}”?`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
