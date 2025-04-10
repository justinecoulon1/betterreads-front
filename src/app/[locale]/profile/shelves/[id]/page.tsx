'use server';

import styles from './shelf-details-page.module.css';
import shelfService from '@/utils/api/shelf.service';
import ShelfDetailsContainer from '@/components/shelf-details/shelf-details-container';
import { getSessionUser } from '@/utils/action/auth/get-session-user.action';

export default async function ShelfDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  const shelfId = parseInt((await params).id);
  const shelf = await shelfService.getShelfById(shelfId, user.id);
  return (
    <div className={styles.shelfDetailsPage}>
      <ShelfDetailsContainer shelf={shelf} />
    </div>
  );
}
