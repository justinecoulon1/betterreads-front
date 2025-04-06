import AddBookForm from '@/components/add-book/form/add-book-form';
import styles from './add-books-page.module.css';
import { useTranslations } from 'next-intl';

export default function AddBooksPage() {
  const t = useTranslations('books-add');
  return (
    <div className={styles.addBooksPage}>
      <h2>{t('title').toUpperCase()}</h2>
      <AddBookForm />
    </div>
  );
}
