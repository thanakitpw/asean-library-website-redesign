'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/icon-sprite';

export const ADMIN_NAV: { href: string; label: string; icon: IconName }[] = [
  { href: '/admin', label: 'ภาพรวม', icon: 'grid' },
  { href: '/admin/news', label: 'ข่าว', icon: 'board' },
  { href: '/admin/articles', label: 'บทความ', icon: 'book' },
  { href: '/admin/libraries', label: 'ห้องสมุด 77 แห่ง', icon: 'library' },
  { href: '/admin/glossary', label: 'คำศัพท์เกร็ดน่ารู้', icon: 'bulb' },
  { href: '/admin/infographics', label: 'อินโฟกราฟิก', icon: 'images' },
  { href: '/admin/albums', label: 'คลังภาพ', icon: 'images' },
  { href: '/admin/messages', label: 'ข้อความติดต่อ', icon: 'mail' },
];

export function AdminNavView({ pathname }: { pathname: string | null }) {
  return (
    <>
      {ADMIN_NAV.map((n) => {
        const on = pathname !== null && (n.href === '/admin' ? pathname === n.href : pathname.startsWith(n.href));
        return (
          <Link key={n.href} href={n.href} aria-current={on ? 'page' : undefined}>
            <Icon name={n.icon} /> {n.label}
          </Link>
        );
      })}
    </>
  );
}

export function AdminNav() {
  return <AdminNavView pathname={usePathname()} />;
}
