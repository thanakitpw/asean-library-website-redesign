import type { Metadata } from 'next';

import { PostList } from '@/components/admin/PostList';

export const metadata: Metadata = { title: 'บทความ' };

export default function Page({ searchParams }: PageProps<'/admin/articles'>) {
  return <PostList type="article" searchParams={searchParams} />;
}
