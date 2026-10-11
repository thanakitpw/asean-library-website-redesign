import type { Metadata } from 'next';

import { PostEditor } from '@/components/admin/PostEditor';

export const metadata: Metadata = { title: 'เพิ่มบทความ' };

export default function Page() {
  return <PostEditor type="article" id={null} />;
}
