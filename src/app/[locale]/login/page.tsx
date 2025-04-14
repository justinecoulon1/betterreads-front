'use client';

import styles from './login-page.module.css';
import AuthLightboxContent from '@/components/global/header/login/auth-lightbox/auth-lightbox-content';
import { useState } from 'react';
import { LightboxTabs } from '@/components/global/header/login/auth-lightbox/lightbox-tabs';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const [loginTab, setLoginTab] = useState(LightboxTabs.LOGIN);
  return (
    <div className={styles.loginPage}>
      <AuthLightboxContent
        className={styles.loginPageContent}
        loginTab={loginTab}
        setLoginTab={() => setLoginTab(LightboxTabs.LOGIN)}
        setRegisterTab={() => setLoginTab(LightboxTabs.REGISTER)}
        onLoginSuccessful={() => redirect('/')}
        onRegisterSuccessful={() => setLoginTab(LightboxTabs.LOGIN)}
      />
    </div>
  );
}
