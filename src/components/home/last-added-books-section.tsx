import { BookListDto } from '@/utils/dto/book.dto';
import BookListCard from '@/components/global/books/book-list-card';
import styles from './last-added-books-section.module.css';
import { useTranslations } from 'next-intl';
import SeeMoreLink from '@/components/global/see-more-button/see-more-link';

export default function LastAddedBooksSection({ lastAddedBooks }: { lastAddedBooks: BookListDto[] }) {
  const t = useTranslations('last-added-books');
  return (
    <div className={styles.lastAddedBookSectionContainer}>
      <div className={styles.lastAddedBookSectionHeader}>
        <h2>{t('last-added-books-title')}</h2>
        <SeeMoreLink path={'/books'} />
      </div>
      <div className={styles.lastAddedBookSectionContent}>
        {lastAddedBooks.map((book) => (
          <BookListCard key={`${book.id}-bookListCard`} book={book} />
        ))}
      </div>
    </div>
  );
}
