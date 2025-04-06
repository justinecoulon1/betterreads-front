import { BookListDto } from '@/utils/dto/book.dto';
import styles from './book-list-card.module.css';
import classNames from 'classnames';
import React from 'react';
import CoverImage from '@/components/global/books/cover-image/cover-image';

export default function BookListCard({ book }: { book: BookListDto }) {
  return (
    <div className={classNames(styles.bookListCardContainer)}>
      {book.title}
      <CoverImage isbn={book.isbn} />
    </div>
  );
}
