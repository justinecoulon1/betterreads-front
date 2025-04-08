import SearchBar from '@/components/books/search-bar/search-bar';
import AddBookLink from '@/components/books/add-book-button/add-book-link';
import styles from './books-page.module.css';

export default async function BooksPage() {
  return (
    <div className={styles.searchBookPage}>
      <div className={styles.searchBookPageContent}>
        <div className={styles.searchBookPageHeader}>
          <SearchBar className={styles.searchBookPageSearchBar} />
          <AddBookLink />
        </div>
      </div>
    </div>
  );
}
