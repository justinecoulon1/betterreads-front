'use server';

import { getSession } from '@/utils/action/auth/get-session.action';
import { redirectToLogin } from '@/utils/action/auth/redirect-to-login.action';
import axios from 'axios';
import { cookies } from 'next/headers';
import { SessionData } from '@/utils/session/lib';

export async function refreshSession() {
  const session = await getSession();
  const refreshToken = session.refreshToken;
  if (!refreshToken) {
    return redirectToLogin();
  }
  const res = await axios.post<SessionData>(
    'http://localhost:3000/api/refresh-session',
    {},
    {
      headers: {
        Cookie: (await cookies()).toString(),
      },
    },
  );
  console.log(res.headers);
}
