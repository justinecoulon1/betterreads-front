'use server';

import styles from './shelf-details-page.module.css';
import ShelfDetailsContainer from '@/components/shelf-details/shelf-details-container';

export default async function ShelfDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const shelfId = parseInt((await params).id);
  return (
    <div className={styles.shelfDetailsPage}>
      <ShelfDetailsContainer shelfId={shelfId} />
    </div>
  );
}
