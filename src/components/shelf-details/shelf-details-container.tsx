'use client';

import BookListCard from '@/components/global/books/book-list-card/book-list-card';
import { ShelfDto, ShelfType } from '@/utils/dto/shelf.dto';
import styles from './shelf-details-container.module.css';
import React, { useEffect, useState } from 'react';
import BannerContainer from '@/components/global/banner/banner-container';
import { BookDto } from '@/utils/dto/book.dto';
import shelfService from '@/utils/api/shelf.service';

export default function ShelfDetailsContainer({ shelfId }: { shelfId: number }) {
  const [shelf, setShelf] = useState<ShelfDto | undefined>();
  const [shelfBooks, setShelfBooks] = useState<BookDto[] | undefined>();

  useEffect(() => {
    const fetchServerData = async () => {
      const newShelf = await shelfService.getShelfById(shelfId);
      setShelf(newShelf);
      setShelfBooks(newShelf.books);
    };
    void fetchServerData();
  }, [shelfId]);

  const hasButton =
    !!shelf && shelf.type !== ShelfType.READ && shelf.type !== ShelfType.READING && shelf.type !== ShelfType.TO_READ;
  return (
    <div className={styles.shelfDetailsContainer}>
      <BannerContainer path={'/library6.png'} imageAlt={'library banner'} imageClassName={styles.bannerImage} />
      <div className={styles.shelvesDetailsInnerContainer}>
        <div className={styles.shelfDetailsContainerHeader}>
          <h2>{shelf ? shelf.name : 'Loading...'}</h2>
        </div>
        {shelf && shelfBooks && (
          <>
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
                          setShelfBooks((books) => books?.filter((book) => book.id !== bookRemoved.id));
                        }
                      : () => {}
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
