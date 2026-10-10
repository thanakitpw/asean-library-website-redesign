import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { ShareBar } from '@/components/ShareBar';
import { articleCategory, getArticle, getArticleCategories, getArticleNeighbors, getArticles, getGlossary } from '@/lib/content';
import { thaiDate } from '@/lib/format';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<'/learn/[slug]'>): Promise<Metadata> {
  const post = await getArticle((await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt ?? post.title, openGraph: { type: 'article' } };
}

export default async function ArticlePage({ params }: PageProps<'/learn/[slug]'>) {
  const { slug } = await params;
  const [post, categories, glossary, { newer, older }] = await Promise.all([
    getArticle(slug),
    getArticleCategories(),
    getGlossary(),
    getArticleNeighbors(slug),
  ]);
  if (!post) notFound();

  const cat = articleCategory(post.categories[0]);
  const terms = glossary.filter((t) => post.relatedTerms?.includes(t.slug));

  return (
    <>
      <PageHero
        tag={cat.name}
        tagIcon={cat.icon}
        title={post.title}
        lead={
          <span style={{ display: 'inline-flex', gap: 18, flexWrap: 'wrap', fontSize: 15 }}>
            <span>{thaiDate(post.publishedAt)}</span>
            {post.readingMinutes && <span>อ่าน {post.readingMinutes} นาที</span>}
            {post.audience && <span>เหมาะสำหรับ {post.audience}</span>}
          </span>
        }
        crumbs={[
          { label: 'เรียนรู้อาเซียน', href: '/learn' },
          { label: cat.name, href: `/learn?c=${cat.slug}#list` },
          { label: 'อ่านบทความ' },
        ]}
      />
      <section className="page-body">
        <div className="container read">
          <article>
            {post.cover ? (
              <div className="cover"><Image src={post.cover} alt="" fill sizes="(max-width: 1100px) 100vw, 840px" preload /></div>
            ) : (
              <div className="cover ph"><Icon name={post.icon ?? cat.icon} /></div>
            )}
            {post.bodyHtml ? (
              <div className="prose" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
            ) : (
              <div className="prose"><p>{post.excerpt}</p></div>
            )}

            <ShareBar label="แชร์บทความนี้" />
            <nav className="prevnext" aria-label="บทความก่อนหน้าและถัดไป">
              {older ? (
                <Link href={`/learn/${older.slug}`}><small><Icon name="chev-l" /> บทความก่อนหน้า</small><b>{older.title}</b></Link>
              ) : <span />}
              {newer && (
                <Link href={`/learn/${newer.slug}`}><small>บทความถัดไป <Icon name="chev-r" /></small><b>{newer.title}</b></Link>
              )}
            </nav>
          </article>

          <aside className="aside">
            <div className="box">
              <h4><Icon name="book" /> หมวดบทความ</h4>
              <ul className="cat-list">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/learn?c=${c.slug}#list`}
                      style={c.slug === cat.slug ? { color: 'var(--navy)', fontWeight: 500 } : undefined}
                      aria-current={c.slug === cat.slug ? 'true' : undefined}
                    >
                      {c.name} <span>›</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {terms.length > 0 && (
              <div className="box">
                <h4><Icon name="bulb" /> ศัพท์ที่เกี่ยวข้อง</h4>
                <div className="terms">
                  {terms.map((t) => (
                    <Link key={t.slug} className="term-card" href="/tips">
                      <span className="k">{t.abbr}</span>
                      <div><b>{t.name}</b><span>{t.full}</span></div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="box navy">
              <h4><Icon name="school" /> สำหรับครู</h4>
              <p>ใช้บทความนี้เป็นสื่อประกอบการสอนวิชาสังคมศึกษาได้ ติดต่อกรมอาเซียนเพื่อขอสื่อการสอนเพิ่มเติม</p>
              <Link className="btn btn-gold" href="/contact">ขอสื่อการสอน <Icon name="arrow" /></Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
