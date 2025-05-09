import { BookDto } from '@/utils/dto/book.dto';
import { useTranslations } from 'next-intl';
import styles from '@/components/book-details/book-details-content.module.css';

export default function BookInfoSection({ book }: { book: BookDto }) {
  const t = useTranslations('book-details');
  const bookInfo = [
    { translationKey: 'editor', value: book.editor },
    { translationKey: 'edition-language', value: book.editionLanguage },
    { translationKey: 'release-date', value: new Date(book.releaseDate).toLocaleDateString() },
    { translationKey: 'ISBN13', value: book.isbn13 },
    { translationKey: 'ISBN10', value: book.isbn10 },
    { translationKey: 'genres', value: book.genres.join(', ') },
  ];
  return (
    <section className={styles.bookDetailsRightSection}>
      <h3>{t('book-info')}</h3>
      {bookInfo.map((bookInfo) => (
        <div key={bookInfo.translationKey}>
          <p>
            <span>{t(bookInfo.translationKey)}</span>
            {bookInfo.value}
          </p>
        </div>
      ))}
    </section>
  );
}
