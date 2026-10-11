import Link from 'next/link';
import type { ReactNode } from 'react';

export function PageHead({
  title,
  desc,
  back,
  children,
}: {
  title: string;
  desc?: ReactNode;
  back?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <div className="adm-head">
      <div>
        {back && <div className="adm-crumb"><Link href={back.href}>← {back.label}</Link></div>}
        <h1>{title}</h1>
        {desc && <p>{desc}</p>}
      </div>
      {children && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{children}</div>}
    </div>
  );
}

/** แจ้งผลหลัง redirect กลับมาจาก Server Action (?saved=1 / ?deleted=1) */
export async function Flash({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  if (sp.saved) return <div className="a-alert ok" role="status">บันทึกเรียบร้อย หน้าเว็บอัปเดตแล้ว</div>;
  if (sp.deleted) return <div className="a-alert ok" role="status">ลบเรียบร้อย</div>;
  return null;
}
