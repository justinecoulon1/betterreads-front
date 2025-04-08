'use client';

import { UserDto } from '@/utils/dto/user.dto';
import styles from './profile-section.module.css';
import { useEffect, useState } from 'react';
import ShelvesContainer from '@/components/profile/profile-section/shelves/shelves-container';
import { getUserShelves } from '@/utils/action/shelf/get-user-shelves.action';
import { ShelfDto } from '@/utils/dto/shelf.dto';

export default function ProfileSection({ user }: { user: UserDto }) {
  const [shelves, setShelves] = useState<ShelfDto[]>([]);
  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const shelves = await getUserShelves(user.id);
        if (shelves) {
          setShelves(shelves);
        }
      } catch (err) {
        console.error('Failed to fetch shelves:', err);
      }
    };
    fetchShelves();
  }, [user.id]);
  return (
    <div className={styles.profileSectionContainer}>
      <h2>Profile {user.name}!</h2>
      <ShelvesContainer shelves={shelves} />
    </div>
  );
}
