import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

import { Icon } from './Icon';
import type { IconName } from './icon-sprite';

type Crumb = { label: string; href?: string };

/** แถบหัวหน้าย่อย: breadcrumb + ป้าย + หัวข้อ + คำโปรย และคลื่นด้านล่าง */
export function PageHero({
  title,
  lead,
  tag,
  tagIcon = 'sparkles',
  crumbs,
  tint = false,
}: {
  title: ReactNode;
  lead?: ReactNode;
  tag?: string;
  tagIcon?: IconName;
  crumbs: Crumb[];
  tint?: boolean;
}) {
  return (
    <section className={tint ? 'phero tint-bottom' : 'phero'}>
      <div className="blob a" />
      <div className="blob b" />
      <div className="container">
        <nav className="crumb" aria-label="breadcrumb">
          <Link href="/">หน้าแรก</Link>
          {crumbs.map((c) => (
            <span key={c.label} style={{ display: 'contents' }}>
              <Icon name="chev-r" />
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        {tag && (
          <span className="pill">
            <Icon name={tagIcon} /> {tag}
          </span>
        )}
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
      <div className="wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,30 C240,70 480,0 720,22 C960,44 1200,60 1440,14 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}

export function SectionHead({
  tag,
  icon,
  tone,
  title,
  lead,
  more,
  align = 'center',
  style,
}: {
  tag: string;
  icon: IconName;
  tone?: 'green' | 'gold';
  title: ReactNode;
  lead?: ReactNode;
  more?: { href: string; label: string };
  align?: 'center' | 'left';
  style?: CSSProperties;
}) {
  const head = (
    <>
      <span className={tone ? `tag ${tone}` : 'tag'}>
        <Icon name={icon} /> {tag}
      </span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </>
  );
  if (align === 'center') return <div className="sec-head" style={style}>{head}</div>;
  return (
    <div className="sec-head left" style={style}>
      <div>{head}</div>
      {more && (
        <Link className="link-more" href={more.href}>
          {more.label} <Icon name="arrow" />
        </Link>
      )}
    </div>
  );
}
