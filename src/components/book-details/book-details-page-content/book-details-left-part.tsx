'use server';

import { BookDto } from '@/utils/dto/book.dto';
import styles from '@/components/book-details/book-details-content.module.css';
import CoverImage from '@/components/global/books/cover-image/cover-image';
import classNames from 'classnames';
import AddToShelveButton from '@/components/book-details/book-details-page-content/add-to-shelves-button';
import BookService from '@/utils/api/book.service';
import BookReadingStatusButtonContainer from '@/components/book-details/book-details-page-content/book-reading-status-button-container';
import { getSession } from '@/utils/action/auth/get-session.action';
import BookAuthorsPagesLinks from '@/components/book-details/book-details-page-content/book-authors-pages-links';

export default async function BookDetailsLeftPart({ book }: { book: BookDto }) {
  const session = await getSession();
  const user = session?.user;
  const bookStatus = user ? await BookService.getBookReadingStatus(book.id) : undefined;

  return (
    <div className={styles.bookDetailsLeftPart}>
      <div className={styles.bookDetailsCoverImageContainer}>
        <CoverImage isbn={book.isbn13} className={styles.bookDetailsCoverImage} />
      </div>
      <div className={styles.buttonsContainer}>
        <div className={classNames(styles.readingStatusButtonsContainer, 'nbShadow')}>
          <BookReadingStatusButtonContainer bookStatus={bookStatus} userId={user?.id} bookId={book.id} />
        </div>

        <AddToShelveButton isLoggedIn={!!user} bookId={book.id} />

        <BookAuthorsPagesLinks authors={book.authors} />
      </div>
    </div>
  );
}
