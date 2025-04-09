'use server';

import { ProfilePageTab } from '@/components/profile/profile-page-tabs';
import AccountSection from '@/components/profile/account-section/account-section';
import styles from './profile-page-container.module.css';
import ProfileSection from '@/components/profile/profile-section/profile-section';
import ProfilePageTabLinks from '@/components/profile/profile-page-tab-links';
import { getSession } from '@/utils/action/auth/get-session.action';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function ProfilePageContainer({ profilePageTab }: { profilePageTab: ProfilePageTab }) {
  const session = await getSession();
  const user = session.user;
  if (!user) {
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }
  return (
    <div className={styles.profilePageContainer}>
      <ProfilePageTabLinks />
      {profilePageTab === ProfilePageTab.PROFILE && <ProfileSection user={user} />}
      {profilePageTab === ProfilePageTab.ACCOUNT && <AccountSection user={user} />}
    </div>
  );
}
