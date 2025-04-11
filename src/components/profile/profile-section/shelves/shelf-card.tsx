'use client';

import { ShelfWithLastBookDto } from '@/utils/dto/smallShelfDto';
import styles from './shelf-card.module.css';
import classNames from 'classnames';
import { Link } from '@/i18n/routing';
import React from 'react';
import CoverImage from '@/components/global/books/cover-image/cover-image';

export default function ShelfCard({ shelf }: { shelf: ShelfWithLastBookDto }) {
  return (
    <Link href={`/profile/shelves/${shelf.id}`} className={classNames(styles.shelfCardContainer, 'nbShadow')}>
      <div className={styles.shelfImageContainer}>
        {shelf.books.map((book) => (
          <CoverImage
            key={`shelf-book-cover-${book.isbn13}`}
            isbn={book.isbn13}
            className={styles.shelfBookCoverImage}
          />
        ))}
      </div>
      <div className={styles.shelfNameContainer}>
        <h3 className={styles.shelfName}>{shelf.name}</h3>
      </div>
    </Link>
  );
}
