import { useTranslations } from 'next-intl';
import styles from './search-result-container.module.css';

export default function NoResultFound() {
  const t = useTranslations('search-results');
  return <p className={styles.noResultsFound}>{t('no-result-found')}</p>;
}
