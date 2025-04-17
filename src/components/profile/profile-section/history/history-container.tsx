import { HistoryDto } from '@/utils/dto/history.dto';
import SeeMoreLink from '@/components/generic/see-more-button/see-more-link';
import styles from './history-container.module.css';
import LongHistoryCard from '@/components/profile/profile-section/history/long-history-card';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('shelves-containers');
  return (
    <div className={styles.historyContainer}>
      <div className={styles.historyHeaderContainer}>
        <h2>{t(containerTitle)}</h2>
        {seeMoreButton && seeMoreLink && <SeeMoreLink path={seeMoreLink} />}
      </div>
      <div className={styles.historyListContainer}>
        {history.map((h) => (
          <LongHistoryCard history={h} key={`history-item-${h.id}`} />
        ))}
      </div>
    </div>
  );
}
