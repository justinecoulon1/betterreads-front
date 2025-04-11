import styles from './page.module.css';
import bookService from '@/utils/api/book.service';
import LastAddedBooksSection from '@/components/home/last-added-books-section';
import LeftSideBar from '@/components/home/left-side-bar';
import { getSessionUser } from '@/utils/action/auth/get-session-user.action';
import shelfService from '@/utils/api/shelf.service';

export default async function HomePage() {
  const lastAddedBooks = await bookService.getLastAddedBooks();
  const user = await getSessionUser();
  const userStatusShelves = await shelfService.getUserReadingStatusShelves(user.id);
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
