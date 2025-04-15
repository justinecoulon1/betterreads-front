import styles from './book-list-card.module.css';
import classNames from 'classnames';
import React from 'react';
import { SmallBookDto } from '@/utils/dto/book.dto';
import { X } from 'lucide-react';
import BookService from '@/utils/api/book.service';
import { SmallShelfDto } from '@/utils/dto/shelf.dto';
import BookListCardLink from '@/components/global/books/book-list-card/book-list-card-link';

export default function BookListCard({
  book,
  hasButton,
  onBookRemoved,
  shelf,
}: {
  book: SmallBookDto;
  hasButton?: boolean;
  onBookRemoved: (book: SmallBookDto) => void;
  shelf?: SmallShelfDto;
}) {
  return (
    <div className={styles.buttonContainer}>
      {hasButton && shelf && (
        <button
          className={classNames(styles.bookDeleteButton, 'nbShadow')}
          onClick={async () => {
            await BookService.updateBookInShelves(book.id, [], [shelf.id]);
            onBookRemoved(book);
          }}
        >
          <X className={styles.bookDeleteButtonImage} />
        </button>
      )}
      <BookListCardLink book={book} />
    </div>
  );
}
