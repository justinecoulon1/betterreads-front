'use client';

import { ShelfDto } from '@/utils/dto/shelf.dto';
import ShelfCard from '@/components/profile/profile-section/shelves/shelf-card';
import styles from './shelves-container.module.css';
import SeeMoreLink from '@/components/generic/see-more-button/see-more-link';

export default function ShelvesContainer({ shelves }: { shelves: ShelfDto[] }) {
  return (
    <div className={styles.shelvesContainer}>
      <div className={styles.shelvesHeaderContainer}>
        <h2>My shelves</h2>
        <SeeMoreLink path={'/books'} />
      </div>
      <div className={styles.shelveCardsListContainer}>
        {shelves.map((lastShelf) => (
          <ShelfCard key={`shelf-card-${lastShelf.id}`} shelf={lastShelf} />
        ))}
      </div>
    </div>
  );
}
