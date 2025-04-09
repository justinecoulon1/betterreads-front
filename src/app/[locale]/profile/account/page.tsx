'use server';

import ProfilePageContainer from '@/components/profile/profile-page-container';
import styles from '../profile-page.module.css';
import { ProfilePageTab } from '@/components/profile/profile-page-tabs';

export default async function ProfileAccountPage() {
  return (
    <div className={styles.profilePage}>
      <ProfilePageContainer profilePageTab={ProfilePageTab.ACCOUNT} />
    </div>
  );
}
