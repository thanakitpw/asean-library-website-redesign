'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';

import { Icon } from './Icon';
import { NAV } from './nav';

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

/** ส่วนหัวเว็บ — `pathname` เป็น null ระหว่าง prerender (ยังไม่รู้หน้าปัจจุบัน) */
export function HeaderView({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={open ? 'header open' : 'header'} id="hdr">
      <div className="container">
        <Link className="brand" href="/">
          <Image src="/images/logo-asean-library.png" alt="ASEAN Library" width={56} height={56} />
          <span>
            <b>ห้องสมุดอาเซียน</b>
            <small>กรมอาเซียน กระทรวงการต่างประเทศ</small>
          </span>
        </Link>
        <nav className="menu" aria-label="เมนูหลัก">
          {NAV.map((item) => {
            const on = isActive(pathname, item.href) || !!item.children?.some((c) => isActive(pathname, c.href.split(/[?#]/)[0]));
            const link = (
              <Link href={item.href} onClick={close} className={on ? 'on' : undefined} aria-current={pathname === item.href ? 'page' : undefined}>
                {item.label}
                {item.children && <Icon name="chev-down" />}
              </Link>
            );
            if (!item.children) return <Fragment key={item.href}>{link}</Fragment>;
            return (
              <div key={item.href} className="dd">
                {link}
                <div className="sub">
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href} onClick={close}>{c.label}</Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
        <Link onClick={close} className={isActive(pathname, '/network') ? 'btn btn-gold on' : 'btn btn-gold'} href="/network">
          <Icon name="pin" /> ค้นหาห้องสมุด
        </Link>
        <button className="burger" aria-label="เมนู" aria-expanded={open} aria-controls="hdr" onClick={() => setOpen((v) => !v)}>
          <Icon name="menu" />
        </button>
      </div>
    </header>
  );
}

export function SiteHeader() {
  return <HeaderView pathname={usePathname()} />;
}
