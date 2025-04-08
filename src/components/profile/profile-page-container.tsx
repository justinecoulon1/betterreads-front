'use client';

import { UserDto } from '@/utils/dto/user.dto';
import { useState } from 'react';
import { ProfilePageTab } from '@/components/profile/profile-page-tabs';
import AccountSection from '@/components/profile/account-section/account-section';
import classNames from 'classnames';
import styles from './profile-page-container.module.css';
import { useTranslations } from 'next-intl';
import ProfileSection from '@/components/profile/profile-section/profile-section';

export default function ProfilePageContainer({ user }: { user: UserDto }) {
  const t = useTranslations('profile-page');
  const [profilePageTab, setProfilePageTab] = useState(ProfilePageTab.PROFILE);
  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.profilePageTabButtons}>
        <button
          className={classNames('nbShadow', styles.profilePageTabButton)}
          onClick={() => setProfilePageTab(ProfilePageTab.PROFILE)}
        >
          {t('profile')}
        </button>
        <button
          className={classNames('nbShadow', styles.profilePageTabButton)}
          onClick={() => setProfilePageTab(ProfilePageTab.ACCOUNT)}
        >
          {t('account')}
        </button>
      </div>
      {profilePageTab === ProfilePageTab.PROFILE && <ProfileSection user={user} />}
      {profilePageTab === ProfilePageTab.ACCOUNT && <AccountSection user={user} />}
    </div>
  );
}
