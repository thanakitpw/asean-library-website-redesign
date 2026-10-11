import type { Metadata } from 'next';
import Link from 'next/link';

import { ArticleCard } from '@/components/cards';
import { Filterable } from '@/components/Filterable';
import { Icon } from '@/components/Icon';
import { PageHero, SectionHead } from '@/components/PageHero';
import { getArticleCategories, getArticles } from '@/lib/content';

export const metadata: Metadata = {
  title: 'เรียนรู้อาเซียน',
  description: 'บทความอ่านง่ายจัดหมวดตาม 3 เสาหลักของประชาคมอาเซียน เหมาะสำหรับนักเรียน ครู และผู้สนใจทั่วไป',
};

export default async function LearnPage() {
  const [articles, categories] = await Promise.all([getArticles(), getArticleCategories()]);
  return (
    <>
      <PageHero
        tag="บทความความรู้"
        tagIcon="book"
        title="เรียนรู้อาเซียน"
        lead="บทความอ่านง่ายจัดหมวดตาม 3 เสาหลักของประชาคมอาเซียน เหมาะสำหรับนักเรียน ครู และผู้สนใจทั่วไป"
        crumbs={[{ label: 'เรียนรู้อาเซียน' }]}
      />
      <section className="page-body" style={{ paddingBottom: 24 }}>
        <div className="container lift">
          <div className="cat-grid">
            {categories.map((c) => (
              <Link key={c.slug} className={`cat ${c.tone}`} href={`/learn?c=${c.slug}#list`}>
                <div className="ic"><Icon name={c.icon} /></div>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                  <span className="n">อ่านบทความ <Icon name="arrow" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint" id="list" style={{ paddingTop: 56 }}>
        <div className="container">
          <SectionHead align="left" tag="บทความทั้งหมด" icon="book" title="อ่านเรื่องอาเซียน" style={{ marginBottom: 24 }} />
          <Filterable
            label="หมวดบทความ"
            chips={categories.map((c) => ({ value: c.slug, label: c.short }))}
            searchPlaceholder="ค้นหาบทความ"
            emptyText="ยังไม่มีบทความในหมวดนี้"
            listClassName="cards"
            items={articles.map((a) => ({
              key: a.slug,
              cats: a.categories,
              text: `${a.title} ${a.excerpt ?? ''}`,
              node: <ArticleCard post={a} />,
            }))}
          />
        </div>
      </section>
    </>
  );
}
