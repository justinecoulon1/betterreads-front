'use server';

import { LoginResponseDto } from '@/utils/dto/user.dto';
import UserService from '@/utils/api/user.service';
import { LoginStateForm } from '@/utils/action/auth/types';
import { getSession } from '@/utils/action/auth/get-session.action';
import { getServerErrorCode } from '@/utils/errors/error-utils';

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

  let user;
  let accessToken;
  let refreshToken;

  try {
    const loginResponse: LoginResponseDto = await UserService.login(formEmail, formPassword);
    user = loginResponse.user;
    accessToken = loginResponse.accessToken;
    refreshToken = loginResponse.refreshToken;
  } catch (err) {
    return { error: { err: getServerErrorCode(err) }, email: formEmail };
  }

  session.user = user;
  session.accessToken = accessToken;
  session.refreshToken = refreshToken;

  await session.save();
  return {};
}
