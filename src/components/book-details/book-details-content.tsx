'use server';

import styles from './book-details-content.module.css';
import CoverImage from '@/components/global/books/cover-image/cover-image';
import { CompleteBookDto } from '@/utils/dto/book.dto';
import BookDetailsLeftPart from '@/components/book-details/book-details-page-content/book-details-left-part/book-details-left-part';
import BookDetailsRightPart from '@/components/book-details/book-details-page-content/book-details-right-part/book-details-right-part';

export default async function BookDetailsContent({ book }: { book: CompleteBookDto }) {
  return (
    <div className={styles.bookDetailsContentContainer}>
      <div className={styles.bannerContainer}>
        <CoverImage isbn={book.isbn13} className={styles.bannerCoverImage} />
      </div>
      <div className={styles.bookDetailsContentInnerContainer}>
        <div className={styles.bookDetailsHeaderContainer} />
        <div className={styles.bookDetailsContainer}>
          <BookDetailsLeftPart book={book} />
          <BookDetailsRightPart book={book} />
        </div>
      </div>
    </div>
  );
}
