'use server';

import { ProfilePageTab } from '@/components/profile/profile-page-tabs';
import AccountSection from '@/components/profile/account-section/account-section';
import styles from './profile-page-container.module.css';
import ProfileSection from '@/components/profile/profile-section/profile-section';
import { getSessionUser } from '@/utils/action/auth/get-session-user.action';

export default async function ProfilePageContainer({ profilePageTab }: { profilePageTab: ProfilePageTab }) {
  const user = await getSessionUser();
  return (
    <div className={styles.pageContentContainer}>
      {profilePageTab === ProfilePageTab.PROFILE && <ProfileSection />}
      {profilePageTab === ProfilePageTab.ACCOUNT && <AccountSection user={user} />}
    </div>
  );
}
