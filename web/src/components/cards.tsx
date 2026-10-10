import Image from 'next/image';
import Link from 'next/link';

import { articleCategory } from '@/lib/content';
import { thaiDate } from '@/lib/format';
import type { ArticlePost, NewsPost, Tone } from '@/lib/types';

import { Icon } from './Icon';
import type { IconName } from './icon-sprite';

const CARD_SIZES = '(max-width: 860px) 100vw, (max-width: 1100px) 50vw, 400px';

function Thumb({
  cover,
  icon = 'library',
  tone = 'navy',
  pill,
  pillClass,
  sizes = CARD_SIZES,
  preload,
}: {
  cover?: string;
  icon?: IconName;
  tone?: Tone;
  pill: string;
  pillClass?: string;
  sizes?: string;
  preload?: boolean;
}) {
  const tag = <span className={pillClass ? `tag-pill ${pillClass}` : 'tag-pill'}>{pill}</span>;
  if (!cover)
    return (
      <div className={`thumb ph ${tone}`}>
        <Icon name={icon} />
        {tag}
      </div>
    );
  return (
    <div className="thumb">
      <Image src={cover} alt="" fill sizes={sizes} preload={preload} />
      {tag}
    </div>
  );
}

export function NewsMeta({ post }: { post: NewsPost }) {
  return (
    <div className="meta">
      <span><Icon name="cal" /> {thaiDate(post.publishedAt)}</span>
      {(post.province || post.libraryNo === 77) && (
        <span><Icon name="pin" /> {post.province ?? 'ครบ 77 จังหวัด'}</span>
      )}
    </div>
  );
}

export function newsPill(post: NewsPost) {
  if (post.category === 'activity') return { pill: 'กิจกรรม', cls: 'green' };
  return { pill: 'พิธีเปิด', cls: 'blue' };
}

export function NewsCard({ post, wide = false }: { post: NewsPost; wide?: boolean }) {
  const { pill, cls } = newsPill(post);
  return (
    <Link className={wide ? 'card wide' : 'card'} href={`/news/${post.slug}`}>
      <Thumb
        cover={post.cover}
        icon={post.icon}
        tone={post.tone}
        pill={wide && post.libraryNo ? `ใหม่ · แห่งที่ ${post.libraryNo}` : pill}
        pillClass={wide ? undefined : cls}
        sizes={wide ? '(max-width: 1100px) 100vw, 640px' : CARD_SIZES}
        preload={wide}
      />
      <div className="body">
        <h3>{post.title}</h3>
        {wide && post.excerpt && <p>{post.excerpt}</p>}
        <NewsMeta post={post} />
      </div>
    </Link>
  );
}

export function ArticleCard({ post }: { post: ArticlePost }) {
  const cat = articleCategory(post.categories[0]);
  const pillClass = cat.tone === 'green' ? 'green' : cat.tone === 'gold' ? undefined : 'blue';
  return (
    <Link className="card" href={`/learn/${post.slug}`}>
      <Thumb cover={post.cover} icon={post.icon ?? cat.icon} tone={post.tone ?? cat.tone} pill={cat.short} pillClass={pillClass} />
      <div className="body">
        <h3>{post.title}</h3>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="meta">
          <span><Icon name="cal" /> {thaiDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
