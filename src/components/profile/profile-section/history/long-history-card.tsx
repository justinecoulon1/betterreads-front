import { HistoryDto, HistoryStatus } from '@/utils/dto/history.dto';
import { BookCheck, BookOpen, BookPlus } from 'lucide-react';
import styles from '@/components/profile/profile-section/history/history-container.module.css';

const statusIconMap = {
  [HistoryStatus.READING]: <BookOpen />,
  [HistoryStatus.TO_READ]: <BookPlus />,
  [HistoryStatus.READ]: <BookCheck />,
};

export default function LongHistoryCard({ history }: { history: HistoryDto }) {
  const formattedDate = new Date(history.createdAt).toLocaleDateString();

  return (
    <div key={`history-item-${history.id}`} className={styles.longHistoryCard}>
      <div className={styles.historyInfo}>
        <p>{formattedDate}:</p>
        <span className={styles.bookStatusChange}>
          {statusIconMap[history.oldStatus]} → {statusIconMap[history.newStatus]}
        </span>
      </div>
      <div className={styles.historyBookInfo}>
        <p className={styles.bookTitle}>{history.book.title}</p>
      </div>
    </div>
  );
}
