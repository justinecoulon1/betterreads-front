import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/utils/session/lib';
import { cookies } from 'next/headers';

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
