import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { LoginTab } from '@/components/global/header/login/login-tab';
import { RegisterTab } from '@/components/global/header/login/register-tab';
import styles from './auth-lightbox.module.css';
import React from 'react';
import { LightboxTabs } from '@/components/global/header/login/lightbox-tabs';

export default function AuthLightboxContent({
  loginTab,
  setLoginTab,
  setRegisterTab,
  closeLightbox,
}: {
  loginTab: LightboxTabs;
  setLoginTab: () => void;
  setRegisterTab: () => void;
  closeLightbox: () => void;
}) {
  const t = useTranslations('auth-lightbox');
  return (
    <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
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
      {loginTab === LightboxTabs.LOGIN && <LoginTab closeLightbox={closeLightbox} />}
      {loginTab === LightboxTabs.REGISTER && <RegisterTab closeLightbox={closeLightbox} />}
    </div>
  );
}
