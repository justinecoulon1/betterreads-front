import styles from '@/components/history/history-page-container.module.css';
import { HistoryDto, HistoryStatus } from '@/utils/dto/history.dto';
import { BookCheck, BookOpen, BookPlus, X } from 'lucide-react';
import BookListCard from '@/components/global/books/book-list-card/book-list-card';

const statusIconMap = {
  [HistoryStatus.READING]: <BookOpen />,
  [HistoryStatus.TO_READ]: <BookPlus />,
  [HistoryStatus.READ]: <BookCheck />,
};

function getStatusIcon(status: HistoryStatus | null, isNew: boolean) {
  if (status === null) {
    return isNew ? <X /> : null;
  }
  return statusIconMap[status];
}

export default function HistoryCard({ history }: { history: HistoryDto }) {
  const formattedDate = new Date(history.createdAt).toLocaleDateString();

  return (
    <div key={`history-item-${history.id}`} className={styles.historyCard}>
      <div className={styles.historyCardHistoryInfo}>
        <p>{formattedDate}:</p>
        <span className={styles.bookStatusChange}>
          {getStatusIcon(history.oldStatus, false)} → {getStatusIcon(history.newStatus, true)}
        </span>
      </div>
      <BookListCard book={history.book} onBookRemoved={() => {}} hasButton={false} />
    </div>
  );
}
