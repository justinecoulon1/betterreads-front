import styles from '@/components/book-details/book-details-content.module.css';
import { Link } from '@/i18n/routing';
import { AuthorDto } from '@/utils/dto/author.dto';
import { useTranslations } from 'next-intl';

export default function BookAuthorsPagesLinks({ authors }: { authors: AuthorDto[] }) {
  const t = useTranslations('book-details');
  return (
    <div className={styles.bookAuthorPagesLinks}>
      <h4>{t('authors-links-title')}</h4>
      {authors.map((a) => (
        <li key={`book-details-page-${a.id}`}>
          <Link href={`/author/${a.slug}`}>{a.name}</Link>
        </li>
      ))}
    </div>
  );
}
