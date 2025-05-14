'use server';

import PageSelectionContainer from '@/components/books/page-selection-container';
import styles from './review-page-container.module.css';
import ReviewService from '@/utils/api/review.service';
import { UserReviewDto } from '@/utils/dto/review.dto';
import BookListCard from '@/components/global/books/book-list-card/book-list-card';

const pageLimit = 15;

export default async function ReviewPageContainer({ page }: { page: number }) {
  const userReviews = await ReviewService.getUserReviews(pageLimit, (page - 1) * pageLimit);
  const totalPages = userReviews ? 1 + Math.floor((userReviews.totalCount - 1) / pageLimit) : 0;
  return (
    <div className={styles.reviewPageContainer}>
      <div className={styles.reviewPageContainerHeader}>
        <h2>
          Reviews ({userReviews.reviews.length}/{userReviews.totalCount})
        </h2>
      </div>
      <div className={styles.reviewPageContainerContent}>
        {userReviews.reviews.map((review) => (
          <ReviewCard review={review} key={`review-page-card-${review.id}`} />
        ))}
        <PageSelectionContainer
          currentPage={page}
          totalPages={totalPages}
          getPageHref={(p) => `/profile/reviews?page=${p}`}
        />
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: UserReviewDto }) {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewCardBookCardContainer}>
        <BookListCard book={review.book} hasButton={false} onBookRemoved={() => {}} />
      </div>
      <div className={styles.reviewCardInfo}>
        <h3>Score: {review.score}</h3>
        <p>{review.commentary}</p>
      </div>
    </div>
  );
}
