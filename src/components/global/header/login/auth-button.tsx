import styles from './auth-button.module.css';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import React from 'react';

export default function AuthButton({
  onLightboxOpened,
  onLightboxClosed,
  onSetLoginTab,
}: {
  onLightboxOpened: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onLightboxClosed: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onSetLoginTab: (e: React.MouseEvent | React.KeyboardEvent) => void;
}) {
  const t = useTranslations('header');
  return (
    <div className={styles.authButtonsContainer}>
      <button
        className={classNames('nbShadow')}
        onClick={async (e) => {
          onLightboxOpened(e);
          onSetLoginTab(e);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onLightboxClosed(e);
            onSetLoginTab(e);
          }
        }}
      >
        {t('connexion').toUpperCase()}
      </button>
    </div>
  );
}
