import styles from '@/components/history/history-page-container.module.css';
import { HistoryDto } from '@/utils/dto/history.dto';
import BookListCard from '@/components/global/books/book-list-card/book-list-card';
import { getHistoryStatusIcon } from '@/utils/history/history.utils';

export default function HistoryCard({ history }: { history: HistoryDto }) {
  const formattedDate = new Date(history.createdAt).toLocaleDateString();

  return (
    <div key={`history-item-${history.id}`} className={styles.historyCard}>
      <div className={styles.historyCardHistoryInfo}>
        <p>{formattedDate}:</p>
        <span className={styles.bookStatusChange}>
          {getHistoryStatusIcon(history.oldStatus, false)} → {getHistoryStatusIcon(history.newStatus, true)}
        </span>
      </div>
      <BookListCard book={history.book} onBookRemoved={() => {}} hasButton={false} />
    </div>
  );
}
