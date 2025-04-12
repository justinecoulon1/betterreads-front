'use server';

import { getSession } from '@/utils/action/auth/get-session.action';
import { UserDto } from '@/utils/dto/user.dto';
import { redirectToLogin } from '@/utils/action/auth/redirect-to-login.action';

export async function getSessionUser(): Promise<UserDto> {
  const session = await getSession();
  const user = session.user;
  if (!user) {
    return redirectToLogin();
  }
  return user;
}
