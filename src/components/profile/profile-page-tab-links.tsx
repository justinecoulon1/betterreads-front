'use client';

import styles from '@/components/profile/profile-page-container.module.css';
import { Link } from '@/i18n/routing';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

export default function ProfilePageTabLinks() {
  const t = useTranslations('profile-page');
  return (
    <div className={styles.profilePageTabButtons}>
      <Link className={classNames('nbShadow', styles.profilePageTabButton)} href={'/profile'}>
        {t('profile')}
      </Link>
      <Link className={classNames('nbShadow', styles.profilePageTabButton)} href={'/profile/account'}>
        {t('account')}
      </Link>
    </div>
  );
}
