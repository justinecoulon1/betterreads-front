'use server';

import React from 'react';
import { getSession } from '@/utils/sessions/login-action';
import LogoutButton from '@/components/global/header/login/auth-button/logout-button';
import LoginButton from '@/components/global/header/login/auth-button/login-button';

export default async function AuthButton() {
  const session = await getSession();
  if (session.accessToken) {
    return <LogoutButton />;
  }
  return <LoginButton />;
}
