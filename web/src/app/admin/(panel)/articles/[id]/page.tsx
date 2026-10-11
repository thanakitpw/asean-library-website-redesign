import type { Metadata } from 'next';

import { PostEditor } from '@/components/admin/PostEditor';

export const metadata: Metadata = { title: 'แก้ไขบทความ' };

export default async function Page({ params }: PageProps<'/admin/articles/[id]'>) {
  return <PostEditor type="article" id={(await params).id} />;
}
