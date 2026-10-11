import type { Metadata } from 'next';

import { DeleteButton } from '@/components/admin/DeleteButton';
import { Flash, PageHead } from '@/components/admin/PageHead';
import { Icon } from '@/components/Icon';
import { deleteMessage } from '@/lib/admin/actions/messages';
import { requireAdmin } from '@/lib/admin/auth';
import { TOPIC, when } from '@/lib/admin/labels';

export const metadata: Metadata = { title: 'ข้อความติดต่อ' };

export default async function Page({ searchParams }: PageProps<'/admin/messages'>) {
  const { db } = await requireAdmin();
  const { data, error } = await db.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(500);
  if (error) throw new Error(error.message);

  return (
    <>
      <PageHead title="ข้อความติดต่อ" desc={`${data.length} ข้อความจากฟอร์มหน้า “ติดต่อเรา”`} />
      <Flash searchParams={searchParams} />
      {data.length === 0 ? (
        <div className="a-card a-empty">ยังไม่มีข้อความ</div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {data.map((m) => (
            <article key={m.id} className="a-card" style={{ display: 'grid', gap: 10 }}>
              <div className="adm-head" style={{ marginBottom: 0 }}>
                <div>
                  <b style={{ color: 'var(--navy-900)' }}>{m.name}</b>
                  {m.org && <span className="muted"> · {m.org}</span>}
                  <div style={{ fontSize: 13, color: 'var(--text-3)' }}>
                    {when(m.created_at)}{m.province && ` · จ.${m.province}`}
                  </div>
                </div>
                <span className="a-badge">{TOPIC[m.topic] ?? m.topic}</span>
              </div>
              <p className="a-msg">{m.message}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <a className="a-btn sm" href={`mailto:${m.email}?subject=${encodeURIComponent('ตอบกลับจากโครงการห้องสมุดอาเซียน')}`}>
                  <Icon name="mail" /> {m.email}
                </a>
                {m.tel && <a className="a-btn sm" href={`tel:${m.tel.replace(/[^\d+]/g, '')}`}><Icon name="phone" /> {m.tel}</a>}
                <span style={{ flex: 1 }} />
                <DeleteButton action={deleteMessage} fields={{ id: m.id }} confirmText={`ลบข้อความจาก ${m.name}?`} />
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
