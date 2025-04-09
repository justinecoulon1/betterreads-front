'use server';

import styles from './shelf-details-page.module.css';
import shelfService from '@/utils/api/shelf.service';
import { getSession } from '@/utils/action/auth/get-session.action';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function ShelfDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  const user = session.user;
  if (!user) {
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }
  const shelfId = parseInt((await params).id);
  const shelf = await shelfService.getShelfById(shelfId, user.id);
  return <div className={styles.shelfDetailsPage}>Shelf: {shelf.name}</div>;
}
