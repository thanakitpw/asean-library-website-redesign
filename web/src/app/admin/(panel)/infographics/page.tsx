import type { Metadata } from 'next';
import Link from 'next/link';

import { DeleteButton } from '@/components/admin/DeleteButton';
import { Flash, PageHead } from '@/components/admin/PageHead';
import { Icon } from '@/components/Icon';
import { deleteInfographic } from '@/lib/admin/actions/infographics';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'อินโฟกราฟิก' };

export default async function Page({ searchParams }: PageProps<'/admin/infographics'>) {
  const { db } = await requireAdmin();
  const { data, error } = await db.from('infographics').select('*').order('sort_order').order('id');
  if (error) throw new Error(error.message);

  return (
    <>
      <PageHead title="อินโฟกราฟิก" desc={`ภาพเกร็ดน่ารู้ ${data.length} ภาพ · แสดงในหน้าเกร็ดน่ารู้`}>
        <Link className="a-btn primary" href="/admin/infographics/new"><Icon name="plus" /> เพิ่มภาพ</Link>
      </PageHead>
      <Flash searchParams={searchParams} />
      <div className="a-table-wrap">
        <table className="a-table">
          <thead><tr><th>ภาพ</th><th>ชื่อเรื่อง</th><th>ลำดับ</th><th>สถานะ</th><th /></tr></thead>
          <tbody>
            {data.map((t) => (
              <tr key={t.id}>
                <td style={{ width: 88 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- พรีวิวในหลังบ้าน */}
                  <img src={t.image} alt="" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8 }} />
                </td>
                <td className="t-title"><Link href={`/admin/infographics/${t.id}`}>{t.title}</Link></td>
                <td>{t.sort_order}</td>
                <td>{t.is_published ? <span className="a-badge green">แสดง</span> : <span className="a-badge gray">ซ่อน</span>}</td>
                <td className="t-actions">
                  <Link className="a-btn sm" href={`/admin/infographics/${t.id}`}><Icon name="pencil" /> แก้ไข</Link>
                  <DeleteButton action={deleteInfographic} fields={{ id: t.id }} confirmText={`ลบ “${t.title}”?`} />
                </td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={5} className="a-empty">ยังไม่มีภาพ</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
