import { ShelfType, ShelfWithLastBookDto, SmallShelfDto } from '@/utils/dto/shelf.dto';
import styles from './shelf-card.module.css';
import classNames from 'classnames';
import { Link } from '@/i18n/routing';
import React from 'react';
import CoverImage from '@/components/global/books/cover-image/cover-image';
import { LibraryBig, X } from 'lucide-react';
import ShelfService from '@/utils/api/shelf.service';
import { UserDto } from '@/utils/dto/user.dto';

export default function ShelfCard({
  shelf,
  hasButton,
  user,
  onShelfDelete,
}: {
  shelf: ShelfWithLastBookDto;
  hasButton: boolean;
  user?: UserDto;
  onShelfDelete: (shelf: SmallShelfDto) => void;
}) {
  const isDeletable =
    hasButton && shelf.type !== ShelfType.READ && shelf.type !== ShelfType.READING && shelf.type !== ShelfType.TO_READ;
  return (
    <div className={styles.buttonContainer}>
      {isDeletable && (
        <button
          className={classNames(styles.shelfDeleteButton, 'nbShadow')}
          onClick={async () => {
            if (user) {
              await ShelfService.deleteShelf(user.id, shelf.id);
              onShelfDelete(shelf);
            }
          }}
        >
          <X className={styles.shelfDeleteButtonImage} />
        </button>
      )}
      <Link href={`/profile/shelves/${shelf.id}`} className={classNames(styles.shelfCardContainer, 'nbShadow')}>
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
    </div>
  );
}
