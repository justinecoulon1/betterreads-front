'use client';

import { ShelfWithLastBookDto } from '@/utils/dto/smallShelfDto';
import ShelfCard from '@/components/profile/profile-section/shelves/shelf-card';
import styles from './shelves-container.module.css';
import SeeMoreLink from '@/components/generic/see-more-button/see-more-link';

export default function ShelvesContainer({
  shelves,
  containerTitle,
}: {
  shelves: ShelfWithLastBookDto[];
  containerTitle: string;
}) {
  return (
    <div className={styles.shelvesContainer}>
      <div className={styles.shelvesHeaderContainer}>
        <h2>{containerTitle}</h2>
        <SeeMoreLink path={'/profile/shelves'} />
      </div>
      <div className={styles.shelveCardsListContainer}>
        {shelves.map((shelf) => (
          <ShelfCard key={`shelf-card-${shelf.id}`} shelf={shelf} />
        ))}
      </div>
    </div>
  );
}
