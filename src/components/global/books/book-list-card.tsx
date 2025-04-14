import styles from './book-list-card.module.css';
import classNames from 'classnames';
import React from 'react';
import CoverImage from '@/components/global/books/cover-image/cover-image';
import { SmallBookDto } from '@/utils/dto/book.dto';
import { Link } from '@/i18n/routing';
import { X } from 'lucide-react';
import BookService from '@/utils/api/book.service';
import { SmallShelfDto } from '@/utils/dto/shelf.dto';

export default function BookListCard({
  book,
  hasButton,
  onBookRemoved,
  shelf,
}: {
  book: SmallBookDto;
  hasButton?: boolean;
  onBookRemoved: (book: SmallBookDto) => void;
  shelf: SmallShelfDto;
}) {
  return (
    <div className={styles.buttonContainer}>
      {hasButton && (
        <button
          className={classNames(styles.bookDeleteButton, 'nbShadow')}
          onClick={async () => {
            await BookService.updateBookInShelves(book.id, [], [shelf.id]);
            onBookRemoved(book);
          }}
        >
          <X className={styles.bookDeleteButtonImage} />
        </button>
      )}
      <Link href={`/books/${book.isbn13}`} className={classNames(styles.bookListCardContainer, 'nbShadow')}>
        <div className={styles.coverImageContainer}>
          <CoverImage isbn={book.isbn13} className={styles.bookCover} />
        </div>

        <div className={styles.bookInfoContainer}>
          <div className={styles.bookTitleContainer}>
            <h3 className={styles.bookTitle}>{book.title}</h3>
          </div>

          <div className={styles.bookAuthorsContainer}>
            <p className={styles.bookAuthors}>{book.authors.map((author) => author.name).join(', ')}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
