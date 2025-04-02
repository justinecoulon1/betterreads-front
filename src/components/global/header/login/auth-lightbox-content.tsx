import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { LoginTab } from '@/components/global/header/login/login-tab';
import { RegisterTab } from '@/components/global/header/login/register-tab';
import styles from './auth-lightbox.module.css';
import React from 'react';
import { LoginTabs } from '@/components/global/header/login/login-tabs';

export default function AuthLightboxContent({
  loginTab,
  onSetLoginTab,
  onSetRegisterTab,
  onLightboxClosed,
}: {
  loginTab: LoginTabs;
  onSetLoginTab: () => void;
  onSetRegisterTab: () => void;
  onLightboxClosed: () => void;
}) {
  const t = useTranslations('auth-lightbox');
  return (
    <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
      <div className={styles.titleDiv}>
        <div
          className={classNames(styles.loginTab, styles.loginButtons, {
            [styles.selected]: loginTab === LoginTabs.LOGIN,
          })}
          onClick={onSetLoginTab}
        >
          <p>{t('login')}</p>
        </div>
        <div
          className={classNames(styles.registerTab, styles.loginButtons, {
            [styles.selected]: loginTab === LoginTabs.REGISTER,
          })}
          onClick={onSetRegisterTab}
        >
          <p>{t('register')}</p>
        </div>
      </div>
      {loginTab === LoginTabs.LOGIN && <LoginTab onLightboxClosed={onLightboxClosed} />}
      {loginTab === LoginTabs.REGISTER && <RegisterTab onLightboxClosed={onLightboxClosed} />}
    </div>
  );
}
