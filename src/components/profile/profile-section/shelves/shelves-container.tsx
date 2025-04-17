'use client';

import { ShelfWithLastBookDto } from '@/utils/dto/shelf.dto';
import ShelfCard from '@/components/profile/profile-section/shelves/shelves-card/shelf-card';
import styles from './shelves-container.module.css';
import SeeMoreLink from '@/components/generic/see-more-button/see-more-link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ShelvesContainer({
  initialShelves,
  containerTitle,
  seeMoreButton,
  seeMoreLink,
}: {
  initialShelves?: ShelfWithLastBookDto[];
  containerTitle: string;
  seeMoreButton: boolean;
  seeMoreLink?: string;
}) {
  const t = useTranslations('shelves-containers');
  return (
    <div className={styles.shelvesContainer}>
      <div className={styles.shelvesHeaderContainer}>
        <h2>{t(containerTitle)}</h2>
        {seeMoreButton && seeMoreLink && <SeeMoreLink path={seeMoreLink} />}
      </div>
      <div className={styles.shelveCardsListContainer}>
        {initialShelves ? <ShelvesCardsListContainer initialShelves={initialShelves} /> : <p>Loading...</p>}
      </div>
    </div>
  );
}

function ShelvesCardsListContainer({ initialShelves }: { initialShelves: ShelfWithLastBookDto[] }) {
  const [userShelves, setUserShelves] = useState(initialShelves);
  return (
    <>
      {userShelves.map((shelf) => (
        <ShelfCard
          key={`shelf-card-${shelf.id}`}
          shelf={shelf}
          hasButton={true}
          onShelfDelete={(deletedShelf) => {
            setUserShelves((shelves) => shelves.filter((shelf) => shelf.id !== deletedShelf.id));
          }}
        />
      ))}
    </>
  );
}
