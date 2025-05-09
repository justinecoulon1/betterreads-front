'use client';

import { BookDto } from '@/utils/dto/book.dto';
import { useState } from 'react';
import styles from '@/components/book-details/book-details-content.module.css';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import BookInfoSection from '@/components/book-details/book-details-page-content/book-details-right-part/book-info-section';
import ReviewSection from '@/components/book-details/book-details-page-content/book-details-right-part/review-section';

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
      <ReviewSection book={book} />
    </div>
  );
}
