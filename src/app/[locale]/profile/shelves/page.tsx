'use server';

import styles from './shelves-page.module.css';
import ShelvesPageContainer from '@/components/shelves/shelves-page-container';
import { getSessionUser } from '@/utils/action/auth/get-session-user.action';

export default async function ShelvesPage() {
  await getSessionUser();
  return (
    <div className={styles.shelvesPage}>
      <ShelvesPageContainer />
    </div>
  );
}
