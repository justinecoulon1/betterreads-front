'use client';

import { BookDto } from '@/utils/dto/book.dto';
import { useState } from 'react';
import styles from '@/components/book-details/book-details-content.module.css';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

export default function BookDetailsRightPart({ book }: { book: BookDto }) {
  const t = useTranslations('book-details');
  const descriptionLength = book?.description?.length ?? 0;
  const [descriptionCropped, setDescriptionCropped] = useState(descriptionLength > 1230);
  return (
    <div className={styles.bookDetailsRightPart}>
      <div className={styles.bookTitleAndAuthorContainer}>
        <h2 className={styles.bookTitle}>{book.title}</h2>
        <h3 className={styles.authorNames}>- {book.authors.map((author) => author.name).join(', ')}</h3>
      </div>
      <div className={styles.descriptionAndBookInfoContainer}>
        <div className={styles.bookDescContainer}>
          <p className={classNames(descriptionCropped && styles.croppedDesc)}>{book.description}</p>
          {descriptionCropped && (
            <button
              className={classNames(styles.showMoreButton, 'nbShadow')}
              onClick={() => setDescriptionCropped(false)}
            >
              {t('show-more')}
            </button>
          )}
        </div>
        <BookInfoSection book={book} />
      </div>
    </div>
  );
}

function BookInfoSection({ book }: { book: BookDto }) {
  const t = useTranslations('book-details');
  const bookInfo = [
    { translationKey: 'editor', value: book.editor },
    { translationKey: 'edition-language', value: book.editionLanguage },
    { translationKey: 'release-date', value: new Date(book.releaseDate).toLocaleDateString() },
    { translationKey: 'ISBN13', value: book.isbn13 },
    { translationKey: 'ISBN10', value: book.isbn10 },
    { translationKey: 'genres', value: book.genres.join(', ') },
  ];
  return (
    <section className={styles.bookDetailsRightSection}>
      <h3>{t('book-info')}</h3>
      {bookInfo.map((bookInfo) => (
        <div key={bookInfo.translationKey}>
          <p>
            <span>{t(bookInfo.translationKey)}</span>
            {bookInfo.value}
          </p>
        </div>
      ))}
    </section>
  );
}
