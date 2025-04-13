import classNames from 'classnames';
import styles from '@/components/book-details/book-details-content.module.css';
import { ShelfType } from '@/utils/dto/shelf.dto';
import BookService from '@/utils/api/book.service';
import { BookCheck, BookOpen, BookPlus } from 'lucide-react';
import { redirectToLogin } from '@/utils/action/auth/redirect-to-login.action';

export default function ChangeBookReadingStatusButton({
  bookStatus,
  buttonType,
  userId,
  bookId,
  changeReadingStatus,
}: {
  bookStatus?: ShelfType;
  buttonType: ShelfType;
  userId?: number;
  bookId: number;
  changeReadingStatus: (shelfType: ShelfType | undefined) => void;
}) {
  return (
    <button
      className={classNames(styles.readingStatusButton, bookStatus === buttonType && styles.selected)}
      onClick={async () => {
        if (userId) {
          changeReadingStatus(
            await BookService.updateBookReadingStatus(bookId, bookStatus === buttonType ? undefined : buttonType),
          );
        } else {
          await redirectToLogin();
        }
      }}
    >
      {buttonType === ShelfType.READING && <BookOpen />}
      {buttonType === ShelfType.TO_READ && <BookPlus />}
      {buttonType === ShelfType.READ && <BookCheck />}
    </button>
  );
}
