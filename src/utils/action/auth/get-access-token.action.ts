'use server';

import { getSession } from '@/utils/action/auth/get-session.action';

export async function getAccessTokenAction() {
  const session = await getSession();
  return session.accessToken;
}
