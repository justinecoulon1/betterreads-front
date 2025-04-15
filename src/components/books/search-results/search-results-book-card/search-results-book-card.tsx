import { BookDto } from '@/utils/dto/book.dto';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import classNames from 'classnames';
import styles from './search-results-book-card.module.css';
import CoverImage from '@/components/global/books/cover-image/cover-image';

export default function SearchResultsBookCard({ book }: { book: BookDto }) {
  const t = useTranslations('search-results');
  return (
    <Link href={`/books/${book.isbn13}`} className={classNames(styles.searchResultsBookCard, 'nbShadow')}>
      <div className={styles.searchResultsCoverImageContainer}>
        <CoverImage className={styles.searchResultsCoverImage} isbn={book.isbn13} />
      </div>
      <div className={styles.searchResultsBookInfoScrollableContainer}>
        <div className={styles.searchResultsBookInfo}>
          <div className={styles.searchResultsBasicBookInfo}>
            <h3 className={styles.searchResultsBookTitle}>{book.title}</h3>
            <p className={styles.searchResultsBookAuthor}>{book.authors.map((a) => a.name).join(', ')}</p>
          </div>
          <div className={styles.searchResultsExtendedBookInfo}>
            <p>
              <b>{t('book-release-date')}</b>
              {new Date(book.releaseDate).toLocaleDateString()}
            </p>
            <p>
              <b>{t('book-genres')}</b>
              {book.genres.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
