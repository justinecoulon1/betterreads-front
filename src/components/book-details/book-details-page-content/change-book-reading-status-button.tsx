'use client ';

import classNames from 'classnames';
import styles from '@/components/book-details/book-details-content.module.css';
import { ShelfType } from '@/utils/dto/smallShelfDto';
import BookService from '@/utils/api/book.service';
import { BookCheck, BookOpen, BookPlus } from 'lucide-react';

export default function ChangeBookReadingStatusButton({
  bookStatus,
  buttonType,
  userId,
  bookId,
  changeReadingStatus,
}: {
  bookStatus: ShelfType | undefined;
  buttonType: ShelfType;
  userId: number;
  bookId: number;
  changeReadingStatus: (shelfType: ShelfType | undefined) => void;
}) {
  return (
    <button
      className={classNames(styles.readingStatusButton, bookStatus === buttonType && styles.selected)}
      onClick={async () => {
        changeReadingStatus(await BookService.changeBookReadingStatus(userId, bookId, buttonType));
      }}
    >
      {buttonType === ShelfType.READING && <BookOpen />}
      {buttonType === ShelfType.TO_READ && <BookPlus />}
      {buttonType === ShelfType.READ && <BookCheck />}
    </button>
  );
}
