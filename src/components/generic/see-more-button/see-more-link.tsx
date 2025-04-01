import { useTranslations } from 'next-intl';
import styles from './see-more-button.module.css';
import classNames from 'classnames';
import { Link } from '@/i18n/routing';

export default function SeeMoreLink({ path }: { path: string }) {
  const t = useTranslations('see-more');
  return (
    <Link href={path} className={classNames(styles.seeMoreLink, 'nbShadow')}>
      {t('see-more').toUpperCase()}
    </Link>
  );
}
