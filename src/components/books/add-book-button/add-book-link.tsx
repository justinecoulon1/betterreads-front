import { Link } from '@/i18n/routing';
import classNames from 'classnames';
import styles from './add-book-link.module.css';
import { useTranslations } from 'next-intl';

export default function AddBookLink() {
  const t = useTranslations('books');
  return (
    <Link className={classNames(styles.addBookLink, 'nbShadow')} href={'/books/add'}>
      {t('add-book-link')}
    </Link>
  );
}
