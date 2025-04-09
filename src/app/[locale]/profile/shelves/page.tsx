'use server';

import styles from './shelves-page.module.css';
import ShelvesPageContainer from '@/components/shelves/shelves-page-container';
import { getSession } from '@/utils/action/auth/get-session.action';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import ShelfService from '@/utils/api/shelf.service';

export default async function ShelvesPage() {
  const session = await getSession();
  const user = session.user;
  if (!user) {
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }
  const shelves = await ShelfService.getByUserId(user.id);
  return (
    <div className={styles.shelvesPage}>
      <ShelvesPageContainer shelves={shelves} user={user} />
    </div>
  );
}
