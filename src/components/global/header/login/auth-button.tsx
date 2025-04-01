import styles from './auth-button.module.css';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import React from 'react';
import { IronSession } from 'iron-session';
import { SessionData } from '@/utils/sessions/lib';
import { logout } from '@/utils/sessions/login-action';

export default function AuthButton({
  onLightboxOpened,
  onLightboxClosed,
  onSetLoginTab,
  session,
}: {
  onLightboxOpened: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onLightboxClosed: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onSetLoginTab: (e: React.MouseEvent | React.KeyboardEvent) => void;
  session: IronSession<SessionData>;
}) {
  const t = useTranslations('header');
  return (
    <div className={styles.authButtonsContainer}>
      {!session.accessToken ? (
        <button
          className={classNames('nbShadow')}
          onClick={async (e) => {
            onLightboxOpened(e);
            onSetLoginTab(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onLightboxClosed(e);
              onSetLoginTab(e);
            }
          }}
        >
          {t('login').toUpperCase()}
        </button>
      ) : (
        <button
          className={classNames('nbShadow')}
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
      )}
    </div>
  );
}
