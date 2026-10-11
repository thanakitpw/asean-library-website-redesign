import type { Metadata } from 'next';

import './admin.css';

export const metadata: Metadata = {
  title: { default: 'หลังบ้าน', template: '%s — หลังบ้านห้องสมุดอาเซียน' },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<'/admin'>) {
  return children;
}
