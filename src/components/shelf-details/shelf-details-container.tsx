'use client';

import BookListCard from '@/components/global/books/book-list-card/book-list-card';
import { ShelfDto, ShelfType } from '@/utils/dto/shelf.dto';
import styles from './shelf-details-container.module.css';
import React, { useState } from 'react';
import BannerContainer from '@/components/global/banner/banner-container';

export default function ShelfDetailsContainer({ shelf }: { shelf: ShelfDto }) {
  const [shelfBooks, setShelfBooks] = useState(shelf.books);
  const hasButton =
    shelf.type !== ShelfType.READ && shelf.type !== ShelfType.READING && shelf.type !== ShelfType.TO_READ;
  return (
    <div className={styles.shelfDetailsContainer}>
      <BannerContainer path={'/library6.png'} imageAlt={'library banner'} imageClassName={styles.bannerImage} />
      <div className={styles.shelvesDetailsInnerContainer}>
        <div className={styles.shelfDetailsContainerHeader}>
          <h2>{shelf.name}</h2>
        </div>
        <div className={styles.shelfBookListContainer}>
          {shelfBooks.map((book) => (
            <BookListCard
              key={`shelf-book-list-card-${book.id}}`}
              book={book}
              hasButton={hasButton}
              shelf={shelf}
              onBookRemoved={
                hasButton
                  ? (bookRemoved) => {
                      setShelfBooks((books) => books.filter((book) => book.id !== bookRemoved.id));
                    }
                  : () => {}
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
