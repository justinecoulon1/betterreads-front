import { SearchDto } from '@/utils/dto/search.dto';
import styles from './search-result-container.module.css';
import CoverImage from '@/components/global/books/cover-image/cover-image';
import classNames from 'classnames';
import { Link } from '@/i18n/routing';
import { BookDto } from '@/utils/dto/book.dto';
import { useTranslations } from 'next-intl';
import { AuthorDto } from '@/utils/dto/author.dto';

export default function SearchResultsContainer({ items }: { items: SearchDto[] }) {
  return (
    <div className={styles.searchResultsContainer}>
      {items.map((item, index) => (
        <div className={styles.searchResultsCardContainer} key={`b-${item.book?.id}-a-${item.author?.id}-${index}`}>
          {item.book && <SearchResultsBookCard key={`book-${item.book.id}`} book={item.book} />}
          {item.author && <SearchResultsAuthorCard key={`author-${item.author.id}`} author={item.author} />}
        </div>
      ))}
    </div>
  );
}

function SearchResultsBookCard({ book }: { book: BookDto }) {
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

function SearchResultsAuthorCard({ author }: { author: AuthorDto }) {
  const t = useTranslations('search-results');
  return (
    <div className={classNames(styles.searchResultsAuthorCard, 'nbShadow')}>
      <div>
        <h2>{t('author-title')}</h2>
        <p>{author.name}</p>
      </div>
    </div>
  );
}
