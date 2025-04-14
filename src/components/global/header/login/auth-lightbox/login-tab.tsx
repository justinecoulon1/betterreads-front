import styles from './login-tab.module.css';
import React, { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import InputField from '@/components/global/inputs/input-field';
import { LoginStateForm } from '@/utils/action/auth/types';
import { login } from '@/utils/action/auth/login.action';

export function LoginTab({ onLoginSuccessful = () => {} }: { onLoginSuccessful?: () => void }) {
  const t = useTranslations('login-form');

  const handleSend = async (state: LoginStateForm, data: FormData): Promise<LoginStateForm> => {
    const loginResult = await login(state, data);
    if (loginResult.error) {
      return { error: loginResult.error };
    }

    onLoginSuccessful();
    return {};
  };

  const [formState, formAction, isPending] = useActionState(handleSend, {});
  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.loginFormInputsDiv}>
        <InputField
          name={'email'}
          type={'text'}
          label={true}
          labelText={t('email')}
          placeholder={t('email-input-placeholder')}
          defaultValue={formState.email}
          errors={formState.error?.email && t(formState.error?.email)}
        />

        <InputField
          name={'password'}
          type={'password'}
          label={true}
          labelText={t('password')}
          placeholder={t('password-input-placeholder')}
          errors={formState.error?.password && t(formState.error?.password)}
        />
      </div>

      <button type="submit" disabled={isPending} className={classNames(styles.submitLoginButton, 'nbShadow')}>
        {isPending ? t('submitting') : t('submit-button')}
      </button>
    </form>
  );
}
