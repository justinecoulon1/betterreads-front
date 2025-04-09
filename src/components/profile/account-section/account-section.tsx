'use client';

import { UserDto } from '@/utils/dto/user.dto';
import styles from './account-section.module.css';
import AccountInfo from '@/components/profile/account-section/account-info/account-info';

export default function AccountSection({ user }: { user: UserDto }) {
  return (
    <div className={styles.accountSectionContainer}>
      <h2>Account {user.name}!</h2>
      <AccountInfo user={user} />
    </div>
  );
}
