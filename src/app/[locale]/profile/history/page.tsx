'use server';

import HistoryPageContainer from '@/components/history/history-page-container';
import styles from './history-page.module.css';

type SearchParams = {
  page: string;
};

export default async function HistoryPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { page: pageStr } = await searchParams;
  const page = parseInt(pageStr ?? 1);

  return (
    <div className={styles.historyPage}>
      <HistoryPageContainer page={page} />
    </div>
  );
}
