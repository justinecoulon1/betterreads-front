import styles from './search-result-container.module.css';
import SearchResultsBookCard from '@/components/books/search-results/search-results-book-card/search-results-book-card';
import SearchResultsAuthorCard from '@/components/books/search-results/search-results-author-card/search-results-author-card';
import { SearchDto } from '@/utils/dto/search.dto';
import { useTranslations } from 'next-intl';

export default function SearchResultsContainer({ items, count }: { items: SearchDto[]; count: number }) {
  const t = useTranslations('search-results');
  return (
    <div className={styles.searchResultsContainer}>
      <h2 className={styles.resultCount}>
        {t('search-result-count')}
        {count}
      </h2>
      {items.map((item, index) => (
        <div className={styles.searchResultsCardContainer} key={`b-${item.book?.id}-a-${item.author?.id}-${index}`}>
          {item.book && <SearchResultsBookCard key={`book-${item.book.id}`} book={item.book} />}
          {item.author && <SearchResultsAuthorCard key={`author-${item.author.id}`} author={item.author} />}
        </div>
      ))}
    </div>
  );
}
