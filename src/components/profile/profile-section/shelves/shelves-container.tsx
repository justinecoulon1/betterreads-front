'use client';

import { ShelfWithLastBookDto } from '@/utils/dto/shelf.dto';
import ShelfCard from '@/components/profile/profile-section/shelves/shelves-card/shelf-card';
import styles from './shelves-container.module.css';
import SeeMoreLink from '@/components/generic/see-more-button/see-more-link';
import { UserDto } from '@/utils/dto/user.dto';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ShelvesContainer({
  initialShelves,
  containerTitle,
  seeMoreButton,
  seeMoreLink,
  user,
}: {
  initialShelves: ShelfWithLastBookDto[];
  containerTitle: string;
  seeMoreButton: boolean;
  seeMoreLink?: string;
  user?: UserDto;
}) {
  const [userShelves, setUserShelves] = useState(initialShelves);
  const t = useTranslations('shelves-containers');
  return (
    <div className={styles.shelvesContainer}>
      <div className={styles.shelvesHeaderContainer}>
        <h2>{t(containerTitle)}</h2>
        {seeMoreButton && seeMoreLink && <SeeMoreLink path={seeMoreLink} />}
      </div>
      <div className={styles.shelveCardsListContainer}>
        {userShelves.map((shelf) => (
          <ShelfCard
            key={`shelf-card-${shelf.id}`}
            shelf={shelf}
            hasButton={true}
            user={user}
            onShelfDelete={(deletedShelf) => {
              setUserShelves((shelves) => shelves.filter((shelf) => shelf.id !== deletedShelf.id));
            }}
          />
        ))}
      </div>
    </div>
  );
}
