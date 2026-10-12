// โครงสร้างข้อมูลของเว็บ — ออกแบบให้ map ตรงกับตารางในฐานข้อมูลที่จะผูกภายหลัง
// (posts / libraries / albums / glossary) ดู src/lib/content.ts

import type { IconName } from '@/components/icon-sprite';

export type Tone = 'navy' | 'green' | 'gold' | 'blue';

/** ภูมิภาคตามที่ลูกค้ายืนยัน: เหนือ 17 / อีสาน 20 / กลาง-ตะวันออก 26 / ใต้ 14 จังหวัด */
export type Zone = 'north' | 'northeast' | 'central' | 'south';

/** วันที่ที่บางข่าวรู้แค่ปี */
export type PubDate = { iso: string; precision: 'day' | 'year' };

// ---------- posts (ข่าว + บทความ) ----------
export type NewsCategory = 'opening' | 'activity';
export type ArticleCategory = 'about' | 'apsc' | 'aec' | 'ascc' | 'ext' | 'move';

type PostBase = {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt: PubDate;
  cover?: string; // path ใต้ /public หรือ URL รูป
  icon?: IconName; // ใช้แทนรูปเมื่อไม่มี cover
  tone?: Tone;
  /** HTML จากระบบจัดการเนื้อหา (ผ่านการ sanitize ตอนบันทึก) */
  bodyHtml?: string;
  gallery?: string[];
  views?: number;
  /** ข้อความเริ่มต้นเป็นตัวอย่าง ไม่ได้มาจากเว็บเดิม */
  sample?: boolean;
};

export type NewsPost = PostBase & {
  type: 'news';
  category: NewsCategory;
  province?: string;
  libraryNo?: number;
  school?: string;
  ceremonyDate?: PubDate;
};

export type ArticlePost = PostBase & {
  type: 'article';
  categories: ArticleCategory[];
  readingMinutes?: number;
  audience?: string;
  relatedTerms?: string[]; // slug ของ glossary
};

export type CategoryInfo<K extends string> = {
  slug: K;
  name: string;
  short: string;
  desc: string;
  icon: IconName;
  tone: Tone;
};

// ---------- libraries ----------
export type Library = {
  no: number | null; // ลำดับแห่งที่ (ข้อมูลเดิมบางแห่งไม่มี)
  province: string;
  region: 'north' | 'northeast' | 'central' | 'east' | 'south';
  year: string; // พ.ศ. ที่เปิด
  school: string;
  tel: string;
  address: string; // ที่อยู่ อีเมล Facebook ตามหน้าเครือข่ายของเว็บเดิม (หลายบรรทัด)
  website: string;
  newsSlug?: string; // ข่าวพิธีเปิดของห้องสมุดนี้
};

// ---------- glossary (เกร็ดน่ารู้) ----------
export type GlossaryGroup = 'meet' | 'pillar' | 'coop';
export type Term = {
  slug: string;
  abbr: string;
  name: string;
  full: string;
  definition: string;
  groups: GlossaryGroup[];
};

// ---------- albums ----------
export type AlbumCategory = 'opening' | 'activity' | 'library';
export type Album = {
  slug: string;
  title: string;
  category: AlbumCategory;
  date?: PubDate;
  place?: string;
  placeIcon?: IconName;
  newsSlug?: string; // อัลบั้มพิธีเปิดที่สร้างจากข่าว
  photos: { src: string; caption: string }[];
};
