import { SearchItemDto } from '@/utils/dto/searchItemDto';
import styles from './search-result-container.module.css';
import SearchResultsBookCard from '@/components/books/search-results/search-results-book-card/search-results-book-card';
import SearchResultsAuthorCard from '@/components/books/search-results/search-results-author-card/search-results-author-card';

export default function SearchResultsContainer({ items }: { items: SearchItemDto[] }) {
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
