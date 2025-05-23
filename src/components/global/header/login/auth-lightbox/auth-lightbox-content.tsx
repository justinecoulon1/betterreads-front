import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { LoginTab } from '@/components/global/header/login/auth-lightbox/login-tab';
import { RegisterTab } from '@/components/global/header/login/auth-lightbox/register-tab';
import styles from './auth-lightbox.module.css';
import React from 'react';
import { LightboxTabs } from '@/components/global/header/login/auth-lightbox/lightbox-tabs';

export default function AuthLightboxContent({
  loginTab,
  setLoginTab,
  setRegisterTab,
  className,
  onLoginSuccessful,
  onRegisterSuccessful,
}: {
  loginTab: LightboxTabs;
  setLoginTab: () => void;
  setRegisterTab: () => void;
  onLoginSuccessful?: () => void;
  onRegisterSuccessful?: () => void;
  className?: string;
}) {
  const t = useTranslations('auth-lightbox');
  return (
    <div className={classNames(styles.lightboxContainer, className)} onMouseDown={(e) => e.stopPropagation()}>
      <div className={styles.titleDiv}>
        <div
          className={classNames(styles.loginTab, styles.loginButtons, {
            [styles.selected]: loginTab === LightboxTabs.LOGIN,
          })}
          onClick={setLoginTab}
        >
          <p>{t('login')}</p>
        </div>
        <div
          className={classNames(styles.registerTab, styles.loginButtons, {
            [styles.selected]: loginTab === LightboxTabs.REGISTER,
          })}
          onClick={setRegisterTab}
        >
          <p>{t('register')}</p>
        </div>
      </div>
      {loginTab === LightboxTabs.LOGIN && <LoginTab onLoginSuccessful={onLoginSuccessful} />}
      {loginTab === LightboxTabs.REGISTER && <RegisterTab onRegisterSuccessful={onRegisterSuccessful} />}
    </div>
  );
}
