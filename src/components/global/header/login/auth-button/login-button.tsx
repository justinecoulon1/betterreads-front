'use client';

import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './auth-button.module.css';
import { LoginTabs } from '@/components/global/header/login/login-tabs';
import AuthLightbox from '@/components/global/header/login/auth-lightbox';

export default function LoginButton() {
  const t = useTranslations('header');
  const [isLightboxOpened, setLightboxOpened] = useState(false);
  const [loginTab, setLoginTab] = useState(LoginTabs.LOGIN);

  const onLightboxClosed = () => {
    setLightboxOpened(false);
  };

  const onLightboxOpened = () => {
    setLightboxOpened(true);
  };

  const onSetLoginTab = () => {
    setLoginTab(LoginTabs.LOGIN);
  };
  const onSetRegisterTab = () => {
    setLoginTab(LoginTabs.REGISTER);
  };
  return (
    <>
      <AuthLightbox
        isLightboxOpened={isLightboxOpened}
        onLightboxClosed={onLightboxClosed}
        loginTab={loginTab}
        onSetLoginTab={onSetLoginTab}
        onSetRegisterTab={onSetRegisterTab}
      />
      <button
        className={classNames(styles.authButton, 'nbShadow')}
        onClick={onLightboxOpened}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onLightboxClosed();
          }
        }}
      >
        {t('login').toUpperCase()}
      </button>
    </>
  );
}
