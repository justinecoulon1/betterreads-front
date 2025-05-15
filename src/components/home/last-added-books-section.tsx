'use client';
import { SmallBookDto } from '@/utils/dto/book.dto';
import styles from './last-added-books-section.module.css';
import { useTranslations } from 'next-intl';
import SeeMoreLink from '@/components/generic/see-more-button/see-more-link';
import Carousel from '@/components/home/carousel';

export default function LastAddedBooksSection({ lastAddedBooks }: { lastAddedBooks: SmallBookDto[] }) {
  const t = useTranslations('last-added-books');
  return (
    <div className={styles.lastAddedBookSectionContainer}>
      <div className={styles.lastAddedBookSectionHeader}>
        <h2>{t('last-added-books-title').toUpperCase()}</h2>
        <SeeMoreLink path={'/books'} />
      </div>
      <div className={styles.lastAddedBookSectionContent}>
        {/*{lastAddedBooks.map((book) => (*/}
        {/*  <BookListCard key={`${book.id}-bookListCard`} book={book} hasButton={false} onBookRemoved={() => {}} />*/}
        {/*))}*/}
        <Carousel books={lastAddedBooks} />
      </div>
    </div>
  );
}
