'use server';

import styles from './reviews-page.module.css';
import { getSessionUser } from '@/utils/action/auth/get-session-user.action';
import ReviewPageContainer from '@/components/review/review-page-container';

type SearchParams = {
  page: string;
};

export default async function ReviewsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  await getSessionUser();
  const { page: pageStr } = await searchParams;
  const page = parseInt(pageStr ?? 1);

  return (
    <div className={styles.reviewsPage}>
      <ReviewPageContainer page={page} />
    </div>
  );
}
