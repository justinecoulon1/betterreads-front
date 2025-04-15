import BookListCard from '@/components/global/books/book-list-card/book-list-card';
import { AuthorWithBooksDto } from '@/utils/dto/author.dto';
import styles from './author-details-content.module.css';
import Image from 'next/image';
import React from 'react';
import BannerContainer from '@/components/global/banner/banner-container';

export default function AuthorDetailsContent({ author }: { author: AuthorWithBooksDto }) {
  return (
    <div className={styles.authorDetailsContentContainer}>
      <BannerContainer
        path={'/author-page-banner3.jpg'}
        imageAlt={'library banner'}
        imageClassName={styles.bannerImage}
      />
      <div className={styles.authorDetailsContentInnerContainer}>
        <div className={styles.authorHeaderContainer}>
          <div className={styles.authorHeaderImageContainer}>
            <Image
              className={styles.authorHeaderImage}
              src={'/icons/author_icon_light.png'}
              height={512}
              width={512}
              alt={'author icon'}
            />
          </div>
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
