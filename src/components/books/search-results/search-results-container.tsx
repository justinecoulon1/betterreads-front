import styles from './search-result-container.module.css';
import SearchResultsBookCard from '@/components/books/search-results/search-results-book-card/search-results-book-card';
import SearchResultsAuthorCard from '@/components/books/search-results/search-results-author-card/search-results-author-card';
import { SearchDto } from '@/utils/dto/search.dto';

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
