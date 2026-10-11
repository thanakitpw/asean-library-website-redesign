import type { Metadata } from 'next';
import Link from 'next/link';

import { DeleteButton } from '@/components/admin/DeleteButton';
import { Flash, PageHead } from '@/components/admin/PageHead';
import { Icon } from '@/components/Icon';
import { deleteAlbum } from '@/lib/admin/actions/albums';
import { requireAdmin } from '@/lib/admin/auth';
import { ALBUM_CATEGORY, dbDate } from '@/lib/admin/labels';

export const metadata: Metadata = { title: 'คลังภาพ' };

export default async function Page({ searchParams }: PageProps<'/admin/albums'>) {
  const { db } = await requireAdmin();
  const { data, error } = await db
    .from('albums')
    .select('*, album_photos(src, sort_order)')
    .order('sort_order')
    .order('id')
    .order('sort_order', { referencedTable: 'album_photos' });
  if (error) throw new Error(error.message);

  return (
    <>
      <PageHead title="คลังภาพ" desc={`${data.length} อัลบั้ม`}>
        <Link className="a-btn primary" href="/admin/albums/new"><Icon name="plus" /> เพิ่มอัลบั้ม</Link>
      </PageHead>
      <Flash searchParams={searchParams} />
      <div className="a-table-wrap">
        <table className="a-table">
          <thead><tr><th>ปก</th><th>อัลบั้ม</th><th>หมวด</th><th>วันที่</th><th>รูป</th><th>ลำดับ</th><th /></tr></thead>
          <tbody>
            {data.map((a) => (
              <tr key={a.id}>
                <td style={{ width: 84 }}>
                  {a.album_photos[0] && (
                    // eslint-disable-next-line @next/next/no-img-element -- พรีวิวในหลังบ้าน
                    <img src={a.album_photos[0].src} alt="" style={{ width: 72, height: 54, objectFit: 'cover', borderRadius: 8 }} />
                  )}
                </td>
                <td className="t-title">
                  <Link href={`/admin/albums/${a.id}`}>{a.title}</Link>
                  {!a.is_published && <> <span className="a-badge gray">ฉบับร่าง</span></>}
                  {a.place && <div className="muted">{a.place}</div>}
                </td>
                <td>{ALBUM_CATEGORY[a.category] ?? a.category}</td>
                <td className="muted" style={{ whiteSpace: 'nowrap' }}>{dbDate(a.taken_on, a.taken_precision)}</td>
                <td>{a.album_photos.length}</td>
                <td className="muted">{a.sort_order}</td>
                <td className="t-actions">
                  <Link className="a-btn sm" href={`/admin/albums/${a.id}`}><Icon name="pencil" /> แก้ไข</Link>
                  <DeleteButton action={deleteAlbum} fields={{ id: a.id }} confirmText={`ลบอัลบั้ม “${a.title}” และรูปทั้งหมดในอัลบั้ม?`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
