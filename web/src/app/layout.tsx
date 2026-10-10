import type { Metadata, Viewport } from 'next';
import { Kanit } from 'next/font/google';
import { Suspense } from 'react';

import { IconSprite } from '@/components/Icon';
import { HeaderView, SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

import './globals.css';

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-kanit',
  display: 'swap',
});

const SITE = 'โครงการห้องสมุดอาเซียน';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asean-library-redesign.vercel.app'),
  title: { default: `${SITE} — กรมอาเซียน กระทรวงการต่างประเทศ`, template: `%s — ${SITE}` },
  description:
    'ห้องสมุดอาเซียน 77 แห่งใน 77 จังหวัด ศูนย์การเรียนรู้เกี่ยวกับอาเซียนในโรงเรียนทั่วประเทศ โดยกรมอาเซียน กระทรวงการต่างประเทศ',
  openGraph: { siteName: SITE, locale: 'th_TH', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#00468A' };

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="th" className={kanit.variable}>
      <body>
        <a className="skip" href="#main">ข้ามไปยังเนื้อหาหลัก</a>
        <IconSprite />
        <Suspense fallback={<HeaderView pathname={null} />}>
          <SiteHeader />
        </Suspense>
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
