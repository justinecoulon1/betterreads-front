import styles from './page.module.css';
import bookService from '@/utils/api/book.service';
import LastAddedBooksSection from '@/components/home/last-added-books-section';

export default async function HomePage() {
  const lastAddedBooks = await bookService.getLastAddedBooks();
  return (
    <div className={styles.homePageContainer}>
      <LastAddedBooksSection lastAddedBooks={lastAddedBooks} />
    </div>
  );
}
