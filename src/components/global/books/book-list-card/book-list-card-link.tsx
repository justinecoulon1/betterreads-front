import { SmallBookDto } from '@/utils/dto/book.dto';
import { Link } from '@/i18n/routing';
import classNames from 'classnames';
import styles from './book-list-card.module.css';
import CoverImage from '@/components/global/books/cover-image/cover-image';
import React from 'react';

export default function BookListCardLink({ book }: { book: SmallBookDto }) {
  return (
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
  );
}
