'use client';

import SearchBar from '@/components/books/search-bar/search-bar';
import styles from '@/components/global/header/header.module.css';
import React from 'react';
import { usePathname } from '@/i18n/routing';

export default function HeaderSearchBar() {
  const activePage = usePathname();
  if (activePage === '/books') {
    return null;
  }
  return (
    <SearchBar
      className={styles.headerSearchBar}
      getSearchHref={(searchText) => `/books?q=${encodeURIComponent(searchText)}`}
      initialText={''}
    />
  );
}
