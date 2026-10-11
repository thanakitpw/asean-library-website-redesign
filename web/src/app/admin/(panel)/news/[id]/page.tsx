import type { Metadata } from 'next';

import { PostEditor } from '@/components/admin/PostEditor';

export const metadata: Metadata = { title: 'แก้ไขข่าว' };

export default async function Page({ params }: PageProps<'/admin/news/[id]'>) {
  return <PostEditor type="news" id={(await params).id} />;
}
