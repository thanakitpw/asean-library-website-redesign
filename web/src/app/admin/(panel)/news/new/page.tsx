import type { Metadata } from 'next';

import { PostEditor } from '@/components/admin/PostEditor';

export const metadata: Metadata = { title: 'เพิ่มข่าว' };

export default function Page() {
  return <PostEditor type="news" id={null} />;
}
