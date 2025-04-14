import styles from './books-page.module.css';
import SearchContainer from '@/components/books/search-container';

type SearchParams = {
  q: string;
  page: string;
};

export default async function BooksPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { q, page: pageStr } = await searchParams;
  const page = parseInt(pageStr ?? 1);

  return (
    <div className={styles.searchBookPage}>
      <SearchContainer searchText={q ?? ''} page={page} />
    </div>
  );
}
