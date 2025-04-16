'use server';
import styles from './search-container.module.css';
import SearchContainerHeader from '@/components/books/search-container-header';
import SearchService from '@/utils/api/search.service';
import SearchResultsContainer from '@/components/books/search-results/search-results-container';
import PageSelectionContainer from '@/components/books/page-selection-container';
import NoResultFound from '@/components/books/search-results/no-result-found';

const pageLimit = 20;

export default async function SearchContainer({ searchText, page }: { searchText: string; page: number }) {
  const searchResult = searchText
    ? await SearchService.getPaginatedSearchData(searchText, pageLimit, (page - 1) * pageLimit)
    : undefined;
  const totalPages = searchResult ? 1 + Math.floor((searchResult.count - 1) / pageLimit) : 0;

  return (
    <div className={styles.searchBookPageContent}>
      <SearchContainerHeader searchText={searchText} />
      {searchResult && searchResult.items.length !== 0 && (
        <div className={styles.resultsContainer}>
          <SearchResultsContainer items={searchResult.items} />
          <PageSelectionContainer
            currentPage={page}
            totalPages={totalPages}
            getPageHref={(p) => `/books?q=${encodeURIComponent(searchText)}&page=${p}`}
          />
        </div>
      )}
      {searchResult && searchResult.items.length === 0 && (
        <div className={styles.resultsContainer}>
          <NoResultFound />
        </div>
      )}
    </div>
  );
}
