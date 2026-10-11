import type { Metadata } from 'next';
import Link from 'next/link';

import { DeleteButton } from '@/components/admin/DeleteButton';
import { Flash, PageHead } from '@/components/admin/PageHead';
import { Icon } from '@/components/Icon';
import { deleteLibrary } from '@/lib/admin/actions/libraries';
import { requireAdmin } from '@/lib/admin/auth';
import { REGION_LABEL } from '@/lib/admin/labels';

export const metadata: Metadata = { title: 'ห้องสมุด' };

export default async function Page({ searchParams }: PageProps<'/admin/libraries'>) {
  const { db } = await requireAdmin();
  const { data, error } = await db.from('libraries').select('*').order('no', { nullsFirst: false }).order('province');
  if (error) throw new Error(error.message);
  const missingSchool = data.filter((l) => !l.school).length;

  return (
    <>
      <PageHead
        title="ห้องสมุด"
        desc={`${data.length} แห่ง${missingSchool ? ` · ยังไม่มีชื่อโรงเรียน ${missingSchool} แห่ง` : ''}`}
      >
        <Link className="a-btn primary" href="/admin/libraries/new"><Icon name="plus" /> เพิ่มห้องสมุด</Link>
      </PageHead>
      <Flash searchParams={searchParams} />
      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr><th>แห่งที่</th><th>จังหวัด</th><th>โรงเรียน</th><th>ภาค</th><th>ปีที่เปิด</th><th>โทร</th><th /></tr>
          </thead>
          <tbody>
            {data.map((l) => (
              <tr key={l.id}>
                <td>{l.no ?? <span className="muted">–</span>}</td>
                <td className="t-title" style={{ minWidth: 120 }}><Link href={`/admin/libraries/${l.id}`}>{l.province}</Link></td>
                <td>{l.school || <span className="a-badge gold">ยังไม่มีข้อมูล</span>}</td>
                <td className="muted">{REGION_LABEL[l.region] ?? l.region}</td>
                <td>{l.opened_year_be}</td>
                <td className="muted" style={{ whiteSpace: 'nowrap' }}>{l.tel || '–'}</td>
                <td className="t-actions">
                  <Link className="a-btn sm" href={`/admin/libraries/${l.id}`}><Icon name="pencil" /> แก้ไข</Link>
                  <DeleteButton action={deleteLibrary} fields={{ id: l.id }} confirmText={`ลบห้องสมุดจังหวัด${l.province}?`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
