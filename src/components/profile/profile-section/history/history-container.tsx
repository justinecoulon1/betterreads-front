import { HistoryDto } from '@/utils/dto/history.dto';
import SeeMoreLink from '@/components/generic/see-more-button/see-more-link';
import styles from './history-container.module.css';

export default function HistoryContainer({
  history,
  containerTitle,
  seeMoreButton,
  seeMoreLink,
}: {
  history: HistoryDto[];
  containerTitle: string;
  seeMoreButton: boolean;
  seeMoreLink?: string;
}) {
  return (
    <div className={styles.historyContainer}>
      <div className={styles.historyHeaderContainer}>
        <h2>{containerTitle}</h2>
        {seeMoreButton && seeMoreLink && <SeeMoreLink path={seeMoreLink} />}
      </div>
      <div className={styles.historyListContainer}>
        {history.map((h) => (
          <div key={`history-item-${h.id}`} className={styles.historyCard}>
            <p>
              {new Date(h.createdAt).toLocaleDateString()}: {h.oldStatus} → {h.newStatus}
            </p>
            <p>{h.book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
