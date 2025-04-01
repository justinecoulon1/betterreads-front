'use client';

import styles from './header.module.css';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import NavigationBar from '@/components/global/header/navigation-bar';
import AuthButton from '@/components/global/header/login/auth-button';
import React, { useState } from 'react';
import AuthLightbox from '@/components/global/header/login/auth-lightbox';
import { LoginTabs } from '@/components/global/header/login/login-tabs';

export default function Header() {
  const [isLightboxOpened, setLightboxOpened] = useState(false);
  const [loginTab, setLoginTab] = useState(LoginTabs.LOGIN);

  const onLightboxClosed: (e: React.MouseEvent | React.KeyboardEvent) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxOpened(false);
  };

  const onLightboxOpened: (e: React.MouseEvent | React.KeyboardEvent) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxOpened(true);
  };

  const onSetLoginTab: (e: React.MouseEvent | React.KeyboardEvent) => void = (e) => {
    setLoginTab(LoginTabs.LOGIN);
  };
  const onSetRegisterTab: (e: React.MouseEvent | React.KeyboardEvent) => void = (e) => {
    setLoginTab(LoginTabs.REGISTER);
  };

  return (
    <header className={styles.header}>
      <AuthLightbox
        isLightboxOpened={isLightboxOpened}
        onLightboxOpened={onLightboxOpened}
        onLightboxClosed={onLightboxClosed}
        loginTab={loginTab}
        onSetLoginTab={onSetLoginTab}
        onSetRegisterTab={onSetRegisterTab}
      />
      <div className={styles.headerDiv}>
        <Link href={'/public'} className={styles.logoDiv}>
          <Image className={styles.logo} src={'/icons/logo.png'} width={512} height={512} alt={'logo'} />
          SITE
        </Link>
        <NavigationBar />
        <AuthButton
          onLightboxOpened={onLightboxOpened}
          onLightboxClosed={onLightboxClosed}
          onSetLoginTab={onSetLoginTab}
        />
      </div>
    </header>
  );
}
