'use client';

import BookListCard from '@/components/global/books/book-list-card';
import { ShelfDto } from '@/utils/dto/shelf.dto';
import styles from './shelf-details-container.module.css';
import Image from 'next/image';
import React, { useState } from 'react';

export default function ShelfDetailsContainer({ shelf }: { shelf: ShelfDto }) {
  const [shelfBooks, setShelfBooks] = useState(shelf.books);
  return (
    <div className={styles.shelfDetailsContainer}>
      <div className={styles.bannerContainer}>
        <Image className={styles.bannerImage} src="/library6.png" alt="library banner" width={3024} height={4032} />
      </div>
      <div className={styles.shelvesDetailsInnerContainer}>
        <div className={styles.shelfDetailsContainerHeader}>
          <h2>{shelf.name}</h2>
        </div>
        <div className={styles.shelfBookListContainer}>
          {shelfBooks.map((book) => (
            <BookListCard
              key={`shelf-book-list-card-${book.id}}`}
              book={book}
              hasButton={true}
              shelf={shelf}
              onBookRemoved={(bookRemoved) => {
                setShelfBooks((books) => books.filter((book) => book.id !== bookRemoved.id));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
