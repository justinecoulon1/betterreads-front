'use client';

import styles from '@/components/books/search-container.module.css';
import SearchBar from '@/components/books/search-bar/search-bar';
import AddBookLink from '@/components/books/add-book-button/add-book-link';

export default function SearchContainerHeader({ searchText }: { searchText: string }) {
  return (
    <div className={styles.searchBookPageHeader}>
      <SearchBar
        className={styles.searchBookPageSearchBar}
        initialText={searchText}
        getSearchHref={(searchText) => `/books?q=${encodeURIComponent(searchText)}`}
      />
      <AddBookLink />
    </div>
  );
}
