import BookListCard from '@/components/global/books/book-list-card';
import { AuthorWithBooksDto } from '@/utils/dto/author.dto';
import styles from './author-details-content.module.css';
import Image from 'next/image';
import React from 'react';

export default function AuthorDetailsContent({ author }: { author: AuthorWithBooksDto }) {
  return (
    <div className={styles.authorDetailsContentContainer}>
      <div className={styles.bannerContainer}>
        <Image className={styles.bannerImage} src="/library6.png" alt="library banner" width={3024} height={4032} />
      </div>
      <div className={styles.authorDetailsContentInnerContainer}>
        <div className={styles.authorHeaderContainer}>
          <h2>{author.name}</h2>
        </div>
        <div className={styles.authorDetailsContainer}>
          {author.books.map((book) => (
            <BookListCard
              key={`author-page-book-card-${book.id}`}
              book={book}
              onBookRemoved={() => {}}
              hasButton={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
