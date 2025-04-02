'use client';

import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './auth-button.module.css';
import { LightboxTabs } from '@/components/global/header/login/lightbox-tabs';
import AuthLightbox from '@/components/global/header/login/auth-lightbox';

export default function LoginButton() {
  const t = useTranslations('header');
  const [isLightboxOpened, setLightboxOpened] = useState(false);
  const [lightboxTab, setLightboxTab] = useState(LightboxTabs.LOGIN);

  const handleCloseLightbox = () => {
    setLightboxOpened(false);
  };

  const handleOpenLightbox = () => {
    setLightboxOpened(true);
  };

  const handleSetLoginTab = () => {
    setLightboxTab(LightboxTabs.LOGIN);
  };
  const handleSetRegisterTab = () => {
    setLightboxTab(LightboxTabs.REGISTER);
  };
  return (
    <>
      <AuthLightbox
        isLightboxOpened={isLightboxOpened}
        closeLightbox={handleCloseLightbox}
        loginTab={lightboxTab}
        setLoginTab={handleSetLoginTab}
        setRegisterTab={handleSetRegisterTab}
      />
      <button
        className={classNames(styles.authButton, 'nbShadow')}
        onClick={handleOpenLightbox}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleCloseLightbox();
          }
        }}
      >
        {t('login').toUpperCase()}
      </button>
    </>
  );
}
