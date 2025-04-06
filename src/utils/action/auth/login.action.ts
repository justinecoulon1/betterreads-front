'use server';

import { LoginResponseDto } from '@/utils/dto/user.dto';
import UserService from '@/utils/api/user.service';
import { LoginStateForm } from '@/utils/action/auth/types';
import { getSession } from '@/utils/action/auth/get-session.action';

export async function login(loginStateForm: LoginStateForm, data: FormData): Promise<LoginStateForm> {
  const session = await getSession();

  const formEmail = (data.get('email') as string).trim();
  const formPassword = data.get('password') as string;

  const errors: LoginStateForm['error'] = {};

  if (!formEmail) {
    errors.email = 'email-required';
  }
  if (!formPassword) {
    errors.password = 'password-required';
  }

  if (Object.keys(errors).length > 0) {
    return {
      email: formEmail,
      error: errors,
    };
  }

  const { user, accessToken }: LoginResponseDto = await UserService.login(formEmail, formPassword);

  if (!user) {
    return { error: { credentials: 'wrong-credentials' } };
  }

  session.user = user;
  session.accessToken = accessToken;

  await session.save();
  return {};
}
