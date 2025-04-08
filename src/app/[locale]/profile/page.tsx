'use server';

import { getSession } from '@/utils/action/auth/get-session.action';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import ProfilePageContainer from '@/components/profile/profile-page-container';
import styles from './profile-page.module.css';

export default async function ProfilePage() {
  const session = await getSession();
  const user = session.user;
  if (!user) {
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }
  return (
    <div className={styles.profilePage}>
      <ProfilePageContainer user={user} />
    </div>
  );
}
