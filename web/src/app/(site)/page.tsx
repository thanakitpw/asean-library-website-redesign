import Image from 'next/image';
import Link from 'next/link';

import { NewsMeta } from '@/components/cards';
import { Icon } from '@/components/Icon';
import { CONTACT } from '@/components/nav';
import { SectionHead } from '@/components/PageHero';
import { WordOfDay } from '@/components/WordOfDay';
import { getAlbums, getArticles, getGlossary, getLibraries, getNews } from '@/lib/content';
import { thaiDate } from '@/lib/format';
import { MEMBER_COUNTRIES } from '@/lib/taxonomy';
import type { ArticleCategory } from '@/lib/types';

const PATHS = [
  { tone: 'navy', icon: 'grad', title: 'สำหรับนักเรียน', text: 'อ่านหนังสือ เล่นเกมความรู้ และเรียนรู้เพื่อนบ้านอาเซียนทั้ง 10 ประเทศ', go: 'เริ่มเรียนรู้', href: '/learn' },
  { tone: 'green', icon: 'school', title: 'สำหรับครูและโรงเรียน', text: 'สื่อการสอน แผนกิจกรรม และแนวทางใช้ห้องสมุดอาเซียนในชั้นเรียน', go: 'ดูสื่อการสอน', href: '/learn?c=move#list' },
  { tone: 'gold', icon: 'users', title: 'สำหรับชุมชน', text: 'ประชาชนทั่วไปเข้าใช้บริการและร่วมกิจกรรมของห้องสมุดอาเซียนในพื้นที่', go: 'ค้นหาใกล้บ้าน', href: '/network' },
  { tone: 'blue', icon: 'building', title: 'สำหรับหน่วยงาน', text: 'ภาครัฐและเอกชนที่สนใจศึกษาดูงานหรือร่วมสนับสนุนโครงการ', go: 'ขอศึกษาดูงาน', href: '/contact' },
] as const;

const PILLARS: { slug: ArticleCategory; tone: string; icon: 'shield' | 'trend' | 'heart'; title: string; text: string }[] = [
  { slug: 'apsc', tone: 'navy', icon: 'shield', title: 'การเมืองและความมั่นคง', text: 'ประชาคมการเมืองและความมั่นคงอาเซียน (APSC) เพื่อภูมิภาคที่สงบสุขและมีเสถียรภาพ' },
  { slug: 'aec', tone: 'green', icon: 'trend', title: 'เศรษฐกิจ', text: 'ประชาคมเศรษฐกิจอาเซียน (AEC) ตลาดและฐานการผลิตเดียวที่มีประชากรกว่า 680 ล้านคน' },
  { slug: 'ascc', tone: 'gold', icon: 'heart', title: 'สังคมและวัฒนธรรม', text: 'ประชาคมสังคมและวัฒนธรรมอาเซียน (ASCC) ประชาชนเป็นศูนย์กลาง ไม่ทิ้งใครไว้ข้างหลัง' },
];

const GALLERY_CAPTIONS: Record<string, string> = {
  'asean-room': 'ห้องสมุดอาเซียน · ASEAN Room',
  'reading-activity': 'มุมอ่านหนังสือ',
};

export default async function HomePage() {
  const [news, articles, terms, libraries, albums] = await Promise.all([
    getNews(),
    getArticles(),
    getGlossary(),
    getLibraries(),
    getAlbums(),
  ]);
  const [lead, ...rest] = news.filter((n) => n.category === 'opening');
  const firstYear = Math.min(...libraries.map((l) => Number(l.year)));
  // นับจากปีที่เปิดแห่งแรกถึงแห่งล่าสุด (ไม่ใช้วันที่ปัจจุบัน เพื่อให้ prerender ได้)
  const years = Math.max(...libraries.map((l) => Number(l.year))) - firstYear;
  const gallery = albums.filter((a) => a.slug !== 'opening-77').slice(0, 6);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="blob a" />
        <div className="blob b" />
        <div className="blob c" />
        <div className="container">
          <div>
            <span className="pill"><Icon name="sparkles" /> 1 จังหวัด · 1 โรงเรียน · 1 ห้องสมุดอาเซียน</span>
            <h1>
              เปิดโลกอาเซียน
              <br />
              ผ่าน
              <span className="hl">
                ห้องสมุด
                <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 9 C 50 2, 150 2, 198 8" stroke="#ECA90E" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              ใกล้บ้านคุณ
            </h1>
            <p>
              ศูนย์การเรียนรู้เกี่ยวกับอาเซียนในโรงเรียน {libraries.length} แห่งทั่วประเทศ พร้อมหนังสือ สื่อดิจิทัล
              และกิจกรรมสนุก ๆ สำหรับนักเรียน ครู และชุมชน โดยกรมอาเซียน กระทรวงการต่างประเทศ
            </p>
            <div className="cta">
              <Link className="btn btn-gold" href="/network">ค้นหาห้องสมุดใกล้คุณ <Icon name="arrow" /></Link>
              <Link className="btn btn-ghost" href={`/news/${lead.slug}`}>ดูข่าวพิธีเปิดล่าสุด</Link>
            </div>
            <div className="mini">
              <span><Icon name="library" /> {libraries.length} ห้องสมุด</span>
              <span><Icon name="pin" /> 77 จังหวัด</span>
              <span><Icon name="clock" /> ตั้งแต่ปี {firstYear}</span>
              <span><Icon name="globe" /> 10 ประเทศสมาชิก</span>
            </div>
          </div>
          <div className="collage" aria-hidden="true">
            <div className="badge"><b>{libraries.length}</b><span>แห่งทั่วไทย</span></div>
            <div className="ph p1"><Image src="/images/kids-reading.jpg" alt="" fill sizes="(max-width: 860px) 62vw, 360px" preload /></div>
            <div className="ph p2"><Image src="/images/lib-interior.jpg" alt="" fill sizes="(max-width: 860px) 44vw, 260px" /></div>
            <div className="ph p3"><Image src="/images/news-75.jpg" alt="" fill sizes="(max-width: 860px) 36vw, 210px" /></div>
          </div>
        </div>
        <div className="wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,40 C240,90 480,0 720,30 C960,60 1200,80 1440,20 L1440,80 L0,80 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ===== AUDIENCE PATHS ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="paths">
            {PATHS.map((p) => (
              <Link key={p.title} className={`path ${p.tone}`} href={p.href}>
                <div className="ic"><Icon name={p.icon} /></div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <span className="go">{p.go} <Icon name="arrow" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section className="section tint">
        <div className="container">
          <SectionHead
            align="left"
            tag="ข่าวและกิจกรรม"
            icon="flag"
            title="ความเคลื่อนไหวล่าสุด"
            lead="พิธีเปิดห้องสมุดอาเซียนและกิจกรรมของโรงเรียนในเครือข่าย"
            more={{ href: '/news', label: 'ดูข่าวทั้งหมด' }}
          />
          <div className="news">
            <Link className="n-feat" href={`/news/${lead.slug}`}>
              {lead.cover && <Image src={lead.cover} alt="" fill sizes="(max-width: 1100px) 100vw, 660px" />}
              <div className="cap">
                <span className="tag-pill">พิธีเปิด · แห่งที่ {lead.libraryNo}</span>
                <h3>{lead.title}</h3>
                <NewsMeta post={lead} />
              </div>
            </Link>
            <div className="n-list">
              {rest.slice(0, 3).map((n) => (
                <Link key={n.slug} className="n-item" href={`/news/${n.slug}`}>
                  {n.cover && <Image src={n.cover} alt="" width={150} height={118} sizes="150px" />}
                  <div>
                    <span className="tag-pill blue">พิธีเปิด</span>
                    <h4>{n.title}</h4>
                    <div className="meta"><span><Icon name="cal" /> {thaiDate(n.publishedAt)}</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div className="container stats">
          <div className="stat"><div className="ic"><Icon name="library" /></div><div><b>{libraries.length}</b><span>ห้องสมุดที่ส่งมอบแล้ว</span></div></div>
          <div className="stat"><div className="ic"><Icon name="pin" /></div><div><b>{new Set(libraries.map((l) => l.province)).size}</b><span>จังหวัดทั่วประเทศ</span></div></div>
          <div className="stat"><div className="ic"><Icon name="clock" /></div><div><b>{years}+</b><span>ปีที่ดำเนินโครงการ</span></div></div>
          <div className="stat"><div className="ic"><Icon name="globe" /></div><div><b>10</b><span>ประเทศสมาชิกอาเซียน</span></div></div>
        </div>
      </section>

      {/* ===== PILLARS ===== */}
      <section className="section">
        <div className="container">
          <SectionHead
            tag="เรียนรู้อาเซียน"
            icon="book"
            title="รู้จักอาเซียนผ่าน 3 เสาหลัก"
            lead="บทความความรู้จัดหมวดหมู่ตามเสาหลักของประชาคมอาเซียน อ่านง่าย เหมาะสำหรับนักเรียนและผู้สนใจทั่วไป"
          />
          <div className="pillars">
            {PILLARS.map((p) => (
              <div key={p.slug} className={`pillar ${p.tone}`}>
                <div className="ic"><Icon name={p.icon} /></div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <ul>
                  {articles
                    .filter((a) => a.categories.includes(p.slug))
                    .slice(0, 3)
                    .map((a) => (
                      <li key={a.slug}><Link href={`/learn/${a.slug}`}><Icon name="chev-r" /> {a.title}</Link></li>
                    ))}
                </ul>
                <Link className="more" href={`/learn?c=${p.slug}#list`}>ดูบทความทั้งหมด <Icon name="arrow" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WORD OF THE DAY ===== */}
      <section className="section tint">
        <div className="container">
          <SectionHead
            align="left"
            tag="เกร็ดน่ารู้"
            icon="bulb"
            tone="gold"
            title="เรียนรู้ศัพท์อาเซียน วันละคำ"
            lead="คำศัพท์และเรื่องน่ารู้สั้น ๆ อ่านจบใน 1 นาที"
            more={{ href: '/tips', label: 'ดูทั้งหมด' }}
          />
          <div className="word">
            <WordOfDay terms={terms} moreHref="/tips" />
            <div className="terms">
              {terms.slice(1, 5).map((t) => (
                <Link key={t.slug} className="term-card" href="/tips">
                  <span className="k">{t.abbr}</span>
                  <div><b>{t.name}</b><span>{t.full}</span></div>
                  <Icon name="chev-r" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEMBER COUNTRIES ===== */}
      <section className="section">
        <div className="container">
          <SectionHead
            tag="10 ประเทศสมาชิก"
            icon="globe"
            tone="green"
            title="รู้จักเพื่อนบ้านอาเซียน"
            lead="คลิกเพื่ออ่านข้อมูลประเทศ ธงชาติ ภาษา อาหาร และวัฒนธรรมของแต่ละประเทศ"
          />
          <div className="countries">
            {MEMBER_COUNTRIES.map((c) => (
              <Link key={c.code} className="cty" href="/learn?c=about#list">
                <div className="cc">{c.code}</div>
                <b>{c.th}</b>
                <span>{c.en}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="section tint">
        <div className="container">
          <SectionHead
            align="left"
            tag="คลังภาพ"
            icon="images"
            title="บรรยากาศห้องสมุดอาเซียน"
            lead="ภาพจากพิธีเปิดและกิจกรรมของโรงเรียนในเครือข่ายทั่วประเทศ"
            more={{ href: '/gallery', label: 'ดูคลังภาพ' }}
          />
          <div className="gallery">
            {gallery.map((a, n) => (
              <Link key={a.slug} href="/gallery">
                <Image src={a.photos[0].src} alt="" fill sizes={n === 0 ? '(max-width: 860px) 100vw, 600px' : '(max-width: 860px) 50vw, 300px'} />
                <span className="cap">{GALLERY_CAPTIONS[a.slug] ?? a.place}</span>
              </Link>
            ))}
            <Link href="/gallery" className="more-tile">
              <Icon name="images" />
              ดูภาพทั้งหมด
              <small>จาก {libraries.length} โรงเรียนทั่วประเทศ</small>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>โรงเรียนหรือหน่วยงานของคุณสนใจร่วมกับเรา?</h2>
              <p>ติดต่อกรมอาเซียนเพื่อขอศึกษาดูงาน จัดกิจกรรมส่งเสริมความรู้เกี่ยวกับอาเซียน หรือสอบถามข้อมูลโครงการห้องสมุดอาเซียน</p>
            </div>
            <div className="acts">
              <Link className="btn btn-gold" href="/contact">ติดต่อเรา <Icon name="arrow" /></Link>
              <a className="btn btn-ghost" href={CONTACT.tel}><Icon name="phone" /> {CONTACT.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
