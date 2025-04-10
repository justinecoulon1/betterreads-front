import bookService from '@/utils/api/book.service';
import styles from './book-details-page.module.css';
import BookDetailsContent from '@/components/book-details/book-details-content';
import ShelfService from '@/utils/api/shelf.service';
import { getSessionUser } from '@/utils/action/auth/get-session-user.action';

export default async function BookDetailsPage({ params }: { params: Promise<{ isbn: string }> }) {
  const isbn = (await params).isbn;
  const book = await bookService.getBookByIsbn(isbn);

  const user = await getSessionUser();
  const shelves = await ShelfService.getByUserId(user.id);
  return (
    <div className={styles.bookDetailsPageContainer}>
      <BookDetailsContent book={book} shelves={shelves} />
    </div>
  );
}
