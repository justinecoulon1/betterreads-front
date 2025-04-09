'use server';

import { UserDto } from '@/utils/dto/user.dto';
import styles from './profile-section.module.css';
import ShelvesContainer from '@/components/profile/profile-section/shelves/shelves-container';
import ShelfService from '@/utils/api/shelf.service';

export default async function ProfileSection({ user }: { user: UserDto }) {
  const shelves = await ShelfService.getLastByUserId(user.id);

  return (
    <div className={styles.profileSectionContainer}>
      {shelves ? <ShelvesContainer shelves={shelves} /> : <p>Loading</p>}
    </div>
  );
}
