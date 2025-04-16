import styles from './login-tab.module.css';
import React, { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import InputField from '@/components/global/inputs/input-field';
import { RegisterStateForm } from '@/utils/action/auth/types';
import { register } from '@/utils/action/auth/register.action';

type RegisterInputInfo = {
  translationKey: string;
  type: string;
  errors: string | undefined;
  default?: string | undefined;
};

export function RegisterTab({ onRegisterSuccessful = () => {} }: { onRegisterSuccessful?: () => void }) {
  const t = useTranslations('register-form');

  const handleSend = async (state: RegisterStateForm, data: FormData): Promise<RegisterStateForm> => {
    const registerResult = await register(state, data);
    if (registerResult.error) {
      return registerResult;
    }

    onRegisterSuccessful();
    return {};
  };

  const [formState, formAction, isPending] = useActionState(handleSend, {});
  const registerInputInfos: RegisterInputInfo[] = [];
  registerInputInfos.push(
    {
      translationKey: 'name',
      type: 'text',
      errors: formState.error?.name && formState.error?.name.map((code) => t(code)).join(', '),
      default: formState.name,
    },
    {
      translationKey: 'email',
      type: 'text',
      errors: formState.error?.email && formState.error?.email.map((code) => t(code)).join(', '),
      default: formState.email,
    },
    {
      translationKey: 'password',
      type: 'password',
      errors: formState.error?.passwordForm && formState.error?.passwordForm.map((code) => t(code)).join(', '),
    },
    { translationKey: 'confirm-password', type: 'password', errors: '' },
  );
  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.loginFormInputsDiv}>
        {registerInputInfos.map((inputInfo) => {
          return (
            <InputField
              key={`register-${inputInfo.translationKey}`}
              name={inputInfo.translationKey}
              type={inputInfo.type}
              placeholder={t(`${inputInfo.translationKey}-input-placeholder`)}
              label={true}
              labelText={t(inputInfo.translationKey)}
              defaultValue={inputInfo.default}
              errors={inputInfo.errors}
            />
          );
        })}
        <div className={styles.inputErrorDiv}>
          <span>{formState.error?.serverError}</span>
        </div>
      </div>

      <button type="submit" disabled={isPending} className={classNames(styles.submitLoginButton, 'nbShadow')}>
        {isPending ? t('submitting') : t('submit-button')}
      </button>
    </form>
  );
}
