import styles from './page.module.css';
import bookService from '@/utils/api/book.service';
import LastAddedBooksSection from '@/components/home/last-added-books-section';
import LeftSideBar from '@/components/home/left-side-bar';
import ShelfService from '@/utils/api/shelf.service';
import { getSession } from '@/utils/action/auth/get-session.action';

export default async function HomePage() {
  const lastAddedBooks = await bookService.getLastAddedBooks();
  const session = await getSession();
  const user = session.user;
  const userStatusShelves = user ? await ShelfService.getUserReadingStatusShelves() : [];
  return (
    <div className={styles.homePageContainer}>
      <div className={styles.homePageLeftSideBarContainer}>
        <LeftSideBar userStatusShelves={userStatusShelves} />
      </div>
      <div className={styles.homePageContentContainer}>
        <LastAddedBooksSection lastAddedBooks={lastAddedBooks} />
      </div>
    </div>
  );
}
