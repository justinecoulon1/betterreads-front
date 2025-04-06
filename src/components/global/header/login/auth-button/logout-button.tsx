'use client';

import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import React from 'react';
import styles from './auth-button.module.css';
import { logout } from '@/utils/action/auth/logout.action';

export default function LogoutButton() {
  const t = useTranslations('header');
  return (
    <button
      className={classNames(styles.authButton, 'nbShadow')}
      onClick={async () => {
        await logout();
      }}
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          await logout();
        }
      }}
    >
      {t('logout').toUpperCase()}
    </button>
  );
}
