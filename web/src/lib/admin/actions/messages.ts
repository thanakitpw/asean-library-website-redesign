'use server';

import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/admin/auth';
import { id } from '@/lib/admin/form';

export async function deleteMessage(form: FormData) {
  const { db } = await requireAdmin();
  const msgId = id(form);
  if (msgId) {
    const { error } = await db.from('contact_messages').delete().eq('id', msgId);
    if (error) throw new Error(`ลบไม่สำเร็จ: ${error.message}`);
  }
  redirect('/admin/messages?deleted=1');
}
