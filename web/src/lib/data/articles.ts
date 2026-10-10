// บทความ — ชื่อเรื่องที่ไม่มี sample มาจากเว็บเดิม (เนื้อหาเดิมเป็นภาพอินโฟกราฟิก จึงยังไม่มี bodyHtml)
import type { ArticleCategory, ArticlePost, CategoryInfo } from '@/lib/types';

export const ARTICLE_CATEGORIES: CategoryInfo<ArticleCategory>[] = [
  { slug: 'about', name: 'เกี่ยวกับอาเซียน', short: 'เกี่ยวกับอาเซียน', desc: 'ประวัติ กฎบัตร และ 10 ประเทศสมาชิก', icon: 'globe', tone: 'navy' },
  { slug: 'apsc', name: 'เสาการเมืองและความมั่นคง', short: 'การเมืองและความมั่นคง', desc: 'APSC ภูมิภาคที่สงบสุขและมีเสถียรภาพ', icon: 'shield', tone: 'navy' },
  { slug: 'aec', name: 'เสาเศรษฐกิจ', short: 'เศรษฐกิจ', desc: 'AEC ตลาดและฐานการผลิตเดียว', icon: 'trend', tone: 'green' },
  { slug: 'ascc', name: 'เสาสังคมและวัฒนธรรม', short: 'สังคมและวัฒนธรรม', desc: 'ASCC ประชาชนเป็นศูนย์กลาง', icon: 'heart', tone: 'gold' },
  { slug: 'ext', name: 'อาเซียนกับภาคีภายนอก', short: 'ภาคีภายนอก', desc: 'ความร่วมมือกับประเทศคู่เจรจา', icon: 'handshake', tone: 'blue' },
  { slug: 'move', name: 'ก้าวไปกับอาเซียน', short: 'ก้าวไปกับอาเซียน', desc: 'เตรียมเยาวชนไทยสู่ประชาคมอาเซียน', icon: 'footprints', tone: 'gold' },
];

const d = (iso: string) => ({ iso, precision: 'day' as const });
const y = (be: number) => ({ iso: `${be - 543}-06-01`, precision: 'year' as const });

export const ARTICLES: ArticlePost[] = [
  {
    type: 'article', slug: 'asean-economic-outlook', categories: ['aec'], icon: 'trend', tone: 'green',
    title: 'อนาคตเศรษฐกิจที่สดใสของอาเซียน',
    excerpt: 'ภาพรวมการเติบโตทางเศรษฐกิจของภูมิภาคและโอกาสของประเทศไทย',
    publishedAt: d('2022-03-20'),
  },
  {
    type: 'article', slug: 'rcep', categories: ['aec', 'ext'], icon: 'handshake', tone: 'green',
    title: 'สิ่งดีดีที่ยังไม่รู้เกี่ยวกับ RCEP',
    excerpt: 'ความตกลงหุ้นส่วนทางเศรษฐกิจระดับภูมิภาคกับประโยชน์ที่คนไทยได้รับ',
    publishedAt: d('2022-03-20'),
  },
  {
    type: 'article', slug: 'asean-regional-forum', categories: ['apsc'], icon: 'shield', tone: 'navy',
    title: 'ASEAN Regional Forum (ARF) เวทีความมั่นคงที่อาเซียนเป็นแกนกลาง',
    excerpt: 'เวทีหารือด้านการเมืองและความมั่นคงที่อาเซียนเป็นแกนกลาง',
    publishedAt: d('2022-03-20'),
    readingMinutes: 3,
    audience: 'ม.ต้น ขึ้นไป',
    relatedTerms: ['amm-pmc', 'arf'],
    sample: true,
    bodyHtml: `
<p><strong>ASEAN Regional Forum (ARF)</strong> หรือ การประชุมอาเซียนว่าด้วยความร่วมมือด้านการเมืองและความมั่นคงในภูมิภาคเอเชีย-แปซิฟิก เป็นเวทีที่ประเทศในภูมิภาคและประเทศมหาอำนาจมาพูดคุยกันเรื่องความมั่นคงอย่างเปิดเผย โดยมีอาเซียนเป็นผู้ขับเคลื่อนหลัก</p>
<p>ARF จัดประชุมครั้งแรกที่กรุงเทพฯ เมื่อเดือนกรกฎาคม 2537 ประเทศไทยจึงมีบทบาทสำคัญตั้งแต่เริ่มต้น</p>
<h2>ARF ทำอะไร</h2>
<p>ARF ไม่ได้เป็นพันธมิตรทางทหาร แต่เป็นเวทีหารือเพื่อป้องกันไม่ให้ความขัดแย้งบานปลาย โดยวางแนวทางไว้ 3 ขั้น</p>
<ol>
  <li><strong>สร้างความไว้เนื้อเชื่อใจ</strong> ให้ประเทศสมาชิกรู้จักและเข้าใจกันมากขึ้น</li>
  <li><strong>การทูตเชิงป้องกัน</strong> พูดคุยกันตั้งแต่ปัญหายังเล็ก ก่อนลุกลามเป็นความขัดแย้ง</li>
  <li><strong>หาทางแก้ไขความขัดแย้ง</strong> ด้วยวิธีสันติ</li>
</ol>
<blockquote>อาเซียนอยู่ในที่นั่งคนขับ (ASEAN centrality) หมายถึงอาเซียนเป็นผู้กำหนดวาระและเป็นเจ้าภาพการประชุม แม้สมาชิกจะมีประเทศมหาอำนาจร่วมอยู่ด้วย</blockquote>
<h2>ใครเป็นสมาชิกบ้าง</h2>
<ul>
  <li>ประเทศสมาชิกอาเซียน 10 ประเทศ</li>
  <li>ประเทศคู่เจรจาของอาเซียน เช่น ญี่ปุ่น จีน สาธารณรัฐเกาหลี อินเดีย ออสเตรเลีย สหรัฐอเมริกา และสหภาพยุโรป</li>
  <li>ประเทศอื่นในภูมิภาคเอเชีย-แปซิฟิก</li>
</ul>
<h3>ลองคิดต่อ</h3>
<p>ถ้าเพื่อนสองคนในห้องเรียนมีเรื่องไม่เข้าใจกัน การให้ทุกคนมานั่งคุยกันก่อนจะช่วยได้อย่างไร? นี่คือแนวคิดเดียวกับที่ ARF ใช้ในระดับประเทศ</p>`,
  },
  {
    type: 'article', slug: 'acai', categories: ['ascc'], icon: 'heart', tone: 'gold',
    title: 'ศูนย์อาเซียนเพื่อผู้สูงวัยอย่างมีศักยภาพและนวัตกรรม (ACAI)',
    excerpt: 'ความร่วมมือรับมือสังคมสูงวัยในภูมิภาค โดยมีไทยเป็นที่ตั้งศูนย์',
    publishedAt: y(2564),
  },
  {
    type: 'article', slug: 'aec', categories: ['aec'], icon: 'trend', tone: 'green',
    title: 'ประชาคมเศรษฐกิจอาเซียน (ASEAN Economic Community: AEC)',
    excerpt: 'ตลาดและฐานการผลิตเดียว การเคลื่อนย้ายสินค้า บริการ และแรงงานฝีมือ',
    publishedAt: y(2564),
  },
  {
    type: 'article', slug: 'asean-connectivity', categories: ['aec'], icon: 'link', tone: 'blue',
    title: 'การส่งเสริมความเชื่อมโยงระหว่างอาเซียน (ASEAN Connectivity)',
    excerpt: 'เชื่อมโยงโครงสร้างพื้นฐาน กฎระเบียบ และผู้คนในภูมิภาค',
    publishedAt: y(2564),
  },
  {
    type: 'article', slug: 'marine-debris', categories: ['ascc'], icon: 'globe', tone: 'gold',
    title: 'ความร่วมมืออาเซียนด้านการจัดการขยะทะเล',
    excerpt: 'กรอบปฏิบัติการอาเซียนว่าด้วยการจัดการขยะทะเล',
    publishedAt: y(2564),
  },
  {
    type: 'article', slug: 'asean-10-members', categories: ['about'], icon: 'globe', tone: 'navy', sample: true,
    title: 'รู้จักอาเซียน 10 ประเทศสมาชิก',
    excerpt: 'เมืองหลวง ภาษา และธงชาติของเพื่อนบ้านอาเซียน',
    publishedAt: y(2564),
  },
  {
    type: 'article', slug: 'dialogue-partners', categories: ['ext'], icon: 'handshake', tone: 'blue', sample: true,
    title: 'อาเซียนกับประเทศคู่เจรจา',
    excerpt: 'ความร่วมมือระหว่างอาเซียนกับประเทศและองค์การนอกภูมิภาค',
    publishedAt: y(2564),
  },
  {
    type: 'article', slug: 'asean-citizen', categories: ['move'], icon: 'footprints', tone: 'gold', sample: true,
    title: 'เตรียมตัวเป็นพลเมืองอาเซียน',
    excerpt: 'ทักษะภาษาและความเข้าใจเพื่อนบ้านที่เยาวชนไทยควรมี',
    publishedAt: y(2564),
  },
];
