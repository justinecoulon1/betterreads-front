'use client';

import classNames from 'classnames';
import React from 'react';
import styles from './auth-button.module.css';
import { logout } from '@/utils/action/auth/logout.action';
import { Power } from 'lucide-react';

export default function LogoutButton() {
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
      {<Power />}
    </button>
  );
}
