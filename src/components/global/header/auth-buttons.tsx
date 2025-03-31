import styles from './auth-buttons.module.css';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';

export default function AuthButtons() {
  const t = useTranslations('header');
  return (
    <div className={styles.authButtonsContainer}>
      <button className={classNames('nbShadow')}>{t('connexion')}</button>
      <button className={classNames('nbShadow')}>{t('register')}</button>
    </div>
  );
}
