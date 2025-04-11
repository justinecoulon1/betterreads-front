'use server';

import { ProfilePageTab } from '@/components/profile/profile-page-tabs';
import AccountSection from '@/components/profile/account-section/account-section';
import styles from './profile-page-container.module.css';
import ProfileSection from '@/components/profile/profile-section/profile-section';
import ProfilePageTabLinks from '@/components/profile/profile-page-tab-links';
import { getSessionUser } from '@/utils/action/auth/get-session-user.action';

export default async function ProfilePageContainer({ profilePageTab }: { profilePageTab: ProfilePageTab }) {
  const user = await getSessionUser();
  return (
    <>
      <div className={styles.tabLinksContainer}>
        <ProfilePageTabLinks />
      </div>
      <div className={styles.pageContentContainer}>
        {profilePageTab === ProfilePageTab.PROFILE && <ProfileSection user={user} />}
        {profilePageTab === ProfilePageTab.ACCOUNT && <AccountSection user={user} />}
      </div>
    </>
  );
}
