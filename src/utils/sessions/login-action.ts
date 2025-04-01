'use server';

import { getIronSession } from 'iron-session';
import { defaultSession, SessionData, sessionOptions } from '@/utils/sessions/lib';
import { cookies } from 'next/headers';
import { LoginResponseDto } from '@/utils/dto/user.dto';
import UserService from '@/utils/api/user.service';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const passwordSchema = z
  .string()
  .min(8, { message: 'invalid-password-length' })
  .max(100, { message: 'invalid-password-length' })
  .regex(/[A-Z]/, { message: 'invalid-password-uppercase' })
  .regex(/[a-z]/, { message: 'invalid-password-lowercase' })
  .regex(/[0-9]/, { message: 'invalid-password-number' });

const loginFormSchema = z.object({
  email: z.string().email({ message: 'invalid-email' }).trim(),
  password: passwordSchema,
});

export type LoginStateForm = {
  error: {
    email?: string[];
    password?: string[];
    credentials?: string;
  } | null;
};

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (!session.accessToken) {
    session.accessToken = defaultSession.accessToken;
  }

  return session;
}

export async function login(loginStateForm: LoginStateForm, data: FormData): Promise<LoginStateForm> {
  const result = loginFormSchema.safeParse(Object.fromEntries(data.entries()));
  if (result.error) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }
  const session = await getSession();

  const formEmail = data.get('email') as string;
  const formPassword = data.get('password') as string;

  const { user, accessToken }: LoginResponseDto = await UserService.login(formEmail, formPassword);

  if (!user) {
    return { error: { credentials: 'Wrong Credentials!' } };
  }

  session.user = user;
  session.accessToken = accessToken;

  await session.save();
  redirect('/');
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/');
}
