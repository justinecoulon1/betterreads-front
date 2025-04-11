'use server';

import styles from './shelves-page.module.css';
import ShelvesPageContainer from '@/components/shelves/shelves-page-container';
import ShelfService from '@/utils/api/shelf.service';
import { getSessionUser } from '@/utils/action/auth/get-session-user.action';

export default async function ShelvesPage() {
  const user = await getSessionUser();
  const shelves = await ShelfService.getByUserId(user.id);
  return (
    <div className={styles.shelvesPage}>
      <ShelvesPageContainer shelves={shelves} user={user} />
    </div>
  );
}
