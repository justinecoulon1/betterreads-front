'use client';

import ChangeBookReadingStatusButton from '@/components/book-details/book-details-page-content/change-book-reading-status-button';
import { ShelfType } from '@/utils/dto/shelf.dto';
import { useState } from 'react';

export default function ChangeBookReadingStatusButtonContainer({
  bookStatus,
  userId,
  bookId,
}: {
  bookStatus?: ShelfType;
  userId?: number;
  bookId: number;
}) {
  const [bookReadingStatus, setReadingBookStatus] = useState<ShelfType | undefined>(bookStatus);

  const changeReadingStatus = (readingStatus: ShelfType | undefined) => {
    setReadingBookStatus(readingStatus);
  };

  return (
    <>
      <ChangeBookReadingStatusButton
        bookStatus={bookReadingStatus}
        changeReadingStatus={changeReadingStatus}
        buttonType={ShelfType.TO_READ}
        userId={userId}
        bookId={bookId}
      />
      <ChangeBookReadingStatusButton
        bookStatus={bookReadingStatus}
        changeReadingStatus={changeReadingStatus}
        buttonType={ShelfType.READING}
        userId={userId}
        bookId={bookId}
      />
      <ChangeBookReadingStatusButton
        bookStatus={bookReadingStatus}
        changeReadingStatus={changeReadingStatus}
        buttonType={ShelfType.READ}
        userId={userId}
        bookId={bookId}
      />
    </>
  );
}
