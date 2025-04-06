'use server';

import React from 'react';
import LogoutButton from '@/components/global/header/login/auth-button/logout-button';
import LoginButton from '@/components/global/header/login/auth-button/login-button';
import { getSession } from '@/utils/action/auth/get-session.action';

export default async function AuthButton() {
  const session = await getSession();
  if (session.accessToken) {
    return <LogoutButton />;
  }
  return <LoginButton />;
}
