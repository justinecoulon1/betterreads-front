'use server';

import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/utils/session/lib';
import { cookies } from 'next/headers';
import { LoginResponseDto } from '@/utils/dto/user.dto';
import UserService from '@/utils/api/user.service';
import { redirect } from 'next/navigation';

export type LoginStateForm = {
  error: {
    email?: string[];
    password?: string[];
    credentials?: string;
  } | null;
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function login(loginStateForm: LoginStateForm, data: FormData): Promise<LoginStateForm> {
  const session = await getSession();

  const formEmail = data.get('email') as string;
  const formPassword = data.get('password') as string;

  if (formEmail.length === 0 || formPassword.length === 0) {
    let errors = { error: {} };

    if (formEmail.length === 0) {
      errors = {
        ...errors,
        error: {
          ...errors.error,
          email: ['email-required'],
        },
      };
    }

    if (formPassword.length === 0) {
      errors = {
        ...errors,
        error: {
          ...errors.error,
          password: ['password-required'],
        },
      };
    }

    return errors;
  }

  const { user, accessToken }: LoginResponseDto = await UserService.login(formEmail, formPassword);

  if (!user) {
    return { error: { credentials: 'wrong-credentials' } };
  }

  session.user = user;
  session.accessToken = accessToken;

  await session.save();
  return { error: null };
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/');
}
