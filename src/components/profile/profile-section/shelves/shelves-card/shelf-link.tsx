import { ShelfWithLastBookDto } from '@/utils/dto/shelf.dto';
import { Link } from '@/i18n/routing';
import classNames from 'classnames';
import styles from '@/components/profile/profile-section/shelves/shelves-card/shelf-card.module.css';
import CoverImage from '@/components/global/books/cover-image/cover-image';
import { LibraryBig } from 'lucide-react';
import React from 'react';

export default function ShelfLink({ shelf, className }: { shelf: ShelfWithLastBookDto; className?: string }) {
  return (
    <Link
      href={`/profile/shelves/${shelf.id}`}
      className={classNames(styles.shelfCardContainer, 'nbShadow', className)}
    >
      <div className={styles.shelfImageContainer}>
        {shelf.books.length !== 0 ? (
          shelf.books.map((book) => (
            <CoverImage
              key={`shelf-book-cover-${book.isbn13}`}
              isbn={book.isbn13}
              className={styles.shelfBookCoverImage}
            />
          ))
        ) : (
          <LibraryBig className={styles.shelfCoverImagePlaceholder} />
        )}
      </div>
      <div className={styles.shelfNameContainer}>
        <h3 className={styles.shelfName}>{shelf.name}</h3>
      </div>
    </Link>
  );
}
