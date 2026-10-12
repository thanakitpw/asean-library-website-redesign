import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Icon } from '@/components/Icon';
import { Lightbox } from '@/components/Lightbox';
import { PageHero } from '@/components/PageHero';
import { ShareBar } from '@/components/ShareBar';
import { getNews, getNewsNeighbors, getNewsPost } from '@/lib/content';
import { thaiDate } from '@/lib/format';

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<'/news/[slug]'>): Promise<Metadata> {
  const post = await getNewsPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    openGraph: { type: 'article', images: post.cover ? [post.cover] : undefined },
  };
}


export default async function NewsDetailPage({ params }: PageProps<'/news/[slug]'>) {
  const { slug } = await params;
  const [post, all, { newer, older }] = await Promise.all([getNewsPost(slug), getNews(), getNewsNeighbors(slug)]);
  if (!post) notFound();

  const isOpening = post.category === 'opening';
  const latest = all.filter((n) => n.slug !== post.slug && n.cover).slice(0, 3);
  const counts = { opening: all.filter((n) => n.category === 'opening').length, activity: all.filter((n) => n.category === 'activity').length };

  return (
    <>
      <PageHero
        tag={isOpening ? (post.libraryNo ? `พิธีเปิด · แห่งที่ ${post.libraryNo}` : 'พิธีเปิด') : 'กิจกรรมห้องสมุด'}
        tagIcon="flag"
        title={post.title}
        lead={
          <span style={{ display: 'inline-flex', gap: 18, flexWrap: 'wrap', fontSize: 15 }}>
            <span>โพสต์เมื่อ {thaiDate(post.publishedAt)}</span>
            <span>ผู้เขียน: กรมอาเซียน</span>
            {post.views !== undefined && <span>อ่าน {post.views.toLocaleString('th-TH')} ครั้ง</span>}
          </span>
        }
        crumbs={[
          { label: 'ข่าวสาร', href: '/news' },
          { label: isOpening ? 'พิธีเปิดห้องสมุด' : 'กิจกรรมห้องสมุด', href: `/news?c=${post.category}` },
          { label: post.libraryNo ? `แห่งที่ ${post.libraryNo}` : (post.province ?? 'ข่าว') },
        ]}
      />
      <section className="page-body">
        <div className="container read">
          <article>
            {post.cover && !isOpening ? (
              // ข่าวกิจกรรมส่วนใหญ่เป็นภาพรายงาน/สถิติทั้งภาพ จึงแสดงเต็มสัดส่วน ไม่ครอป
              <a className="cover-full" href={post.cover} target="_blank" rel="noopener" aria-label="เปิดภาพขนาดเต็ม">
                <Image src={post.cover} alt={post.title} width={1600} height={1200} sizes="(max-width: 1100px) 100vw, 840px" preload />
              </a>
            ) : post.cover ? (
              <div className="cover">
                <Image src={post.cover} alt={post.title} fill sizes="(max-width: 1100px) 100vw, 840px" preload />
              </div>
            ) : (
              <div className="cover ph"><Icon name={post.icon ?? 'library'} /></div>
            )}
            {post.bodyHtml ? (
              <div className="prose" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
            ) : (
              post.excerpt && <div className="prose"><p>{post.excerpt}</p></div>
            )}
            {post.gallery && post.gallery.length > 0 && (
              <section className="news-photos" aria-label="ภาพบรรยากาศ">
                <h2>
                  <Icon name="images" /> ภาพบรรยากาศ{isOpening ? 'พิธีเปิด' : ''}
                  <span>{post.gallery.length} ภาพ · คลิกเพื่อดูภาพใหญ่</span>
                </h2>
                <Lightbox>
                  <div className="photo-grid">
                    {post.gallery.map((src, i) => (
                      <a key={src} href={src} data-lightbox data-group="news" data-caption={`${post.title} (${i + 1}/${post.gallery!.length})`}>
                        <Image src={src} alt={`ภาพที่ ${i + 1}`} width={600} height={450} sizes="(max-width: 600px) 50vw, (max-width: 1100px) 50vw, 420px" />
                      </a>
                    ))}
                  </div>
                </Lightbox>
              </section>
            )}
            <div className="prose" style={{ marginTop: 18 }}>

              {isOpening && (
                <div className="facts">
                  {post.ceremonyDate && <Fact icon="cal" label="วันที่ส่งมอบ" value={thaiDate(post.ceremonyDate, 'long')} />}
                  {post.school && <Fact icon="school" label="โรงเรียน" value={post.school} />}
                  {post.province && <Fact icon="pin" label="จังหวัด" value={post.province} />}
                  {post.libraryNo && <Fact icon="library" label="ลำดับในโครงการ" value={`แห่งที่ ${post.libraryNo} จาก 77`} />}
                </div>
              )}



              {post.school && (
                <blockquote>
                  ห้องสมุดเปิดให้นักเรียน ครู และประชาชนในชุมชนเข้าใช้บริการ ติดต่อ{post.school}เพื่อสอบถามเวลาเปิดให้บริการ
                </blockquote>
              )}
            </div>

            <ShareBar label="แชร์ข่าวนี้" />
            <nav className="prevnext" aria-label="ข่าวก่อนหน้าและถัดไป">
              {older ? (
                <Link href={`/news/${older.slug}`}><small><Icon name="chev-l" /> ข่าวก่อนหน้า</small><b>{older.title}</b></Link>
              ) : <span />}
              {newer && (
                <Link href={`/news/${newer.slug}`}><small>ข่าวถัดไป <Icon name="chev-r" /></small><b>{newer.title}</b></Link>
              )}
            </nav>
          </article>

          <aside className="aside">
            {post.province && (
              <div className="box navy">
                <h4><Icon name="pin" /> ห้องสมุดในจังหวัดนี้</h4>
                <p>{post.school ? `${post.school} จังหวัด${post.province} เปิดให้บริการแก่นักเรียนและชุมชน` : `ดูห้องสมุดอาเซียนในจังหวัด${post.province}`}</p>
                <Link className="btn btn-gold" href={`/network?q=${encodeURIComponent(post.province)}`}>ดูในเครือข่ายห้องสมุด <Icon name="arrow" /></Link>
              </div>
            )}
            <div className="box">
              <h4><Icon name="flag" /> ข่าวล่าสุด</h4>
              <div className="mini-list">
                {latest.map((n) => (
                  <Link key={n.slug} href={`/news/${n.slug}`}>
                    <Image src={n.cover!} alt="" width={72} height={56} sizes="72px" />
                    <span><b>{n.title}</b><small>{thaiDate(n.publishedAt)}</small></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="box">
              <h4><Icon name="book" /> หมวดข่าว</h4>
              <ul className="cat-list">
                <li><Link href="/news?c=opening">พิธีเปิดห้องสมุด <span>{counts.opening}</span></Link></li>
                <li><Link href="/news?c=activity">กิจกรรมห้องสมุด <span>{counts.activity}</span></Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Fact({ icon, label, value }: { icon: 'cal' | 'school' | 'pin' | 'library'; label: string; value: string }) {
  return (
    <div className="fact">
      <div className="ic"><Icon name={icon} /></div>
      <div><small>{label}</small><b>{value}</b></div>
    </div>
  );
}
