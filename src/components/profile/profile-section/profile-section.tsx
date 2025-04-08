'use client';

import { UserDto } from '@/utils/dto/user.dto';
import styles from './profile-section.module.css';
import { useCallback, useEffect, useState } from 'react';
import ShelvesContainer from '@/components/profile/profile-section/shelves/shelves-container';
import { getUserShelves } from '@/utils/action/shelf/get-user-shelves.action';
import { ShelfDto } from '@/utils/dto/shelf.dto';

export default function ProfileSection({ user }: { user: UserDto }) {
  const [shelves, setShelves] = useState<ShelfDto[] | undefined>();
  const [error, setError] = useState<string | undefined>();

  const fetchShelves = useCallback(async () => {
    try {
      const getUserShelvesResponse = await getUserShelves(user.id);
      setShelves(getUserShelvesResponse.shelves);
      setError(getUserShelvesResponse.error);
    } catch (err) {
      console.error('Failed to fetch shelves:', err);
    }
  }, [user.id]);

  useEffect(() => {
    void fetchShelves();
  }, [fetchShelves]);

  return (
    <div className={styles.profileSectionContainer}>
      <h2>Profile {user.name}!</h2>
      {shelves ? <ShelvesContainer shelves={shelves} /> : <p>Loading</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
