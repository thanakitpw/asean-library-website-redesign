import { ARTICLE_CATEGORIES } from '@/lib/taxonomy';

export type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };

// เมนูย่อยตามเว็บเดิม (เกี่ยวกับ / กระดานข่าว / บทความ)
export const NAV: NavItem[] = [
  { href: '/', label: 'หน้าแรก' },
  {
    href: '/about',
    label: 'เกี่ยวกับ',
    children: [
      { href: '/about', label: 'ที่มาของห้องสมุดอาเซียน' },
      { href: '/network', label: 'เครือข่ายห้องสมุดอาเซียน' },
    ],
  },
  {
    href: '/news',
    label: 'ข่าวสาร',
    children: [
      { href: '/news?c=activity', label: 'ข่าวห้องสมุดอาเซียน' },
      { href: '/news?c=opening', label: 'ข่าวพิธีเปิดห้องสมุดอาเซียน' },
    ],
  },
  {
    href: '/learn',
    label: 'เรียนรู้อาเซียน',
    children: ARTICLE_CATEGORIES.map((c) => ({ href: `/learn?c=${c.slug}#list`, label: c.name })),
  },
  { href: '/tips', label: 'เกร็ดน่ารู้' },
  { href: '/gallery', label: 'คลังภาพ' },
  { href: '/contact', label: 'ติดต่อ' },
];

export const SOCIAL = {
  facebook: 'https://www.facebook.com/ASEANThailand.MFA/',
  x: 'https://twitter.com/ASEAN_THAILAND',
  instagram: 'https://www.instagram.com/aseanthailand/',
};

export const CONTACT = {
  org: 'โครงการห้องสมุดอาเซียน กรมอาเซียน กระทรวงการต่างประเทศ',
  address: 'เลขที่ 443 ถนนศรีอยุธยา แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพมหานคร 10400',
  addressShort: '443 ถนนศรีอยุธยา แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพฯ 10400',
  phone: '02 203 5000',
  tel: 'tel:022035000',
  website: 'asean.mfa.go.th',
  hours: 'จันทร์–ศุกร์ 08.30–16.30 น.',
};
