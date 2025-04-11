'use server';

import { BookDto } from '@/utils/dto/book.dto';
import styles from '@/components/book-details/book-details-content.module.css';
import CoverImage from '@/components/global/books/cover-image/cover-image';
import classNames from 'classnames';
import AddToShelveButton from '@/components/book-details/book-details-page-content/add-to-shelves-button';
import { getSessionUser } from '@/utils/action/auth/get-session-user.action';
import ShelfService from '@/utils/api/shelf.service';
import BookService from '@/utils/api/book.service';
import ChangeBookReadingStatusButtonContainer from '@/components/book-details/book-details-page-content/change-book-reading-status-button-container';

export default async function BookDetailsLeftPart({ book }: { book: BookDto }) {
  const user = await getSessionUser();
  const shelves = await ShelfService.getByUserId(user.id);
  const bookStatus = await BookService.getBookReadingStatus(user.id, book.id);

  return (
    <div className={styles.bookDetailsLeftPart}>
      <div className={styles.bookDetailsCoverImageContainer}>
        <CoverImage isbn={book.isbn13} className={styles.bookDetailsCoverImage} />
      </div>
      <div className={styles.buttonsContainer}>
        <div className={classNames(styles.readingStatusButtonsContainer, 'nbShadow')}>
          <ChangeBookReadingStatusButtonContainer bookStatus={bookStatus} userId={user.id} bookId={book.id} />
        </div>

        <AddToShelveButton shelves={shelves} isbn={book.isbn13} />
      </div>
    </div>
  );
}
