import bookService from '@/utils/api/book.service';
import styles from './book-details-page.module.css';
import BookDetailsContent from '@/components/book-details/book-details-content';
import { getSession } from '@/utils/action/auth/get-session.action';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import ShelfService from '@/utils/api/shelf.service';

export default async function BookDetailsPage({ params }: { params: Promise<{ isbn: string }> }) {
  const isbn = (await params).isbn;
  const book = await bookService.getBookByIsbn(isbn);

  const session = await getSession();
  const user = session.user;
  if (!user) {
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }
  const shelves = await ShelfService.getByUserId(user.id);
  return (
    <div className={styles.bookDetailsPageContainer}>
      <BookDetailsContent book={book} shelves={shelves} />
    </div>
  );
}
