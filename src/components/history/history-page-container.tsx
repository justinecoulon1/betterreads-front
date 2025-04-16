'use server';

import HistoryService from '@/utils/api/history.service';
import PageSelectionContainer from '@/components/books/page-selection-container';
import styles from './history-page-container.module.css';
import HistoryCard from '@/components/history/history-card';

const pageLimit = 15;

export default async function HistoryPageContainer({ page }: { page: number }) {
  const userHistory = await HistoryService.getUserReadingHistory(pageLimit, (page - 1) * pageLimit);
  const totalPages = userHistory ? 1 + Math.floor((userHistory.totalCount - 1) / pageLimit) : 0;
  return (
    <div className={styles.historyPageContainer}>
      <div className={styles.historyPageContainerHeader}>
        <h2>History</h2>
      </div>
      <div className={styles.historyPageContainerContent}>
        {userHistory.histories.map((h) => (
          <HistoryCard history={h} key={`history-item-${h.id}`} />
        ))}
        <PageSelectionContainer
          currentPage={page}
          totalPages={totalPages}
          getPageHref={(p) => `/profile/history?page=${p}`}
        />
      </div>
    </div>
  );
}
