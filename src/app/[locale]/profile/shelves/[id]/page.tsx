'use server';

import styles from './shelf-details-page.module.css';
import shelfService from '@/utils/api/shelf.service';
import ShelfDetailsContainer from '@/components/shelf-details/shelf-details-container';

export default async function ShelfDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const shelfId = parseInt((await params).id);
  const shelf = await shelfService.getShelfById(shelfId);
  return (
    <div className={styles.shelfDetailsPage}>
      <ShelfDetailsContainer shelf={shelf} />
    </div>
  );
}
