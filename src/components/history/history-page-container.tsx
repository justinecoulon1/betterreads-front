'use server';

import HistoryService from '@/utils/api/history.service';
import PageSelectionContainer from '@/components/books/page-selection-container';
import styles from './history-page-container.module.css';

const pageLimit = 20;

export default async function HistoryPageContainer({ page }: { page: number }) {
  const userHistory = await HistoryService.getUserReadingHistory(pageLimit, (page - 1) * pageLimit);
  const totalPages = userHistory ? 1 + Math.floor(userHistory.totalCount / pageLimit) : 0;
  return (
    <div className={styles.historyPageContainer}>
      <h2>History</h2>
      {userHistory.histories.map((h) => (
        <div key={`history-item-${h.id}`} className={styles.historyCard}>
          <p>
            {new Date(h.createdAt).toLocaleDateString()}: {h.oldStatus} → {h.newStatus}
          </p>
          <p>{h.book.title}</p>
        </div>
      ))}
      <PageSelectionContainer
        currentPage={page}
        totalPages={totalPages}
        getPageHref={(p) => `/profile/history?page=${p}`}
      />
    </div>
  );
}
