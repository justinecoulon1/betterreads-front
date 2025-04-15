'use server';

import HistoryService from '@/utils/api/history.service';
import PageSelectionContainer from '@/components/books/page-selection-container';
import styles from './history-page-container.module.css';
import BookListCard from '@/components/global/books/book-list-card';
import { BookCheck, BookOpen, BookPlus, X } from 'lucide-react';
import { HistoryStatus } from '@/utils/dto/history.dto';

const pageLimit = 15;

export default async function HistoryPageContainer({ page }: { page: number }) {
  const userHistory = await HistoryService.getUserReadingHistory(pageLimit, (page - 1) * pageLimit);
  const totalPages = userHistory ? 1 + Math.floor(userHistory.totalCount / pageLimit) : 0;
  return (
    <div className={styles.historyPageContainer}>
      <div className={styles.historyPageContainerHeader}>
        <h2>History</h2>
      </div>
      <div className={styles.historyPageContainerContent}>
        {userHistory.histories.map((h) => (
          <div key={`history-item-${h.id}`} className={styles.historyCard}>
            <div className={styles.historyCardHistoryInfo}>
              <p>{new Date(h.createdAt).toLocaleDateString()}:</p>
              <span className={styles.bookStatusChange}>
                {h.oldStatus === HistoryStatus.READING && <BookOpen />}
                {h.oldStatus === HistoryStatus.TO_READ && <BookPlus />}
                {h.oldStatus === HistoryStatus.READ && <BookCheck />}→{h.newStatus === null && <X />}
                {h.newStatus === HistoryStatus.READING && <BookOpen />}
                {h.newStatus === HistoryStatus.TO_READ && <BookPlus />}
                {h.newStatus === HistoryStatus.READ && <BookCheck />}
              </span>
            </div>
            <BookListCard book={h.book} onBookRemoved={() => {}} hasButton={false} />
          </div>
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
