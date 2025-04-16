import { HistoryDto } from '@/utils/dto/history.dto';
import styles from '@/components/profile/profile-section/history/history-container.module.css';
import { getHistoryStatusIcon } from '@/utils/history/history.utils';

export default function LongHistoryCard({ history }: { history: HistoryDto }) {
  const formattedDate = new Date(history.createdAt).toLocaleDateString();

  return (
    <div key={`history-item-${history.id}`} className={styles.longHistoryCard}>
      <div className={styles.historyInfo}>
        <p>{formattedDate}:</p>
        <span className={styles.bookStatusChange}>
          {getHistoryStatusIcon(history.oldStatus, false)} → {getHistoryStatusIcon(history.newStatus, true)}
        </span>
      </div>
      <div className={styles.historyBookInfo}>
        <p className={styles.bookTitle}>{history.book.title}</p>
      </div>
    </div>
  );
}
