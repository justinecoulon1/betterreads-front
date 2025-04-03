import styles from './login-tab.module.css';
import React, { useActionState, useId } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { register } from '@/utils/action/register-action';

export type RegisterStateForm = {
  error: {
    name?: string[];
    email?: string[];
    passwordForm?: string[];
  } | null;
};

export function RegisterTab({ closeLightbox }: { closeLightbox: () => void }) {
  const t = useTranslations('register-form');
  const inputId = useId();

  const handleSend = async (state: RegisterStateForm, data: FormData): Promise<RegisterStateForm> => {
    const registerResult = await register(state, data);
    if (registerResult.error) {
      return { error: registerResult.error };
    }

    closeLightbox();
    return { error: null };
  };

  const [formState, formAction, isPending] = useActionState(handleSend, { error: null });
  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.loginFormInputsDiv}>
        <div className={styles.loginFormInputDiv}>
          <label htmlFor={inputId + '-name'}>{t('name')}</label>
          <input
            className={classNames(styles.loginFormInput, 'nbShadow')}
            id={inputId + '-name'}
            name={'name'}
            type="text"
            placeholder={t('name-input-placeholder')}
          />

          <div className={styles.loginFormErrorDiv}>
            {formState.error?.name && <span>{formState.error?.name.map((code) => t(code)).join(', ')}</span>}{' '}
          </div>
        </div>

        <div className={styles.loginFormInputDiv}>
          <label htmlFor={inputId + '-email'}>{t('email')}</label>
          <input
            className={classNames(styles.loginFormInput, 'nbShadow')}
            id={inputId + '-email'}
            name={'email'}
            type="text"
            placeholder={t('email-input-placeholder')}
          />

          <div className={styles.loginFormErrorDiv}>
            {formState.error?.email && <span>{formState.error?.email.map((code) => t(code)).join(', ')}</span>}
          </div>
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

          <div className={styles.loginFormErrorDiv}>
            {formState.error?.passwordForm && (
              <span>{formState.error?.passwordForm.map((code) => t(code)).join(', ')}</span>
            )}
          </div>
        </div>

        <div className={styles.loginFormInputDiv}>
          <label htmlFor={inputId + '-confirm-password'}>{t('confirm-password')}</label>
          <input
            className={classNames(styles.loginFormInput, 'nbShadow')}
            id={inputId + '-confirm-password'}
            name={'confirm-password'}
            type="password"
            placeholder={t('confirm-password-input-placeholder')}
          />
        </div>
      </div>

      <button type="submit" disabled={isPending} className={classNames(styles.submitLoginButton, 'nbShadow')}>
        {isPending ? t('submitting') : t('submit-button')}
      </button>
    </form>
  );
}
