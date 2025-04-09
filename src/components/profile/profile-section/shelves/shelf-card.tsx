'use client';

import { SmallShelfDto } from '@/utils/dto/smallShelfDto';
import styles from './shelf-card.module.css';
import classNames from 'classnames';
import { Link } from '@/i18n/routing';
import React from 'react';
import { LibraryBig } from 'lucide-react';

export default function ShelfCard({ shelf }: { shelf: SmallShelfDto }) {
  return (
    <Link href={`/profile/shelves/${shelf.id}`} className={classNames(styles.shelfCardContainer, 'nbShadow')}>
      <div className={styles.shelfImageContainer}>
        <LibraryBig className={styles.shelfImage} />
      </div>
      <div className={styles.shelfNameContainer}>
        <h3 className={styles.shelfName}>{shelf.name}</h3>
      </div>
    </Link>
  );
}
