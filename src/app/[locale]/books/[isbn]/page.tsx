import BookService from '@/utils/api/book.service';
import styles from './book-details-page.module.css';
import BookDetailsContent from '@/components/book-details/book-details-content';

export default async function BookDetailsPage({ params }: { params: Promise<{ isbn: string }> }) {
  const isbn = (await params).isbn;
  const book = await BookService.getBookByIsbn(isbn);
  return (
    <div className={styles.bookDetailsPageContainer}>
      <BookDetailsContent book={book} />
    </div>
  );
}
