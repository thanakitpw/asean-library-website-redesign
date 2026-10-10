import type { Metadata } from 'next';

import { Filterable } from '@/components/Filterable';
import { Icon } from '@/components/Icon';
import { PageHero, SectionHead } from '@/components/PageHero';
import { WordOfDay } from '@/components/WordOfDay';
import { getGlossary } from '@/lib/content';
import { DIAL_CODES, GLOSSARY_GROUPS } from '@/lib/data/glossary';

export const metadata: Metadata = {
  title: 'เกร็ดน่ารู้',
  description: 'คำศัพท์ ตัวย่อ และเรื่องน่ารู้สั้น ๆ เกี่ยวกับอาเซียน ใช้ทบทวนก่อนสอบหรือเป็นสื่อในชั้นเรียนได้',
};

const K_TONES = ['', 'green', 'gold', 'blue'];

export default async function TipsPage() {
  const terms = await getGlossary();
  return (
    <>
      <PageHero
        tag="อ่านจบใน 1 นาที"
        tagIcon="bulb"
        title="เกร็ดน่ารู้อาเซียน"
        lead="คำศัพท์ ตัวย่อ และเรื่องน่ารู้สั้น ๆ เกี่ยวกับอาเซียน ใช้ทบทวนก่อนสอบหรือเป็นสื่อในชั้นเรียนได้"
        crumbs={[{ label: 'เกร็ดน่ารู้' }]}
      />
      <section className="page-body" style={{ paddingBottom: 56 }}>
        <div className="container lift">
          <div className="word">
            <WordOfDay terms={terms} moreHref="/learn/asean-regional-forum" />
            <div className="box" style={{ borderRadius: 'var(--r-xl)', padding: 28 }}>
              <h4><Icon name="phone" /> รหัสโทรศัพท์ประเทศอาเซียน</h4>
              <ul className="cat-list">
                {DIAL_CODES.map((d) => (
                  <li key={d.code}><a>{d.country} <span>{d.code}</span></a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint" style={{ paddingTop: 56 }}>
        <div className="container">
          <SectionHead
            align="left"
            tag="คลังคำศัพท์"
            icon="bulb"
            tone="gold"
            title="ศัพท์และตัวย่ออาเซียน"
            lead="รวมคำที่พบบ่อยในข่าวและบทเรียนเกี่ยวกับอาเซียน"
            style={{ marginBottom: 24 }}
          />
          <Filterable
            label="ประเภทคำศัพท์"
            chips={GLOSSARY_GROUPS.map((g) => ({ value: g.slug, label: g.name }))}
            searchPlaceholder="ค้นหาคำ เช่น AEC"
            emptyText="ไม่พบคำศัพท์ที่ค้นหา"
            listClassName="gloss"
            items={terms.map((t, i) => ({
              key: t.slug,
              cats: t.groups,
              text: `${t.name} ${t.full} ${t.definition}`,
              node: (
                <article className="gl" id={t.slug}>
                  <span className={`k ${K_TONES[i % 4]}`}>{t.abbr}</span>
                  <div><b>{t.name}</b><em>{t.full}</em><p>{t.definition}</p></div>
                </article>
              ),
            }))}
          />
        </div>
      </section>
    </>
  );
}
