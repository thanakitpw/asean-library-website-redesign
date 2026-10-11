import type { Metadata } from 'next';

import { PostList } from '@/components/admin/PostList';

export const metadata: Metadata = { title: 'ข่าว' };

export default function Page({ searchParams }: PageProps<'/admin/news'>) {
  return <PostList type="news" searchParams={searchParams} />;
}
