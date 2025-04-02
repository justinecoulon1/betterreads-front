import styles from './login-tab.module.css';
import React, { useActionState, useId } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { login, LoginStateForm } from '@/utils/sessions/login-action';

export function LoginTab({ onLightboxClosed }: { onLightboxClosed: () => void }) {
  const t = useTranslations('login-form');
  const inputId = useId();

  const handleSend = async (state: LoginStateForm, data: FormData): Promise<LoginStateForm> => {
    const loginResult = await login(state, data);
    if (loginResult.error) {
      return { error: loginResult.error };
    }

    onLightboxClosed();
    return { error: null };
  };

  const [formState, formAction, isPending] = useActionState(handleSend, { error: null });
  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.loginFormInputsDiv}>
        <div className={styles.loginFormInputDiv}>
          <label htmlFor={inputId + '-email'}>{t('email')}</label>
          <input
            className={classNames(styles.loginFormInput, 'nbShadow')}
            id={inputId + '-email'}
            name={'email'}
            type="text"
            placeholder={t('email-input-placeholder')}
          />
          {formState.error?.email && <span>{formState.error?.email.map((code) => t(code)).join(', ')}</span>}
        </div>
        <div className={styles.loginFormInputDiv}>
          <label htmlFor={inputId + '-password'}>{t('password')}</label>
          <input
            className={classNames(styles.loginFormInput, 'nbShadow')}
            id={inputId + '-password'}
            name={'password'}
            type="password"
            placeholder={t('password-input-placeholder')}
          />
        </div>
      </div>
      <button type="submit" disabled={isPending} className={classNames(styles.submitLoginButton, 'nbShadow')}>
        {isPending ? t('submitting') : t('submit-button')}
      </button>
    </form>
  );
}
