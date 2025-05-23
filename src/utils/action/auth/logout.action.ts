'use server';

import { redirect } from 'next/navigation';
import { getSession } from '@/utils/action/auth/get-session.action';

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/');
}
